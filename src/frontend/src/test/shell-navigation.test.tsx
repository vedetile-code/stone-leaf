import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { NAV_ITEMS } from "@/lib/brand";
import { SPECIMENS } from "@/lib/specimens";
import { renderApp } from "@/test/render-app";

/**
 * Characterization coverage for shell and navigation behavior that the
 * approachable-language copy shift must not disturb. These assertions are
 * deliberately copy-independent: they exercise link wiring, the mobile menu
 * toggle, and URL search-parameter preservation rather than any wording that
 * the request intentionally rewrites.
 */
describe("site shell navigation", () => {
  it("toggles the mobile menu open and closed", async () => {
    const user = userEvent.setup();
    renderApp("/");

    const toggle = await screen.findByTestId("nav.menu_toggle");
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Primary mobile" }),
    ).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu after following a link", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/");

    await user.click(await screen.findByTestId("nav.menu_toggle"));
    await user.click(screen.getByTestId("nav.mobile_collection_link"));

    expect(router.state.location.pathname).toBe("/collection");
    expect(screen.getByTestId("nav.menu_toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("exposes every primary destination in the footer", async () => {
    renderApp("/");

    const footer = await screen.findByRole("contentinfo");
    const footerNav = within(footer).getByRole("navigation", {
      name: "Footer",
    });
    for (const item of NAV_ITEMS) {
      expect(
        within(footerNav).getByRole("link", { name: item.label }),
      ).toBeInTheDocument();
    }
  });

  it("links the header lockup back to the home route", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/collection");

    await user.click(await screen.findByTestId("nav.home_link"));

    expect(router.state.location.pathname).toBe("/");
  });
});

describe("collection filter preservation across navigation", () => {
  it("carries the active vessel filter into a specimen detail URL", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/collection");

    await screen.findByTestId("collection.list");
    await user.click(screen.getByTestId("collection.vessel.stone"));

    const first = SPECIMENS.find((s) => s.material === "stone");
    expect(first).toBeDefined();
    await user.click(screen.getByText(first!.name));

    expect(router.state.location.pathname).toBe(`/collection/${first!.id}`);
    expect(router.state.location.search).toMatchObject({ vessel: "stone" });
  });

  it("restores the filter when returning to the collection from a detail", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/collection");

    await screen.findByTestId("collection.list");
    await user.click(screen.getByTestId("collection.scale.tabletop"));

    const first = SPECIMENS.find((s) => s.scale === "tabletop");
    expect(first).toBeDefined();
    await user.click(screen.getByText(first!.name));

    await screen.findByRole("heading", { name: first!.name });
    await user.click(screen.getByTestId("detail.back_link"));

    expect(router.state.location.pathname).toBe("/collection");
    expect(router.state.location.search).toMatchObject({ scale: "tabletop" });
    expect(screen.getByTestId("collection.scale.tabletop")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
