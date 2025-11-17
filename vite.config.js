import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // IMPORTANT: required for GitHub Pages
  base: "/soulrain-studio/",
});