<template>
    <v-toolbar app height="90">
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-img :src="require('../assets/images/logo_final2.png')" width="200px"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="">Informasi</v-btn>
        <v-menu :nudge-width="100">         
          <template v-slot:activator="{ on }">
              <v-btn v-on="on" flat>Cerelink<v-icon>arrow_drop_down</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-tile @click="" to="">Cereveid</v-list-tile>
            <v-list-tile @click="" to="/cereout/dashboard">Cereout</v-list-tile>
            <v-list-tile @click="" to="">Cerejur</v-list-tile>
            <v-list-tile @click="" to="">Cerecall</v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat>Kontak</v-btn>
        <!-- search -->
        <v-text-field style="margin:14px 25px" flat prepend-inner-icon="search" placeholder="Search"></v-text-field>
        <!-- /search -->
      </v-toolbar-items>

      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn flat>Sign In</v-btn> -->
      <div style="border-left:1px solid #E0E0E0; padding-left:15px">
        <div class="nav-bal" style="margin-top:10px">
          <b>Balance : Rp. 999.999.999</b>
          <a href="#">
            <v-icon style="margin:-4px">add</v-icon>
          </a>
        </div>
        <div class="nav-act">
          <a href="">
            <v-icon>email</v-icon>
          </a>

          <span>|</span>

          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template v-slot:activator="{ on }">
              <a v-on="on">
                <v-icon>account_circle</v-icon><v-icon>arrow_drop_down</v-icon>
              </a>
            </template>

            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>John Leider</v-list-tile-title>
                    <v-list-tile-sub-title>jhonleider@mail.co</v-list-tile-sub-title>
                  </v-list-tile-content>

                </v-list-tile>
              </v-list>


              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="menu = false">Sign Out</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          
        </div>
      </div>
    </v-toolbar>
</template>

<style>
    .nav-bal a{
    padding: 2px;
    margin-left: 10px;
    background-color: #E0E0E0;
    }

    .nav-bal a:hover{
    text-decoration: none;
    background-color: #F5F5F5
    }

    .nav-act{
    float: right;
    margin-top: 15px;
    }

    .nav-act span{
    margin: 10px;
    }
</style>

<script>   
export default {
  
}
</script>
