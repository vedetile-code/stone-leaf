import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/react";
import { afterEach } from "vitest";

// Generated components mark stable hooks with `data-ocid`, not `data-testid`.
configure({ testIdAttribute: "data-ocid" });

afterEach(() => {
  cleanup();
});
