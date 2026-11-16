<script setup lang="ts">
import { ref } from "vue";
import WorldSidebar from "../../../core/layout/WorldSidebar.vue";
import BaseButton from "../../../core/components/buttons/BaseButton.vue";

let worldsCount: number = 0;
let worldsCountMessage = ref("");

if (worldsCount == 1) {
  worldsCountMessage.value = `${worldsCount} world`;
} else {
  worldsCountMessage.value = `${worldsCount} worlds`;
}
</script>

<template>
  <WorldSidebar>
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <h1 class="font-semibold text-lg md:text-2xl lg:text-4xl">
          Your Worlds
        </h1>
        <p>You have created {{ worldsCountMessage }}.</p>
      </div>

      <BaseButton>Create World</BaseButton>
    </div>
  </WorldSidebar>
</template>
