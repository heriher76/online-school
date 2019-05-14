import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/cereout/dashboard",
      name: 'dashboard',
      component: () => import("./views/cereout/Dashboard.vue")
    },
    {
      path: "/cereout/leader board",
      name: 'leader_board',
      component: () => import("./views/cereout/LeaderBoard.vue")
    },
    {
      path: "/cereout/exams",
      name: 'my_exams',
      component: () => import("./views/cereout/exams/TodaysExam.vue")
    },
    {
      path: "/cereout/exams/purchased exams",
      name: 'my_exams',
      component: () => import("./views/cereout/exams/PurchasedExam.vue")
    },
    {
      path: "/cereout/exams/upcoming exams",
      name: 'my_exams',
      component: () => import("./views/cereout/exams/UpcomingExam.vue")
    },
    {
      path: "/cereout/exams/expired exams",
      name: 'my_exams',
      component: () => import("./views/cereout/exams/ExpiredExam.vue")
    },
    {
      path: "/cereout/results",
      name: 'my_results',
      component: () => import("./views/cereout/Results.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
