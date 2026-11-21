import type { RouteRecordRaw } from 'vue-router';
import WorldsView from './views/WorldsView.vue';
import WorldsLayout from './components/WorldsLayout.vue';
import WorldCreateView from './views/WorldCreateView.vue';
import WorldDetailView from './views/WorldDetailView.vue';
import WorldEditView from './views/WorldEditView.vue';

export const worldRoutes: RouteRecordRaw[] = [
  {
    path: '/worlds',
    component: WorldsLayout,
    children: [
      { path: '', name: 'worlds', component: WorldsView },
      { path: 'new', name: 'worlds-create', component: WorldCreateView },
      {
        path: ':worldId',
        name: 'worlds-detail',
        component: WorldDetailView,
        props: true,
      },
      {
        path: ':worldId/edit',
        name: 'worlds-edit',
        component: WorldEditView,
        props: true,
      },
    ],
  },
];
