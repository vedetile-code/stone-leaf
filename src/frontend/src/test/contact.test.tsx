import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ValidationError } from "@/backend";
import type { SubmitResult, ViewingRequestInput } from "@/backend";
import { renderApp } from "@/test/render-app";

/**
 * The contact page's only backend seam is `useSubmitViewingRequest`. Mocking it
 * lets us drive the accepted success and validation-error branches without a
 * live canister, while still exercising the page's own form logic and copy.
 */
const mutate =
  vi.fn<
    (
      input: ViewingRequestInput,
      options?: { onSuccess?: (result: SubmitResult) => void },
    ) => void
  >();

vi.mock("@/hooks/useViewingRequests", () => ({
  useSubmitViewingRequest: () => ({
    mutate,
    isPending: false,
    isError: false,
  }),
}));

const VALID = {
  name: "Alexandra Whitfield",
  email: "alexandra@studio.com",
  phone: "+1 (441) 555 0100",
  preferredDate: "2026-10-01",
  message: "A double-height living room facing the water.",
};

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  values: Partial<typeof VALID> = {},
) {
  const merged = { ...VALID, ...values };
  await user.type(screen.getByTestId("contact.name_input"), merged.name);
  await user.type(screen.getByTestId("contact.email_input"), merged.email);
  await user.type(screen.getByTestId("contact.phone_input"), merged.phone);
  await user.type(
    screen.getByTestId("contact.preferredDate_input"),
    merged.preferredDate,
  );
  await user.type(
    screen.getByTestId("contact.message_textarea"),
    merged.message,
  );
}

beforeEach(() => {
  mutate.mockReset();
});

describe("contact page", () => {
  it("renders the simple Get in Touch enquiry form", async () => {
    renderApp("/contact");

    expect(
      await screen.findByRole("heading", { name: "Plan a Visit" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("contact.form")).toBeInTheDocument();
    expect(screen.getByTestId("contact.submit_button")).toHaveTextContent(
      "Send Note",
    );
  });

  it("blocks submission and reports every missing field", async () => {
    const user = userEvent.setup();
    renderApp("/contact");

    await screen.findByTestId("contact.form");
    await user.click(screen.getByTestId("contact.submit_button"));

    expect(mutate).not.toHaveBeenCalled();
    expect(screen.getByTestId("contact.name_error")).toHaveTextContent(
      "Please tell us your name.",
    );
    expect(screen.getByTestId("contact.email_error")).toHaveTextContent(
      "An email address is required.",
    );
    expect(screen.getByTestId("contact.phone_error")).toHaveTextContent(
      "A contact number is required.",
    );
    expect(screen.getByTestId("contact.preferredDate_error")).toHaveTextContent(
      "Please suggest a preferred date.",
    );
    expect(screen.getByTestId("contact.message_error")).toHaveTextContent(
      "A short note about your project is required.",
    );
  });

  it("clears a field error once the visitor corrects it", async () => {
    const user = userEvent.setup();
    renderApp("/contact");

    await screen.findByTestId("contact.form");
    await user.click(screen.getByTestId("contact.submit_button"));
    expect(screen.getByTestId("contact.name_error")).toBeInTheDocument();

    await user.type(screen.getByTestId("contact.name_input"), "A");
    expect(screen.queryByTestId("contact.name_error")).not.toBeInTheDocument();
  });

  it("submits the trimmed values and confirms receipt", async () => {
    const user = userEvent.setup();
    renderApp("/contact");

    await screen.findByTestId("contact.form");
    await fillForm(user);
    await user.click(screen.getByTestId("contact.submit_button"));

    expect(mutate).toHaveBeenCalledTimes(1);
    expect(mutate.mock.calls[0][0]).toEqual(VALID);

    const options = mutate.mock.calls[0][1];
    options?.onSuccess?.({
      __kind__: "ok",
      ok: {
        id: 1n,
        name: VALID.name,
        email: VALID.email,
        phone: VALID.phone,
        preferredDate: VALID.preferredDate,
        message: VALID.message,
        submittedAt: 0n,
      },
    });

    const success = await screen.findByTestId("contact.success_state");
    expect(
      within(success).getByRole("heading", { name: "Thank You" }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("contact.form")).not.toBeInTheDocument();
  });

  it("maps backend validation errors back onto their fields", async () => {
    const user = userEvent.setup();
    renderApp("/contact");

    await screen.findByTestId("contact.form");
    await fillForm(user);
    await user.click(screen.getByTestId("contact.submit_button"));

    const options = mutate.mock.calls[0][1];
    options?.onSuccess?.({
      __kind__: "err",
      err: [ValidationError.emailInvalid, ValidationError.phoneRequired],
    });

    await waitFor(() => {
      expect(screen.getByTestId("contact.email_error")).toHaveTextContent(
        "That email address does not look right.",
      );
    });
    expect(screen.getByTestId("contact.phone_error")).toHaveTextContent(
      "A contact number is required.",
    );
    expect(
      screen.queryByTestId("contact.success_state"),
    ).not.toBeInTheDocument();
  });

  it("lets the visitor submit another request after success", async () => {
    const user = userEvent.setup();
    renderApp("/contact");

    await screen.findByTestId("contact.form");
    await fillForm(user);
    await user.click(screen.getByTestId("contact.submit_button"));
    mutate.mock.calls[0][1]?.onSuccess?.({
      __kind__: "ok",
      ok: {
        id: 1n,
        name: VALID.name,
        email: VALID.email,
        phone: VALID.phone,
        preferredDate: VALID.preferredDate,
        message: VALID.message,
        submittedAt: 0n,
      },
    });

    await screen.findByTestId("contact.success_state");
    await user.click(screen.getByTestId("contact.submit_another_button"));

    expect(await screen.findByTestId("contact.form")).toBeInTheDocument();
    expect(screen.getByTestId("contact.name_input")).toHaveValue("");
  });
});
