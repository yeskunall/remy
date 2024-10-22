<script setup lang="ts">
const { keyCount: totalMemories = 0, status } = await useGetObjects()
</script>

<template>
  <div
    v-motion
    :initial="{
      opacity: 0,
      scale: 0.97,
    }"
    :enter="{
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1500,
        duration: 400,
        easings: [0, 0, 0.3, 1],
      },
    }"
    class="flex flex-col mt-124 items-center gap-8"
  >
    <div class="flex flex-col text-center gap-2">
      <p class="font-medium text-gray-7">
        There are so many things we experience that might seem small in the moment, but that we’d see as a treasured memory looking back on it years from now. A special event, a dinner with loved ones, a small adventure&mdash;or a big one.
      </p>
    </div>
    <div class="flex items-center gap-4">
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
      <NuxtLink
        v-if="$auth.loggedIn"
        v-motion-pop-visible-once
        :delay="2500"
        class="p-px h-12 inline-flex items-center rounded-full bg-black text-gray-1"
        to="/app"
      >
        <template v-if="status === 'pending'">
          <span
            v-if="status === 'pending'"
            class="i-tabler-loader-2 inline-block size-4 text-gray-4 animate-spin"
          />
        </template>
        <span
          v-if="totalMemories === 0"
          class="px-4 font-semibold"
        >Open app</span>
        <span
          v-if="totalMemories > 0"
          class="px-4 font-semibold"
        >Unlock {{ totalMemories }}+ memories</span>
        <UiAvatar
          :name="$auth.user.name"
          :picture="$auth.user.picture"
        />
      </NuxtLink>
    </div>
    <div class="flex max-sm:pt-24 lg:pt-12 flex-col text-center gap-2">
      <p>
        I built Remy in a span of 3 days after watching S1E6 of <NuxtLink
          class="underline underline-offset-2 decoration-gray-4"
          to="https://www.youtube.com/watch?v=V96_3fBgvPA"
          external
        >
          Web Dev Challenge</NuxtLink>, hosted by Jason Lengstorf. Here’s the accompanying <NuxtLink
          class="underline underline-offset-2 decoration-gray-4"
          to="https://www.youtube.com/watch?v=V96_3fBgvPA"
          external
        >blog post</NuxtLink>. I was talking about building something similar for us in our family group chat not too long ago, so this challenge couldn’t come at a better time. Remy is&mdash;for now&mdash;a very barebones version of the app I envision to build for my family. In fact, the “app” I want to build might end up becoming multiple applications.
      </p>
    </div>
  </div>
</template>
