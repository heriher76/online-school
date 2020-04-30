<template>
  <div class="about">
    
    <!-- content up -->
    <v-container>
      <div style="text-align:center;margin-top:50px">
        <div style="background:#E65100; width:100%; height:10px"></div>
        <span style="font-size:40px; padding:10px 20px; color:#B71C1C; background:#FAFAFA; position:relative;top:-36px"><b>Tujuan Kami</b></span>
      </div>
      
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex md3 sm6 xs12>
            <v-card color="red darken-4">
              <router-link to="">
                <div class="icons">
                  <div class="icon-slide-container">
                    <img class="slide-icon" :src="require('../assets/images/slide-1.jpg')" >
                  </div>
                </div>
              </router-link>
            </v-card>
          </v-flex>
          
          <v-flex md3 sm6 xs12>
            <v-card color="red darken-4">
              <router-link to="">
                <div class="icons">
                  <div class="icon-slide-container">
                    <img class="slide-icon" :src="require('../assets/images/slide-2.jpg')" >
                  </div>
                </div>
              </router-link>
            </v-card>
          </v-flex>
          
          <v-flex md3 sm6 xs12>
            <v-card color="red darken-4">
              <router-link to="">
                <div class="icons">
                  <div class="icon-slide-container">
                    <img class="slide-icon" :src="require('../assets/images/slide-3.jpg')" >
                  </div>
                </div>
              </router-link>
            </v-card>
          </v-flex>
          
          <v-flex md3 sm6 xs12>
            <v-card color="red darken-4">
              <router-link to="">
                <div class="icons">
                  <div class="icon-slide-container">
                    <img class="slide-icon" :src="require('../assets/images/slide-4.jpg')" >
                  </div>
                </div>
              </router-link>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>   
    <!-- /content up -->

    <v-container style="margin-top:50px;">
      <div style="text-align:center">
        <div style="background:#E65100; width:100%; height:10px"></div>
        <span style="font-size:40px; padding:10px 20px; color:#B71C1C; background:#FAFAFA; position:relative;top:-36px"><b>Tentang Kami</b></span>
      </div>

      <div style="margin:15px; font-size:18px">
        <div style="margin-top:-30px; margin-left:50px; width:350px;height:350px;float:right">    
          <img :src="require('../assets/images/cerebrum.png')" width="100%" height="100%">
        </div>
        <p>Cereos adalah super apps edukasi yang bertujuan untuk meningkatkan kualitas dan pemerataan pendidikan di Indonesia. Untuk saat ini Cereos telah membuat 6 produk yaitu:</p>
        
        <b>Cerevid - Cereos Video</b>
        <p>Cerevid adalah platform video pembelajaran untuk siswa SD, SMP, dan SMA. Di cerevid video ditambahkan animasi untuk membuat siswa lebih memahami materi. Tidak hanya itu, di cerevid terdapat rangkuman materi yang di design menarik dan juga mini quiz untuk mencek sebarapa paham siswa dengan materi yang telah disampaikan.</p>
        
        <b>Cereout - Cereos TryOut</b>
        <p>Cereout adalah platform untuk simulasi ujian berbasis komputer. Di cereout hasil analisis sangat lengkap sehingga diharapkan siswa dapat mengetahui telah sampai mana pencapaian belajarnya. Tidak hanya itu di cereout juga siswa dapat membandingkan nilai dengan peserta lain yang diharapkan dapat menyusun strategi untuk memilih PTN.</p>
        
        <b>Cerelisasi - Cereos Rasionalisasi</b>
        <p>Cerelisasi adalah platform online untuk merasionalkan nilai raport untuk SNMPTN dan merasionalkan nilai UTBK untuk SBMPTN. Di cerelisasi siswa dapat mengetahui seberapa ketat pertarungan di suatu jurusan dan peluang siswa masuk ke jurusan tersebut. Cerelisas menggunakan AI dan machine learning untuk memprediksi peluang terbesar supaya siswa dapat tembus PTN yang diinginkan.</p>
        
        <b>Cerecall - Cereos Consultation</b>
        <p>Cerecall adalah platform untuk menayangkan soal yang siswa kurang pahami. Siswa akan mendapatkan pembahasan berupa teks, sound, gambar, video ataupun secara live streaming dari jutaan guru di Indonesia.</p>

        <b>Cerejur – Cereos Jurusan</b>
        <p>Cerejur adalah platform untuk mengetahui informasi tentang jurusan yang ada di seluruh Indonesia. Bersihkan video bagaimana mahasiswa belajar di jurusan tersebut hingga prospek kerja. Tidak hanya itu di cerejur juga terdapat informasi keketata jurusan yang akan diintegrasikan dengan cerelisasi untuk mengetahui peluang siswa masuk ke jurusan tersebut.</p>
 
        <b>Cerefo - Cereos Info</b>
        <p>Cerefo adalah platform utuk memperoleh informasi menarik seputar sains dan ilmu pengetahuan. Dikemas secara santai dan tidak membosankan. Tidak hanya berupa tulisan tetapi terdapat gambar dan video yang diharapkan siswa lebih tertarik untuk membaca artikel sains.</p>

        <p>Tidak hanya 6 produk ini, kedepannya cereos akan terus mengembangkan aplikasi dan terus menambah produk yang bermanfaat. Diharapkan produk-produk dari Cereos dapat mewujudkan terciptanya Pemerataan dan peningkatan kualitas pendidikan di Indonesia.</p>          

      </div>
    </v-container>
  </v-container>

    
  </div>
</template>

<script>
  import Banner from "../components/Banner"
  import { HollowDotsSpinner } from 'epic-spinners'
  import axios from 'axios'
  export default {
    name: 'home',
    components:{
      Banner,
      HollowDotsSpinner
    },
    data(){
      return {
        load_data:true,    
        datas:[],
      }
    },
    mounted(){
      axios.get('/master/information')
      .then(response => {
          this.load_data = false
          this.datas = response.data.data
      })
      .catch(error =>{
          console.log(error)
      })
    }
  }
</script>


<style>
  .icons {
    height: 300px;
  }

  .icon-slide-container{
    height:83.5%;
    overflow:hidden;
    position: absolute;
    width: 100%;
  }

  .slide-icon{
    width:100%;
    height:500px;
    position:absolute;
    margin-top:-250px;
    -webkit-transition:.4s ease;
    -moz-transition:.4s ease;
    -ms-transition:.4s ease;
    -o-transition:.4s ease;
    transition:.4 ease;
  }
    
  .slide-icon:hover{
    position:absolute;
    margin-top:0;
  }
</style>