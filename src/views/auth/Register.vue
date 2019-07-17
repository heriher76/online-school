<template>
    <div class="banner-login">     
      <img :src="require('../../assets/images/cerevid-1.png')" alt="" height="100%" width="100%">
      <div class="baner-color"></div>

      <v-snackbar
        v-model="snackbar"
        :multi-line="'multi-line'"
        :right="'right'"
        :timeout="8000"
        :top="'top'"
        color="rgba(0,0,0,0.6)"
      >
        <span style="color:orange">{{ text }}</span>
        <v-btn :color="'col'" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
      
      <div class="panel-auth" style="color:white">
        <h2 class="display-1">Selamat Datang</h2>
        <p>Daftar akun baru</p>    
          
        <!-- <form @submit.prevent @keyup.enter="signUp"> -->
          <v-text-field 
            label="Nama"
            dark
            color="white"
            :rules="[rules_name.required]"
            v-model="name"
          ></v-text-field>

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

          <v-text-field
              required=""
              dark
              color="white"
              v-model="password_confirmation"
              :append-icon="show_pass_conf ? 'visibility' : 'visibility_off'"
              :rules="[rules_pass_conf.required, rules_pass_conf.match]"
              :type="show_pass_conf ? 'text' : 'password'"
              name="input-10-1"
              label="Masukan ulang kata sandi"
              hint="At least 6 characters"
              counter
              @click:append="show_pass_conf = !show_pass_conf"
          ></v-text-field>
          <!-- <v-btn round large block>SIGN UP</v-btn> -->
        <!-- </form> -->

        <v-btn round large block @click="signUp">Daftar</v-btn>
              
        <hr style="margin-bottom:15px">
        <label>Sudah punya akun? <router-link to="/login" style="color:white">Masuk Sekarang</router-link></label>

      </div>

      <LoadingScreen2 :loading="loadScreen"></LoadingScreen2>
    </div>
</template>

<script>
  import axios from 'axios'
  import LoadingScreen2 from'../../components/loading-screen/Loading2'

  export default {
    components:{ 
      LoadingScreen2
    },
    data () {
      return {
        snackbar: false,
        text: '',
        col: '',

        items:[],

        loadScreen: false,
  
        name: '',
        email: '',
        password: '',
        password_confirmation: '',

        rules_name: {
          required: value => !!value || 'Required.'
        },
        
        rules_mail: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        },

        show_pass: false,            
        rules_pass: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters'
        },

        show_pass_conf: false,            
        rules_pass_conf: {
          required: value => !!value || 'Required.',
          match: () => this.password == this.password_confirmation || ('The password confirmation does not match.')
        },
      }
    },

    methods: {
      signUp() {
        this.loadScreen = true
        this.$store.dispatch('postRegister', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => {
          // this.text = response.data.message //"Registrasi Berhasil !!"
          this.snackbar = true
          this.loadScreen = false
          this.$router.push({name: 'login', params:{regist: this.snackbar}})
        })
        .catch(error => {
          this.loadScreen = false
          this.snackbar = true
          this.text = "Registrasi Gagal !!"
          console.log(error.response)
        })  
      },    
    }
  }
</script>

<style>
    .banner-login{
        height:650px;
        position:relative
    }

    @media only screen and (max-width: 650px) {
      .banner-login {
        height: 620px;
      }
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

    .list hr {
        float:left;
        width:184px;
        margin-top: 11px;
        background:white
    }

    .list label{
        float:left; 
        margin: 2px 10px;
    }
</style>
