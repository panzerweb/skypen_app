<script setup lang="ts">
import { RouterLink } from "vue-router";
import BaseButton from "../components/buttons/BaseButton.vue";
</script>

<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen w-full gap-6 bg-emerald-950"
  >
    <h1 class="md:text-2xl lg:text-6xl text-gray-200 font-bold">
      <span class="text-lime-400">Sky</span>pen
    </h1>
    <p class="md:text-md lg:text-xl text-gray-400">
      Build your world, map your fantasy
    </p>

    <BaseButton>
      <RouterLink :to="{ name: 'worlds' }">Let's Explore</RouterLink>
    </BaseButton>
  </div>
</template>
