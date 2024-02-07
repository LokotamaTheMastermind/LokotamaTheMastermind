<script lang="ts" setup>
import { projects } from "~/assets/_portfolio.json";

onMounted(async () => {
  const locomotive = await import("locomotive-scroll");
  new locomotive.default();
});
</script>

<template>
  <section
    class="col-span-5 lg:col-span-3 flex flex-col justify-center gap-y-20 w-[90%] mx-auto lg:w-full py-10"
  >
    <ContentDoc class="space-y-8" />

    <div class="space-y-10">
      <h2 class="text-3xl font-serif">Featured</h2>

      <Project
        v-for="project of projects.slice(0, 3)"
        v-if="projects.length > 0"
        :as="project.repository ? 'a' : 'div'"
        :is-draft="project.isDraft"
        :href="project.repository ? project.repository : null"
        :key="project._id"
      >
        <template #description>{{ project.description }}</template>
        <template #name>{{ project.name }}</template>
      </Project>
    </div>
  </section>
</template>
