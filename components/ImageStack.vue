<template>
  <div
    v-motion
    class="absolute left-0 w-full -z-[9999] h-64"
    :initial="{
      left: '50%',
      opacity: 0,
      top: '50%',
      x: '-50%',
      y: '-50%',
    }"
    :enter="{
      opacity: 1,
      top: '30%',
      transition: {
        delay: 400,
        duration: 700,
        easings: [0, 0, 0.3, 1],
      },
    }"
  >
    <NuxtImg
      v-motion
      loading="eager"
      class="ring-4 absolute ring-white z-10 border border-gray max-h-full top-0 left-12 p-px -rotate-30 bg-orange object-cover object-center rounded-md"
      placeholder
      preload
      src="/images/landing/daniel-l-4Kdstgi772A-unsplash.jpg"
      :initial="{
        scale: 0,
      }"
      :enter="{
        rotate: '-30deg',
        scale: 1,
      }"
    />
    <NuxtImg
      v-motion
      loading="eager"
      class="ring-4 absolute ring-white z-20 border border-gray p-px max-h-full top-0 left-12 rotate-30 bg-blue object-cover object-center rounded-md"
      placeholder
      preload
      src="/images/landing/mike-erskine-S_VbdMTsdiA-unsplash.jpg"
      :initial="{
        scale: 0,
      }"
      :enter="{
        rotate: '30deg',
        scale: 1,
        transition: {
          delay: 225,
        },
      }"
    />
    <NuxtImg
      v-motion
      loading="eager"
      class="ring-4 absolute ring-white border z-30 border-gray-1 max-h-full top-0 left-12 p-px rotate-180 bg-warmGray object-cover object-center rounded-md"
      placeholder
      preload
      src="/images/landing/hannah-busing-Gl1_dJeOtts-unsplash.jpg"
      :initial="{
        scale: 0,
      }"
      :enter="{
        rotate: '180deg',
        scale: 1,
        transition: {
          delay: 525,
        },
      }"
    />
    <NuxtImg
      v-motion
      loading="eager"
      :initial="{
        scale: 0,
      }"
      :enter="{
        rotate: '45deg',
        scale: 1,
        transition: {
          delay: 675,
        },
      }"
      class="ring-4 absolute ring-white border z-40 border-gray-1 max-h-full top-0 left-12 p-px rotate-45 bg-warmGray object-cover object-center rounded-md"
      placeholder
      preload
      src="/images/landing/brad-stell-9a0Qxbe2occ-unsplash.jpg"
    />
    <NuxtImg
      v-motion
      loading="eager"
      class="ring-4 absolute ring-white border z-50 border-gray-1 max-h-full left-24 top-0 p-px -rotate-15 bg-warmGray object-cover object-center rounded-md"
      placeholder
      preload
      src="/images/landing/andy-powell-eGRXI53lRvQ-unsplash.jpg"
      :initial="{
        scale: 0,
      }"
      :enter="{
        rotate: '-15deg',
        scale: 1,
        transition: {
          delay: 840,
        },
      }"
    />
    <NuxtImg
      v-motion
      loading="eager"
      :initial="{
        scale: 0,
      }"
      :enter="{
        rotate: '15deg',
        scale: 1,
        transition: {
          delay: 960,
        },
      }"
      class="ring-4 absolute ring-white border z-60 border-gray-1 max-h-full top-0 left-1/3 p-px rotate-15 bg-warmGray object-cover object-center rounded-md"
      placeholder
      preload
      src="/images/landing/ksav-pun-EHAn0csi6-E-unsplash.jpg"
    />
  </div>
</template>
