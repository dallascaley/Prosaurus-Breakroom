import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import fs from 'fs';


export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    https: {
      key: fs.readFileSync('/home/dallas/prosaurus/key.pem'),
      cert: fs.readFileSync('/home/dallas/prosaurus/cert.pem'),
    },
    host: '0.0.0.0', // This is important for network access
    port: 5173, // You can adjust the port if needed
    //open: true,
    //middlewareMode: true,
    watch: {
      usePolling: true,
    },
    /*
    proxy: {
      '/': {
        target: 'https://10.6.0.48:5173',
        changeOrigin: true,
        secure: false,
      },
    },
    */
  },
});
