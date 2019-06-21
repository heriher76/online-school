<template>
  <div class="home">
    <!-- banner -->
    <Banner/>
    <!-- /banner -->

    <!-- content up -->
    <v-container>
      <div style="margin-bottom:20px">
        <hr>
      </div>
      
      <!-- <div style="text-align:center;margin-top:50px">
        <div style="background:#E65100; width:100%; height:10px"></div>
        <span style="font-size:40px; padding:10px 20px; color:#B71C1C; background:#FAFAFA; position:relative;top:-36px"><b>Lorem Ipsum</b></span>
      </div> -->
      <!-- <v-card flat>
        <v-card-text>
          <h3 class=".display-2" style="color:#424242">Promo Hari Ini</h3>
        </v-card-text>
      </v-card> -->
      
      <v-carousel
        height=300
        interval=4000
        delimiter-icon="adjust"
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
            <h5 style="color:white; padding:10px 20px; background:rgba(0,0,0,0.2)" class="headline">{{item.title}}</h5>
          </v-carousel-item>
        </router-link>
      </v-carousel>  
      
    </v-container>   
    <!-- /content up -->

    <!-- <v-container style="margin-top:50px;">
      <div>
        <div style="background:#E65100; width:100%; height:10px"></div>
        <span style="font-size:40px; padding:10px 20px; color:#B71C1C; background:#FAFAFA; position:relative;top:-36px;left:60px"><b>Testimonial</b></span>
      </div>

      <p>lorem ipsum dolor sit amet lorem ipusm dolor</p>
    </v-container> -->

    <!-- <hr>
    <v-divider></v-divider> -->

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

      if(this.$store.getters.loggedIn){
        this.$store.dispatch('cekAuth')
        .then(response => {
          // console.log("auth", response)
        })
        .catch(error=>{console.log(error)})
      }
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