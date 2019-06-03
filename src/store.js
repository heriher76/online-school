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
    dataGuru : localStorage.getItem('getDataGuru') || null,
    info: [],
    dataProfileUser: [],
    dataProfileGuru: [],
    dataPelajaran: [],
    dataDetailPelajaran: [],
    dataPelajaranbyLesson: [],
    dataFavoritbyUser: [],
    dataPelajaranbyUser: [],
    dataPelajaranbyTeacher: [],
    dataDetailMateri: [],
    dataDetailForum: [],
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

    retrieveDataGuru(state,dataGuru){
      state.dataGuru = dataGuru
    },

    destroyToken(state) {
      state.token = null
    },

    destroydataUser(state) {
      state.dataUser = null
    },

    destroydataGuru(state) {
      state.dataGuru = null
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

    getDataPelajaranbyUser(state, dataPelajaranbyUser){
      state.dataPelajaranbyUser = dataPelajaranbyUser
    },

    getDataPelajaranbyTeacher(state, dataPelajaranbyTeacher){
      state.dataPelajaranbyTeacher = dataPelajaranbyTeacher
    },

    getDataFavoritbyUser(state, dataFavoritbyUser){
      state.dataFavoritbyUser = dataFavoritbyUser
    },

    getDataDetailPelajaran(state, dataDetailPelajaran){
      state.dataDetailPelajaran = dataDetailPelajaran
    },

    getDataDetailMateri(state, dataDetailMateri){
      state.dataDetailMateri = dataDetailMateri
    },

    getDataDetailForum(state, dataDetailForum){
      state.dataDetailForum = dataDetailForum
    },

    //-----------------------------------Profile Siswa-------------------------
    getProfileUser(state, dataProfileUser){
      state.dataProfileUser = dataProfileUser
    },

    //-----------------------------------Profile Siswa-------------------------
    getProfileGuru(state, dataProfileGuru){
      state.dataProfileGuru = dataProfileGuru
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
  //--------------------------------cerevid get--------------------------------
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

    getDataPelajaranbyUser(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/courses/'+this.state.dataUser+'/learned')
      .then(response => {
        context.commit('getDataPelajaranbyUser', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataPelajaranbyTeacher(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/courses/teacher/'+this.state.dataUser)
      .then(response => {
        context.commit('getDataPelajaranbyTeacher', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataFavoritbyUser(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/courses/favorites')
      .then(response => {
        context.commit('getDataFavoritbyUser', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataDetailPelajaran(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/courses/'+router.currentRoute.params.id)
      .then(response => {
        console.log(response.data)
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

    getDataDetailForum(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/courses/'+router.currentRoute.params.id+'/forums')
      .then(response => {
        context.commit('getDataDetailForum', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
  //--------------------------------cerevid post--------------------------------
    //Input Ulasan & Rating
    pushDataRating(context, credentials){
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        axios.post('/courses/'+router.currentRoute.params.id+'/reviews/create',{
          course_id: credentials.course_id,
          star: credentials.star,
          body: credentials.isi,
          user_id: credentials.user_id
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

    pushDataForum(context, credentials){
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        axios.post('/courses/'+router.currentRoute.params.id+'/forums/create',{
          course_id: credentials.course_id,
          body: credentials.isi,
          user_id: credentials.user_id
        })
        .then(response => {
          router.push('/cerevid/detail-pelajaran/'+router.currentRoute.params.id+'/materi')
          console.log(response.data)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // -----------------------------SISWA
    // get profile
    getProfileUser(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/auth/user')
      .then(response => {
        context.commit('getProfileUser', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    // get profile
    getProfileGuru(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/auth/user')
      .then(response => {
        context.commit('getProfileGuru', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    // edit profile function
    editProfileUser(context, credentials){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if(context.getters.loggedIn) {
          const data = {
            name: credentials.name,
            gender: credentials.gender,
            phone: credentials.phone,
            birth_place: credentials.birth_place,
            birth_date: credentials.birth_date,
            parrent_name: credentials.parrent_name,
            parrent_phone: credentials.parrent_phone,
            address: credentials.address,
            file: credentials.file
          }
          // return new Promise((resolve, reject) => {
          axios.put('/auth/user/'+this.state.dataUser, data)
          .then(response => {

            console.log(response.data)
          })
          .catch(error => {
            console.log(response.data)
            // reject(error)
          })
        // })
      }
    },

    editProfileGuru(context, credentials){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if(context.getters.loggedIn) {
          const data = {
            name: credentials.name,
            gender: credentials.gender,
            phone: credentials.phone,
            birth_place: credentials.birth_place,
            birth_date: credentials.birth_date,
            parrent_name: credentials.parrent_name,
            parrent_phone: credentials.parrent_phone,
            address: credentials.address,
            file: credentials.file
          }
          // return new Promise((resolve, reject) => {
          axios.put('/auth/teacher/'+this.state.dataUser, data)
          .then(response => {

            console.log(response.data)
          })
          .catch(error => {
            console.log(response.data)
            // reject(error)
          })
        // })
      }
    },
  }
});
