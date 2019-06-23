<template>
    <div class="pusat_bantuan">
      <div v-if="dataKontakAdmin">
        <v-card style="background:#B71C1C">
            <v-container>
                <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <h3 class="display-2" style="color:white">Pusat Bantuan</h3>
                </v-flex>
                </v-layout>
            </v-container>
        </v-card>

        <v-container fluid grid-list-lg>
            <v-layout style="text-align:center" v-for="data in dataKontakAdmin" row wrap>
                <v-flex md4 sm12 xs12>
                  <v-card>
                    <v-card-text>
                      <img :src="require('../../assets/images/phone.png')" width="120px" alt="" class="my-4">
                      <h4 class="display-1">Telepon</h4>
                      <div class="subheading ma-4">{{data.phone}}</div>
                      <v-text-field
                        class="mx-4"
                        v-model="pesanSMS"
                        placeholder="Isi Pesan Disini"
                      ></v-text-field>
                      <v-btn color="success"  :href="'sms:'+data.phone+'?&body='+pesanSMS">SMS</v-btn>
                      <div>ATAU</div>
                      <v-btn color="success"  :href="'tel://'+data.phone">telepon</v-btn>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex md4 sm12 xs12>
                  <v-card>
                    <v-card-text>
                      <img :src="require('../../assets/images/WhatsApp-Logo.png')" width="200px" alt="">
                      <h4 class="display-1">Whatsapp</h4>
                      <div class="subheading ma-4">{{data.whatsapp}}</div>
                      <v-text-field
                        class="mx-4"
                        v-model="pesanWA"
                        placeholder="Isi Pesan Disini"
                      ></v-text-field>
                      <v-btn color="success"  :href="'https://wa.me/'+data.whatsapp+'?text='+pesanWA" :disabled="!pesanWA">Kirim</v-btn>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex md4 sm12 xs12>
                  <v-card>
                    <v-card-text>
                      <img :src="require('../../assets/images/email.png')" width="120px" alt="" class="my-4">
                      <h4 class="display-1">Email</h4>
                      <div class="subheading ma-4">{{data.email}}</div>
                      <v-text-field
                        class="mx-4"
                        v-model="subjectEmail"
                        placeholder="Isi Subject Disini"
                      ></v-text-field>
                      <v-text-field
                        class="mx-4"
                        v-model="pesanEmail"
                        placeholder="Isi Pesan Disini"
                      ></v-text-field>
                      <v-btn color="success"  :href="'mailto:'+data.email+'?subject='+subjectEmail+'&body='+pesanEmail">Kirim</v-btn>
                    </v-card-text>
                  </v-card>
                </v-flex>
            </v-layout>
        </v-container>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
  export default{
    data: () => ({
      dataKontakAdmin: null,
      pesanWA: '',
      subjectEmail:'',
      pesanEmail:'',
      pesanSMS:''
    }),
    methods:{
      dataAdmin(){
          axios.get('/master/generalInformation')
          .then(response => {
            this.dataKontakAdmin = response.data.data
          })
          .catch(error=>{
          console.log(error)
          })
      }
    },
    mounted(){
      this.dataAdmin()
    }
  }
</script>

<style>
    .kategori li{
        list-style: none;
        margin: 10px 0px 10px -22px
    }

    .kategori li a{
        text-decoration: none;
        color: black
    }

    .faq li{
        list-style: none;
        margin: 10px 0px 10px -22px
    }

    .faq li a{
        text-decoration: none;
        font-size: 18px;
        color: black;
    }

    .faq hr{
        margin: 10px 0px
    }
</style>
