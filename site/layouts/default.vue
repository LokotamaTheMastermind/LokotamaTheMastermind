<script lang="ts" setup>
await prefetchComponents(["PhosphorIconMoon", "PhosphorIconSun"]);

const theme = useColorMode();
const themeIcon = computed(() => {
  if (theme.value === "light") return resolveComponent("PhosphorIconMoon");
  else return resolveComponent("PhosphorIconSun");
});

const enableCursorFx = ref(true);
</script>

<template>
  <NuxtLoadingIndicator color="#000000" />

  <div class="overflow-hidden relative">
    <CursorFx v-show="enableCursorFx" />

    <main class="min-h-screen grid grid-cols-5 gap-x-10">
      <!-- Links -->
      <nav
        class="col-span-5 lg:col-span-1 flex flex-col justify-center gap-y-10 items-center h-screen"
      >
        <h1 class="font-serif text-4xl">Navigation</h1>

        <hr class="border-black dark:border-white border w-1/2" />

        <div class="flex flex-col items-center gap-5">
          <Button
            to="/"
            :class="{ 'bg-black/20 dark:bg-white/20': $route.name === 'index' }"
          >
            <PhosphorIconHouseSimple class="scale-75 lg:scale-100" size="30" />
            Home
          </Button>

          <Button
            to="/lab"
            :class="{
              'bg-black/20 dark:bg-white/20': $route.name === 'lab',
            }"
          >
            <PhosphorIconFlask class="scale-75 lg:scale-100" size="30" /> Lab
          </Button>

          <Button
            to="/projects"
            :class="{
              'bg-black/20 dark:bg-white/20': $route.name === 'projects',
            }"
          >
            <PhosphorIconCode class="scale-75 lg:scale-100" size="30" />
            Projects
          </Button>
        </div>
      </nav>

      <!-- Content -->
      <slot />

      <!-- Actions & Socials -->
      <nav
        class="col-span-5 lg:col-span-1 bg-black/20 dark:bg-white/20 dark:border-white backdrop-blur-2xl flex flex-col items-center gap-y-10 justify-around rounded-t-2xl lg:rounded-l-2xl lg:translate-x-3/4 border-black delay-300 border hover:translate-x-0 py-20 lg:h-screen transition-transform"
      >
        <div class="space-y-5 text-center">
          <h1 class="font-serif text-4xl">Actions</h1>

          <div class="flex lg:flex-col items-center gap-4">
            <!-- Toggle theme -->
            <ClientOnly>
              <button
                class="p-3 rounded-full hover:bg-black/10 border-black dark:border-white border"
                type="button"
                @click="
                  $colorMode.preference =
                    $colorMode.value === 'dark' ? 'light' : 'dark'
                "
              >
                <component size="30" :is="themeIcon" />
              </button>
            </ClientOnly>

            <!-- Toggle cursor effects -->
            <button
              class="p-3 rounded-full hover:bg-black/10 border-black dark:border-white border"
              type="button"
              @click="enableCursorFx = !enableCursorFx"
            >
              <PhosphorIconSparkle size="30" />
            </button>
          </div>
        </div>

        <hr class="border-black/50 dark:border-white/50 border w-[90%]" />

        <div class="space-y-5 text-center">
          <h1 class="font-serif text-4xl">Socials</h1>

          <div class="flex lg:flex-col items-center gap-4">
            <!-- GitHub profile -->
            <NuxtLink
              class="p-3 rounded-full hover:bg-black/10 border-black dark:border-white border"
              target="_blank"
              to="https://github.com/oyedejioyewole"
            >
              <PhosphorIconGithubLogo size="30" />
            </NuxtLink>

            <!-- Instagram -->
            <NuxtLink
              class="p-3 rounded-full hover:bg-black/10 border-black dark:border-white border"
              target="_blank"
              to="https://instagram.com/oyedeji.oyewole"
            >
              <PhosphorIconInstagramLogo size="30" />
            </NuxtLink>

            <!-- Send me a message -->
            <NuxtLink
              class="p-3 rounded-full hover:bg-black/10 border-black dark:border-white border"
              target="_blank"
              to="mailto://oyedejioyewolemaxwell@proton.me"
            >
              <PhosphorIconEnvelopeSimple size="30" />
            </NuxtLink>
          </div>
        </div>
      </nav>
    </main>
  </div>
</template>
