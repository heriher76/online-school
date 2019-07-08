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
      meta: {layout: "default"},
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
        requiresVisitor:true,
        layout: "default"
      },
      props:true
    },
    {
      path: "/logout",
      name: 'logout',
      meta: {layout: "default"},
      component: () => import("./views/auth/Logout.vue")
    },

    {
      path: "/register",
      name: 'register',
      component: () => import("./views/auth/Register.vue"),
      meta: {
        requiresVisitor:true,
        layout: "default"
      }
    },

    {
      path: "/forgot password",
      name: 'forgot_pass',
      component: () => import("./views/auth/ForgotPassword.vue"),
      meta: {
        requiresVisitor:true,
        layout: "default"
      }
    },

    {
      path: "/reset password",
      name: 'reset_pass',
      component: () => import("./views/auth/ResetPassword.vue"),
      meta: {
        requiresVisitor:true,
        layout: "default"
      }
    },

    {
      path: '/membership',
      name: 'membership',
      component: () => import("./views/siswa/Membership.vue"),
      meta: {
        requiresAuth:true,
        layout: "default"
      }
    },
    {
      path: '/membership/history',
      name: 'membership_history',
      component: () => import("./views/siswa/MembershipHistory.vue"),
      props: true,
      meta: {
        requiresAuth:true,
        layout: "default"
      }
    },

    // -----------------------------poin saldo-----------------------------
    {
      path: "/my poin",
      name: 'my_poin',
      component: () => import("./views/siswa/MyPoin.vue"),
      meta: {
        requiresAuth:true,
        layout: "default"
      }
    },
    {
      path: "/my poin/history",
      name: 'myPoin_history',
      component: () => import("./views/siswa/MyPoinHistory.vue"),
      props:true,
      meta: {
        requiresAuth:true,
        layout: "default"
      }
    },

    // -----------------------------informasi-----------------------------
    {
      path: "/informasi",
      name: 'informasi',
      meta: {layout: "default"},
      component: () => import("./views/informasi/Index.vue"),
      // meta: {
      //   requiresVisitor:true
      // }
    },

    {
      path: "/informasi/detail",
      name: 'detail_informasi',
      props: true,
      meta: {layout: "default"},
      component: () => import("./views/informasi/ReadMore.vue"),
      // meta: {
      //   requiresVisitor:true
      // }
    },

    {
      path: "/kebijakan-privasi",
      name: 'kebijakan_privasi',
      meta: {layout: "default"},
      component: () => import("./views/informasi/KebijakanPrivasi.vue"),
    },

    {
      path: "/panduan-siswa",
      name: 'panduan_siswa',
      meta: {layout: "default"},
      component: () => import("./views/informasi/PanduanSiswa.vue"),
    },

    {
      path: "/panduan-guru",
      name: 'panduan_guru',
      meta: {layout: "default"},
      component: () => import("./views/informasi/PanduanGuru.vue"),
    },

    {
      path: "/syarat-ketentuan",
      name: 'syarat_ketentuan',
      meta: {layout: "default"},
      component: () => import("./views/informasi/SyaratKetentuan.vue"),
    },

    {
      path: "/FAQ",
      name: 'FAQ',
      meta: {layout: "default"},
      component: () => import("./views/informasi/FAQ.vue")
    },
    {
      path: "/pusat bantuan",
      name: 'pusat_bantuan_siswa',
      meta: {layout: "default"},
      component: () => import("./views/informasi/PusatBantuan.vue")
    },
    // -----------------------------cereout-----------------------------
    {
      path: "/cereout/dashboard",
      name: 'dashboard',
      component: () => import("./views/cereout/Dashboard.vue"),
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },
    {
      path: "/cereout/leader board",
      name: 'leader_board',
      component: () => import("./views/cereout/LeaderBoard.vue"),
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },

    {
      path: "/cereout/exams",
      name: 'my_exams',
      component: () => import("./views/cereout/exams/MyExams.vue"),
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },

    {
      path: "/cereout/exams/detail",
      name: 'details_exams',
      component: () => import("./views/cereout/exams/ExamDetails.vue"),
      props:true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },

    {
      path: "/cereout/exams/start/:id/:scoringSystem/:attemptId",
      name: 'exam_page',
      meta: {layout: "exam"},
      component: () => import("./views/cereout/exams/ExamPage.vue"),
      props:true,
      // meta: {
      //   requiresAuth: true
      // }
    },

    {
      path: "/cereout/exam result",
      name: 'exam_result',
      meta: {layout: "exam"},
      component: () => import("./views/cereout/exams/ExamResult.vue"),
      props:true,
      // meta: {
      //   requiresAuth: true
      // }
    },

    {
      path: "/cereout/results",
      name: 'my_results',
      component: () => import("./views/cereout/results/Results.vue"),
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },

    {
      path: "/cereout/results view/:id/:name",
      name: 'results_view',
      component: () => import("./views/cereout/results/ResultsView.vue"),
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },

    {
      path: "/cereout/results/detail/:id",
      name: 'result_detail',
      component: () => import("./views/cereout/results/ResultDetail.vue"),
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },

    {
      path: "/cereout/hubungi kami",
      name: 'hubungi_kami',
      component: () => import("./views/cereout/HubungiKami.vue"),
      props: true,
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },

    // -----------------------------cerecall-----------------------------
    {
      path: "/cerecall",
      name: 'cerecall',
      component: () => import("./views/cerecall/Index.vue"),
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },
    {
      path: "/cerecall/history",
      name: 'cerecall_history',
      component: () => import("./views/cerecall/History.vue"),
      meta: {
        requiresAuth: true,
        layout: "default"
      }
    },

    {
      path: "/cerecall/ulasan/:guruId",
      name: 'cerecall_ulasan',
      meta: {layout: "default"},
      component: () => import("./views/cerecall/Ulasan.vue")
    },

    {
      path: "/cerecall/chat",
      name: 'cerecall_chat',
      meta: {layout: "default"},
      component: () => import("./views/cerecall/ChatPage.vue")
    },

    // -----------------------------cerefo-----------------------------
    {
      path: "/cerefo",
      name: 'cerefo',
      meta: {layout: "default"},
      component: () => import("./views/cerefo/Index.vue")
    },

    {
      path: "/cerefo/detail-postingan/:id",
      name: 'cerefo_detail_post',
      meta: {layout: "default"},
      component: () => import("./views/cerefo/DetailPost.vue")
    },

    // -----------------------------cerejur-----------------------------
    {
      path: "/cerejur",
      name: 'cerejur',
      meta: {layout: "default"},
      component: () => import("./views/cerejur/Index.vue")
    },

    {
      path: "/cerejur/detail-universitas",
      name: 'cerejur_detail_universitas',
      props: true,
      meta: {layout: "default"},
      component: () => import("./views/cerejur/DetailUniversitas.vue")
    },

    {
      path: "/cerejur/detail-universitas/detail-jurusan",
      name: 'cerejur_detail_jurusan',
      props: true,
      meta: {layout: "default"},
      component: () => import("./views/cerejur/DetailJurusan.vue")
    },

    // -----------------------------cerevid-----------------------------
    {
      path: "/cerevid",
      name: "cerevid_home",
      meta: {layout: "default"},
      component: () => import("./views/cerevid/home.vue")
    },
    {
      path: "/cerevid/semua-pelajaran",
      name: "cerevid_semua_pelajaran",
      meta: {layout: "default"},
      component: () => import("./views/cerevid/semuaPelajaran.vue")
    },
    {
      path: "/cerevid/favorit",
      name: "cerevid_favorit",
      meta: {layout: "default"},
      component: () => import("./views/cerevid/wishlist.vue")
    },
    {
      path: "/cerevid/daftar-pelajaran",
      name: "cerevid_daftar_pelajaran",
      meta: {layout: "default"},
      component: () => import("./views/cerevid/daftarPelajaran.vue")
    },
    {
      path: "/cerevid/detail-pelajaran/:id",
      name: "cerevid_detail_pelajaran",
      meta: {layout: "default"},
      component: () => import("./views/cerevid/detailPelajaran.vue")
    },
    {
      path: "/cerevid/detail-pelajaran/:id/materi",
      name: "cerevid_materi",
      meta: {layout: "default"},
      component: () => import("./views/cerevid/materi.vue")
    },
    // -----------------------------Cerelisasi-----------------------------
    {
      path: "/cerelisasi",
      name: "cerelisasi_form_input",
      meta: {layout: "default"},
      component: () => import("./views/cerelisasi/formInput.vue")
    },
    {
      path: "/cerelisasi/form-input-siswa",
      name: "cerelisasi_form_input_siswa",
      meta: {layout: "default"},
      component: () => import("./views/cerelisasi/formInput.vue")
    },
    {
      path: "/cerelisasi/hasil-analisis",
      name: "cerelisasi_analisis",
      meta: {layout: "default"},
      component: () => import("./views/cerelisasi/hasilAnalisis.vue")
    },
    {
      path: "/cerelisasi/riwayat",
      name: "cerelisasi_riwayat",
      meta: {layout: "default"},
      component: () => import("./views/cerelisasi/riwayat.vue")
    },
    // -----------------------------Lainnya-----------------------------

    {
      path: "/about",
      name: "about",
      meta: {layout: "default"},
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
      meta: {layout: "default"},
      component: () => import("./views/siswa/MyAccount.vue"),
      props:true
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
      path: "/guru/cerecall/chat/:id",
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
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/detailVideo.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/section/:idSection/quiz/:idQuiz",
      name: "cerevid_detail_quiz",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/detailQuiz.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/section/:idSection/text/:idText",
      name: "cerevid_detail_text",
      meta: {layout: "guru"},
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
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/editPelajaranGuru.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/:idSection/tambah-video",
      name: "cerevid_tambah_video",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/tambahVideo.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/:idSection/tambah-text",
      name: "cerevid_tambah_text",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/tambahText.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/:idSection/tambah-quiz",
      name: "cerevid_tambah_quiz",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/tambahQuiz.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/:idSection/quiz",
      name: "cerevid_list_quiz",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/listQuiz.vue")
    },
    {
      path: "/guru/cerevid/detail-pelajaran/:id/:idSection/quiz/:idQuiz/question/:idQuestion",
      name: "cerevid_detail_pertanyaan",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/detailPertanyaan.vue")
    },
    {
      path: "/guru/cerevid/tambah-pelajaran",
      name: "cerevid_tambah_pelajaran",
      meta: {layout: "guru"},
      component: () => import("./views/cerevid/tambahPelajaran.vue")
    },
  ]
});
