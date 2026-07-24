import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".",
  server: { port: 5173, open: true },
  resolve: {
    alias: {
      "@geo-engine/core": path.resolve(__dirname, "../engine/src"),
    },
  },
});
