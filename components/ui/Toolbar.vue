<script setup lang="ts">
import type { AuthState } from "@kinde-oss/kinde-typescript-sdk"

import Toolbar from "primevue/toolbar"

const { keyCount, status } = await useGetObjects()
</script>

<template>
  <Toolbar class="border rounded-xl flex min-w-full items-center justify-between border-gray-2 p-4">
    <template #start>
      <NuxtLink
        to="/"
      >
        <LogosRemyWordmark class="size-8 scale-[.9] hover:scale-[.99] transition-transform ease-in-out duration-700" />
      </NuxtLink>
    </template>

    <template #center>
      <div
        v-if="$auth.loggedIn"
        class="flex items-center grow gap-4"
      >
        <NuxtLink
          class="text-gray-5 hover:text-gray-9 leading-none inline-flex items-center gap-1 font-medium transition-colors ease-in-out duration-300"
          to="/app"
        >
          <span class="i-tabler-cloud-upload" /> <span>Upload</span>
        </NuxtLink>
        <NuxtLink
          class="inline-flex items-center gap-2 text-gray-5 hover:text-gray-9 leading-none font-medium transition-colors ease-in-out duration-300"
          to="/memories"
        >
          <div class="inline-flex items-center gap-1">
            Memories
            <span v-if="status === 'success'">({{ keyCount ?? 0 }})</span>
          </div>
          <span
            v-if="status === 'pending'"
            class="i-tabler-loader-2 inline-block size-4 text-gray-4 animate-spin"
          />
        </NuxtLink>
      </div>
    </template>

    <template #end>
      <div>
        <div
          class="inline-flex items-center gap-2"
        >
          <NuxtLink
            v-if="!$auth.loggedIn"
            v-motion-pop-visible-once
            :delay="2500"
            class="p-2 px-4 rounded-full bg-black text-gray-1"
            to="/api/login"
            external
          >
            Log in
          </NuxtLink>
          <UiAvatar
            v-if="$auth.loggedIn"
            v-motion
            v-motion-pop-visible-once
            :delay="400"
            :name="($auth.user as AuthState['user']).name"
            :picture="($auth.user as AuthState['user']).picture"
          />
          <NuxtLink
            v-if="$auth.loggedIn"
            class="size-fit inline-block"
            to="/api/logout"
            external
          >
            <span class="inline-block size-6 leading-none mt-2 text-gray-4 hover:text-gray-8 transition-colors duration-400 ease-in-out i-tabler-logout" />
          </NuxtLink>
        </div>
      </div>
    </template>
  </Toolbar>
</template>
