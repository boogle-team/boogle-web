import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 단색 아이콘 (line icon) — 모든 색을 currentColor로 치환해서 className으로 색 조절
    svgr({
      include: "**/icons/**/*.svg?react",
      svgrOptions: {
        icon: true,
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          plugins: [
            {
              name: "convertColors",
              params: { currentColor: true },
            },
          ],
        },
      },
    }),
    // 다색 아이콘/로고/일러스트 — 원본 색 그대로 유지
    svgr({
      include: "**/illustrations/**/*.svg?react",
      svgrOptions: {
        icon: true,
      },
    }),
    react(),
    tailwindcss(),
  ],
});
