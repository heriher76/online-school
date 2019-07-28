<template>
  <v-app>
    <!-- header -->
    <v-toolbar app height="90">
      <!-- <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>
        <v-img :src="require('../assets/images/logo_final2.png')" width="200px" style="float:left"></v-img> 
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <!-- header actions -->
      <div class="nav-action">
        <template>
          <v-list-tile>
            <v-icon>account_circle</v-icon>&nbsp;{{user.name}}
          </v-list-tile>
        </template>
    </div>
    </v-toolbar>
    <!-- /header -->

    <!-- content -->
    <v-content>
      <slot/>
    </v-content>
    <!-- /content -->

    <!-- footer -->
    <v-footer class="blue justify-center" dark height="auto">
      &copy;&nbsp;<strong> PT Cerebrum Edukanesia Nusantara</strong>
    </v-footer>
    <!-- /footer -->
  </v-app>
</template>

<script>

import axios from 'axios'

export default {
  data(){
    return{
      menu: false,
      user: []
    }
  },

  mounted(){  
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token    
    axios.get('/auth/user')
    .then(response => {
      this.user = response.data.data
    })
    .catch(error => {
      console.log(error)
    })
  },
}
</script>
