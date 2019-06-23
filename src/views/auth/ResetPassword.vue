<template>
    <div class="forgot_password">
      <v-container>
        <v-layout>
            <v-flex xs12 md6 sm6 offset-sm3>
                <v-card>
                    <v-card-title primary-title>
                        <div style="margin: 0px 15px">
                            <h3 class="headline mb-0"><b>Reset Password</b></h3>
                            <p style="font-size:13px;color:#757575">Silahkan masukkan alamat Email Valid untuk mendapatkan kode reset password akun anda.</p>

                            <v-text-field
                                color="black"
                                v-model="email"
                                :rules="[rules.required, rules.email]"
                                label="E-mail"
                            ></v-text-field>

                            <v-text-field
                                v-model="password"
                                :append-icon="show_pass ? 'visibility' : 'visibility_off'"
                                :rules="[rules_pass.required, rules_pass.min]"
                                :type="show_pass ? 'text' : 'password'"
                                name="input-10-1"
                                label="Kata Sandi Baru"
                                hint="At least 6 characters"
                                counter
                                @click:append="show_pass = !show_pass"
                            ></v-text-field>

                            <v-text-field
                                v-model="password_confirmation"
                                :append-icon="show_pass ? 'visibility' : 'visibility_off'"
                                :rules="[rules_pass.required, rules_pass.min]"
                                :type="show_pass ? 'text' : 'password'"
                                name="input-10-1"
                                label="Konfirmasi Kata Sandi Baru"
                                hint="At least 6 characters"
                                counter
                                @click:append="show_pass = !show_pass"
                            ></v-text-field>
                            
                             <v-btn @click="resetPassword" dark block color="red" :loading="btn_load">Reset password</v-btn>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
      <LoadingScreen2 :loading="loadToken"></LoadingScreen2>
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
        show_pass: false,
        btn_load: false,
        loadToken: true,
        password: '',
        password_confirmation: '',
        rules_pass: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters'
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
    },
    created() {
      //get hasil analisis jika ada
      axios.defaults.headers = {
        'Authorization': 'Bearer ' + this.$store.state.token
      }
      axios.get('/password/find/asdfasdfasdfasdfsadf')
      .then(response => {
        console.log(response)
        this.loadToken = false
      })
      .catch(error => {
        console.log(error)
        this.loadToken = false
        this.$swal('Error', 'Token Tidak Valid!', 'warning')
        // this.$router.push({ name:'login' })
      })
    },
    methods: {
      resetPassword() {
        this.btn_load = true
        axios.defaults.headers = {
          'Authorization': 'Bearer ' + this.$store.state.token
        }
        axios.post('/password/reset', {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          token: 'asdfsadfsadfsadf'
        })
        .then(response => {
          this.btn_load = false
          this.$swal('Sukses', 'Silahkan Login Kembali!', 'success')
          this.$router.push({ name:'login' })
        })
        .catch(error => {
          this.btn_load = false
          this.$swal('Oops', 'Gagal Reset Password!', 'warning')
          console.log(error)
        })
      }
    }
  }
</script>