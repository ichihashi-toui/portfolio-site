import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ★ ここを追加（前後にスラッシュが必要です）
  base: '/portfolio-site/', 
  plugins: [react()],
})