import Vue from "vue";
import Vuex from "vuex";

import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'http://api.ceredinas.id/api'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null, //get token,
    info: [],
    cek: "dataku"
  },

  getters: {
    loggedIn(state){ //check token
      return state.token != null
    }
  },

  mutations: {
    retrieveToken(state,token){
      state.token = token
    },

    destroyToken(state) {
      state.token = null
    },

    SET_INFO(state, info){
      state.info = info
    }
  },

  actions: {
    //login function
    retrieveToken(context, credentials){
      return new Promise((resolve, reject) => {
        axios.post('/auth/login',{
          email: credentials.email,
          password: credentials.password
        })
        .then(response => {
          const token = response.data.access_token
          localStorage.setItem('access_token', token)
          context.commit('retrieveToken', token)
          resolve(response)
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // /logout function
    destroyToken(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if(context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/auth/logout')
          .then(response => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            resolve(response)
            // console.log(response.data)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            reject(error)
          })
        })
      }
    },

    loadInformation(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/master/information')
      .then(response => {
        console.log(response.data)
      })
      // .then(info => {
      //   commit('SET_INFO', info)
      // })
    }
  }
});
