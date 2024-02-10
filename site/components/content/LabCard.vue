<script lang="ts" setup>
defineProps<{
  description: string;
  title: string;
  hasPreview?: boolean;
}>();

const activeTab = ref<"code" | "preview">("code");
</script>

<template>
  <div class="space-y-10">
    <div class="space-y-4">
      <h2 class="text-3xl font-serif">{{ title }}</h2>
      <p class="text-lg">{{ description }}</p>

      <ContentSlot name="extra" />
    </div>

    <ul class="flex gap-x-4" v-show="hasPreview">
      <!-- Code tab -->
      <li>
        <button
          class="border border-black dark:border-white flex items-center gap-x-2 px-5 py-3 rounded-full"
          :class="{
            'bg-black/20 dark:bg-white/20': activeTab === 'code',
          }"
          @click="activeTab = 'code'"
        >
          <PhosphorIconCodeBlock size="20" /> Code
        </button>
      </li>

      <!-- Preview tab -->
      <li>
        <button
          class="border border-black dark:border-white flex items-center gap-x-2 px-5 py-3 rounded-full"
          :class="{
            'bg-black/20 dark:bg-white/20': activeTab === 'preview',
          }"
          @click="activeTab = 'preview'"
        >
          <PhosphorIconPlay size="20" />
          Preview
        </button>
      </li>
    </ul>

    <!-- Code panel -->
    <div
      class="dark:bg-black/40 p-5 bg-white/40 border-black rounded-2xl dark:border-white border backdrop-blur-2xl"
      v-if="activeTab === 'code'"
    >
      <ContentSlot name="code" />
    </div>

    <!-- Preview panel -->
    <div
      class="bg-black/40 dark:bg-dark/40 border-black dark:border-white border h-96 relative rounded-2xl backdrop-blur-2xl"
      v-else
    >
      <slot name="preview" />
    </div>
  </div>
</template>
