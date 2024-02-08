<script lang="ts" setup>
useHead({
  htmlAttrs: {
    lang: "en",
  },
  titleTemplate: "%s · Oyedeji Oyewole",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url("node_modules/locomotive-scroll/dist/locomotive-scroll.css");

body {
  @apply bg-black/10 dark:bg-black/90 dark:text-white transition selection:dark:bg-white/20 selection:bg-black/20;
}
</style>
