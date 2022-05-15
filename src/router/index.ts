import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AllEvents from "../views/AllEvents.vue";
import Event from "../views/Event.vue";

const isAuth = true;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: isAuth && AllEvents,
  },

  {
    path: "/event/:id",
    name: "Event",
    component: Event,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
