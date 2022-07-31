import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AllEvents from "../views/AllEvents.vue";
import Event from "../views/Event.vue";
import Login from "../views/Login.vue";
import { isAuth } from "../utils/authStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: isAuth.value ? AllEvents : Login,
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
router.beforeEach((to, from) => {
  if (!isAuth.value && to.name !== "Home") {
    return { name: "Home" };
  }
});

export default router;
