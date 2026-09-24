import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SPECIMENS, formatMaterial } from "@/lib/specimens";
import { renderApp } from "@/test/render-app";

// The empty-state Plan a Visit link navigates to the contact route, which pulls
// in the backend actor hook; stub it so this suite needs no InternetIdentity.
vi.mock("@/hooks/useViewingRequests", () => ({
  useSubmitViewingRequest: () => ({
    mutate: vi.fn(),
    isPending: false,
    isError: false,
  }),
}));

describe("collection page", () => {
  it("lists every specimen as a finished piece", async () => {
    renderApp("/collection");

    const list = await screen.findByTestId("collection.list");
    for (const specimen of SPECIMENS) {
      expect(within(list).getByText(specimen.name)).toBeInTheDocument();
    }
    expect(screen.getByTestId("collection.count")).toHaveTextContent(
      `${SPECIMENS.length} Pieces`,
    );
  });

  it("filters by vessel material and reflects the choice in the URL", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/collection");

    await screen.findByTestId("collection.list");
    await user.click(screen.getByTestId("collection.vessel.stone"));

    const expected = SPECIMENS.filter((s) => s.material === "stone");
    const list = screen.getByTestId("collection.list");
    for (const specimen of expected) {
      expect(within(list).getByText(specimen.name)).toBeInTheDocument();
    }
    for (const specimen of SPECIMENS.filter((s) => s.material !== "stone")) {
      expect(within(list).queryByText(specimen.name)).not.toBeInTheDocument();
    }

    expect(router.state.location.search).toMatchObject({ vessel: "stone" });
    expect(screen.getByTestId("collection.vessel.stone")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("filters by scale and combines with the vessel filter", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/collection");

    await screen.findByTestId("collection.list");
    await user.click(screen.getByTestId("collection.scale.tabletop"));

    const expected = SPECIMENS.filter((s) => s.scale === "tabletop");
    const list = screen.getByTestId("collection.list");
    for (const specimen of expected) {
      expect(within(list).getByText(specimen.name)).toBeInTheDocument();
    }
    expect(router.state.location.search).toMatchObject({ scale: "tabletop" });
  });

  it("restores filters from the URL on a shared link", async () => {
    renderApp("/collection?vessel=concrete");

    const list = await screen.findByTestId("collection.list");
    const expected = SPECIMENS.filter((s) => s.material === "concrete");
    for (const specimen of expected) {
      expect(within(list).getByText(specimen.name)).toBeInTheDocument();
    }
    expect(screen.getByTestId("collection.vessel.concrete")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByTestId("collection.count")).toHaveTextContent(
      `${expected.length} Pieces`,
    );
  });

  it("shows an empty state and clears filters when nothing matches", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/collection");

    await screen.findByTestId("collection.list");
    // No specimen is both a tabletop piece and a concrete vessel.
    await user.click(screen.getByTestId("collection.scale.tabletop"));
    await user.click(screen.getByTestId("collection.vessel.concrete"));

    const empty = await screen.findByTestId("collection.empty_state");
    expect(
      within(empty).getByRole("heading", {
        name: /No Pieces in This Combination\./i,
      }),
    ).toBeInTheDocument();

    await user.click(screen.getByTestId("collection.empty_clear_button"));
    expect(await screen.findByTestId("collection.list")).toBeInTheDocument();
    expect(router.state.location.search).not.toMatchObject({
      vessel: "concrete",
    });
  });

  it("offers a Plan a Visit invitation from the empty state", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/collection");

    await screen.findByTestId("collection.list");
    await user.click(screen.getByTestId("collection.scale.tabletop"));
    await user.click(screen.getByTestId("collection.vessel.concrete"));

    const empty = await screen.findByTestId("collection.empty_state");
    const visit = within(empty).getByTestId("collection.empty_visit_button");
    expect(visit).toHaveTextContent("Plan a Visit");

    await user.click(visit);
    expect(router.state.location.pathname).toBe("/contact");
  });

  it("opens a specimen detail from a card", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/collection");

    const list = await screen.findByTestId("collection.list");
    const first = SPECIMENS[0];
    await user.click(within(list).getByText(first.name));

    expect(router.state.location.pathname).toBe(`/collection/${first.id}`);
    expect(
      await screen.findByRole("heading", { name: first.name }),
    ).toBeInTheDocument();
  });

  it("labels each card with its formatted material", async () => {
    renderApp("/collection");

    const list = await screen.findByTestId("collection.list");
    const first = SPECIMENS[0];
    const card = within(list).getByText(first.name).closest("a");
    expect(card).not.toBeNull();
    expect(
      within(card as HTMLElement).getByText(formatMaterial(first.material)),
    ).toBeInTheDocument();
  });
});
