<script setup lang='ts'>
import { computed, getCurrentInstance, useHead } from '#imports'

const props = defineProps<{
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
}>()

const datetime = getCurrentInstance()?.vnode.el?.getAttribute('datetime')
const locale = getCurrentInstance()?.vnode.el?.getAttribute('locale')

const formatter = new Intl.DateTimeFormat(locale ?? props.locale, props)
const formattedDate = computed(() => formatter.format(datetime ?? props.datetime ? new Date(parseInt(datetime ?? props.datetime)) : new Date()))

const isServer = process.server

if (process.server) {
  useHead({
    script: [{
      tagPosition: 'bodyClose',
      innerHTML: `
        document.querySelectorAll('[data-n-time]').forEach(el => {
          const date = new Date(parseInt(el.getAttribute('datetime')));
          const options = Object.fromEntries(el.getAttributeNames().map(name => [name, el.getAttribute(name)]));

          const formatter = new Intl.DateTimeFormat(options.locale, options);
          el.textContent = formatter.format(date)
        })
      `.replace(/\s+/g, ' ')
    }]
  })
}
</script>

<template>
  <time data-n-time v-bind="isServer ? props : {}" :datetime="props.datetime?.toString()" >{{ formattedDate }}</time>
</template>
