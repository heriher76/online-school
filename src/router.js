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
      component: require("./views/Home.vue").default
    },

    // -----------------------------auth-----------------------------
    {
      path: "/login",
      name: 'login',
      component: () => import("./views/auth/Login.vue")
    },
    {
      path: "/register",
      name: 'register',
      component: () => import("./views/auth/Register.vue")
    },

    // -----------------------------informasi-----------------------------
    {
      path: "/informasi",
      name: 'informasi',
      component: () => import("./views/informasi/Index.vue")
    },

    {
      path: "/informasi/detail",
      name: 'detail_informasi',
      component: () => import("./views/informasi/ReadMore.vue")
    },

    // -----------------------------cereout-----------------------------
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
      component: () => import("./views/cereout/exams/MyExams.vue")
    },

    {
      path: "/cereout/exams/detail",
      name: 'details_exams',
      component: () => import("./views/cereout/exams/ExamDetails.vue")
    },

    {
      path: "/cereout/exams/start",
      name: 'exam_page',
      meta: {layout: "exam"},
      component: () => import("./views/cereout/exams/ExamPage.vue")
    },

    {
      path: "/cereout/results",
      name: 'my_results',
      component: () => import("./views/cereout/Results.vue")
    },

    {
      path: "/cereout/results/detail/:id",
      name: 'result_detail',
      component: () => import("./views/cereout/ResultDetail.vue")
    },

    // -----------------------------cerecall-----------------------------
    {
      path: "/cerecall",
      name: 'cerecall',
      component: () => import("./views/cerecall/Index.vue")
    },

    {
      path: "/cerecall/chat/:guruId",
      name: 'cerecall_chat',
      component: () => import("./views/cerecall/ChatPage.vue")
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
      path: "/cerevid/daftar-pelajaran",
      name: "cerevid_daftar_pelajaran",
      component: () => import("./views/cerevid/daftarPelajaran.vue")
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
    {
      path: "/cerevid/guru/daftar-pelajaran",
      name: "cerevid_daftar_pelajaran_guru",
      component: () => import("./views/cerevid/daftarPelajaranGuru.vue")
    },
    {
      path: "/cerevid/guru/detail-pelajaran",
      name: "cerevid_detail_pelajaran_guru",
      component: () => import("./views/cerevid/detailPelajaranGuru.vue")
    },
    {
      path: "/cerevid/guru/tambah-pelajaran",
      name: "cerevid_tambah_pelajaran",
      component: () => import("./views/cerevid/tambahPelajaran.vue")
    },
    // -----------------------------Cerelisasi-----------------------------
    {
      path: "/cerelisasi",
      name: "cerelisasi_form_input",
      component: () => import("./views/cerelisasi/formInput.vue")
    },
    {
      path: "/cerelisasi/hasil-analisis",
      name: "cerelisasi_analisis",
      component: () => import("./views/cerelisasi/hasilAnalisis.vue")
    },
    {
      path: "/cerelisasi/riwayat",
      name: "cerelisasi_riwayat",
      component: () => import("./views/cerelisasi/riwayat.vue")
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
    },
    // -----------------------------Guru---------------------------
    {
      path: "/guru",
      name: 'dashboard_guru',
      component: () => import("./views/guru/dashboard/Index.vue")
    },
    {
      path: "/guru/login",
      name: 'login_guru',
      component: () => import("./views/guru/Login.vue")
    },
    {
      path: "/guru/forget",
      name: 'forget_guru',
      component: () => import("./views/guru/Forget.vue")
    },
    {
      path: "/guru/cerecall",
      name: 'cerecall_guru',
      component: () => import("./views/guru/cerecall/History.vue")
    },
    {
      path: "/guru/cerecall/chat",
      name: 'chat_guru',
      component: () => import("./views/guru/cerecall/ChatPage.vue")
    },
    {
      path: "/guru/profile/edit",
      name: 'profile_guru',
      component: () => import("./views/guru/dashboard/ProfileEdit.vue")
    },
    {
      path: "/guru/account/edit",
      name: 'account_guru',
      component: () => import("./views/guru/dashboard/AccountEdit.vue")
    }
  ]
});
