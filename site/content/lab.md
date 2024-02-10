---
title: Lab
---

# Lab

**PS**: This is where I test/spam some UI ideas.

::LabCard{description="A blob which follows the cursor based on its position." title="Cursor Effect"}

#extra
**PS**: The circle that follows your mouse is the cursor effect.

#code

```vue
<script setup lang="ts">
import { gsap } from "gsap";

const { x, y } = useMouse({ touch: false });

watch([x, y], (_new) =>
  gsap.to("#cursor-fx", { x: _new[0] - 70, y: _new[1] - 70 }),
);
</script>

<template>
  <div
    class="absolute -z-10 hidden aspect-square h-36 rounded-full bg-gradient-to-br from-black/10 dark:from-white/10 dark:via-white/50 dark:to-white via-black/50 to-black bg-blend-lighten blur-lg dark:bg-blend-darken lg:block"
    id="cursor-fx"
  />
</template>
```

::

::LabCard{description="Dynamically change the color of the notifications." title="Notivue"}

#extra
**PS**: The colors change based of the current color mode.

#code

```vue
<script setup lang="ts">
import { pastelTheme, type NotivueTheme } from "notivue";
import "notivue/animations.css";
import "notivue/notifications.css";

type ColorTheme = "dark" | "light";

const colorTheme = useColorMode();
onMounted(async () => {
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
      // overrides ...
    },
    light: {
      ...pastelTheme,
      // overrides ...
    },
  };

  if (_theme === "dark") theme.value = defaults.dark;
  else theme.value = defaults.light;
}
</script>

<template>
  <Notivue v-slot="item">
    <Notifications :item="item" :theme="theme" />
  </Notivue>
</template>
```

#preview

This is the preview

::
