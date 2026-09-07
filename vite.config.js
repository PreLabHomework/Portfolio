import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Portfolio/",
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        cv: resolve(__dirname, "cv.html")
      }
    }
  }
});
