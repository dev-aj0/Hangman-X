import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    host: "0.0.0.0", // This enables listening on all available network interfaces
    strictPort: true, // This ensures the server only uses the specified port
  },
  plugins: [
    react(),
    // Removed componentTagger() and its import
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));