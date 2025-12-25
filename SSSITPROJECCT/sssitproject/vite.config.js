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
  base: "/SSSITPROJECCT/",

  build: {
    target: "es2018",
    minify: "esbuild",
    sourcemap: false,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["axios"],
        },
      },
    },

    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
});
