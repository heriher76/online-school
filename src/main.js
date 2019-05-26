import Vue from "vue";
import './plugins/vuetify';

import VueSweetalert2 from 'vue-sweetalert2';

import App from "./App.vue";
import router from "./router";
import store from "./store";

import Default from "./layouts/Default.vue";
import Exam from "./layouts/Exam.vue";

Vue.use(VueSweetalert2);
Vue.component('default-layout', Default);
Vue.component('exam-layout', Exam);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

//middleware router
//tambahan meta route
router.beforeEach((to, from, next) => {
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
    next()
  }
})