<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { APP_NAME } from "../shared/app_variables";

const isCollapsed = ref(false);
const isMobileOpen = ref(false);

const menuItems = [{ name: "Your Worlds", path: "/worlds", icon: "🌐" }];
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Mobile Backdrop -->
    <div
      v-if="isMobileOpen"
      @click="isMobileOpen = false"
      class="fixed inset-0 z-20 bg-slate-900/50 md:hidden"
    />

    <aside
      :class="[
        'fixed inset-y-0 left-0 z-30 flex flex-col bg-emerald-900 text-slate-100 transition-all duration-300 md:static',
        isCollapsed ? 'w-16' : 'w-64',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <!-- Header -->
      <div
        class="flex h-16 items-center justify-between border-b border-slate-800 px-4"
      >
        <span
          v-if="!isCollapsed"
          class="text-lg font-bold tracking-wide text-white"
        >
          {{ APP_NAME }}
        </span>
        <button
          @click="isCollapsed = !isCollapsed"
          class="hidden rounded-lg p-1.5 text-slate-400 hover:bg-emerald-800 hover:text-white md:block"
          aria-label="Toggle Sidebar"
        >
          {{ isCollapsed ? "➡️" : "⬅️" }}
        </button>
        <button
          @click="isMobileOpen = false"
          class="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-800 hover:text-white md:hidden"
          aria-label="Close Sidebar"
        >
          ✕
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 space-y-1 p-2">
        <RouterLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          :class="[
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-emerald-800 hover:text-white',
            isCollapsed ? 'justify-center' : '',
          ]"
        >
          <span class="text-lg">{{ item.icon }}</span>
          <span v-if="!isCollapsed" class="truncate">{{ item.name }}</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="flex flex-1 flex-col">
      <!-- Mobile Top Bar -->
      <header
        class="flex h-16 items-center border-b border-slate-200 bg-emerald-900 px-4 md:hidden"
      >
        <button
          @click="isMobileOpen = true"
          class="rounded-lg p-2 text-slate-200"
          aria-label="Open Sidebar"
        >
          ☰
        </button>
        <span class="ml-3 font-semibold text-lg tracking-wide text-white">
          {{ APP_NAME }}
        </span>
      </header>

      <main class="flex-1 p-6 min-h-screen w-full bg-orange-200">
        <slot />
      </main>
    </div>
  </div>
</template>
