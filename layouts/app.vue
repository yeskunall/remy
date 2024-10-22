<script setup lang="ts">
useSeoMeta({
  robots: "noindex, nofollow",
})
</script>

<template>
  <div class="flex mx-auto min-h-screen max-w-5xl flex-col gap-8 px-8 py-16">
    <slot />
  </div>
</template>
