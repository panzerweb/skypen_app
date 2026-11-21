<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useWorlds } from '../composables/world_composables';
import WorldCard from '../components/WorldCard.vue';
import WorldIcon from '../components/WorldIcon.vue';
import WorldState from '../components/WorldState.vue';

const { worlds, loading, errorMessage, loadWorlds } = useWorlds();
const search = ref('');
const sort = ref('newest');
const availableWorlds = computed(() =>
  worlds.value.filter((world) => Boolean(world?.id)),
);
const worldCount = computed(() => availableWorlds.value.length);
const visibleWorlds = computed(() => {
  const query = search.value.trim().toLocaleLowerCase();
  const matches = availableWorlds.value.filter((world) =>
    `${world.name} ${world.description ?? ''}`
      .toLocaleLowerCase()
      .includes(query),
  );
  return matches.sort((a, b) => {
    if (sort.value === 'name') return a.name.localeCompare(b.name);
    return (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0);
  });
});

onMounted(loadWorlds);
</script>

<template>
  <div>
    <div class="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p class="text-[11px] font-bold tracking-[0.2em] text-emerald-700">
          A PLACE FOR EVERY POSSIBILITY
        </p>
        <h1
          class="mt-3 text-3xl font-semibold tracking-tight text-emerald-950 sm:text-4xl"
        >
          My worlds
        </h1>
        <p class="mt-3 text-sm leading-6 text-slate-600">
          Little beginnings. Boundless possibilities. Your worlds live here.
        </p>
      </div>
      <RouterLink
        :to="{ name: 'worlds-create' }"
        class="world-button world-button-primary"
        ><span aria-hidden="true" class="text-lg">+</span> Create
        world</RouterLink
      >
    </div>
    <div
      class="relative mt-8 overflow-hidden rounded-2xl bg-emerald-900 px-6 py-7 text-white sm:px-8"
    >
      <WorldIcon
        class="pointer-events-none absolute -top-9 -right-8 h-52 w-52 rotate-12 text-emerald-700/70"
      />
      <div class="relative max-w-lg pr-10">
        <p class="text-[10px] font-semibold tracking-[0.2em] text-lime-300">
          YOUR NEXT CHAPTER
        </p>
        <h2 class="mt-3 text-xl font-medium tracking-tight sm:text-2xl">
          Give your imagination a home.
        </h2>
        <p class="mt-2 text-sm leading-6 text-emerald-100">
          From a single idea to an entire universe. Choose a world to continue
          its story, or begin somewhere new.
        </p>
      </div>
    </div>
    <div class="mt-8">
      <WorldState
        v-if="loading"
        title="Gathering your worlds…"
        description="Your next adventure will be ready in a moment."
        tone="loading"
      />
      <WorldState
        v-else-if="errorMessage"
        title="Couldn't load your worlds"
        :description="errorMessage"
        tone="error"
        ><button type="button" class="world-button" @click="loadWorlds">
          Try again
        </button></WorldState
      >
      <WorldState
        v-else-if="worldCount === 0"
        title="Your first world starts here"
        description="A floating city, an unexplored continent, a universe of your own. Give your first idea a name."
        ><RouterLink
          :to="{ name: 'worlds-create' }"
          class="world-button world-button-primary"
          >Create your first world
          <span aria-hidden="true">&rarr;</span></RouterLink
        ></WorldState
      >
      <template v-else>
        <div class="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-sm font-semibold text-emerald-950">
            Your collection
            <span
              class="ml-2 rounded-full bg-emerald-100 px-2.5 py-1 text-xs text-emerald-800"
              >{{ worldCount }}</span
            >
          </h2>
          <div class="flex w-full flex-wrap gap-3 sm:w-auto">
            <div class="min-w-0 flex-1 sm:w-64">
              <label for="world-search" class="sr-only"
                >Search worlds by name or description</label
              ><input
                id="world-search"
                v-model="search"
                type="search"
                class="world-field"
                placeholder="Search your worlds…"
              />
            </div>
            <div>
              <label for="world-sort" class="sr-only">Sort worlds</label
              ><select id="world-sort" v-model="sort" class="world-field">
                <option value="newest">Newest first</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>
        </div>
        <p class="sr-only" role="status">
          {{ visibleWorlds.length }}
          {{ visibleWorlds.length === 1 ? 'world' : 'worlds' }} shown
        </p>
        <WorldState
          v-if="visibleWorlds.length === 0"
          title="No worlds found"
          description="Try another name or a word from your world's description."
          ><button type="button" class="world-button" @click="search = ''">
            Clear search
          </button></WorldState
        >
        <div v-else class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <WorldCard
            v-for="world in visibleWorlds"
            :key="world.id"
            :world="world"
          />
        </div>
      </template>
    </div>
  </div>
</template>
