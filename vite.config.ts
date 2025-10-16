import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssOKLabFunction from "@csstools/postcss-oklab-function";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  css: {
    postcss: {
      plugins: [
        postcssOKLabFunction({
          // 保留原始 oklch()/oklab()，并添加更兼容的 fallback（rgba、display-p3）
          preserve: true,
        }),
      ],
    },
  },
})
