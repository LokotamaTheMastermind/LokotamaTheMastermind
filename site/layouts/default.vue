<script lang="ts" setup>
await prefetchComponents(["PhosphorIconMoon", "PhosphorIconSun"]);

const theme = useColorMode();
const themeIcon = computed(() => {
  if (theme.value === "light") return resolveComponent("PhosphorIconMoon");
  else return resolveComponent("PhosphorIconSun");
});

const { width: browserWidth } = useWindowSize();

const enableCursorFx = ref(true);
const showCursorFx = computed(() =>
  browserWidth.value > 1024 && enableCursorFx.value ? true : false,
);

const areTooltipsDisabled = computed(() =>
  browserWidth.value < 1024 ? true : false,
);
</script>

<template>
  <ClientOnly>
    <NuxtLoadingIndicator
      :color="$colorMode.value === 'light' ? '#000000' : '#ffffff'"
    />
  </ClientOnly>

  <div class="overflow-hidden relative">
    <CursorFx v-show="showCursorFx" />

    <main class="min-h-screen grid grid-cols-5 gap-x-10">
      <!-- Links -->
      <nav
        class="col-span-5 lg:col-span-1 flex flex-col justify-center gap-y-10 items-center h-screen"
      >
        <h1 class="font-serif text-4xl">Navigation</h1>

        <hr class="border-black dark:border-white border w-1/2" />

        <ul class="flex flex-col items-center gap-5">
          <!-- Home -->
          <li>
            <Button
              to="/"
              :class="{
                'bg-black/20 dark:bg-white/20': $route.name === 'index',
              }"
            >
              <PhosphorIconHouseSimple
                class="scale-75 lg:scale-100"
                size="30"
              />
              Home
            </Button>
          </li>

          <!-- Lab -->
          <li>
            <Button
              to="/lab"
              :class="{
                'bg-black/20 dark:bg-white/20': $route.name === 'lab',
              }"
            >
              <PhosphorIconFlask class="scale-75 lg:scale-100" size="30" /> Lab
            </Button>
          </li>

          <!-- Projects -->
          <li>
            <Button
              to="/projects"
              :class="{
                'bg-black/20 dark:bg-white/20': $route.name === 'projects',
              }"
            >
              <PhosphorIconCode class="scale-75 lg:scale-100" size="30" />
              Projects
            </Button>
          </li>
        </ul>
      </nav>

      <!-- Content -->
      <slot />

      <!-- Actions & Socials -->
      <nav
        class="col-span-5 lg:col-span-1 bg-black/20 dark:bg-white/20 dark:border-white backdrop-blur-2xl flex flex-col items-center gap-y-10 justify-around rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl lg:translate-x-3/4 border-black delay-300 border hover:translate-x-0 py-20 lg:h-screen transition-transform"
      >
        <div class="space-y-5 text-center">
          <h1 class="font-serif text-4xl">Actions</h1>

          <ul class="flex justify-center lg:flex-col items-center gap-4">
            <!-- Toggle theme -->
            <li>
              <ClientOnly>
                <Button
                  type="button"
                  v-tooltip.left="{
                    content: 'Change site theme',
                    disabled: areTooltipsDisabled,
                  }"
                  :for-icon="true"
                  @click="
                    $colorMode.preference =
                      $colorMode.value === 'dark' ? 'light' : 'dark'
                  "
                >
                  <span class="sr-only"
                    >Toggle
                    {{ $colorMode.value === "dark" ? "light" : "dark" }}
                    mode</span
                  >
                  <component size="30" :is="themeIcon" />
                </Button>
              </ClientOnly>
            </li>

            <!-- Toggle cursor effects -->
            <li>
              <Button
                class="hidden lg:block"
                type="button"
                v-tooltip.left="{
                  content: 'Disable cursor effect',
                  disabled: areTooltipsDisabled,
                }"
                :for-icon="true"
                @click="enableCursorFx = !enableCursorFx"
              >
                <span class="sr-only">Disable cursor effect</span>
                <PhosphorIconSparkle size="30" />
              </Button>
            </li>
          </ul>
        </div>

        <hr class="border-black/50 dark:border-white/50 border w-[90%]" />

        <div class="space-y-5 text-center">
          <h1 class="font-serif text-4xl">Socials</h1>

          <ul class="flex lg:flex-col items-center gap-4">
            <!-- GitHub profile -->
            <li class="contents">
              <Button
                aria-label="My GitHub profile (open in a new window)"
                target="_blank"
                to="https://github.com/oyedejioyewole"
                v-tooltip.left="{
                  content: 'My GitHub',
                  disabled: areTooltipsDisabled,
                }"
                :for-icon="true"
              >
                <span class="sr-only">My GitHub</span>
                <PhosphorIconGithubLogo size="30" />
              </Button>
            </li>

            <!-- Instagram -->
            <li class="contents">
              <Button
                aria-label="My Instagram account (open in a new window)"
                target="_blank"
                to="https://instagram.com/oyedeji.oyewole"
                v-tooltip.left="{
                  content: 'My Instagram',
                  disabled: areTooltipsDisabled,
                }"
                :for-icon="true"
              >
                <span class="sr-only">My Instagram</span>
                <PhosphorIconInstagramLogo size="30" />
              </Button>
            </li>

            <!-- Send me a message -->
            <li class="contents">
              <Button
                aria-label="Send me a message (open in your default email client)"
                target="_blank"
                to="mailto://oyedejioyewolemaxwell@proton.me"
                v-tooltip.left="{
                  content: 'Send me a message',
                  disabled: areTooltipsDisabled,
                }"
                :for-icon="true"
              >
                <span class="sr-only">Send me a message</span>
                <PhosphorIconEnvelopeSimple size="30" />
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </main>
  </div>
</template>

<style lang="scss">
.v-popper--theme-tooltip {
  .v-popper__inner {
    @apply bg-black/30 backdrop-blur-lg dark:bg-white/30 text-black dark:text-white border-black dark:border-white border;
  }

  .v-popper__arrow-inner,
  .v-popper__arrow-outer {
    @apply invisible;
  }
}
</style>
