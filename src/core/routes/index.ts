import { createMemoryHistory, createRouter, RouteRecordRaw } from "vue-router";

import Homepage from "../layout/Homepage.vue";
import { worldRoutes } from "../../features/worlds/routes.ts";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: Homepage },
  ...worldRoutes,
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
