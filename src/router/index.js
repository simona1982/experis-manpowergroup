import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboard.aspirants",
        component: () => import("../views/Welcome.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/dashboard/interviews",
        name: "dashboard.interviews",
        component: () => import("../views/Interviews.vue"),
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
