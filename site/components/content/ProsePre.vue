<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

const { copy } = useClipboard();
const copyToClipboard = async () => {
  await copy(props.code);
  push.success("Copied snippet to clipboard!");
};
</script>

<template>
  <div class="relative flex flex-col gap-y-5">
    <pre :class="$props.class"><slot /></pre>

    <button
      class="hover:bg-black/20 p-2 border border-black dark:border-white dark:hover:bg-white/20 w-fit rounded-2xl transition place-self-end"
      @click="copyToClipboard"
    >
      <PhosphorIconCopy size="20" />
    </button>
  </div>
</template>

<style lang="scss">
pre {
  @apply overflow-x-auto p-5;

  code .line {
    @apply block;
  }
}
</style>
