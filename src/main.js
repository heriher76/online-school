import Vue from "vue";
import './plugins/vuetify';

import VueSweetalert2 from 'vue-sweetalert2';

import axios from 'axios';

import ReadMore from 'vue-read-more';

import App from "./App.vue";
import router from "./router";
import store from "./store";

import Default from "./layouts/Default.vue";
import Exam from "./layouts/Exam.vue";
import Guru from "./layouts/Guru.vue";

Vue.use(VueSweetalert2);
Vue.use(ReadMore);
Vue.component('default-layout', Default);
Vue.component('exam-layout', Exam);
Vue.component('guru-layout', Guru);

Vue.config.productionTip = false;

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

//middleware router
//tambahan meta route
router.beforeEach((to, from, next) => {
  // const currentUser = axios.auth().currentUser;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})