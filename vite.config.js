import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import less from 'less';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
