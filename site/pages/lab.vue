<script lang="ts" setup>
defineOgImageComponent("Page");

onMounted(async () => {
  const locomotive = await import("locomotive-scroll");
  new locomotive.default();
});
</script>

<template>
  <ContentDoc
    class="space-y-8 col-span-5 lg:col-span-3 py-10 w-[90%] lg:w-full mx-auto"
  />
</template>
