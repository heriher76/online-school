<template>
    <div class="banner-home">     
      <img :src="require('../assets/images/cerevid-1.png')" alt="" height="100%" width="100%">

      <div class="hidden-sm-and-down img-cere">
        <img :src="require('../assets/images/cereout.png')" alt="" height="100%" width="100%">
      </div>
      <div class="img-school">
        <img :src="require('../assets/images/school3.png')" alt="" height="100%" width="100%">
      </div>
      <div class="banner-color"></div>
      <div class="text-banner">
        <h3 class="display-2">Bimbel Online Gratis No. 1 di Indonesia</h3>
        <h5 class="subheading">Bimbel jadi gratis, bisa dimana saja dan kapan saja dengan video pembelajaran yang lengkap !</h5>
        <!-- <v-btn v-if="!loggedIn" to="/login">Mulai Belajar</v-btn> -->
      </div>
    </div>
</template>

<style>
  .banner-home{
    height:600px;
    position:relative
  }

  .banner-color {
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

  .text-banner{
    top:400px;
    width:100%;
    padding:20px;
    background: rgba(0, 0, 0, 0.3);
    position:absolute;
    text-align:center;
  }

  .text-banner h3,h5{
    font-family:'Arial';
    color:white;
  }

  .img-cere{
    position:absolute;
    top:100px;
    left:50px;
    height:380px;
    width:450px
  }

  .img-school{
    position:absolute;
    top:0px;
    right:10px;
    height:630px;
    width:700px
  }

  
  @media only screen and (max-width: 750px) {
    .img-school{
      top: 50px;
      width: 100%;
      height: auto;
    }
    .banner-home{
      height:400px;
    }
    .text-banner{
      top:60px;
    }

  }
</style>


<script>
export default {
  computed:{
    loggedIn: function(){
      this.menu = false
      return this.$store.getters.loggedIn
    }
  },
}
</script>
