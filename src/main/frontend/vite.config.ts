import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // I'm not sure the css: does anything, but I get this error in index.css: Unknown at rule @tailwindcss(unknownAtRules)
  // So I added this line to try to fix it. But it didn't work.
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      host: "localhost", // Browser should connect to localhost (host machine)
      port: 5173, // WebSocket port
      protocol: "ws", // Use ws (not wss) for development
    },
    proxy: {
      "/api": {
        target: "http://backend:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
