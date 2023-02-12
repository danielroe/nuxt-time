<script setup>
if (process.client) {
  await new Promise(resolve => setTimeout(resolve, 2000))
}
const locale = ref(process.server ? 'en-US' : 'en-GB')
const switchLocale = () => {
  locale.value = locale.value === 'en-GB' ? 'en-US' : 'en-GB'
}
const date = ref(Date.now())
const changeDate = () => {
  date.value = Date.now()
}
</script>

<template>
  <div>
    <NuxtTime :locale="locale" :datetime="date" second="numeric" month="long" day="numeric" />
    <br>
    <NuxtTime :locale="locale" :datetime="new Date()" second="numeric" month="long" day="numeric" />
    <br>
    <NuxtTime :locale="locale" data-test-fixed datetime="2023-02-11T08:24:08.396Z" month="long" day="numeric" />
    <br>
    <button @click="switchLocale">Switch Lang ({{ locale }})</button>
    <br>
    <button @click="changeDate">Change Date.now()</button>
  </div>
</template>
