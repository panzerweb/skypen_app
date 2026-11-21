<script setup lang="ts">
import { onScopeDispose } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useWorlds } from '../composables/world_composables';
import type { WorldCreatePayload } from '../types';
import WorldForm from '../components/WorldForm.vue';

const router = useRouter();
const { isCreating, errorCreateMessage, createSingleWorld } = useWorlds();
let isCurrentView = true;
onScopeDispose(() => {
  isCurrentView = false;
});

async function createWorld(payload: WorldCreatePayload) {
  if (isCreating.value) return;
  const world = await createSingleWorld(payload);
  if (world && isCurrentView)
    await router.push({ name: 'worlds-detail', params: { worldId: world.id } });
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <RouterLink
      :to="{ name: 'worlds' }"
      class="rounded text-sm font-medium text-emerald-700 hover:text-emerald-950"
      ><span aria-hidden="true">&larr;</span> Back to my worlds</RouterLink
    >
    <p class="mt-8 text-[11px] font-bold tracking-[0.2em] text-emerald-700">
      THE START OF SOMETHING NEW
    </p>
    <h1
      class="mt-3 text-3xl font-semibold tracking-tight text-emerald-950 sm:text-4xl"
    >
      Create a world
    </h1>
    <p class="mt-3 mb-8 text-sm leading-6 text-slate-600">
      Every world begins with an idea. Make this one yours.
    </p>
    <WorldForm
      :pending="isCreating"
      :error="errorCreateMessage"
      @submit="createWorld"
      @cancel="router.push({ name: 'worlds' })"
    />
  </div>
</template>
