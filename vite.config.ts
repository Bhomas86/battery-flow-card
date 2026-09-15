import { defineConfig } from "vite";

/**
 * Defines the build configuration for the Battery Flow Card.
 *
 * Vite bundles the TypeScript source code into a single JavaScript file
 * that can later be loaded as a Lovelace resource in Home Assistant.
 */
export default defineConfig({
  build: {
    lib: {
      entry: "src/battery-flow-card.ts",
      formats: ["es"],
      fileName: () => "battery-flow-card.js"
    },
    outDir: "dist",
    emptyOutDir: true
  }
});