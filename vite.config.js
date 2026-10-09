import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  /* Not "public/" so Herd keeps serving this folder as a plain static site */
  publicDir: 'static',
});
