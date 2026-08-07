import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Google 로고는 luminance mask와 브랜드 색상을 그대로 유지한다.
    svgr({
      include: '**/icons/googleLogo.svg?react',
      svgrOptions: {
        icon: true,
      },
    }),

    // Preserve the original colors of multicolor notification icons.
    svgr({
      include: '**/icons/notificationPageIcons/**/*.svg?react',
      svgrOptions: {
        icon: true,
      },
    }),

    // 단색 아이콘 (line icon)
    // 모든 색을 currentColor로 치환해서 className으로 색 조절 가능
    svgr({
      include: '**/icons/**/*.svg?react',
      exclude: [
        '**/icons/googleLogo.svg?react',
        '**/icons/notificationPageIcons/**/*.svg?react',
      ],
      svgrOptions: {
        icon: true,
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors',
              params: { currentColor: true },
            },
          ],
        },
      },
    }),

    // 다색 아이콘 / 로고 / 일러스트
    // 원본 색 유지
    svgr({
      include: '**/illustrations/**/*.svg?react',
      svgrOptions: {
        icon: true,
      },
    }),

    react(),

    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'serviceWorker.ts',

      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png'],

      manifest: {
        name: 'Boogle',
        short_name: 'Boogle',
        description: 'Boolge service',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],

  optimizeDeps: {
    include: ['lottie-react'],
  },

  resolve: {
    // lottie-react는 exports 필드가 없고 browser 필드가 UMD를 가리킴.
    // browser보다 module(ESM)을 먼저 찾도록 우선순위 지정.
    mainFields: ['module', 'jsnext:main', 'jsnext', 'browser', 'main'],

    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      react: fileURLToPath(new URL('./node_modules/react', import.meta.url)),
      'react-dom': fileURLToPath(
        new URL('./node_modules/react-dom', import.meta.url),
      ),
    },
  },
});
