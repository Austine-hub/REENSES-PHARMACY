import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),

    // 🔍 Bundle visualizer
    visualizer({
      filename: "bundle-analysis.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),

    // 🖼 Image compression for PNG/JPG
    viteImagemin({
      pngquant: {
        quality: [0.65, 0.8],
      },
      mozjpeg: {
        quality: 70,
      },
    }),
  ],

  server: {
    open: true,
  },

  build: {
    // 📦 Core optimization: Split libraries into separate chunks
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router-dom"],
          "ui-vendor": [
            "lucide-react",
            "@radix-ui/react-slot",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
          ],
        },
      },
    },

    // Optional: prevents 500kb warnings
    chunkSizeWarningLimit: 1200,
  },
});
