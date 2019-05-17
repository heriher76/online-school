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
      path: "/cereout/exams/:examType",
      name: 'my_exams',
      component: () => import("./views/cereout/exams/MyExams.vue")
    },

    {
      path: "/cereout/exams/:examType/exams details",
      name: 'details_exams',
      component: () => import("./views/cereout/exams/ExamDetails.vue")
    },

    {
      path: "/cereout/results",
      name: 'my_results',
      component: () => import("./views/cereout/Results.vue")
    },

    {
      path: "/cerecall",
      name: 'cerecall',
      component: () => import("./views/cerecall/Index.vue")
    },
    // -----------------------------cerevid-----------------------------
    {
      path: "/cerevid",
      name: "cerevid_home",
      component: () => import("./views/cerevid/home.vue")
    },
    {
      path: "/cerevid/wishlist",
      name: "cerevid_wishlist",
      component: () => import("./views/cerevid/wishlist.vue")
    },
    {
      path: "/cerevid/daftar-pelajaranku",
      name: "cerevid_daftar-pelajaranku",
      component: () => import("./views/cerevid/daftarPelajaranku.vue")
    },
    {
      path: "/cerevid/detail-pelajaran",
      name: "cerevid_detail_pelajaran",
      component: () => import("./views/cerevid/detailIkhtisar.vue")
    },
    {
      path: "/cerevid/detail-pelajaran/ikhtisar",
      name: "cerevid_ikhtisar",
      component: () => import("./views/cerevid/detailIkhtisar.vue")
    },
    {
      path: "/cerevid/detail-pelajaran/kurikulum",
      name: "cerevid_kurikulum",
      component: () => import("./views/cerevid/detailKurikulum.vue")
    },
    {
      path: "/cerevid/detail-pelajaran/ulasan",
      name: "cerevid_ulasan",
      component: () => import("./views/cerevid/detailUlasan.vue")
    },
    {
      path: "/cerevid/detail-pelajaran/profil-pengajar",
      name: "cerevid_profil_pengajar",
      component: () => import("./views/cerevid/detailProfilPengajar.vue")
    },
    {
      path: "/cerevid/detail-pelajaran/materi",
      name: "cerevid_materi",
      component: () => import("./views/cerevid/materi.vue")
    },
    // -----------------------------Lainnya-----------------------------
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
