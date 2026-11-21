<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
const props = defineProps<{
  worldName: string;
  pending: boolean;
  error?: string | null;
}>();
const emit = defineEmits<{ confirm: []; cancel: [] }>();
const dialog = ref<HTMLDialogElement | null>(null);
let previousFocus: HTMLElement | null = null;
onMounted(() => {
  previousFocus =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  dialog.value?.showModal();
});
onBeforeUnmount(() => {
  dialog.value?.close();
  if (previousFocus?.isConnected) previousFocus.focus();
});
function cancel() {
  if (!props.pending) emit('cancel');
}
</script>

<template>
  <dialog
    ref="dialog"
    class="world-delete-dialog m-auto max-h-[90vh] w-[calc(100%_-_2rem)] max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-2xl sm:p-8"
    aria-labelledby="delete-world-title"
    aria-describedby="delete-world-description"
    :aria-busy="pending"
    @cancel.prevent="cancel"
  >
    <span
      class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl font-bold text-red-700"
      aria-hidden="true"
      >!</span
    >
    <h2
      id="delete-world-title"
      class="mt-5 text-xl font-semibold text-emerald-950"
    >
      Delete this world?
    </h2>
    <p
      id="delete-world-description"
      class="mt-3 text-sm leading-6 break-words text-slate-600"
    >
      <strong class="text-slate-800">{{ worldName }}</strong> will be
      permanently deleted. This action cannot be undone.
    </p>
    <p
      v-if="error"
      role="alert"
      class="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 break-words text-red-800"
    >
      {{ error }}
    </p>
    <div class="mt-7 flex flex-wrap justify-end gap-3">
      <button
        class="world-button"
        type="button"
        autofocus
        :disabled="pending"
        @click="cancel"
      >
        Keep world
      </button>
      <button
        class="world-button world-button-danger"
        type="button"
        :disabled="pending"
        @click="!pending && emit('confirm')"
      >
        <span v-if="pending" role="status">Deleting…</span
        ><span v-else>Delete world</span>
      </button>
    </div>
  </dialog>
</template>

<style scoped>
.world-delete-dialog::backdrop {
  background: rgb(2 44 34 / 55%);
  backdrop-filter: blur(3px);
}
</style>
