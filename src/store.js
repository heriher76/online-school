import Vue from "vue";
import Vuex from "vuex";
import router from '@/router';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'http://api.ceredinas.id/api'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null, //get token,
    dataUser : localStorage.getItem('getDataUser') || null,
    info: [],
    dataPelajaran: [],
    dataDetailPelajaran: [],
    dataDetailMateri: [],
  },

  getters: {
    loggedIn(state){ //check token
      return state.token != null
    }
  },

  mutations: {
    retrieveToken(state, token){
      state.token = token
    },

    retrieveDataUser(state,dataUser){
      state.dataUser = dataUser
    },

    destroyToken(state) {
      state.token = null
    },

    destroydataUser(state) {
      state.dataUser = null
    },

//----------------------------------------informasi---------------------------------------------
    getInformation(state, info){
      state.info = info
    },
//----------------------------------------cerevid---------------------------------------------
    getDataPelajaran(state, dataPelajaran){
      state.dataPelajaran = dataPelajaran
    },

    getDataPelajaranbyLesson(state, dataPelajaranbyLesson){
      state.dataPelajaranbyLesson = dataPelajaranbyLesson
    },

    getDataDetailPelajaran(state, dataDetailPelajaran){
      state.dataDetailPelajaran = dataDetailPelajaran
    },

    getDataDetailMateri(state, dataDetailMateri){
      state.dataDetailMateri = dataDetailMateri
    }
  },

  actions: {
    //login function
    postRegister(context, r){
      return new Promise((resolve, reject) => {
        axios.post('/auth/signup',{
          name: r.name,
          email: r.email,
          password: r.password,
          password_confirmation: r.password_confirmation
        })
        .then(response => {
          console.log(response.data)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    
    //login function
    retrieveToken(context, credentials){
      return new Promise((resolve, reject) => {
        axios.post('/auth/login',{
          email: credentials.email,
          password: credentials.password
        })
        .then(response => {
          const token    = response.data.access_token
          const dataUser = response.data.data.id
          localStorage.setItem('access_token', token)
          localStorage.setItem('getDataUser', dataUser)
          context.commit('retrieveToken', token)
          context.commit('retrieveDataUser', dataUser)
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
        // return new Promise((resolve, reject) => {
          axios.get('/auth/logout')
          .then(response => {
            localStorage.removeItem('getDataUser')
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            context.commit('destroydataUser')
            // resolve(response)
            // console.log(response.data)
          })
          .catch(error => {
            localStorage.removeItem('getDataUser')
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            context.commit('destroydataUser')
            // reject(error)
          })
        // })
      }
    },

    // loadInformation(context){
    //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
    //   axios.get('/master/information')
    //   .then(response => {
    //     // console.log(response.data)
    //     context.commit('getInformation', response.data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // },

//---------------------------------cerevid function-----------------------------------------------
    getDataPelajaran(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/courses')
      .then(response => {
        context.commit('getDataPelajaran', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataPelajaranbyLesson(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/courses/lesson/1')
      .then(response => {
        context.commit('getDataPelajaranbyLesson', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataDetailPelajaran(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/courses/'+router.currentRoute.params.id)
      .then(response => {
        context.commit('getDataDetailPelajaran', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataDetailMateri(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/courses/'+router.currentRoute.params.id+'/sections')
      .then(response => {
        context.commit('getDataDetailMateri', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    //Input Ulasan & Rating
    pushDataRating(context, credentials){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.post('/courses/'+router.currentRoute.params.id+'/reviews/create',{
        course_id: credentials.course_id,
        star: credentials.star,
        body: credentials.body,
        user_id: credentials.user_id
      })
      .then(response => {
        console.log(response.data)
        router.push({path: '/cerevid/'})
      })
      .catch(error => {
        console.log(error)
      })
    },
  }
});
