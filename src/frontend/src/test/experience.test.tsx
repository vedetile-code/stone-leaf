import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BRAND } from "@/lib/brand";
import { renderApp } from "@/test/render-app";

// The contact route pulls in the backend actor hook; stub it so navigating
// there in this suite does not require an InternetIdentity provider.
vi.mock("@/hooks/useViewingRequests", () => ({
  useSubmitViewingRequest: () => ({
    mutate: vi.fn(),
    isPending: false,
    isError: false,
  }),
}));

const STEPS = [
  {
    index: "01",
    title: "Come In From the Drive",
    image: "/assets/generated/journey-invitation.dim_1200x1500.jpg",
  },
  {
    index: "02",
    title: "Walk the Rooms",
    image: "/assets/generated/journey-arrival.dim_1200x1500.jpg",
  },
  {
    index: "03",
    title: "Chat With the Studio",
    image: "/assets/generated/journey-studio.dim_1200x1500.jpg",
  },
  {
    index: "04",
    title: "Take It Home, Placed",
    image: "/assets/generated/journey-delivery.dim_1200x1500.jpg",
  },
];

describe("experience page", () => {
  it("introduces the four-movement open studio visit", async () => {
    renderApp("/experience");

    expect(
      await screen.findByRole("heading", { name: "The Experience" }),
    ).toBeInTheDocument();
    const hero = screen.getByTestId("experience.hero_section");
    expect(within(hero).getByText(BRAND.appointmentLine)).toBeInTheDocument();
  });

  it("renders all four journey steps in order with their images", async () => {
    renderApp("/experience");

    await screen.findByRole("heading", { name: "The Experience" });
    const journey = screen.getByTestId("experience.journey_section");

    STEPS.forEach((step, position) => {
      const item = within(journey).getByTestId(
        `experience.step.${position + 1}`,
      );
      expect(
        within(item).getByRole("heading", { name: step.title }),
      ).toBeInTheDocument();
      expect(within(item).getByText(step.index)).toBeInTheDocument();
      const image = within(item).getByRole("img");
      expect(image).toHaveAttribute("src", step.image);
    });
  });

  it("invites the visitor to come see the studio", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/experience");

    await screen.findByRole("heading", { name: "The Experience" });
    const cta = screen.getByTestId("experience.cta_section");
    await user.click(within(cta).getByRole("link", { name: /Come See Us/i }));

    expect(router.state.location.pathname).toBe("/contact");
  });
});
