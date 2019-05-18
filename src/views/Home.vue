<template>
  <div class="home">
  <!-- banner -->
  <div style="height:550px">
    <v-img :src="require('../assets/images/banner.jpg')" height="100%" width="100%">
      <v-expand-transition>
        <div
          class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
          style="height: 100%;"
        >
          <div class="text-banner" style="top:150px; position:relative;text-align:center;">
            <h1 style="font-family:'Arial';color:white;">Learn by Doing</h1>
            <h5 style="font-family:'Arial';color:white;">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
            <v-btn>Let's Start</v-btn>
          </div>
          <!-- <v-btn>Let's Start</v-btn> -->
        </div>
      </v-expand-transition>
    </v-img>
  </div>
  <!-- /banner -->

  <v-container grid-list-md>
    <!-- content up -->
    <!-- /content up -->

    <hr>

    <v-divider></v-divider>

    <!-- content down -->
    <v-layout row wrap>
      <v-flex xs6>
        <h4>Tentang Kami</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ipsa facilis amet dicta placeat fugiat dolorum aut modi, cum sequi sapiente nostrum dolorem doloribus libero! Pariatur neque suscipit dolores excepturi.</p>
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


<style>
.v-card--reveal {
  align-items: center;
  bottom: 0px;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
  font-family: "Arial";
  background-image: linear-gradient(10deg, #2c3e50,#ffffff,#ee1414,#51a9fc,#8e44ad);
  background-size: 400% 350%;
}

/* .v-card--reveal{
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: "montserrat";
  background-image: linear-gradient(10deg, #2c3e50,#ffffff,#2980b9,#ffffff,#8e44ad);
  background-size: 400% 400%;
  animation: bganimation 15s infinite;
} */
</style>