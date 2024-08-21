import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: env.NODE_ENV === 'production' ? '/letter-reader/' : '/',
    define: {
      'process.env': env
    }
  };
});
