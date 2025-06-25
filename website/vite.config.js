import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/My-Portfolio/', // change this to your repo name
  plugins: [react()]
});
