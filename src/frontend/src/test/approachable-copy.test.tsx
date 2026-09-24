import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BRAND } from "@/lib/brand";
import { SPECIMENS } from "@/lib/specimens";
import { renderApp } from "@/test/render-app";

/**
 * Cover for the approachable-luxury copy shift. These assertions are the
 * accepted requirements made observable: the old exclusivity strings are gone
 * everywhere, the single open-invitation line is reused across the shell and
 * CTAs, the contact page exposes studio hours and direct contact, and the
 * Bermuda-interior imagery cues survive in alt text.
 *
 * The contact route pulls in the backend actor hook; stub it so rendering the
 * contact page here does not require an InternetIdentity provider.
 */
vi.mock("@/hooks/useViewingRequests", () => ({
  useSubmitViewingRequest: () => ({
    mutate: vi.fn(),
    isPending: false,
    isError: false,
  }),
}));

/** Every route the app exposes, including a specimen detail. */
const ROUTES = [
  "/",
  "/collection",
  `/collection/${SPECIMENS[0].id}`,
  "/experience",
  "/designers",
  "/contact",
];

const FORBIDDEN = [
  "By Appointment Only",
  "by appointment only",
  "strictly by appointment",
];

describe("approachable invitation copy", () => {
  it.each(ROUTES)(
    "never shows the old exclusivity strings on %s",
    async (route) => {
      const { container } = renderApp(route);
      // Wait for the route to render before reading the whole document.
      await screen.findByRole("main");

      const text = container.textContent ?? "";
      for (const phrase of FORBIDDEN) {
        expect(text).not.toContain(phrase);
      }
    },
  );

  it("reuses the open-invitation line in the header CTA and the footer", async () => {
    renderApp("/");

    const headerCta = await screen.findByTestId("nav.plan_visit_button");
    expect(headerCta).toHaveTextContent("Plan a Visit");

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText(BRAND.appointmentLine)).toBeInTheDocument();
    expect(within(footer).getByTestId("footer.studio_hours")).toHaveTextContent(
      BRAND.studioHours,
    );
  });

  it("uses the low-friction invitation language on every page CTA", async () => {
    const cases: Array<{ route: string; testId: string; label: RegExp }> = [
      {
        route: "/",
        testId: "home.hero.primary_button",
        label: /Plan a Visit/i,
      },
      {
        route: "/",
        testId: "home.invitation.primary_button",
        label: /Plan a Visit/i,
      },
      {
        route: `/collection/${SPECIMENS[0].id}`,
        testId: "detail.primary_button",
        label: /Plan a Visit/i,
      },
      {
        route: "/experience",
        testId: "experience.plan_visit_button",
        label: /Come See Us/i,
      },
    ];

    for (const { route, testId, label } of cases) {
      const { unmount } = renderApp(route);
      const cta = await screen.findByTestId(testId);
      expect(cta).toHaveTextContent(label);
      unmount();
    }
  });

  it("presents studio hours and a direct phone and email on the contact page", async () => {
    renderApp("/contact");

    const details = await screen.findByTestId("contact.details_panel");
    expect(within(details).getByText(BRAND.studioHours)).toBeInTheDocument();

    const phone = within(details).getByTestId("contact.phone_link");
    expect(phone).toHaveAttribute(
      "href",
      `tel:${BRAND.phone.replace(/[^+\d]/g, "")}`,
    );

    const email = within(details).getByTestId("contact.email_link");
    expect(email).toHaveAttribute("href", `mailto:${BRAND.email}`);
  });

  it("describes the collection imagery with Bermuda-interior cues", async () => {
    renderApp("/collection");

    const list = await screen.findByTestId("collection.list");
    const first = SPECIMENS[0];
    const card = within(list).getByTestId("collection.item.1");
    const image = within(card).getByRole("img");
    expect(image).toHaveAttribute("src", first.image);
    expect(image.getAttribute("alt")).toMatch(
      /coral stone|limestone|navy ironwork|ocean-facing/i,
    );
  });

  it("keeps the distinctive typography and hover transitions on interactive elements", async () => {
    renderApp("/");

    const headerCta = await screen.findByTestId("nav.plan_visit_button");
    expect(headerCta.className).toContain("tracked");
    expect(headerCta.className).toContain("transition-smooth");

    const heroCta = screen.getByTestId("home.hero.primary_button");
    expect(heroCta.className).toContain("tracked");
    expect(heroCta.className).toContain("transition-smooth");

    // The lockup treatment is applied to the brand name in the header.
    const lockups = screen.getAllByText(BRAND.name, { selector: ".lockup" });
    expect(lockups.length).toBeGreaterThanOrEqual(1);
  });
});
