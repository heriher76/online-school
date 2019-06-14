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
      component: require("./views/Home.vue").default,
      // meta: {
      //   requiresAuth:true
      // }
    },

    // -----------------------------auth-----------------------------
    {
      path: "/login",
      name: 'login',
      component: () => import("./views/auth/Login.vue"),
      meta: {
        requiresVisitor:true
      }
    },
    {
      path: "/logout",
      name: 'logout',
      component: () => import("./views/auth/Logout.vue")
    },

    {
      path: "/register",
      name: 'register',
      component: () => import("./views/auth/Register.vue"),
      meta: {
        requiresVisitor:true
      }
    },

    {
      path: "/forgot password",
      name: 'forgot_pass',
      component: () => import("./views/auth/ForgotPassword.vue"),
      meta: {
        requiresVisitor:true
      }
    },

    {
      path: "/reset password",
      name: 'reset_pass',
      component: () => import("./views/auth/ResetPassword.vue")
    },

    // -----------------------------poin saldo-----------------------------
    {
      path: "/my poin",
      name: 'my_poin',
      component: () => import("./views/siswa/MyPoin.vue"),
      meta: {
        requiresAuth:true
      }
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
      props: true,
      component: () => import("./views/informasi/ReadMore.vue")
    },

    // -----------------------------cereout-----------------------------
    {
      path: "/cereout/dashboard",
      name: 'dashboard',
      component: () => import("./views/cereout/Dashboard.vue"),
      meta: {
        requiresAuth: true
      }
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
      component: () => import("./views/cereout/exams/ExamDetails.vue"),
      props:true
    },

    {
      path: "/cereout/exams/start/:id/:durasi/:attemptId",
      name: 'exam_page',
      meta: {layout: "exam"},
      component: () => import("./views/cereout/exams/ExamPage.vue"),
      props:true
    },

    {
      path: "/cereout/results",
      name: 'my_results',
      component: () => import("./views/cereout/Results.vue")
    },

    {
      path: "/cereout/results/detail",
      name: 'result_detail',
      component: () => import("./views/cereout/ResultDetail.vue"),
      props: true
    },

    // -----------------------------cerecall-----------------------------
    {
      path: "/cerecall",
      name: 'cerecall',
      component: () => import("./views/cerecall/Index.vue")
    },

    {
      path: "/cerecall/ulasan/:guruId",
      name: 'cerecall_ulasan',
      component: () => import("./views/cerecall/Ulasan.vue")
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
      path: "/cerevid/semua-pelajaran",
      name: "cerevid_semua_pelajaran",
      component: () => import("./views/cerevid/semuaPelajaran.vue")
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
      path: "/cerevid/detail-pelajaran/:id",
      name: "cerevid_detail_pelajaran",
      component: () => import("./views/cerevid/detailPelajaran.vue")
    },
    {
      path: "/cerevid/detail-pelajaran/:id/materi",
      name: "cerevid_materi",
      component: () => import("./views/cerevid/materi.vue")
    },
    // -----------------------------Cerelisasi-----------------------------
    {
      path: "/cerelisasi",
      name: "cerelisasi_form_input",
      component: () => import("./views/cerelisasi/formInput.vue")
    },
    {
      path: "/cerelisasi/form-input-siswa",
      name: "cerelisasi_form_input_siswa",
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


    // -----------------------------siswa-----------------------------
    {
      path: "/my account",
      name: 'my_account',
      component: () => import("./views/siswa/MyAccount.vue")
    },


    // -----------------------------Guru---------------------------
    {
      path: "/guru",
      name: 'dashboard_guru',
      meta: {layout: "guru"},
      component: () => import("./views/guru/dashboard/Index.vue")
    },
    {
      path: "/guru/login",
      name: 'login_guru',
      meta: {layout: "guru"},
      component: () => import("./views/guru/Login.vue")
    },
    {
      path: "/guru/forgot-password",
      name: 'forgot_guru',
      meta: {layout: "guru"},
      component: () => import("./views/guru/ForgotPassword.vue")
    },
    {
      path: "/guru/pusat-bantuan",
      name: 'guru_pusat_bantuan',
      meta: {layout: "guru"},
      component: () => import("./views/guru/dashboard/PusatBantuan.vue")
    },
    {
      path: "/guru/cerecall",
      name: 'cerecall_guru',
      meta: {layout: "guru"},
      component: () => import("./views/guru/cerecall/History.vue")
    },
    {
      path: "/guru/cerecall/chat",
      name: 'chat_guru',
      meta: {layout: "guru"},
      component: () => import("./views/guru/cerecall/ChatPage.vue")
    },
    {
      path: "/guru/profile",
      name: 'profile_guru',
      meta: {layout: "guru"},
      component: () => import("./views/guru/dashboard/MyProfile.vue")
    },
    {
      path: "/guru/account",
      name: 'account_guru',
      meta: {layout: "guru"},
      component: () => import("./views/guru/dashboard/AccountEdit.vue")
    },
    {
      path: "/guru/cerevid",
      name: "cerevid_dashboard_guru",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/daftarPelajaranGuru.vue")
    },
    {
      path: "/guru/cerevid/daftar-pelajaran",
      name: "cerevid_daftar_pelajaran_guru",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/daftarPelajaranGuru.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/section/:idSection/video/:idVideo",
      name: "cerevid_detail_video",
      component: () => import("./views/cerevid/detailVideo.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/section/:idSection/quiz/:idQuiz",
      name: "cerevid_detail_quiz",
      component: () => import("./views/cerevid/detailQuiz.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/section/:idSection/text/:idText",
      name: "cerevid_detail_text",
      component: () => import("./views/cerevid/detailText.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id",
      name: "cerevid_detail_pelajaran_guru",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/detailPelajaranGuru.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/edit",
      name: "cerevid_edit_pelajaran_guru",
      component: () => import("./views/cerevid/editPelajaranGuru.vue")
    },
    {
      path: "/guru/cerevid/tambah-pelajaran",
      name: "cerevid_tambah_pelajaran",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/tambahPelajaran.vue")
    },

    // -----------------------------Menu Lainnya---------------------------
    {
      path: "/pusat bantuan",
      name: 'pusat_bantuan_siswa',
      component: () => import("./views/PusatBantuan.vue")
    }
  ]
});
