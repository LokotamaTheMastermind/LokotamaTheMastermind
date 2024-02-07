export default defineNuxtConfig({
  colorMode: {
    classSuffix: "",
  },
  content: {
    highlight: {
      theme: {
        dark: "rose-pine-dawn",
        default: "vitesse-light",
      },
    },
  },
  devtools: { enabled: true },
  googleFonts: {
    families: {
      "Playfair Display": [400, 500, 600],
      Poppins: true,
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "nuxt-phosphor-icons",
  ],
});
