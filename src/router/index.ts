import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AllEvents from "../views/AllEvents.vue";
import Event from "../views/Event.vue";
import Login from "../views/Login.vue";

const isAuth = localStorage.getItem("token");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: isAuth ? AllEvents : Login,
  },

  {
    path: "/event/:slug",
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
