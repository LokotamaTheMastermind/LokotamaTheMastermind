<script setup lang="ts">
const props = defineProps<{
  forIcon?: boolean;
  target?: string;
  to?: string;
}>();

const component = computed(() =>
  props.to ? resolveComponent("NuxtLink") : "button",
);
</script>

<template>
  <component
    class="border-black dark:border-white border rounded-full"
    :class="{
      'p-3 hover:bg-black/10': forIcon,
      'px-5 py-3 lg:px-10 lg:py-5 lg:text-lg backdrop-blur-xl flex items-center gap-x-1 lg:gap-x-2':
        !forIcon,
    }"
    :is="component"
    :target="props.target"
    :to="props.to"
  >
    <slot />
  </component>
</template>
