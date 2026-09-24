import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BRAND } from "@/lib/brand";
import { renderApp } from "@/test/render-app";

/**
 * Characterization coverage for the contact page's direct-contact seam and its
 * transport-error branch. Both are copy-independent: the request rewrites the
 * page's invitation language, but the studio's email link, phone number, and
 * the "could not send" fallback must keep working.
 */
vi.mock("@/hooks/useViewingRequests", () => ({
  useSubmitViewingRequest: () => ({
    mutate: vi.fn(),
    isPending: false,
    isError: true,
  }),
}));

describe("contact page direct contact and error state", () => {
  it("offers a direct email link and the studio phone number", async () => {
    renderApp("/contact");

    const emailLink = await screen.findByTestId("contact.email_link");
    expect(emailLink).toHaveAttribute("href", `mailto:${BRAND.email}`);
    expect(emailLink).toHaveTextContent(BRAND.email);

    // The phone number also appears in the footer, so scope to the studio panel.
    const details = screen.getByTestId("contact.details_panel");
    expect(within(details).getByText(BRAND.phone)).toBeInTheDocument();
  });

  it("shows a recoverable error state when the request cannot be sent", async () => {
    renderApp("/contact");

    const error = await screen.findByTestId("contact.error_state");
    expect(error).toHaveTextContent(BRAND.email);
    // The form stays available so the visitor can retry.
    expect(screen.getByTestId("contact.form")).toBeInTheDocument();
  });
});
