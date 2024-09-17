import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'time',
    name: 'nuxt-time',
    compatibility: {
      nuxt: '>=3.12.0',
    },
  },
  async setup() {
    const resolver = createResolver(import.meta.url)

    // Add <NuxtTime> component
    addComponentsDir({ path: resolver.resolve('./runtime/components') })
  },
})
