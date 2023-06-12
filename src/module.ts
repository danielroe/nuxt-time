import { fileURLToPath } from 'url'
import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'time',
    name: 'nuxt-time',
  },
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Add <NuxtTime> component
    addComponentsDir({ path: resolver.resolve('./runtime/components') })
  },
})
