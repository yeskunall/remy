<script setup lang="ts">
import { FileUpload, useFileUpload } from "@ark-ui/vue/file-upload"
import { Field } from "@ark-ui/vue/field"
import mime from "mime/lite"
import prettyBytes from "pretty-bytes"
// import { storeToRefs } from "pinia"

import { useMemoryStore } from "~/stores/memory"

// CONSTANTS
// NOTE(yeskunall): is there a better place to put them?
const maxFiles = 3

// const files = useState<File[]>("files", () => [])
const hashes = useState<Set<string>>("hashes", () => new Set())
const store = useMemoryStore()

const { files } = storeToRefs(store)

const fileUpload = useFileUpload({
  accept: [
    "image/png",
    "image/gif",
    "image/jpeg",
    "image/webp",
    "image/avif",
  ],
  async onFileChange(details) {
    const { acceptedFiles } = details

    for (const file of acceptedFiles) {
      const arrayBuffer = await file.arrayBuffer()
      const digest = await crypto.subtle.digest("SHA-256", arrayBuffer)
      const hashArray = Array.from(new Uint8Array(digest))
      const hash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")

      if (!hashes.value.has(hash)) {
        files.value = [file, ...files.value]
      }

      hashes.value.add(hash)
    }
  },
  maxFiles,
  maxFileSize: 2_00_00_000,
})

function createImageUrl(file: File) {
  return URL.createObjectURL(file)
}

function handleRemove(event: MouseEvent) {
  const name = (event.target as HTMLSpanElement).id
  files.value = files.value.filter(file => file.name !== name)
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <Field.Root
      class="border p-2 border-gray-2 rounded-md"
      :class="{ 'select-none pointer-events-none': files.length === maxFiles }"
    >
      <FileUpload.RootProvider
        :value="fileUpload"
        required
        name="files"
        class="flex relative group flex-col gap-4 bg-gray-1 items-center justify-center border border-gray-2 rounded-md min-h-72"
      >
        <FileUpload.Dropzone
          class="absolute size-full"
        />

        <div class="flex flex-col gap-4 items-center">
          <FileUpload.Label>
            <div
              class="i-tabler-cloud-upload group-hover:scale-[.99] scale-[.95] size-8 group-hover:text-gray-4 text-gray-3 transition-colors ease-in-out duration-300"
            />
          </FileUpload.Label>
          <div class="flex items-center gap-4">
            <FileUpload.Trigger
              :disabled="files.length === maxFiles"
              class="p-2 px-4 group rounded-full inline-flex transition-colors duration-300 ease-in-out !group-hover:bg-black items-center gap-2 !bg-gray-7 text-gray-1"
            >
              <div
                v-if="files.length < maxFiles"
                class="i-tabler-folder-open group-hover:scale-100 scale-[.97] size-4"
              />
              <div
                v-if="files.length === maxFiles"
                class="i-tabler-folder-off group-hover:scale-100 scale-[.97] size-4"
              />
              <small class="tracking-tight font-semibold">({{ maxFiles - files.length }} remaining)</small>
            </FileUpload.Trigger>
          </div>
        </div>

        <FileUpload.HiddenInput />
      </FileUpload.RootProvider>
    </Field.Root>

    <ul
      v-if="files.length !== 0"
      class="flex [flex-direction:_column-reverse] gap-2"
    >
      <li
        v-for="(file, index) in files"
        :id="file.name"
        :key="file.name"
        v-motion-fade-visible
        :delay="index * 150 * 1.2"
        class="p-4 flex items-center gap-4 rounded-md bg-gray-1"
      >
        <NuxtImg
          alt="{{ file.name }}"
          class="rounded-md size-16 object-center object-cover"
          :src="createImageUrl(file)"
        />
        <div class="grow flex items-center justify-between w-full">
          <div class="flex flex-col gap-px">
            <strong class="font-semibold text-gray-7">{{ prettyBytes(file.size) }}</strong>
            <small class="bg-black uppercase tracking-tight w-fit text-gray-1 leading-none p-1.5 rounded-md inline-flex items-center justify-center font-semibold">
              {{ mime.getExtension(file.type) }}
            </small>
          </div>
          <div class="flex items-center gap-2">
            <span class="i-tabler-circle-check-filled inline-block size-6 text-green-4" />
            <button
              class="size-6 rounded-full"
              @click="handleRemove"
            >
              <span
                :id="file.name"
                class="i-tabler-circle-x-filled inline-block size-6 text-gray-9"
              />
            </button>
          </div>
        </div>
      </li>
      <li
        v-for="({ errors, file }) in fileUpload.rejectedFiles"
        :key="file.name"
        v-motion-pop-visible-once
        class="p-4 flex items-center gap-4 opacity-50 select-none pointer-events-none rounded-md bg-gray-1"
      >
        <div class="grow flex items-center justify-between w-full">
          <div class="flex flex-col self-end gap-1">
            <span
              :class="{ 'bg-red-3 text-red-6': errors.includes('FILE_TOO_LARGE') }"
            >{{ file.name }}</span>
            <small
              class="bg-black uppercase tracking-tight w-fit text-gray-1 leading-none p-1.5 rounded-md inline-flex items-center justify-center font-semibold"
              :class="{ 'bg-red-3 text-red-9': errors.includes('FILE_INVALID_TYPE') }"
            >
              {{ mime.getExtension(file.type) }}
            </small>
          </div>
          <div class="i-tabler-circle-x-filled size-6 text-red-6" />
        </div>
      </li>
    </ul>
  </div>
</template>
