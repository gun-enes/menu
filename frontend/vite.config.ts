import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allows access from the network
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // Ensures hot reload works in Docker
    }
  }
});
