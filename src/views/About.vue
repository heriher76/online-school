<template>
  <div class="about">
    <!-- banner -->
    
    <!-- /banner -->

    <!-- slider -->
    <!-- <v-carousel
    >
        <div v-show="load_data" style="margin:150px auto; width:5%;">
            <v-layout column justify-center align-center>
                <hollow-dots-spinner
                  :animation-duration="1000"
                  :dot-size="15"
                  :dots-num="3"
                  color="#ff1d5e"
                />
            </v-layout>
        </div>
        <v-carousel-item
            v-for="(item,i) in datas"
            :key="i"
            v-if="item.category=='sliders'"
            :src="item.url"
        >
            <h5 style="color:white; padding:10px 20px; background:rgba(0,0,0,0.2)" class="headline">{{item.title}}</h5>
        </v-carousel-item>
    </v-carousel> -->
    <!-- /slider -->

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

      <v-layout row wrap style="margin:20px; font-size:18px">
        <v-flex md8 sm12 xs12>
          <p>Cerebrum adalah bimbel online untuk pelajar SD, SMP, SMA/SMK yang diberikan secara gratis untuk membantu pemerintah dalam mempercepat pemerataan kualitas pendidikan di Indonesia.</p>
          <p>Cerebrum memiliki visi, yaitu sebagai media belajar untuk mempercepat pemerataan pendidikan yang berkualitas di Indonesia.</p>
          <p>Adapun misi dari cerebrum adalah menjadi penyedia bimbingan belajar Online No. 1 di Indonesia yang membuat belajar menjadi menyenangkan, dengan kualitas terbaik, secara gratis, tanpa biaya yang mahal.</p>
        </v-flex>
        <v-flex md4 sm12 xs12>
          <!-- <div style="width:300px; margin-top:-50px; margin-left:50px ">-->
          <div style="margin-top:-30px; margin-left:50px ">    
            <img :src="require('../assets/images/cerebrum.png')" width="100%" height="100%">
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- <hr>
    <v-divider></v-divider> -->

    
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