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
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        cgcs2000: path.resolve(__dirname, "cgcs2000.html"),
        webmercator: path.resolve(__dirname, "webmercator.html"),
      },
    },
  },
});
