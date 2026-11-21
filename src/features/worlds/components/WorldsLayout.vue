<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import WorldIcon from './WorldIcon.vue';

const route = useRoute();
const content = ref<HTMLElement | null>(null);
const pageLabel = computed(() => {
  if (route.name === 'worlds-create') return 'Create a world';
  if (route.name === 'worlds-edit') return 'Edit world';
  return 'World overview';
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    content.value?.focus();
  },
);
</script>

<template>
  <div class="worlds-feature min-h-screen bg-[#f5f7f2] text-slate-800">
    <a class="world-skip-link" href="#worlds-content">Skip to content</a>
    <div
      class="mx-auto min-h-screen max-w-[1600px] lg:grid lg:grid-cols-[232px_minmax(0,1fr)]"
    >
      <aside
        class="flex flex-col bg-emerald-950 px-5 py-5 text-emerald-50 lg:sticky lg:top-0 lg:h-screen lg:px-6 lg:py-9"
      >
        <RouterLink
          :to="{ name: 'home' }"
          class="flex w-fit items-center gap-3 rounded-lg"
          aria-label="Skypen home"
        >
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300 text-emerald-950"
            ><WorldIcon class="h-8 w-8"
          /></span>
          <span class="text-2xl font-bold tracking-tight"
            ><span class="text-lime-300">Sky</span>pen</span
          >
        </RouterLink>
        <div
          class="mt-9 hidden text-[10px] font-semibold tracking-[0.22em] text-emerald-200/60 lg:block"
        >
          YOUR WORKSPACE
        </div>
        <nav
          aria-label="Worlds navigation"
          class="mt-5 flex flex-wrap gap-2 lg:mt-3 lg:flex-col"
        >
          <RouterLink
            :to="{ name: 'worlds' }"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
            :class="
              route.name !== 'worlds-create'
                ? 'bg-emerald-800 text-lime-200'
                : 'text-emerald-100 hover:bg-emerald-900'
            "
            :aria-current="route.name === 'worlds' ? 'page' : undefined"
          >
            <WorldIcon class="h-5 w-5" /> My worlds
          </RouterLink>
          <RouterLink
            :to="{ name: 'worlds-create' }"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
            :class="
              route.name === 'worlds-create'
                ? 'bg-emerald-800 text-lime-200'
                : 'text-emerald-100 hover:bg-emerald-900'
            "
          >
            <span
              class="flex h-5 w-5 items-center justify-center text-xl"
              aria-hidden="true"
              >+</span
            >
            New world
          </RouterLink>
        </nav>
        <div
          class="mt-auto hidden border-t border-emerald-800/70 pt-6 lg:block"
        >
          <p class="text-sm leading-relaxed text-emerald-100/75">
            Every great story starts with a world.
          </p>
          <p
            class="mt-3 text-[10px] font-semibold tracking-[0.2em] text-lime-300"
          >
            MAKE ROOM FOR IMAGINATION
          </p>
        </div>
      </aside>
      <div class="min-w-0">
        <header
          class="border-b border-emerald-950/10 bg-white/70 px-5 py-5 sm:px-9 lg:px-12"
        >
          <nav aria-label="Breadcrumb" class="text-sm">
            <ol class="flex flex-wrap items-center gap-2 text-slate-500">
              <li>
                <RouterLink
                  :to="{ name: 'home' }"
                  class="rounded hover:text-emerald-800"
                  >Workspace</RouterLink
                >
              </li>
              <li aria-hidden="true">/</li>
              <li
                v-if="route.name === 'worlds'"
                aria-current="page"
                class="font-medium text-emerald-950"
              >
                My worlds
              </li>
              <template v-else>
                <li>
                  <RouterLink
                    :to="{ name: 'worlds' }"
                    class="rounded hover:text-emerald-800"
                    >My worlds</RouterLink
                  >
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" class="font-medium text-emerald-950">
                  {{ pageLabel }}
                </li>
              </template>
            </ol>
          </nav>
        </header>
        <div
          id="worlds-content"
          ref="content"
          tabindex="-1"
          class="px-5 py-8 outline-none sm:px-9 lg:px-12 lg:py-11"
        >
          <RouterView v-slot="{ Component, route: childRoute }"
            ><component :is="Component" :key="childRoute.path"
          /></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.worlds-feature {
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.worlds-feature :is(a, button, input, textarea, select):focus-visible {
  outline: 3px solid #65a30d;
  outline-offset: 4px;
}
.worlds-feature .world-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid #d5ded6;
  border-radius: 0.75rem;
  background: white;
  padding: 0.65rem 1.15rem;
  color: #064e3b;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition:
    background-color 150ms,
    border-color 150ms;
}
.worlds-feature .world-button:hover:not(:disabled) {
  background: #ecfdf5;
  border-color: #6b9d86;
}
.worlds-feature .world-button-primary {
  background: #bef264;
  border-color: #bef264;
  color: #052e16;
}
.worlds-feature .world-button-primary:hover:not(:disabled) {
  background: #a3e635;
  border-color: #a3e635;
}
.worlds-feature .world-button-danger {
  background: #b91c1c;
  border-color: #b91c1c;
  color: white;
}
.worlds-feature .world-button-danger:hover:not(:disabled) {
  background: #991b1b;
  border-color: #991b1b;
}
.worlds-feature button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.worlds-feature .world-field {
  width: 100%;
  border: 1px solid #cbd5cd;
  border-radius: 0.75rem;
  background: white;
  padding: 0.75rem 0.9rem;
  font: inherit;
  color: #1e293b;
}
.worlds-feature .world-field::placeholder {
  color: #64748b;
}
.worlds-feature .world-skip-link {
  position: fixed;
  top: -100px;
  left: 1rem;
  z-index: 60;
  border-radius: 0.5rem;
  background: #bef264;
  padding: 0.75rem 1rem;
  color: #052e16;
}
.worlds-feature .world-skip-link:focus {
  top: 1rem;
}
</style>
