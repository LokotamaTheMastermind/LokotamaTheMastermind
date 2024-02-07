<script setup lang="ts">
const props = defineProps<{
  forIcon?: boolean;
  target?: string;
  to?: string;
}>();

const component = computed(() => {
  if (props.to) return resolveComponent("NuxtLink");
  else return "button";
});
</script>

<template>
  <component
    class="px-5 py-3 lg:px-10 lg:py-5 lg:text-lg rounded-full backdrop-blur-xl border-black dark:border-white border flex items-center gap-x-1 lg:gap-x-2"
    :is="component"
    :target="props.target"
    :to="props.to"
  >
    <slot />
  </component>
</template>
