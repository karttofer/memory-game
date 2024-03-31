import { createRouter, createWebHashHistory } from "vue-router";
import InGameView from "../views/InGameView.vue";

const routes = [
  {
    path: "/",
    name: "Ingame",
    component: InGameView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
