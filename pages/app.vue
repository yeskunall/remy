<script setup lang="ts">
import FileUpload from "~/components/FileUpload.vue"

definePageMeta({
  middleware: ["auth-logged-in"],
  layout: "app",
})
</script>

<template>
  <div class="max-w-xl mx-auto flex flex-col py-12 gap-4">
    <NuxtErrorBoundary>
      <ClientOnly fallback-tag="div">
        <FileUpload />
        <template #fallback>
          <div class="border p-2 border-gray-2 size-full rounded-md">
            <div class="border border-gray-2 flex items-center justify-center bg-gray-1 rounded-md min-h-72 w-full">
              <div class="i-tabler-loader-2 size-4 text-gray-4 animate-spin" />
            </div>
          </div>
        </template>
      </ClientOnly>
    </NuxtErrorBoundary>
    <NuxtErrorBoundary>
      <ClientOnly fallback-tag="div">
        <UiEditor />
        <template #fallback>
          <div class="border border-gray-2 flex items-center justify-center bg-white shadow-sm shadow-gray-2 rounded-lg min-h-32 w-full">
            <div class="i-tabler-loader-2 size-4 text-gray-4 animate-spin" />
          </div>
        </template>
      </ClientOnly>
    </NuxtErrorBoundary>
  </div>
</template>
