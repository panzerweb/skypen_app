<script setup lang="ts">
import { onMounted, onScopeDispose, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useWorlds } from "../composables/world_composables";
import type { World, WorldCreatePayload } from "../types";
import WorldForm from "../components/WorldForm.vue";
import WorldState from "../components/WorldState.vue";

const props = defineProps<{ worldId: string }>();
const router = useRouter();
const {
  worlds,
  loading,
  errorMessage,
  loadSingleWorld,
  isUpdatingOrDeleting,
  errorMutationMessage,
  updateWorldData,
} = useWorlds();
// Keep the loaded values available if a failed mutation changes the shared store.
const world = ref<World | null>(null);
let isCurrentView = true;
onScopeDispose(() => {
  isCurrentView = false;
});
async function loadWorld() {
  await loadSingleWorld(props.worldId);
  if (isCurrentView && !errorMessage.value) {
    world.value =
      worlds.value.find((item) => item?.id === props.worldId) ?? null;
  }
}
async function saveWorld(payload: WorldCreatePayload) {
  if (isUpdatingOrDeleting.value) return;
  const updated = await updateWorldData({ id: props.worldId, ...payload });
  console.log(`UPDATED DATA: ${updated} ${props.worldId}`);
  if (updated && isCurrentView)
    await router.push({
      name: "worlds-detail",
      params: { worldId: props.worldId },
    });
}
onMounted(loadWorld);
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <RouterLink
      :to="{ name: 'worlds-detail', params: { worldId } }"
      class="rounded text-sm font-medium text-emerald-700 hover:text-emerald-950"
      ><span aria-hidden="true">&larr;</span> Back to world</RouterLink
    >
    <p class="mt-8 text-[11px] font-bold tracking-[0.2em] text-emerald-700">
      ROOM TO GROW
    </p>
    <h1
      class="mt-3 text-3xl font-semibold tracking-tight text-emerald-950 sm:text-4xl"
    >
      Edit world
    </h1>
    <p class="mt-3 mb-8 text-sm leading-6 text-slate-600">
      Refine the details. Let your world take shape.
    </p>
    <WorldState v-if="loading" title="Loading world details…" tone="loading" />
    <WorldState
      v-else-if="errorMessage || !world"
      title="This world couldn't be opened"
      :description="
        errorMessage ||
        'The world may have been removed or is no longer available.'
      "
      tone="error"
      ><button type="button" class="world-button" @click="loadWorld">
        Try again</button
      ><RouterLink :to="{ name: 'worlds' }" class="world-button"
        >My worlds</RouterLink
      ></WorldState
    >
    <WorldForm
      v-else
      :initial-values="world"
      :pending="isUpdatingOrDeleting"
      :error="errorMutationMessage"
      submit-label="Save changes"
      @submit="saveWorld"
      @cancel="router.push({ name: 'worlds-detail', params: { worldId } })"
    />
  </div>
</template>
