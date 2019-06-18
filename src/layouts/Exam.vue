<template>
  <v-app>
    <!-- header -->
    <v-toolbar app height="90">
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
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

        <!-- <v-menu v-model="menu" :close-on-content-click="false" :width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-list-tile v-on="on">
              <v-icon>account_circle</v-icon>  {{user.name}}
              <v-icon>arrow_drop_down</v-icon>
              </v-list-tile>
          </template>
          <v-card>
              <v-list>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                    <v-list-tile-title>{{user.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat to="/logout">Sign Out</v-btn>
              </v-card-actions>
          </v-card>
        </v-menu> -->
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
      &copy;&nbsp;<strong> PT Cerebrum Media Tama Indonesia</strong>
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
