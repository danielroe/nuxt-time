export default defineNuxtConfig({
  modules: ['nuxt-time'],
  vite: {
    define: {
      'process.test': 'true'
    },
  }
})
