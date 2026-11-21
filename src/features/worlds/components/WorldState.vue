<script setup lang="ts">
import WorldIcon from './WorldIcon.vue';
withDefaults(
  defineProps<{
    title: string;
    description?: string;
    tone?: 'default' | 'loading' | 'error';
  }>(),
  { description: '', tone: 'default' },
);
</script>

<template>
  <section
    class="rounded-2xl border border-emerald-950/10 bg-white px-6 py-14 text-center sm:py-20"
    :aria-busy="tone === 'loading'"
    :role="tone === 'error' ? 'alert' : 'status'"
  >
    <div
      class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
      :class="
        tone === 'error'
          ? 'bg-red-50 text-red-700'
          : 'bg-emerald-50 text-emerald-700'
      "
    >
      <span
        v-if="tone === 'loading'"
        class="h-7 w-7 rounded-full border-2 border-emerald-200 border-t-emerald-800 motion-safe:animate-spin"
        aria-hidden="true"
      />
      <span
        v-else-if="tone === 'error'"
        class="text-2xl font-semibold"
        aria-hidden="true"
        >!</span
      >
      <WorldIcon v-else class="h-10 w-10" />
    </div>
    <h2 class="mt-5 text-xl font-semibold tracking-tight text-emerald-950">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mx-auto mt-3 max-w-lg text-sm leading-6 break-words text-slate-600"
    >
      {{ description }}
    </p>
    <div v-if="$slots.default" class="mt-6 flex flex-wrap justify-center gap-3">
      <slot />
    </div>
  </section>
</template>
