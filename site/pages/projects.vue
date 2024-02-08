<script setup lang="ts">
import projects from "~/assets/_database.json";

onMounted(async () => {
  const locomotive = await import("locomotive-scroll");
  new locomotive.default();
});
</script>

<template>
  <section
    class="row-span-3 col-span-5 w-[90%] lg:w-full mx-auto lg:col-span-3 space-y-10 py-10"
  >
    <h1 class="text-6xl font-serif">Projects</h1>

    <p class="text-lg">
      Here are some of the sidequests I'm working on (or have finished &mdash; I
      rarely finish any project 😅).
    </p>

    <div class="space-y-5">
      <template v-if="projects.length > 0">
        <Project
          v-for="project of projects"
          :is-draft="project.isDraft"
          :href="project.url"
          :key="project._id"
        >
          <template #description>{{ project.description }}</template>
          <template #name>{{ project.name }}</template>
        </Project>
      </template>

      <div
        class="flex flex-col items-center gap-y-4 border border-black dark:border-white p-10 rounded-2xl"
        v-else
      >
        <PhosphorIconGhost size="50" />
        <p>No recent projects!</p>
      </div>
    </div>
  </section>
</template>
