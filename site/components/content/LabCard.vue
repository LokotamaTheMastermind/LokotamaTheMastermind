<script setup lang="ts">
defineProps<{ description: string; title: string; noPreview?: boolean }>();

const activeTab = ref<"code" | "preview">("code");
</script>

<template>
  <div class="space-y-10">
    <div class="space-y-4">
      <h2 class="text-3xl font-serif">{{ title }}</h2>
      <p class="text-lg">{{ description }}</p>

      <slot name="extra" />
    </div>

    <HeadlessTabGroup>
      <HeadlessTabList class="flex gap-x-4">
        <!-- Code tab -->
        <HeadlessTab
          class="border border-black dark:border-white flex items-center gap-x-2 px-5 py-3 rounded-full"
          :class="{
            'bg-black/20 dark:bg-white/20': activeTab === 'code',
          }"
          @click="activeTab = 'code'"
        >
          <PhosphorIconCodeBlock size="20" /> Code
        </HeadlessTab>

        <!-- Preview tab -->
        <HeadlessTab
          class="border border-black dark:border-white flex items-center gap-x-2 px-5 py-3 rounded-full"
          v-if="!noPreview"
          :class="{
            'bg-black/20 dark:bg-white/20': activeTab === 'preview',
          }"
          @click="activeTab = 'preview'"
        >
          <PhosphorIconPlay size="20" />
          Preview
        </HeadlessTab>
      </HeadlessTabList>

      <HeadlessTabPanels>
        <!-- Code panel -->
        <HeadlessTabPanel
          class="dark:bg-black/40 p-10 bg-white/40 border-black rounded-2xl dark:border-white border backdrop-blur-2xl"
        >
          <ContentSlot name="code" />
        </HeadlessTabPanel>

        <!-- Preview panel -->
        <HeadlessTabPanel
          class="bg-black/40 dark:bg-dark/40 border-black dark:border-white border h-96 relative rounded-2xl backdrop-blur-2xl"
        >
          <slot name="preview" />
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
  </div>
</template>
