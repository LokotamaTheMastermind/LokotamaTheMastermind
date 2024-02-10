<script lang="ts" setup>
import { pastelTheme, type NotivueTheme } from "notivue";
import "notivue/animations.css";
import "notivue/notifications.css";

type ColorTheme = "dark" | "light";

defineOgImageComponent("Page");

const colorTheme = useColorMode();
onMounted(async () => {
  const locomotive = await import("locomotive-scroll");
  new locomotive.default();

  useToggleNotivueTheme(colorTheme.value as ColorTheme);
});

watch(colorTheme, (_new) => useToggleNotivueTheme(_new.value as ColorTheme));

const theme = ref<NotivueTheme>();
/**
 * This function toggles the theme of notifications
 * between 'dark' and 'light'
 */
function useToggleNotivueTheme(_theme: ColorTheme) {
  const defaults: { dark: NotivueTheme; light: NotivueTheme } = {
    dark: {
      ...pastelTheme,
      "--nv-success-accent": "#ffffff",
      "--nv-success-fg": "#ffffff",
      "--nv-success-bg": "rgba(255, 255, 255, 0.2)",
      "--nv-success-border": "#ffffff",
      "--nv-border-width": "1px",
    },
    light: {
      ...pastelTheme,
      "--nv-success-accent": "#000000",
      "--nv-success-fg": "#000000",
      "--nv-success-bg": "rgba(0, 0, 0, 0.2)",
      "--nv-success-border": "#000000",
      "--nv-border-width": "1px",
    },
  };

  if (_theme === "dark") theme.value = defaults.dark;
  else theme.value = defaults.light;
}
</script>

<template>
  <ContentDoc
    class="space-y-8 col-span-5 lg:col-span-3 py-10 w-[90%] lg:w-full mx-auto"
  />

  <Notivue v-slot="item">
    <Notifications :item="item" :theme="theme" />
  </Notivue>
</template>
