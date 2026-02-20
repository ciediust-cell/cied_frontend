import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "node:path"

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src")
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths()
  ],
  server: {
    host: true,
    port: 3000
  }
})
