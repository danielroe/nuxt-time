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

    nuxt.options.app.head.script = nuxt.options.app.head.script || []
    nuxt.options.app.head.script.push({
      tagPosition: 'bodyClose',
      innerHTML: `
        document.querySelectorAll('[data-n-time]').forEach(el => {
          const date = new Date(parseInt(el.getAttribute('datetime')));
          const options = Object.fromEntries(el.getAttributeNames().map(name => [name, el.getAttribute(name)]));

          const formatter = new Intl.DateTimeFormat(options.locale, options);
          el.textContent = formatter.format(date)
        })
      `.replace(/\s+/g, ' ')
    })

    // Add <NuxtTime> component
    addComponentsDir({ path: join(runtimeDir, 'components') })
  },
})
