import Vue from "vue";
import './plugins/vuetify';

import VueSweetalert2 from 'vue-sweetalert2';
import VueGoogleCharts from 'vue-google-charts';
import VueCountdown from '@chenfengyuan/vue-countdown';
import VueCarousel from '@chenfengyuan/vue-carousel';

import UUID from 'vue-uuid';
 
import axios from 'axios';

import ReadMore from 'vue-read-more';

import App from "./App.vue";
import router from "./router";
import store from "./store";

import Default from "./layouts/Default.vue";
import Exam from "./layouts/Exam.vue";
import Guru from "./layouts/Guru.vue";

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '598859419864-m3qpm4scbbe377icfjsufmbfvq51eppt',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(UUID);

Vue.use(GAuth, gauthOption)

Vue.use(VueSweetalert2);
Vue.use(ReadMore);
Vue.use(VueGoogleCharts);
Vue.component(VueCountdown.name, VueCountdown);
Vue.component(VueCarousel.name, VueCarousel);

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