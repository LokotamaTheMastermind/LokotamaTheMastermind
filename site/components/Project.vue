<script lang="ts" setup>
defineProps<{ isDraft: boolean; href?: string }>();
</script>

<template>
  <div
    class="bg-black/20 border border-black dark:border-white dark:bg-white/20 p-5 rounded-2xl space-y-4 block backdrop-blur-2xl"
    target="_blank"
  >
    <h3
      class="font-serif text-xl flex flex-col lg:flex-row lg:items-center justify-between gap-10"
    >
      <!-- Project name -->
      <slot name="name" />

      <!-- Project status -->
      <component
        class="order-first lg:order-last inline-flex bg-black/30 dark:bg-white/30 px-3 py-1 text-lg font-sans rounded-full items-center gap-x-2 w-fit"
        target="_blank"
        :href="href"
        :is="href ? 'a' : 'span'"
      >
        <PhosphorIconCircle
          :weight="isDraft ? 'regular' : 'fill'"
          size="20"
          v-if="!href"
        />
        <PhosphorIconLinkSimple size="20" v-else />
        {{ isDraft ? "In progress" : "Live" }}
      </component>
    </h3>

    <!-- Project description -->
    <p class="text-lg"><slot name="description" /></p>
  </div>
</template>
