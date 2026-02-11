import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  // IMPORTANT: must match repo name exactly
  base: "./",

  build: {
    target: "es2018",
    minify: "terser",
    sourcemap: false,

    // Optimize chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          vendor: ["axios"],
          bootstrap: ["bootstrap", "mdbootstrap"],
          icons: ["@fortawesome/fontawesome-free"],
        },
        // Optimize chunk naming
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/media/[name]-[hash].[ext]`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/img/[name]-[hash].[ext]`;
          }
          if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].[ext]`;
          }
          return `assets/${ext}/[name]-[hash].[ext]`;
        },
      },
    },

    cssCodeSplit: true,
    assetsInlineLimit: 4096,

    // Enable compression
    reportCompressedSize: true,

    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },

  // Development server optimizations
  server: {
    hmr: true,
    port: 3000,
  },

  // Preview server optimizations  
  preview: {
    port: 4173,
  },
});
