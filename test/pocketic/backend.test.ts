import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

/**
 * This lane speaks the raw agent-js Candid shapes from `declarations/`, not the
 * generated `Backend` wrapper in `src/frontend/src/backend.ts`. The wrapper adds
 * a `__kind__` discriminator to variants; a raw `@dfinity/agent` decode does
 * not. A `SubmitResult` therefore arrives as `{ ok: ViewingRequest }` or
 * `{ err: Array<ValidationError> }`, and the assertions below read those keys
 * directly. Asserting `result.__kind__` here would compare against `undefined`
 * and fail against a canister that is behaving correctly.
 */
const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  await pic?.tearDown();
});

it("answers a public read instead of trapping", async () => {
  // `getApiDoc` is a public query with no authorization gate, so it is the
  // cheapest proof that the installed canister is live and answering.
  await expect(actor.getApiDoc()).resolves.toEqual(expect.any(String));
});

it("round-trips a viewing request through the real canister", async () => {
  const result = await actor.submitViewingRequest({
    name: "Alexandra Whitfield",
    email: "alexandra@studio.com",
    phone: "+1 (441) 000 0000",
    preferredDate: "2026-10-01",
    message: "A double-height living room facing the ocean.",
  });

  expect(result).toHaveProperty("ok");
  if (!("ok" in result)) {
    throw new Error("expected an accepted viewing request");
  }
  expect(result.ok).toMatchObject({
    name: "Alexandra Whitfield",
    email: "alexandra@studio.com",
    phone: "+1 (441) 000 0000",
    preferredDate: "2026-10-01",
    message: "A double-height living room facing the ocean.",
  });
  expect(typeof result.ok.id).toBe("bigint");
  expect(typeof result.ok.submittedAt).toBe("bigint");
});

it("rejects a request with missing fields and reports each one", async () => {
  const result = await actor.submitViewingRequest({
    name: "   ",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  expect(result).toHaveProperty("err");
  if (!("err" in result)) {
    throw new Error("expected validation errors");
  }
  const kinds = result.err.map((variant) => Object.keys(variant)[0]);
  expect(kinds).toEqual(
    expect.arrayContaining([
      "nameRequired",
      "emailRequired",
      "phoneRequired",
      "preferredDateRequired",
      "messageRequired",
    ]),
  );
});

it("rejects a malformed email address", async () => {
  const result = await actor.submitViewingRequest({
    name: "Alexandra Whitfield",
    email: "not-an-email",
    phone: "+1 (441) 000 0000",
    preferredDate: "2026-10-01",
    message: "A double-height living room facing the ocean.",
  });

  expect(result).toHaveProperty("err");
  if (!("err" in result)) {
    throw new Error("expected a validation error");
  }
  expect(result.err.map((variant) => Object.keys(variant)[0])).toContain(
    "emailInvalid",
  );
});

it("does not expose submitted requests to an anonymous caller", async () => {
  const guest = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  await expect(guest.listViewingRequests()).rejects.toThrow();
});
