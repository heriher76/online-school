<template>
  <div class="home">
    <!-- banner -->
    <Banner/>
    <v-btn to="/login">cek</v-btn>
    <!-- /banner -->

    <v-container>
    <!-- content up -->
    <div class='section'>
      <div id="icon-wrapper">
        <router-link to="">
          <div class="icons">
            <div class="icon-slide-container">
              <img class="slide-icon"  alt="Proses Belajar" height="100" :src="require('../assets/images/slide-1.jpg')" >
            </div>
          </div>
        </router-link>
      
        <router-link to="">
          <div class="icons2">
            <div class="icon-slide-container">
              <img class="slide-icon"  alt="Materi Pembelajaran" height="100" :src="require('../assets/images/slide-2.jpg')">
            </div>
          </div>
        </router-link>
        
        <router-link to="">
          <div class="icons3">
            <div class="icon-slide-container">
              <img class="slide-icon"  alt="Monitoring" height="100" :src="require('../assets/images/slide-3.jpg')">
            </div>
          </div>
        </router-link>
          
        <router-link to="">
          <div class="icons4">
            <div class="icon-slide-container">
              <img class="slide-icon"  alt="Question" height="100" :src="require('../assets/images/slide-4.jpg')">
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- /content up -->
    <div class="clear"></div>
    <hr>

    <v-divider></v-divider>

    <!-- content down -->
    <v-layout row wrap>
      <v-flex xs6>
        <h4>Tentang Kami</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quaerat ipsa facilis amet dicta placeat fugiat dolorum aut modi, cum sequi sapiente nostrum dolorem doloribus libero! Pariatur neque suscipit dolores excepturi.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus impedit vel, autem explicabo ex iure sed quas aliquid maiores veritatis illo voluptatum? Quisquam quae natus, ut sapiente in ex consequatur.
          </p>
      </v-flex>
      <v-flex xs6>
        <h4>Testimoni</h4>
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
.section{
		float: left;
		padding-top: 50px;
		padding-bottom: 100px;
		width: 100%;
		padding-left:0;
		padding-right:0;
}

#icon-wrapper{
	width:100%;
	float:left;
	height:300px;
}

.icons {
	width:20%;
	float:left;
	position:relative;
}
.icons2 {
	width:25%;
	float:left;
	position:relative;
	margin-left:25%;
}
.icons3 {
	width:30%;
	float:left;
	position:relative;
	margin-left:50%;
}
.icons4 {
	width:35%;
	float:left;
	position:relative;
	margin-left:75%;
}

.icon-slide-container{
	height:300px;
	overflow:hidden;
	text-align: left;
	position: absolute;
	float: left;
	width: 300px;
	left: 50%;
	margin-left: -150px;
}

.slide-icon{
  width:300px;
  height:auto;
  position:absolute;
  margin-top:-300px;
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

@media only screen and (max-width: 1300px) {
  #icon-wrapper{
		width:100%;
		float:left;
		height:170px;
	}
  .icon-slide-container {
		height: 200px;
		overflow: hidden;
		text-align: left;
		position: absolute;
		float: left;
		width: 200px;
		left: 50%;
		margin-left: -100px;
	}
  .slide-icon {
		width: 200px;
		height: auto;
		position: absolute;
		margin-top: -200px;
	}
}
</style>