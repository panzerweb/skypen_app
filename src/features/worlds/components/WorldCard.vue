<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { World } from '../types';
import WorldIcon from './WorldIcon.vue';
const props = defineProps<{ world: World }>();
const createdDate = computed(() => {
  const date = new Date(props.world.createdAt);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
});
</script>

<template>
  <article
    class="group flex min-w-0 flex-col rounded-2xl border border-emerald-950/10 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-emerald-950/5"
  >
    <div class="flex items-start justify-between gap-4">
      <span
        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"
        ><WorldIcon class="h-10 w-10"
      /></span>
      <span
        class="rounded-full bg-[#f5f7f2] px-3 py-1 text-[10px] font-semibold tracking-widest text-slate-500"
        >WORLD</span
      >
    </div>
    <h2
      class="mt-5 text-xl font-semibold tracking-tight break-words text-emerald-950"
    >
      <RouterLink
        :to="{ name: 'worlds-detail', params: { worldId: world.id } }"
        class="rounded hover:text-emerald-700"
        >{{ world.name }}</RouterLink
      >
    </h2>
    <p class="mt-3 line-clamp-3 text-sm leading-6 break-words text-slate-600">
      {{ world.description?.trim() || 'A new world, waiting for its story.' }}
    </p>
    <div class="mt-auto pt-7">
      <div
        class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"
      >
        <p class="text-xs text-slate-500">
          <time v-if="createdDate" :datetime="world.createdAt">{{
            createdDate
          }}</time
          ><span v-else>Date unavailable</span>
        </p>
        <RouterLink
          :to="{ name: 'worlds-detail', params: { worldId: world.id } }"
          class="rounded text-sm font-semibold text-emerald-800 hover:text-emerald-600"
          :aria-label="`Open ${world.name}`"
          >Open world <span aria-hidden="true">&rarr;</span></RouterLink
        >
      </div>
    </div>
  </article>
</template>
