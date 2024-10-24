<script setup lang="ts">
import "@unocss/reset/tailwind.css"
import "~/assets/global.css"

const { public: { siteUrl } } = useRuntimeConfig()

useHead({
  link: [
    {
      rel: "icon",
      href: "/favicon/favicon.ico",
      sizes: "16x16",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "apple-touch-icon-precomposed",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "apple-touch-startup-image",
      href: "/favicon/apple-touch-icon.png",
    },
  ],
})

useSeoMeta({
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "black-translucent",
  applicationName: "Remy",
  author: "Kunall Banerjee",
  colorScheme: "only light",
  description: "There are so many things we experience that might seem small in the moment, but that we’d see as a treasured memory looking back on it years from now. A special event, a dinner with loved ones, a small adventure — or a big one.",
  googleSiteVerification: "",
  mobileWebAppCapable: "yes",
  ogDescription: "There are so many things we experience that might seem small in the moment, but that we’d see as a treasured memory looking back on it years from now. A special event, a dinner with loved ones, a small adventure — or a big one.",
  ogImageHeight: 630,
  ogImageWidth: 1200,
  ogImageAlt: "",
  ogImageUrl: `${siteUrl}/images/default-og.png`,
  ogImageSecureUrl: `${siteUrl}/images/default-og.png`,
  ogImageType: "image/png",
  ogTitle: "Remy",
  ogType: "website",
  themeColor: "#fff",
  title: "Remy",
  twitterCard: "summary_large_image",
  twitterCreator: "@yeskunall",
  twitterDescription: "There are so many things we experience that might seem small in the moment, but that we’d see as a treasured memory looking back on it years from now. A special event, a dinner with loved ones, a small adventure — or a big one.",
  twitterImageAlt: "",
  twitterSite: "@yeskunall",
  twitterTitle: "",
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <header class="shadow-sm shadow-gray-1 rounded-xl inline-flex items-center w-full">
      <NuxtErrorBoundary>
        <UiToolbar />
      </NuxtErrorBoundary>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer class="flex flex-col max-w-xl items-center py-12 gap-8 w-full mx-auto">
      <div class="order-first text-center">
        <p class="text-sm text-gray-5 font-medium tracking-tight">
          Remy is currently built using the following:
        </p>
      </div>
      <LazyStackGrid />
      <div class="flex items-center text-sm gap-2">
        <NuxtLink
          to="https://github.com/yeskunall/remy"
          class="text-gray-5 hover:text-gray-9 leading-none inline-flex items-center gap-1 font-medium transition-colors ease-in-out duration-300"
        >
          Source available on GitHub
        </NuxtLink>
      </div>
    </footer>
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
