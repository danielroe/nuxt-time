import { fileURLToPath } from 'node:url'
import { defineNuxtModule, addComponentsDir } from '@nuxt/kit'
import { join } from 'pathe'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    configKey: 'time',
    name: 'nuxt-time',
  },
  async setup (_options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Add <NuxtTime> component
    addComponentsDir({ path: join(runtimeDir, 'components') })
  },
})
