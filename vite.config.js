import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

let httpsConfig = false;

try {
  httpsConfig = {
    key: fs.readFileSync(path.resolve(__dirname, '.cert/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '.cert/cert.pem')),
  };
} catch (err) {
  console.warn('⚠️  SSL certificates not found. Running without HTTPS.');
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    https: httpsConfig,
  },
});
