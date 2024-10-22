<script setup lang="ts">
import { Menu } from "@ark-ui/vue/menu"
</script>

<template>
  <Menu.Root>
    <Menu.Trigger>
      <UiAvatar
        v-if="$auth.loggedIn"
        :name="$auth.user.name"
        :picture="$auth.user.picture"
      />
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content class="bg-white   transition-all data-[state=open]:animate-back-in-down ease-in-out duration-400 p-4 rounded-md z-[9999]">
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>My Account</Menu.ItemGroupLabel>
          <Menu.Separator />
          <Menu.Item value="profile">
            <!-- <UserIcon /> -->
            Profile
            <span>⇧⌘P</span>
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item
            v-if="$auth.loggedIn"
            value="home"
            as-child
          >
            <NuxtLink
              to="/"
              class="inline-flex"
            >
              <span class="i-tabler-home block size-4 text-warmGray hover:text-gray-9 transition-colors duration-300 ease-in-out" />
            </NuxtLink>
          </Menu.Item>
          <Menu.Item
            v-if="$auth.loggedIn"
            value="logout"
            as-child
          >
            <NuxtLink
              to="/api/logout"
              class="inline-flex"
              external
            >
              <span class="i-tabler-logout block size-4 text-warmGray hover:text-gray-9 transition-colors duration-300 ease-in-out" />
            </NuxtLink>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</template>
