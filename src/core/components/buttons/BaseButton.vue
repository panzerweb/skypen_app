<!-- 
 
    Usage:

    <BaseButton @click="handleSave">
    Save Changes
    </BaseButton>

    <BaseButton type="submit" :loading="isSaving">
    Submit
    </BaseButton>

    <BaseButton disabled>
    Disabled
    </BaseButton> 

-->

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    type: "button",
    disabled: false,
    loading: false,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center bg-lime-500 hover:bg-lime-400 gap-2 rounded-md border px-4 py-2 text-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    @click="emit('click', $event)"
  >
    <span v-if="loading">Loading...</span>
    <slot v-else />
  </button>
</template>
