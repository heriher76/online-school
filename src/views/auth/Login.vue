<template>
    <div class="banner-login">     
      <img :src="require('../../assets/images/cerevid-1.png')" alt="" height="100%" width="100%">
      <div class="baner-color"></div>
      
      <div class="panel-auth" style="color:white">
        <h2 class="display-1">Welcome</h2>
        <p>Login with your site account</p>
        <v-text-field
            dark
            color="white"
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
          ></v-text-field>
        <v-text-field
            required=""
            dark
            color="white"
            v-model="password"
            :append-icon="show_pass ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
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
            :error-messages="checkboxErrors"
            label="Remember Me"
        ></v-checkbox>
        <a href="" class="label-forgot">Forgot your password?</a>
        <v-btn round large block>SIGN IN</v-btn>
        
        
        <div class="list">
            <hr><label>OR</label><hr>
            <div class="clear"></div>
        </div>
        
        <v-btn
        block
        round
        :loading="loading3"
        :disabled="loading3"
        color="error"
        dark
        large
        @click="loader = 'loading3'"
        >
        <v-icon left dark></v-icon>
        SIGN IN WITH GOOGLE
        </v-btn>

        <v-btn
        block
        round
        :loading="loading3"
        :disabled="loading3"
        color="primary"
        dark
        large
        @click="loader = 'loading3'"
        >
        <v-icon left dark></v-icon>
        SIGN IN WITH FACEBOOK
        </v-btn>

        <hr style="margin-bottom:15px">
        <label>Not a member yet? <router-link to="/register" style="color:white">Register now</router-link></label>

      </div>
      
    </div>
</template>

<script>
  export default {
    data () {
      return {
        show_pass: false,
        password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
        },

        email: '',
        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
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
