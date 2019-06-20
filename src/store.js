import Vue from "vue";
import Vuex from "vuex";
import router from '@/router';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'https://api.ceredinas.id/api';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null, //get token,
    dataUser : localStorage.getItem('getDataUser') || null,
    classId : localStorage.getItem('getDataClassId') || null,
    info: [],
    dataClass: [],
    dataPelajaran: [],
    dataDetailPelajaran: [],
    dataPelajaranbyLesson: [],
    dataFavoritbyUser: [],
    dataPelajaranbyUser: [],
    dataPelajaranbyTeacher: [],
    dataDetailMateri: [],
    dataVideo: [],
    dataText: [],
    dataQuiz: [],
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
    
    retrieveClassId(state,classId){
      state.classId = classId
    },

    retrieveDataUser(state,dataUser){
      state.dataUser = dataUser
    },

    destroyToken(state) {
      state.token = null
    },

    destroyDataClassId(state) {
      state.classId = null
    },

    destroydataUser(state) {
      state.dataUser = null
    },

//----------------------------------------informasi---------------------------------------------
    getInformation(state, info){
      state.info = info
    },
//------------------------------------------cerevid---------------------------------------------
    getDataPelajaran(state, dataPelajaran){
      state.dataPelajaran = dataPelajaran
    },

    getDataClass(state, dataClass){
      state.dataClass = dataClass
    },

    getDataLesson(state, dataLesson){
      state.dataLesson = dataLesson
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

    pushDataFavorit(state, dataFavorit){
      state.dataFavoritbyUser.data.push(dataFavorit.data)
    },

    delDataFavorit(state, id){
     var index = state.dataFavoritbyUser.data.findIndex(cek => cek.id == id)
     state.dataFavoritbyUser.data.splice(index, 1)
   },

    getDataDetailPelajaran(state, dataDetailPelajaran){
      state.dataDetailPelajaran = dataDetailPelajaran
    },

    getDataDetailMateri(state, dataDetailMateri){
      state.dataDetailMateri = dataDetailMateri
    },

    getDataVideo(state, dataVideo){
      state.dataVideo = dataVideo
    },

    getDataText(state, dataText){
      state.dataText = dataText
    },

    getDataQuiz(state, dataQuiz){
      state.dataQuiz = dataQuiz
    },

    getDataDetailForum(state, dataDetailForum){
      state.dataDetailForum = dataDetailForum
    },

    //-----------------------------------Profile Siswa-------------------------
    getProfileUser(state, dataProfileUser){
      state.dataProfileUser = dataProfileUser
    },

    pushDataDetailForum(state, dataForum){
      state.dataDetailForum.data.push(dataForum.data)
    }

  },

//------------------------------------------cerelisasi-------------------------------------------
  actions: {
    //register function
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

    cekAuth(context){
      axios.get('/auth/user')
      .then(response => {
        // console.log("auth", response.data)
        const dataUser = response.data.data.id
        const classId  = response.data.data.class_id
        
        localStorage.setItem('getDataUser', dataUser)
        localStorage.setItem('getDataClassId', classId)

        context.commit('retrieveDataUser', dataUser)
        context.commit('retrieveClassId', classId)
      })
      .catch(error=>{
        // console.log("authErr", error.response)
      })
    },

    //login function
    retrieveTokenGoogle(context, data){
      axios.get('/login/google?token='+data.token)
      .then(response => {
        const token    = response.data.access_token
        localStorage.setItem('access_token', token)
        context.commit('retrieveToken', token)
        // console.log("google", response.data)
      })
      .catch(error => {
        // console.log("googleErr", error.response)
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
          const classId  = response.data.data.class_id
          localStorage.setItem('access_token', token)
          localStorage.setItem('getDataUser', dataUser)
          localStorage.setItem('getDataClassId', classId)
          context.commit('retrieveToken', token)
          context.commit('retrieveDataUser', dataUser)
          context.commit('retrieveClassId', classId)
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
            localStorage.removeItem('getDataClassId')
            context.commit('destroyDataClassId')
            context.commit('destroyToken')
            context.commit('destroydataUser')
            // resolve(response)
            // console.log(response.data)
          })
          .catch(error => {
            localStorage.removeItem('getDataUser')
            localStorage.removeItem('access_token')
            localStorage.removeItem('getDataClassId')
            context.commit('destroyDataClassId')
            context.commit('destroyToken')
            context.commit('destroydataUser')
            // reject(error)
          })
        // })
      }
    },


//---------------------------------cereout function-----------------------------------------------

//
//
//

