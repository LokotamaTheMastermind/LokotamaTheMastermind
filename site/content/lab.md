---
title: Lab · Oyedeji Oyewole
---

# Lab

**PS**: This is where I test/spam some UI ideas

::LabCard{description="A blob which follows the cursor based on its position" no-preview="true" title="Cursor Effect"}

#extra
**PS**: if it wasn't obvious, the circle that keeps following your mouse is the cursor effect.

#code

```vue
<script setup lang="ts">
import anime from "animejs/lib/anime.es";

const { x, y } = useMouse({ touch: false });

watch([x, y], (_new) => {
  const [x, y] = _new;
  anime({
    autoplay: true,
    duration: 300,
    targets: "#cursor-fx",
    translateX: x - 50,
    translateY: y - 50,
  });
});
</script>

<template>
  <div
    class="absolute -z-10 hidden aspect-square h-36 rounded-full bg-gradient-to-br from-black/10 dark:from-white/10 dark:via-white/50 dark:to-white via-black/50 to-black bg-blend-lighten blur-lg dark:bg-blend-darken lg:block"
    id="cursor-fx"
  />
</template>
```

::
