import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // ✅ Make sure this is imported

export default defineConfig({
  plugins: [
    react(),
    svgr(), // ✅ Put this INSIDE the plugins array
  ],
});


