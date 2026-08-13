import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      host: true,
      port: parseInt(env.VITE_PORT || '4002')
    },
    preview: {
      port: parseInt(env.VITE_PORT || '4002')
    },
    base: '/'
  };
});
