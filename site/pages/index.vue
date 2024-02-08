<script lang="ts" setup>
import projects from "~/assets/_database.json";

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

      <div class="space-y-5">
        <template v-if="projects.length > 0">
          <Project
            v-for="project of projects"
            :as="project.repository ? 'a' : 'div'"
            :is-draft="project.isDraft"
            :href="project.repository ? project.repository : null"
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
          <p>No featured projects!</p>
        </div>
      </div>
    </div>
  </section>
</template>
