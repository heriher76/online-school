<template>
    <div class="banner-login">     
      <img :src="require('../../assets/images/cerevid-1.png')" alt="" height="100%" width="100%">
      <div class="baner-color"></div>
      
      <v-snackbar
        v-model="snackbar"
        :multi-line="'multi-line'"
        :right="'right'"
        :timeout="5000"
        :top="'top'"
        color="rgba(0,0,0,0.6)"
      >
        <span>Registrasi Berhasil !!</span>
        <v-btn :color="'col'" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>

      <v-snackbar
        v-model="snackbarGoogle"
        :multi-line="'multi-line'"
        :right="'right'"
        :timeout="5000"
        :top="'top'"
        color="rgba(0,0,0,0.6)"
      >
        <span>{{textbarGoogle}}</span>
        <v-btn :color="'col'" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>

      <div class="panel-auth" style="color:white">
        <h2 class="display-1">Selamat Datang</h2>
        <p>Masuk dengan akun anda</p>
        
        <form @submit.prevent="login" @keyup.enter="login">
          <v-text-field
            dark
            color="white"
            v-model="email"
            :rules="[rules_mail.required, rules_mail.email]"
            label="E-mail"
          ></v-text-field>
          <v-text-field
              required=""
              dark
              color="white"
              v-model="password"
              :append-icon="show_pass ? 'visibility' : 'visibility_off'"
              :rules="[rules_pass.required, rules_pass.min]"
              :type="show_pass ? 'text' : 'password'"
              name="input-10-1"
              label="Kata sandi"
              hint="At least 6 characters"
              counter
              @click:append="show_pass = !show_pass"
          ></v-text-field>
          <v-checkbox
              dark
              style="float:left"
              color="white"
              v-model="checkbox"
              label="Remember Me"
          ></v-checkbox>
          <router-link to="/forgot password" class="label-forgot">Lupa kata sandi?</router-link>
          
          <v-btn @click="login" :loading="btn_load" round large block>Masuk</v-btn>  
        </form>

        <div style="text-align:center; margin-top:25px">
          <div style="background:#ffffff; width:100%; height:1.5px"></div>
          <span style="padding:8px; background:#7e88a0; position:relative;top:-11px"><label>Atau</label></span>
        </div>

        
        <v-btn block round color="error" dark large @click="loginGoogle">
          masuk dengan akun google
          <!-- v-google-signin-button="clientId" -->
        </v-btn>

        <v-btn block round color="primary" dark large href="https://api.ceredinas.id/login/facebook">
          masuk dengan akun facebook
        </v-btn>

        <hr style="margin-bottom:15px">
        <label>Belum punya akun? <router-link to="/register" style="color:white">Daftar Sekarang</router-link></label>
      </div>
      
      <LoadingScreen2 :loading="loadLogin"></LoadingScreen2>

    </div>
</template>


<script>
  import axios from "axios"
  import LoadingScreen2 from'../../components/loading-screen/Loading2'

  export default {
    name: 'login',
    props: ['regist'],

    components:{ 
      LoadingScreen2,
    },

    data () {
      return {

        snackbar: false,
        snackbarGoogle:false,
        textbarGoogle: '',

        loadLogin: false,
        btn_load: false,
        
        checkbox: '',

        show_pass: false,
        password: '',
        rules_pass: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters'
        },

        email: '',
        rules_mail: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },

    mounted(){
      this.snackbar = this.regist
      
      if(this.$store.getters.loggedIn){
        window.location.href = "/"
      }
    },

    methods:{
      login(){      
        this.btn_load = true
        this.loadLogin = true
        this.$store.dispatch('retrieveToken', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.btn_load = false
          this.loadLogin = false

          if (response.data.role != 2) {
            this.$swal('Oopps', 'Anda Tidak Memiliki Akses Kesini!', 'warning')
            this.$store.dispatch('destroyToken')
            .then(response => {
                this.$router.push({path:'/'})
            })
            // .catch(error => {
            //     console.log(error)
            //   })
          }else{
            window.location.href = "/"
          }
          
          // window.location.href = "/"
          // this.$router.replace('/')
        })
        .catch(error => {
          this.btn_load = false
          this.loadLogin = false
          console.log(error.response)
          this.$swal('Error', 'email atau password yang anda masukan salah !', 'warning')
        })
      },

      loginGoogle(){
        this.$gAuth.signIn()
        .then(GoogleUser => {
          //on success
          this.$store.dispatch('retrieveTokenGoogle', {
            token: GoogleUser.getAuthResponse().access_token
          })
          .then(response => {
            console.log(response)
            this.loadLogin      = true
            this.snackbarGoogle = true
            this.textbarGoogle  = "Berhasil Masuk !!"

            return setTimeout(() => (this.loadLogin = false, window.location.href = "/"), 1500)
          })
          .catch(error => {
            this.snackbarGoogle = true
            this.textbarGoogle  = "Gagal Masuk !!"

            console.log(error)
          })
        })
        .catch(error => {
          //on fail do something
          console.log(error)
        })
      }       

    }
  }
</script>

<style>
    .banner-login{
        height:650px;
        position:relative
    }

    .baner-color {
        align-items: center;
        bottom: 0px;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
        height: 100%;
        font-family: "Arial";
        background-image: linear-gradient(10deg, #2c3e50,#ffffff,#ee1414,#51a9fc,#8e44ad);
        background-size: 270% 350%;
    }

    .panel-auth{
        top:50px;
        width:450px;
        right: 0;
        left: 0;
        margin: 0px auto;
        padding:20px;
        background: rgba(0, 0, 0, 0.3);
        position:absolute;
        text-align:center;
    }

    
    @media only screen and (max-width: 650px) {
      .panel-auth {
        width: 100%;
      }
    }

    .text-banner h1,h5{
        font-family:'Arial';
        color:white;
    }

    .label-forgot{
        float:right;
        margin-top:20px;
        font-size:14px; 
        color:white;
        text-decoration:none
    }
</style>
