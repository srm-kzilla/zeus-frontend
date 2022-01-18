import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import AllEvents from "../views/AllEvents.vue";
import Event from "../views/Event.vue";
import Create from "../views/Create.vue";

const isAuth = true;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: isAuth ? AllEvents : Home,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },

  {
    path: "/event/:id",
    name: "Event",
    component: Event,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
