<script setup lang="ts">
import { Dialog } from "@ark-ui/vue/dialog"
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger class="!bg-black p-2.5 rounded-full !font-semibold tracking-tight px-4 leading-none text-gray-1">
      Open Dialog
    </Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content class="bg-black size-full top-0 z-[9999] absolute">
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
