<script setup>
if (process.client) {
  await new Promise(resolve => setTimeout(resolve, 2000))
}
const locale = process.server ? 'en-US' : 'en-GB'
</script>

<template>
  <div>
    <NuxtTime :datetime="Date.now()" second="numeric" month="long" day="numeric" :locale="locale" />
    <br>
    <NuxtTime :datetime="new Date()" second="numeric" month="long" day="numeric" />
    <br>
    <NuxtTime data-test-fixed datetime="2023-02-11T08:24:08.396Z" month="long" day="numeric" :locale="locale" />
  </div>
</template>
