import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ThreatModellingView from "@/views/ThreatModellingView.vue";
import ReportsHistoryView from "@/views/ReportsHistoryView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/threat-modelling",
    name: "threat-modelling",
    component: ThreatModellingView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ReportsHistoryView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
