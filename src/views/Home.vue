<template>
  <div class="home">
    <!-- banner -->
    <Banner/>
    <!-- /banner -->

    <!-- content up -->
    <v-container fluid>
      <div style="margin-bottom:20px">
        <hr>
      </div>
      
      <v-card class="elevation-6" style="border-radius:12px;padding:10px">
        <div style="margin:10px 0px">
          <div style="background:#B71C1C; width:100%; height:10px"></div>
          <span style="font-size:20px;color:#424242"><b>Promo Hari ini</b></span>
        </div>

        <v-carousel
          height=300
          interval=4000
          hide-delimiters
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
          <router-link v-for="(item,i) in datas"
            style="text-decoration :none"
            :key="i"
            :to="{name: 'detail_informasi', params: {data: item} }"
          >
            <v-carousel-item
              v-if="item.category=='sliders'" 
              :src="item.url"
            >
              <h5 style="color:white; margin-top:250px; padding:10px 20px; background:rgba(0,0,0,0.2)" class="headline">{{item.title}}</h5>
            </v-carousel-item>
          </router-link>
        </v-carousel> 
      </v-card>
    </v-container>   
    <!-- /content up -->

    <v-container fluid>
      <div style="margin:10px;">
        <span style="font-size:40px; color:#B71C1C;"><b>Ribuan Pelajar Terbantu Dan Lolos PTN !</b></span>
      </div>

      <v-layout row wrap>
        <v-flex md7>
          <div style="font-size:20px;color:#616161;margin:10px 20px">
          <hr style="margin:20px 0px;">
            <b>Unduh Aplikasi Kami di:</b>
            <div style="margin-top:5px">
              <img :src="require('../assets/images/google-play.png')" width="200px" alt="">
              <img :src="require('../assets/images/app-store.png')" height="61px" width="200px" alt="">
            </div>
          </div>
        </v-flex>

        <v-flex md5 sm12 xs12>
          <h6 class="title" style="margin:12px 0px;color:#616161">Spesial Khusus Member Baru</h6>
          
          <v-carousel
              style="border-radius:10px"
              hide-delimiters
              height=180
              interval=6000
              hide-controls
          >
              <div v-show="load_data" style="margin:50px auto; width:5%;">
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
                  v-for="(item,i) in member"
                  :key="i"
                  :src="item.url"
              >

              <v-jumbotron
                  dark
                  src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
              >
      
                <div style="margin:25px 25px 10px 25px; text-transform:capitalize;color:white">
                    <span>Membership</span>
                    <h5 class="headline">
                        <b v-if="item.name.length<65">{{item.name}}</b>
                        <b v-else>{{item.name.substring(0,65)+"..."}}</b>
                    </h5>
                </div>
                <div style="margin:0px 28px;border-top:1px solid white">
                    <h6 class="title" v-if="item.coupon_name!=null" style="color:white;float:right;padding-top:10px"><b>kode kupon:</b> {{item.coupon_code}}</h6>
                    <div class="clear"></div>
                </div>
              
              </v-jumbotron>
              </v-carousel-item>
          </v-carousel> 
          </v-flex>
      </v-layout>
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
        // gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
        load_data:true,    
        datas:[],
        member: []
        
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

      if(this.$store.getters.loggedIn){
        this.$store.dispatch('cekAuth')
        .then(response => {
          // console.log("auth", response)
        })
        .catch(error=>{console.log(error)})
      }

      axios.get('/master/membership')
      .then(response => {
          this.load_data = false
          this.member = response.data.data
      })
      .catch(error => {
          console.log(error.response)
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