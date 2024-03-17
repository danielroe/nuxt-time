import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environmentOptions: {
      nuxt: {
        overrides: {
          modules: ['nuxt-time']
        }
      }
    },
    coverage: {
      reporter: ['text', 'json'],
    },
  },
})
