<script setup lang='ts'>
import { computed, getCurrentInstance, useNuxtApp, useHead } from '#imports'

const props = withDefaults(defineProps<{
  locale?: string
  datetime: string | number | Date
  localeMatcher?: 'best fit' | 'lookup'
  weekday?: 'long' | 'short' | 'narrow'
  era?: 'long' | 'short' | 'narrow'
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  second?: 'numeric' | '2-digit'
  timeZoneName?: 'short' | 'long' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric'
  formatMatcher?: 'best fit' | 'basic'
  hour12?: boolean
  timeZone?: string

  calendar?: string
  dayPeriod?: 'narrow' | 'short' | 'long'
  numberingSystem?: string

  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  timeStyle?: 'full' | 'long' | 'medium' | 'short'
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24'
}>(), {
  hour12: undefined
})

const el = getCurrentInstance()?.vnode.el
const renderedDate = el?.getAttribute('datetime')
const locale = el?.getAttribute('data-locale')

const nuxtApp = useNuxtApp()

const date = computed(() => {
  const date = props.datetime
  if (renderedDate && nuxtApp.isHydrating) return new Date(renderedDate)
  if (!props.datetime) return new Date()
  return new Date(date)
})

const formatter = computed(() => {
  const { locale: propsLocale, ...rest } = props
  return new Intl.DateTimeFormat(locale ?? propsLocale, rest)
})
const formattedDate = computed(() => formatter.value.format(date.value))
const isoDate = computed(() => date.value.toISOString())

const dataset: Record<string, any> = {}

if (process.server) {
  for (const prop in props) {
    if (prop !== 'datetime') {
      const propInKebabCase = prop.split(/(?=[A-Z])/).join('-')
      dataset[`data-${propInKebabCase}`] = props?.[prop as keyof typeof props]
    }
  }
  useHead({
    script: [{
      tagPosition: 'bodyClose',
      key: 'nuxt-time',
      innerHTML: `
        document.querySelectorAll('[data-n-time]').forEach(el => {
          const toCamelCase = (name, index) => {
            if (index > 0) { return name[0].toUpperCase() + name.slice(1) };
            return name;
          };

          const date = new Date(el.getAttribute('datetime'));
          const options = {};
          for (const name of el.getAttributeNames()) {
            if (name.startsWith('data-')) {
              const optionName = name.slice(5).split('-').map(toCamelCase).join('');
              options[optionName] = el.getAttribute(name);
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
