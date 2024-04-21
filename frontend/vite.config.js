import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // other Vite configurations...
  server: {
    proxy: {
      "/api": {
        target: "https://travelix-backend-v2.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Optional if your backend API does not have an `/api` prefix
      },
    },
  },
});

// vite.config.js
