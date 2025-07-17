import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true, // optional, opens browser
    port: 3000, // or any port you prefer
  },
  build: {
    outDir: "dist",
  },
});
