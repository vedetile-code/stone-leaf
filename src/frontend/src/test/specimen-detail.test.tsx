import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SPECIMENS, formatMaterial } from "@/lib/specimens";
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

const SUBJECT = SPECIMENS[0];

describe("specimen detail page", () => {
  it("presents the specimen as a finished piece with its vessel details", async () => {
    renderApp(`/collection/${SUBJECT.id}`);

    expect(
      await screen.findByRole("heading", { name: SUBJECT.name }),
    ).toBeInTheDocument();
    // The botanical name appears as the subtitle and again in the detail list.
    expect(
      screen.getAllByText(SUBJECT.botanical).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(SUBJECT.description)).toBeInTheDocument();
    expect(screen.getByText(SUBJECT.vessel)).toBeInTheDocument();
    // The material appears as a badge and again in the detail list.
    expect(
      screen.getAllByText(formatMaterial(SUBJECT.material)).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(SUBJECT.height)).toBeInTheDocument();
  });

  it("shows the specimen image with a Bermuda-interior descriptive alt", async () => {
    renderApp(`/collection/${SUBJECT.id}`);

    const image = await screen.findByAltText(
      new RegExp(
        `${SUBJECT.name} in a ${SUBJECT.vessel.toLowerCase()}.*coral stone wall with navy ironwork`,
        "i",
      ),
    );
    expect(image).toHaveAttribute("src", SUBJECT.image);
  });

  it("links to the private viewing request", async () => {
    const user = userEvent.setup();
    const { router } = renderApp(`/collection/${SUBJECT.id}`);

    await screen.findByRole("heading", { name: SUBJECT.name });
    await user.click(screen.getByTestId("detail.primary_button"));

    expect(router.state.location.pathname).toBe("/contact");
  });

  it("lists related pieces in the same material", async () => {
    renderApp(`/collection/${SUBJECT.id}`);

    await screen.findByRole("heading", { name: SUBJECT.name });
    const related = SPECIMENS.filter(
      (item) => item.id !== SUBJECT.id && item.material === SUBJECT.material,
    ).slice(0, 3);

    expect(
      screen.getByRole("heading", {
        name: `More in ${formatMaterial(SUBJECT.material)}`,
      }),
    ).toBeInTheDocument();
    for (const item of related) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    }
  });

  it("shows a not-found state for an unknown specimen", async () => {
    renderApp("/collection/does-not-exist");

    expect(
      await screen.findByRole("heading", {
        name: /This Piece Is No Longer Listed\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("detail.back_button")).toBeInTheDocument();
  });

  it("returns to the collection from the not-found state", async () => {
    const user = userEvent.setup();
    const { router } = renderApp("/collection/does-not-exist");

    await screen.findByRole("heading", {
      name: /This Piece Is No Longer Listed\./i,
    });
    await user.click(screen.getByTestId("detail.back_button"));

    expect(router.state.location.pathname).toBe("/collection");
    expect(
      await screen.findByRole("heading", {
        name: /Finished Pieces, Ready to Place\./i,
      }),
    ).toBeInTheDocument();
  });

  it("navigates to a related piece", async () => {
    const user = userEvent.setup();
    const { router } = renderApp(`/collection/${SUBJECT.id}`);

    await screen.findByRole("heading", { name: SUBJECT.name });
    const related = SPECIMENS.find(
      (item) => item.id !== SUBJECT.id && item.material === SUBJECT.material,
    );
    expect(related).toBeDefined();

    const relatedSection = screen
      .getByTestId("detail.related_item.1")
      .closest("section");
    await user.click(
      within(relatedSection as HTMLElement).getByText(related!.name),
    );

    expect(router.state.location.pathname).toBe(`/collection/${related!.id}`);
  });
});
