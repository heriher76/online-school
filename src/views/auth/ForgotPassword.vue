<template>
    <div class="forgot_password">
      <v-container>
        <v-layout>
            <v-flex xs12 md6 sm6 offset-sm4>
                <v-card>
                    <v-card-title primary-title>
                        <div style="margin: 0px 15px">
                            <h3 class="headline mb-0"><b>Lupa Password</b></h3>
                            <p style="font-size:13px;color:#757575">Silahkan masukkan alamat Email Valid untuk mendapatkan kode verifikasi reset password akun anda.</p>

                            <v-text-field
                                color="black"
                                v-model="email"
                                :rules="[rules.required, rules.email]"
                                label="E-mail"
                            ></v-text-field>
                            
                             <v-btn @click="submitEmail" dark block color="red" :loading="btn_load">Kirim Kode Verifikasi</v-btn>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        show_pass: false,
        btn_load: false,
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
    },
    methods: {
      submitEmail() {
        this.btn_load = true
        axios.defaults.headers = {
          'Authorization': 'Bearer ' + this.$store.state.token
        }
        axios.post('/password/create', {
          email: this.email
        })
        .then(response => {
          this.btn_load = false
          this.$swal('Sukses', 'Silahkan Cek Email Anda!', 'success')
          this.$router.push({ name:'login' })
        })
        .catch(error => {
          this.btn_load = false
          this.$swal('Oops', 'Gagal Mengirim Kode Reset!', 'warning')
          console.log(error)
        })
      }
    }
  }
</script>