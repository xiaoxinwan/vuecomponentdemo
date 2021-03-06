import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/form",
      component: () => import("./views/form.vue")
    },
    {
      path: "/",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/About.vue")
    },
    {
      path: "/checkbox",
      component: () => import("./views/checkbox.vue")
    },
    {
      path: "/display",
      component: () => import("./views/display.vue")
    },
    {
      path: "/alert",
      component: () => import("./views/alert.vue")
    }
  ]
});
