import { createMemoryHistory, createRouter } from "vue-router";

import Homepage from "../layout/Homepage.vue";

const routes = [{ path: "/", component: Homepage }];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