//---------------------------------cerevid function-----------------------------------------------
  //--------------------------------cerevid get--------------------------------
    getDataPelajaran(context){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/courses')
      .then(response => {
        context.commit('getDataPelajaran', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataClass(context){
      axios.get('/master/class')
      .then(response => {
        context.commit('getDataClass', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataLesson(context){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/master/lesson')
      .then(response => {
        context.commit('getDataLesson', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataPelajaranbyLesson(context,data){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/courses/lesson/'+data.id)
      .then(response => {
        context.commit('getDataPelajaranbyLesson', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataPelajaranbyUser(context){
      axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token
      }
      axios.get('/courses/'+this.state.dataUser+'/learned')
      .then(response => {
        context.commit('getDataPelajaranbyUser', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataPelajaranbyTeacher(context){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/courses/teacher/'+this.state.dataUser)
      .then(response => {console.log(response.data)
        context.commit('getDataPelajaranbyTeacher', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataFavoritbyUser(context){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/courses/favorites')
      .then(response => {
        context.commit('getDataFavoritbyUser', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataDetailPelajaran(context){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/courses/'+router.currentRoute.params.id)
      .then(response => {
        console.log(response.data.data)
        context.commit('getDataDetailPelajaran', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataDetailMateri(context){
      axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token
      }
      axios.get('/courses/'+router.currentRoute.params.id+'/sections')
      .then(response => {
        context.commit('getDataDetailMateri', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataVideo(context, data){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/sections/'+data.section_id+'/videos/'+data.id)
      .then(response => {
        axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token 
        }
        axios.get('/courses/'+router.currentRoute.params.id+'/sections')
        .then(response => {
          context.commit('getDataDetailMateri', response.data)
        })
        .catch(error => {
          console.log(error)
        })
        context.commit('getDataVideo', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataText(context, data){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/sections/'+data.section_id+'/texts/'+data.id)
      .then(response => {
        axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token 
        }
        axios.get('/courses/'+router.currentRoute.params.id+'/sections')
        .then(response => {
          context.commit('getDataDetailMateri', response.data)
        })
        .catch(error => {
          console.log(error)
        })
        context.commit('getDataText', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataQuiz(context, data){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/sections/'+data.section_id+'/quiz/'+data.id)
      .then(response => {
        axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token 
        }
        axios.get('/courses/'+router.currentRoute.params.id+'/sections')
        .then(response => {
          context.commit('getDataDetailMateri', response.data)
        })
        .catch(error => {
          console.log(error)
        })
        context.commit('getDataQuiz', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    getDataDetailForum(context){
      axios.defaults.headers = {  
        'Authorization': 'Bearer ' + context.state.token 
      }
      axios.get('/courses/'+router.currentRoute.params.id+'/forums')
      .then(response => {
        context.commit('getDataDetailForum', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
  //--------------------------------cerevid post--------------------------------

    //Simpan Favorit
    pushDataFavorit(context, credentials){
      return new Promise((resolve, reject) => {
        axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token 
        }
        axios.post('/courses/'+credentials.course_id+'/favorites/create',{
          user_id: credentials.user_id
        })
        .then(response => {
          context.commit('pushDataFavorit', response.data)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    //Simpan Learned
    pushDataLearned(context, credentials){
      return new Promise((resolve, reject) => {
        axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token 
        }
        axios.post('/courses/'+credentials.user_id+'/learned',{
          user_id: credentials.user_id,
          course_id: credentials.course_id,
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    //Input Ulasan & Rating
    pushDataRating(context, credentials){
      return new Promise((resolve, reject) => {
        axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token 
        }
        axios.post('/courses/'+router.currentRoute.params.id+'/reviews/create',{
          course_id: credentials.course_id,
          star: credentials.star,
          body: credentials.isi,
          user_id: credentials.user_id
        })
        .then(response => {
          axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token 
          }
          axios.get('/courses/'+router.currentRoute.params.id)
          .then(response => {
            context.commit('getDataDetailPelajaran', response.data)
          })
          .catch(error => {
            console.log(error)
          })
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    pushDataComment(context, credentials){
      return new Promise((resolve, reject) => {
        axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token 
        }
        axios.post('/courses/'+router.currentRoute.params.id+'/forums/create',{
          forum_id: credentials.forum_id,
          body: credentials.isi,
        },)
        .then(response => {
          axios.defaults.headers = {  
            'Authorization': 'Bearer ' + context.state.token 
          }
          axios.get('/courses/'+router.currentRoute.params.id+'/forums')
          .then(response => {
            context.commit('getDataDetailForum', response.data)
          })
          .catch(error => {
            console.log(error)
          })
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
        axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token 
        }
        axios.post('/courses/'+router.currentRoute.params.id+'/forums/create',{
          body: credentials.isi,
        },)
        .then(response => {
          axios.defaults.headers = {  
            'Authorization': 'Bearer ' + context.state.token 
          }
          axios.get('/courses/'+router.currentRoute.params.id+'/forums')
          .then(response => {
            context.commit('getDataDetailForum', response.data)
          })
          .catch(error => {
            console.log(error)
          })
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
  //--------------------------------cerevid Delete--------------------------------
    //Simpan Favorit
    delDataFavorit(context, credentials){
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        axios.delete('/courses/'+credentials.user_id+'/favorites/'+credentials.favorit_id,{
          user_id: credentials.user_id
        },)
        .then(response => {
          context.commit('delDataFavorit', credentials.favorit_id)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
//----------------------------------------------------------------------------------------------------------
    // -----------------------------SISWA
    // get profile
    getProfileUser(context){
      axios.defaults.headers = {  
          'Authorization': 'Bearer ' + context.state.token
      }
      axios.get('/auth/user')
      .then(response => {
        console.log(response.data)
        context.commit('getProfileUser', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },

    // edit profile function
    editProfileUser(context, credentials){

      if(context.getters.loggedIn) {
          const data = {
            name: credentials.name,
            gender: credentials.gender,
            phone: credentials.phone,
            birth_place: credentials.birth_place,
            birth_date: credentials.birth_date,
            parrent_name: credentials.parrent_name,
            parrent_phone: credentials.parrent_phone,
            address: credentials.address
          }
          // return new Promise((resolve, reject) => {
          axios.defaults.headers = {  
              'Authorization': 'Bearer ' + context.state.token
          }
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
          axios.defaults.headers = {  
            'Authorization': 'Bearer ' + context.state.token
          }
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
