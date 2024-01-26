import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClasificacionView from "@/views/ClasificacionView.vue";
import PruebasView from "@/views/PruebasView.vue";
import PerrosTable from "@/views/PerrosView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/clasificacio",
    name: "clasificacio",
    component: ClasificacionView,
  },
  {
    path: "/proves",
    name: "proves",
    component: PruebasView,
  },
  {
    path: "/gossos",
    name: "gossos",
    component: PerrosTable,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
