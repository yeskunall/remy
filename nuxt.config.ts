import "dotenv/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/kinde",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@unocss/nuxt",
    "@vueuse/motion/nuxt",
    "nuxt-umami",
  ],
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "description",
          content: "There are so many things we experience that might seem small in the moment, but that we’d see as a treasured memory looking back on it years from now. A special event, a dinner with loved ones, a small adventure — or a big one.",
        },
        {
          name: "robots",
          content: "noai, noimageai",
        },
        {
          name: "viewport",
          content: "initial-scale=1.0, height=device-height, width=device-width, shrink-to-fit=no, viewport-fit=cover",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    app: {
      siteUrl: process.env.NODE_ENV,
    },
    kinde: {
      authDomain: process.env.NUXT_KINDE_AUTH_DOMAIN,
      clientId: process.env.NUXT_KINDE_CLIENT_ID,
      clientSecret: process.env.NUXT_KINDE_CLIENT_SECRET,
      logoutRedirectURL: process.env.NUXT_KINDE_LOGOUT_REDIRECT_URL,
      password: process.env.NUXT_KINDE_PASSWORD,
      postLoginRedirectURL: process.env.NUXT_KINDE_POST_LOGIN_REDIRECT_URL,
      redirectURL: process.env.NUXT_KINDE_REDIRECT_URL,
    },
    public: {
      siteUrl: process.env.NODE_ENV === "development" ? process.env.NUXT_PUBLIC_SITE_URL : "http://localhost:3000",
      tigris: {
        bucket: process.env.NUXT_TIGRIS_BUCKET,
        endpoint: process.env.NUXT_TIGRIS_ENDPOINT,
      },
    },
    tigris: {
      accessKeyId: process.env.NUXT_TIGRIS_ACCESS_KEY_ID,
      bucket: process.env.NUXT_TIGRIS_BUCKET,
      endpoint: process.env.NUXT_TIGRIS_ENDPOINT,
      region: process.env.NUXT_TIGRIS_REGION,
      secretAccessKey: process.env.NUXT_TIGRIS_SECRET_ACCESS_KEY,
    },
    turso: {
      authToken: process.env.NUXT_TURSO_AUTH_TOKEN,
      url: process.env.NUXT_TURSO_DATABASE_URL,
    },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        externalRelAttribute: "nofollow noopener noreferrer",
      },
    },
  },
  compatibilityDate: "2024-04-03",
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: "double",
      },
    },
  },
  image: {
    domains: ["fly.storage.tigris.dev"],
    format: ["avif", "webp"],
    quality: 80,
  },
  primevue: {
    options: {
      ripple: false,
      unstyled: true,
    },
  },
  umami: {
    id: "4b63341e-883b-4598-a937-87734f834294",
    autoTrack: true,
    host: "https://imamu.kunall.dev",
    ignoreLocalhost: true,
    proxy: "cloak",
    // useDirective: true,
    // ignoreLocalhost: true,
    // excludeQueryParams: false,
    // domains: ['cool-site.app', 'my-space.site'],
    // customEndpoint: '/my-custom-endpoint',
    // enabled: false,
    // logErrors: true,
  },
})
