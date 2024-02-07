<script lang="ts" setup>
defineProps<{ as: string; isDraft: boolean }>();
</script>

<template>
  <component
    class="bg-black/20 border border-black dark:border-white dark:bg-white/20 p-10 rounded-2xl space-y-4 block backdrop-blur-2xl"
    target="_blank"
    :is="as"
  >
    <h3
      class="font-serif text-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-10"
    >
      <!-- Project name -->
      <slot name="name" />

      <!-- Project status -->
      <span
        class="order-first lg:order-last inline-flex bg-black/30 dark:bg-white/30 px-3 py-1 text-lg font-sans rounded-full items-center gap-x-2 w-fit"
      >
        <PhosphorIconCircle :weight="isDraft ? 'regular' : 'fill'" size="20" />
        {{ isDraft ? "In progress" : "Live" }}
      </span>
    </h3>

    <!-- Project description -->
    <p class="text-xl"><slot name="description" /></p>
  </component>
</template>
