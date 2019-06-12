<template>
    <div class="banner-login">     
      <img :src="require('../../assets/images/cerevid-1.png')" alt="" height="100%" width="100%">
      <div class="baner-color"></div>
      
      <div class="panel-auth" style="color:white">
        <h2 class="display-1">Welcome</h2>
        <p>Login Guru</p>
        
        <form @submit.prevent="login">
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
              label="Password"
              hint="At least 8 characters"
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
          <router-link to="/guru/forgot-password" class="label-forgot">Forgot your password?</router-link>
          
          <v-btn @click="login" :loading="btn_load" round large block>SIGN IN</v-btn>  
        </form>

        <!-- <div class="list">
            <hr><label>OR</label><hr>
            <div class="clear"></div>
        </div>

        
        <v-btn block round color="error" dark large @click="googleLogin">
          SIGN IN WITH GOOGLE
        </v-btn>

        <v-btn block round color="primary" dark large href="http://api.ceredinas.id/login/facebook">
          SIGN IN WITH FACEBOOK
        </v-btn>

        <hr style="margin-bottom:15px">
        <label>Not a member yet? <router-link to="/register" style="color:white">Register now</router-link></label> -->
      </div>
    </div>
</template>

<script>
import axios from "axios"
  export default {
    data () {
      return {
        btn_load: false,
        
        checkbox: '',

        show_pass: false,
        password: '',
        rules_pass: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
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

    methods:{
      login(){      
        this.btn_load = true
        this.$store.dispatch('retrieveToken', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.btn_load = false
          this.$router.push({path: '/guru'})
        })
        .catch(error => {
          this.btn_load = false
          this.$swal('Oopps', 'Your email or password is invalid', 'warning')
        })
      },

      // login(e) {
      //   e.preventDefault();
      //   axios
      //   .post('http://api.ceredinas.id/api/auth/login',{
      //       email: this.email, // 'rifardian@gmail.com',
      //       password: this.password //'123456',
      //   })
      //   .then(response => {
      //     console.log(response.data)
      //     // this.$router.push({path:'/'})
      //   })
      //   .catch(error => {
      //     // console.log(error.response)
      //     this.$swal('Sorry', 'Your email or password is invalid', 'warning')
      //   })
      // }
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

    .label-forgot{
        float:right;
        margin-top:20px;
        font-size:14px; 
        color:white;
        text-decoration:none
    }
</style>
