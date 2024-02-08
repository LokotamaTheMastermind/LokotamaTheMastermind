<script lang="ts" setup>
defineProps<{ description: string; title: string }>();
</script>

<template>
  <div class="w-full">
    <div class="relative mx-auto h-screen w-[90%] py-20">
      <h1 class="text-5xl font-extrabold">{{ title }}</h1>
      <p class="text-4xl">{{ description }}</p>

      <div
        class="absolute bottom-20 right-10 h-[200px] w-[200px] rounded-full"
        style="
          background: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.8)
          );
        "
      />
    </div>
  </div>
</template>
