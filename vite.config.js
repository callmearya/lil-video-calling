// vite.config.js
export default {
  build: {
    rollupOptions: {
      external: ['main.js'],
      external: ['style.css']
    }
  }
}
