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
    <NuxtTime :datetime="Date.now()" second="numeric" month="long" day="numeric" />
  </div>
</template>
