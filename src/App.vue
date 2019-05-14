<template>
  <v-app>
    <!-- navbar -->
    <Navbar/>
    <!-- /navbar -->

    <!-- content -->
    <v-content>
      <router-view/>
    </v-content>
    <!-- /content -->

    <!-- footer -->
    <v-footer dark height="auto">
      <v-card class="flex">
        <v-card-title class="blue-grey lighten-5 black--text">
          <v-layout row wrap>
            <v-flex md4>         
              <v-img :src="require('./assets/images/logo_final2.png')" width="280px"></v-img>
              <div style="margin:10px 20px">
              <p>Get connected with us on social networks</p>
              <p>Jl. Raya Cipadung No.334 Cipadung Wetan, Panyileukan Bandung, Jawa Barat, 40614.</p>
              </div>
            </v-flex>
            
            <v-flex md4>
              hello
            </v-flex>
          </v-layout>
        </v-card-title>

        <v-card-actions class="blue justify-center">
          &copy;2019 &nbsp; <strong>Tsamany Project</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
    <!-- /footer -->
  </v-app>
</template>


<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}

</script>
