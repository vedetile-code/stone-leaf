import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BRAND, OUTREACH_TEMPLATES } from "@/lib/brand";
import { renderApp } from "@/test/render-app";

const writeText = vi.fn<(text: string) => Promise<void>>();

beforeEach(() => {
  writeText.mockReset();
  writeText.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

/** Matches an element whose normalized text equals the expected copy. */
function textMatcher(expected: string) {
  const normalized = expected.replace(/\s+/g, " ").trim();
  return (_content: string, element: Element | null) =>
    element?.textContent?.replace(/\s+/g, " ").trim() === normalized;
}

describe("designers page", () => {
  it("positions the studio as an open trade welcome", async () => {
    renderApp("/designers");

    expect(
      await screen.findByRole("heading", {
        name: /A Studio for Designers & Architects/i,
      }),
    ).toBeInTheDocument();
    const hero = screen.getByTestId("designers.hero_section");
    expect(within(hero).getByText(BRAND.appointmentLine)).toBeInTheDocument();
  });

  it("renders both outreach templates with their copy-ready bodies", async () => {
    renderApp("/designers");

    await screen.findByTestId("designers.templates_section");
    for (const template of OUTREACH_TEMPLATES) {
      const card = screen.getByTestId(`designers.template_card.${template.id}`);
      expect(within(card).getByText(template.label)).toBeInTheDocument();
      expect(
        within(card).getAllByText(textMatcher(template.body)).length,
      ).toBeGreaterThanOrEqual(1);
      if (template.subject) {
        expect(within(card).getByText(template.subject)).toBeInTheDocument();
      }
    }
  });

  it("copies the WhatsApp template body to the clipboard", async () => {
    const user = userEvent.setup();
    renderApp("/designers");

    const template = OUTREACH_TEMPLATES.find((t) => t.id === "whatsapp")!;
    await screen.findByTestId("designers.template_card.whatsapp");
    // userEvent installs its own clipboard stub, so spy after setup.
    vi.spyOn(navigator.clipboard, "writeText").mockImplementation(writeText);
    await user.click(screen.getByTestId("designers.copy_button.whatsapp"));

    expect(writeText).toHaveBeenCalledWith(template.body);
    expect(
      screen.getByTestId("designers.copy_button.whatsapp"),
    ).toHaveTextContent("Copied");
  });

  it("copies the email template with its subject line", async () => {
    const user = userEvent.setup();
    renderApp("/designers");

    const template = OUTREACH_TEMPLATES.find((t) => t.id === "email")!;
    await screen.findByTestId("designers.template_card.email");
    vi.spyOn(navigator.clipboard, "writeText").mockImplementation(writeText);
    await user.click(screen.getByTestId("designers.copy_button.email"));

    expect(writeText).toHaveBeenCalledWith(
      `Subject: ${template.subject}\n\n${template.body}`,
    );
  });

  it("offers a direct email link to the studio", async () => {
    renderApp("/designers");

    const link = await screen.findByTestId("designers.plan_visit_button");
    expect(link).toHaveAttribute("href", `mailto:${BRAND.email}`);
  });
});
