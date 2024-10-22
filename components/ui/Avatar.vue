<script setup lang="ts">
import type { AvatarRootEmits, AvatarRootProps } from "@ark-ui/vue/avatar"

import { Avatar } from "@ark-ui/vue/avatar"
import { useForwardPropsEmits } from "@ark-ui/vue"

import { computed } from "vue"

export interface Props extends AvatarRootProps {
  name: string
  picture?: string
}

const emits = defineEmits<AvatarRootEmits>()
const props = defineProps<Props>()

const id = useId()

const forwarded = useForwardPropsEmits(props, emits)
const { name, picture } = props

const getInitials = computed(() =>
  props.name
    .split(" ")
    .map(part => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase(),
)
</script>

<template>
  <Avatar.Root
    :id="id"
    v-bind="forwarded"
  >
    <Avatar.Fallback>
      <span class="rounded-full bg-gray-1 text-gray-9 inline-flex items-center justify-center size-12">{{ getInitials }}</span>
    </Avatar.Fallback>
    <Avatar.Image
      class="rounded-full object-cover object-center size-12"
      :src="picture"
      :alt="name"
    />
  </Avatar.Root>
</template>
