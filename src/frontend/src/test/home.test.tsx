import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { BRAND, NAV_ITEMS, TAGLINES } from "@/lib/brand";
import { renderApp } from "@/test/render-app";

describe("site shell", () => {
  it("renders the STONE & LEAF / BERMUDA lockup in the header and footer", async () => {
    renderApp("/");

    // The lockup appears in the header, the hero, and the footer.
    const lockups = await screen.findAllByText(BRAND.name);
    expect(lockups.length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText(BRAND.region).length).toBeGreaterThanOrEqual(3);
  });

  it("exposes navigation to Collection, Experience, Designers, and Contact", async () => {
    renderApp("/");

    const primaryNav = await screen.findByRole("navigation", {
      name: "Primary",
    });
    for (const item of NAV_ITEMS) {
      expect(
        within(primaryNav).getByRole("link", { name: item.label }),
      ).toBeInTheDocument();
    }
  });

  it("shows the open-invitation line and all three taglines in the footer", async () => {
    renderApp("/");

    const footer = await screen.findByRole("contentinfo");
    expect(within(footer).getByText(BRAND.appointmentLine)).toBeInTheDocument();
    for (const tagline of TAGLINES) {
      expect(within(footer).getByText(tagline)).toBeInTheDocument();
    }
  });

  it("navigates from the header to the Collection", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/");

    const primaryNav = await screen.findByRole("navigation", {
      name: "Primary",
    });
    await user.click(
      within(primaryNav).getByRole("link", { name: "Collection" }),
    );

    expect(router.state.location.pathname).toBe("/collection");
    expect(
      await screen.findByRole("heading", {
        name: /Finished Pieces, Ready to Place\./i,
      }),
    ).toBeInTheDocument();
  });
});

describe("home page", () => {
  it("presents the hero tagline and a low-friction Plan a Visit call to action", async () => {
    renderApp("/");

    expect(
      await screen.findByRole("heading", {
        name: "Living Art for Modern Homes.",
      }),
    ).toBeInTheDocument();

    const hero = screen.getByTestId("home.hero.section");
    expect(
      within(hero).getByRole("link", { name: /Plan a Visit/i }),
    ).toBeInTheDocument();
  });

  it("renders a Bermuda-interior hero image and the welcoming signage moment image", async () => {
    renderApp("/");

    const heroImage = await screen.findByAltText(
      /coral stone wall with navy ironwork glazing and ocean daylight/i,
    );
    expect(heroImage).toHaveAttribute(
      "src",
      "/assets/generated/hero-specimen.dim_1920x1080.jpg",
    );

    const signage = screen.getByTestId("home.signage.section");
    expect(
      within(signage).getByAltText(
        /limestone pillar at the studio entrance carrying a small matte plaque with the studio hours/i,
      ),
    ).toBeInTheDocument();
  });

  it("lets a visitor select each of the three brand statements", async () => {
    const user = userEvent.setup();
    renderApp("/");

    const section = await screen.findByTestId("home.taglines.section");
    const statement = within(section).getByText(TAGLINES[0]);
    expect(statement).toBeInTheDocument();

    await user.click(screen.getByTestId("home.taglines.tab.2"));
    expect(within(section).getByText(TAGLINES[1])).toBeInTheDocument();

    await user.click(screen.getByTestId("home.taglines.tab.3"));
    expect(within(section).getByText(TAGLINES[2])).toBeInTheDocument();
  });

  it("links the featured specimen through to the Collection", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/");

    const featured = await screen.findByTestId("home.featured.section");
    await user.click(
      within(featured).getByRole("link", { name: /View the Collection/i }),
    );

    expect(router.state.location.pathname).toBe("/collection");
  });
});
