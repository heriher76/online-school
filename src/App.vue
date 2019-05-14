<template>
  <v-app>
    <!-- navbar -->
    <v-toolbar app height="90">
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-sm-and-down"><Logo/></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat href="">Home</v-btn>
        <v-btn flat href="">Informasi</v-btn>
        <v-menu :nudge-width="100">         
          <template v-slot:activator="{ on }">
              <v-btn v-on="on" flat>Cerelink<v-icon>arrow_drop_down</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-tile @click="" href="">Cereveid</v-list-tile>
            <v-list-tile @click="" href="/cereout/dashboard">Cerevout</v-list-tile>
            <v-list-tile @click="">Cerejur</v-list-tile>
            <v-list-tile @click="">Cerecall</v-list-tile>
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
        <div class="nav-bal">
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
          <a href="">
            <v-icon>email</v-icon><v-icon>arrow_drop_down</v-icon>
          </a>
        </div>
      </div>
    </v-toolbar>
    <!-- /navbar -->

    <!-- content -->
    <v-content>
      <router-view/>
    </v-content>
    <!-- /content -->

    <!-- footer -->
    <v-footer dark height="auto">
      <v-card class="flex" flat tile>
        <v-card-title class="blue-grey lighten-5 black--text">
          <Logo/>
              
          <strong class="subheading">Get connected with us on social networks!</strong>

          <v-spacer></v-spacer>
          
          <v-btn icon class="pink">
            <v-icon>email</v-icon>
          </v-btn>
          
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-3"
            icon
          >Hello
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-actions class="blue justify-center">
          &copy;2019 &nbsp; <strong>Tsamany Project</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
    <!-- /footer -->
  </v-app>
</template>

<style>
.nav-bal a{
  padding: 2px;
  margin-left: 10px;
}

.nav-bal a:hover{
  text-decoration: none;
  background-color: lightgrey
}

.nav-act{
  float: right;
  margin-top: 20px;
}

.nav-act span{
  margin: 10px;
}

</style>


<script>
import Logo from './components/Logo'

export default {
  name: 'App',
  components: {
    Logo
  },
  data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    })
}

</script>
