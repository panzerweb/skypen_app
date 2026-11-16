import type { RouteRecordRaw } from "vue-router";
import WorldsView from "./views/WorldsView.vue";

export const worldRoutes: RouteRecordRaw[] = [
  {
    path: "/worlds",
    name: "worlds",
    component: WorldsView,
  },
];
