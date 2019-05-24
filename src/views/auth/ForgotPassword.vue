<template>
    <div class="forgot_password">
      <v-container>
        <v-layout>
            <v-flex xs12 md4 sm4 offset-sm4>
                <v-card>
                    <v-card-title primary-title>
                        <div style="margin: 0px 15px">
                            <h3 class="headline mb-0"><b>Get Your Password</b></h3>
                            <p style="font-size:13px;color:#757575">Please enter your email address. You will receive a link to create a new password via email.</p>

                            <v-text-field
                                color="black"
                                v-model="email"
                                :rules="[rules.required, rules.email]"
                                label="E-mail"
                            ></v-text-field>
                            
                             <v-btn dark block color="red">Reset password</v-btn>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
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