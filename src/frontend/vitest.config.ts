import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "url";

/**
 * Vitest configuration for the frontend suite.
 *
 * The `@` alias mirrors vite.config.js so tests import application modules the
 * same way the app does. The DOM environment is supplied by the frontend
 * `test` script (`vitest run --environment jsdom`), so it is not repeated here.
 */
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  test: {
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // The sandbox sets a thread range that conflicts with Vitest's defaults;
    // pinning both ends keeps the forks pool constructible here.
    poolOptions: {
      forks: {
        minForks: 1,
        maxForks: 1,
      },
    },
  },
});
