/**
 * Vite configuration for Evangadi Forum frontend
 * Production Summary: Configures Vite for fast development and production builds with React and API proxying.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
