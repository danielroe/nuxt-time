<script setup lang='ts'>
import { computed, getCurrentInstance, useHead } from '#imports'

interface NuxtTimeProps extends Intl.DateTimeFormatOptions {
  locale?: string;
  datetime: string | number | Date
}

const props = defineProps<NuxtTimeProps>()

const renderedDate = getCurrentInstance()?.vnode.el?.getAttribute('datetime')
const locale = getCurrentInstance()?.vnode.el?.getAttribute('data-locale')

const date = computed(() => {
  if (renderedDate) return new Date(renderedDate)
  if (!props.datetime) return new Date()
  return new Date(props.datetime)
})

const formattedDate = computed(() => new Intl.DateTimeFormat(locale ?? props.locale, props).format(date.value))
const isoDate = computed(() => date.value.toISOString())

const dataset = process.server ? Object.fromEntries(Object.entries(props).map(([k, v]) => [`data-${k}`, v])) : {}

if (process.server) {
  useHead({
    script: [{
      tagPosition: 'bodyClose',
      key: 'nuxt-time',
      innerHTML: `
        document.querySelectorAll('[data-n-time]').forEach(el => {
          const date = new Date(el.getAttribute('datetime'));
          const options = {};
          for (const name of el.getAttributeNames()) {
            if (name.startsWith('data-')) {
              options[name.slice(5)] = el.getAttribute(name);
            }
          }

          const formatter = new Intl.DateTimeFormat(options.locale, options);
          el.textContent = formatter.format(date)
        })
      `.replace(/\s+/g, ' ')
    }]
  })
}
</script>

<template>
  <time data-n-time v-bind="dataset" :datetime="isoDate" >{{ formattedDate }}</time>
</template>
