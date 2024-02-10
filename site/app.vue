<script lang="ts" setup>
import "locomotive-scroll/locomotive-scroll.css";

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
body {
  @apply bg-black/10 dark:bg-black/90 dark:text-white transition dark:selection:bg-white/20 selection:bg-black/20;
}
</style>
