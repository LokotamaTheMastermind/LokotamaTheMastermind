export default defineNuxtConfig({
  colorMode: {
    classSuffix: "",
  },
  content: {
    highlight: {
      theme: {
        dark: "github-dark",
        default: "github-light",
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
    "floating-vue/nuxt",
    "notivue/nuxt",
    "nuxt-og-image",
    "nuxt-phosphor-icons",
  ],
  notivue: {
    position: "bottom-center",
  },
  site: { url: "https://oyedejioyewole.vercel.app" },
});
