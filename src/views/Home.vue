<template>
  <div class="home">
    <!-- banner -->
    <Banner/>
    <!-- /banner -->

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
          <div style="width:300px; margin-top:-50px; margin-left:50px ">          
            <img :src="require('../assets/images/cerebrum.png')" width="100%" height="100%">
          </div>
        </v-flex>
      </v-layout>
    </v-container>



    <hr>
    <v-divider></v-divider>

    <!-- content down -->
    <v-layout row wrap style="margin:20px">
      
      <v-flex xs6>
        <h3 class="display-2">Testimonial</h3>
        <blockquote class="blockquote">&quot;Lorem ipsum dolor sit amet, consectetur adipisicing elit.&quot;</blockquote>
      </v-flex>
    </v-layout>
    <!-- /content down -->
  </v-container>

    
  </div>
</template>

<script>
  import Banner from "../components/Banner"
  export default {
    name: 'home',
    components:{
      Banner
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