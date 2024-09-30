import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This makes the server listen on all network interfaces
    port: 443, // Ensure this is set to the desired port
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "cert/server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "cert/server.crt")),
    },
    // Optionally, configure port and other options
  },
});
