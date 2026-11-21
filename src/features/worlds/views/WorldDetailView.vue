<script setup lang="ts">
import { computed, onMounted, onScopeDispose, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useWorlds } from '../composables/world_composables';
import WorldDeleteDialog from '../components/WorldDeleteDialog.vue';
import WorldIcon from '../components/WorldIcon.vue';
import WorldState from '../components/WorldState.vue';

const props = defineProps<{ worldId: string }>();
const router = useRouter();
const {
  worlds,
  loading,
  errorMessage,
  loadSingleWorld,
  isUpdatingOrDeleting,
  errorMutationMessage,
  deleteWorldData,
} = useWorlds();
const world = computed(() =>
  worlds.value.find((item) => item?.id === props.worldId),
);
const showDelete = ref(false);
let isCurrentView = true;
onScopeDispose(() => {
  isCurrentView = false;
});
const createdDate = computed(() => {
  const date = new Date(world.value?.createdAt ?? '');
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
});

function loadWorld() {
  return loadSingleWorld(props.worldId);
}
function openDelete() {
  errorMutationMessage.value = null;
  showDelete.value = true;
}
async function deleteWorld() {
  if (isUpdatingOrDeleting.value) return;
  const deleted = await deleteWorldData(props.worldId);
  if (deleted && isCurrentView) await router.push({ name: 'worlds' });
}
onMounted(loadWorld);
</script>

<template>
  <div>
    <RouterLink
      :to="{ name: 'worlds' }"
      class="rounded text-sm font-medium text-emerald-700 hover:text-emerald-950"
      ><span aria-hidden="true">&larr;</span> Back to my worlds</RouterLink
    >
    <div class="mt-7">
      <WorldState v-if="loading" title="Opening your world…" tone="loading" />
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
      <template v-else>
        <section
          class="relative overflow-hidden rounded-2xl bg-emerald-900 px-6 py-8 text-white sm:p-10"
        >
          <WorldIcon
            class="pointer-events-none absolute -top-8 -right-10 h-64 w-64 text-emerald-700/60"
          />
          <div class="relative">
            <span
              class="inline-block rounded-full border border-emerald-500/50 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-lime-300"
              >YOUR WORLD</span
            >
            <h1
              class="mt-5 max-w-3xl text-3xl font-semibold tracking-tight break-words sm:text-4xl"
            >
              {{ world.name }}
            </h1>
            <p class="mt-4 text-sm text-emerald-100">
              <template v-if="createdDate"
                >Created
                <time :datetime="world.createdAt">{{
                  createdDate
                }}</time></template
              ><template v-else>Creation date unavailable</template>
            </p>
            <RouterLink
              :to="{ name: 'worlds-edit', params: { worldId } }"
              class="world-button world-button-primary mt-6"
              >Edit world <span aria-hidden="true">&rarr;</span></RouterLink
            >
          </div>
        </section>
        <section
          class="mt-6 rounded-2xl border border-emerald-950/10 bg-white p-6 sm:p-8"
          aria-labelledby="world-about-title"
        >
          <p
            class="text-[10px] font-semibold tracking-[0.2em] text-emerald-700"
          >
            THE BIG PICTURE
          </p>
          <h2
            id="world-about-title"
            class="mt-2 text-xl font-semibold text-emerald-950"
          >
            About this world
          </h2>
          <p
            v-if="world.description?.trim()"
            class="mt-5 text-sm leading-7 whitespace-pre-wrap break-words text-slate-600"
          >
            {{ world.description }}
          </p>
          <div v-else class="mt-5 rounded-xl bg-[#f5f7f2] p-5">
            <p class="text-sm leading-6 text-slate-600">
              Your world is still a blank page. Add a description to give its
              story a starting point.
            </p>
            <RouterLink
              :to="{ name: 'worlds-edit', params: { worldId } }"
              class="mt-3 inline-block rounded text-sm font-semibold text-emerald-700"
              >Add a description
              <span aria-hidden="true">&rarr;</span></RouterLink
            >
          </div>
        </section>
        <section
          class="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-200/70 p-6"
          aria-labelledby="world-delete-heading"
        >
          <div>
            <h2
              id="world-delete-heading"
              class="text-sm font-semibold text-slate-800"
            >
              Delete world
            </h2>
            <p class="mt-1 text-sm text-slate-600">
              Permanently remove this world from your collection.
            </p>
          </div>
          <button
            type="button"
            class="world-button !border-red-200 !text-red-700"
            @click="openDelete"
          >
            Delete world
          </button>
        </section>
        <WorldDeleteDialog
          v-if="showDelete"
          :world-name="world.name"
          :pending="isUpdatingOrDeleting"
          :error="errorMutationMessage"
          @cancel="showDelete = false"
          @confirm="deleteWorld"
        />
      </template>
    </div>
  </div>
</template>
