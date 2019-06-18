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
        color="rgba(0,0,0,0.5)"
      >
        {{ text }}
        <v-btn :color="'col'" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
      
      <div class="panel-auth" style="color:white">
        <h2 class="display-1">Welcome</h2>
        <p>Register a new account</p>    
          
        <form @submit.prevent="signUp" @keyup.enter="signUp">
          <v-text-field 
            label="Name"
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
              label="Password"
              hint="At least 8 characters"
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
              label="Re-enter Password"
              hint="At least 8 characters"
              counter
              @click:append="show_pass_conf = !show_pass_conf"
          ></v-text-field>
          <v-btn round large block>SIGN UP</v-btn>
        </form>

        <!-- <v-btn round large block @click="signUp">SIGN UP</v-btn> -->
              
        <hr style="margin-bottom:15px">
        <label>Are you a member? <router-link to="/login" style="color:white">Login now</router-link></label>

      </div>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        snackbar: false,
        text: '',
        col: '',

        items:[],

        loading_screen: false,
  
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
        // alert('hello')
        this.$store.dispatch('postRegister', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => {
          this.col = 'orange'
          this.text = response.data.message //"Registrasi Berhasil !!"
          this.snackbar = true
          this.$router.push({name: 'login'})
        })
        .catch(error => {
          this.col = 'red'
          this.text = response.data.errors //"Registrasi Gagal !!"
          this.snackbar = true
          console.log(error.response)
        })  
      },


      // cobaSubmit(e){
      //   e.preventDefault();
      //   axios({
      //     method: 'post',
      //     url: 'http://api.ceredinas.id/api/master/attempts/',
      //     data: {
      //       user_id: 3,
      //     },
      //     headers: {
      //       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJiMmE2MWE1Mjc2OTFkYTQyYWE4Njk4NDViMTgyNGY0ODg1YjNmOGYxY2E3OTY1NmNkZjA4Mzg2ZTkyMTg0YzhkY2VmOWYxNjQyZjJhMDk0In0.eyJhdWQiOiIxIiwianRpIjoiMmIyYTYxYTUyNzY5MWRhNDJhYTg2OTg0NWIxODI0ZjQ4ODViM2Y4ZjFjYTc5NjU2Y2RmMDgzODZlOTIxODRjOGRjZWY5ZjE2NDJmMmEwOTQiLCJpYXQiOjE1NTg2MzExMzEsIm5iZiI6MTU1ODYzMTEzMSwiZXhwIjoxNTkwMjUzNTMxLCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.dXtoJm7IYfgeYqeh14hrNyucqPCjs0c8lCNA97uILoK4sgW2-SLh05TaFaRe3HKYKYFW7lGv7WR0fir253eHiLtjNUfLrzO5U32uBP75OeldA1Mj8eKCLv2zRe6DJtW_e_bQGDc2NPaCpZizmhAEKP86FOq3KvPnb8mc2mQZ_JcGO56YVkK5NlqszbFxGAMGbin7AOCRBlHLLOXtpsQGPm-NaVJmAw2WsjzWJZyrbiqoEVQaZo_WSR2rZjvHKv2nFBVOM7Vem_LZsjE7kviwW09l5_hGzSQxjRbvIX87zDn8gzsUrYapiZwu_--2C0JcjFL75lE1X4PcTqyk951Nz_L_qIDSC4u8KbWXimN-1ui7avy-IFmPrjhVxtX72z13gF1yjC8ieasNlY1l3f5XehngfPaAssAcGI6Bgy9TRkO7ED1V3hkGNXqjJOJP3usJc9Ml652ejFJ7cq4DeX9Hvjj7-NkJjWietV2Z9N89RdumH-xmQxmJig8wj6AN6yDIsUpKRC1K1Kb7RxTVIwaY-H5R5Hy2_AwSAak0DibnmeMT_B_w4GbzqIbKk4zdyGr7qsX8JsnM9GiieQgL1_vY0D7uWEggQgnVwysAmqvt32v9rDI2naH5aNMWmVTzZjlldvAVRJhJ5rzQ-v-ZSQhcqRWyh59unLBvLOeteN0ElK0'
      //     }
      //   })
      //   .then(response => (console.log(response.data)))
      //   .catch(error => console.log(error.response))
      //   .finally(() => this.loading = false)
      // },
    
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
