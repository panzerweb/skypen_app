<script setup lang="ts">
import { computed, ref } from 'vue';
import type { WorldCreatePayload } from '../types';
const props = withDefaults(
  defineProps<{
    initialValues?: WorldCreatePayload;
    pending?: boolean;
    error?: string | null;
    submitLabel?: string;
  }>(),
  { pending: false, error: null, submitLabel: 'Create world' },
);
const emit = defineEmits<{
  submit: [payload: WorldCreatePayload];
  cancel: [];
}>();
const name = ref(props.initialValues?.name ?? '');
const description = ref(props.initialValues?.description ?? '');
const attempted = ref(false);
const nameError = computed(() => {
  if (!name.value.trim()) return 'Give your world a name.';
  if (name.value.trim().length > 120) return 'Use 120 characters or fewer.';
  return '';
});
function submit() {
  if (props.pending) return;
  attempted.value = true;
  if (nameError.value) return;
  emit('submit', {
    name: name.value.trim(),
    description: description.value.trim(),
  });
}
</script>

<template>
  <form
    class="rounded-2xl border border-emerald-950/10 bg-white p-6 sm:p-8"
    novalidate
    :aria-busy="pending"
    @submit.prevent="submit"
  >
    <div>
      <h2 class="text-lg font-semibold text-emerald-950">World details</h2>
      <p class="mt-1 text-sm leading-6 text-slate-500">
        Start with a name and a little inspiration.
      </p>
    </div>
    <div
      v-if="error"
      role="alert"
      class="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 break-words text-red-800"
    >
      {{ error }}
    </div>
    <fieldset :disabled="pending" class="mt-7 min-w-0 space-y-6">
      <legend class="sr-only">World details</legend>
      <div>
        <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
          <label for="world-name" class="text-sm font-semibold text-emerald-950"
            >World name
            <span class="font-normal text-slate-500">(required)</span></label
          ><span class="text-xs text-slate-500">{{ name.length }}/120</span>
        </div>
        <input
          id="world-name"
          v-model="name"
          class="world-field"
          type="text"
          required
          maxlength="120"
          autocomplete="off"
          placeholder="e.g. The Verdant Isles"
          :aria-invalid="attempted && Boolean(nameError)"
          :aria-describedby="
            attempted && nameError ? 'world-name-error' : undefined
          "
        />
        <p
          v-if="attempted && nameError"
          id="world-name-error"
          role="alert"
          class="mt-2 text-sm text-red-700"
        >
          {{ nameError }}
        </p>
      </div>
      <div>
        <label
          for="world-description"
          class="mb-2 block text-sm font-semibold text-emerald-950"
          >Description
          <span class="font-normal text-slate-500">(optional)</span></label
        >
        <textarea
          id="world-description"
          v-model="description"
          class="world-field min-h-48 resize-y"
          rows="7"
          placeholder="What makes this world yours? Describe its landscapes, its people, or the story waiting to unfold."
          aria-describedby="world-description-hint"
        />
        <p
          id="world-description-hint"
          class="mt-2 text-xs leading-5 text-slate-500"
        >
          A short introduction is enough. You can always change it later.
        </p>
      </div>
    </fieldset>
    <div
      class="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-6"
    >
      <button
        class="world-button"
        type="button"
        :disabled="pending"
        @click="emit('cancel')"
      >
        Cancel
      </button>
      <button
        class="world-button world-button-primary"
        type="submit"
        :disabled="pending"
      >
        <span v-if="pending" role="status">Saving world…</span
        ><span v-else>{{ submitLabel }}</span
        ><span v-if="!pending" aria-hidden="true">&rarr;</span>
      </button>
    </div>
  </form>
</template>
