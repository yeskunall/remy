<script setup lang="ts">
definePageMeta({
  middleware: ["auth-logged-in"],
  layout: "app",
})

const { contents, status } = await useGetObjects()
const { public: { tigris: { bucket, endpoint } } } = useRuntimeConfig()
</script>

<template>
  <div class="max-w-full mx-auto max-sm:flex max-sm:flex-col grid sm:grid-cols-3 lg:grid-cols-4 gap-1">
    <template v-if="status === 'pending'">
      <span
        v-if="status === 'pending'"
        class="i-tabler-loader-2 size-4 text-gray-4 animate-spin"
      />
    </template>

    <div
      v-for="content in contents"
      :key="content.ETag"
    >
      <NuxtImg
        class="rounded-md size-full object-center object-cover"
        placeholder
        :src="`${endpoint}/${bucket}/${content.Key}`"
      />
    </div>
  </div>
</template>
