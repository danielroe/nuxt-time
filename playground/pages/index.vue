<script setup>
if (process.client) {
  await new Promise(resolve => setTimeout(resolve, process.test ? 0 : 500))
}
const locale = ref()
const switchLocale = () => {
  locale.value = locale.value !== 'fr' ? 'fr' : 'en-GB'
}
const date = ref('2023-02-11T08:24:08.396Z')
const changeDate = () => {
  date.value = Date.now()
}
</script>

<template>
  <div>
    <NuxtTime :locale="locale" data-testid="switchable" :datetime="date" second="numeric" month="long" day="numeric" />
    <br>
    <NuxtTime :locale="locale" data-testid="present" :datetime="new Date()" second="numeric" month="long" day="numeric" />
    <br>
    <NuxtTime :locale="locale" data-testid="fixed" datetime="2023-02-11T08:24:08.396Z" month="long" day="numeric" />
    <br>
    <button @click="switchLocale">Switch locale</button>
    <br>
    <button @click="changeDate">Update time</button>
  </div>
</template>
