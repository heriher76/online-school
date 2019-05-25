<template>
  <v-app>
    <!-- header -->
    <v-toolbar app height="90">
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-img :src="require('../assets/images/logo_final2.png')" width="200px" style="float:left"></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-menu :nudge-width="100">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" flat>Cerelink Guru<v-icon>arrow_drop_down</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-tile @click="linkCerevid" active-class="false">Cerevid</v-list-tile>
            <v-list-tile @click="linkCerecall" active-class="false">Cerecall</v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <!-- header actions -->
      <div class="nav-action">

        <v-menu v-model="menu" :close-on-content-click="false" :width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-list-tile v-on="on">
              <v-icon>account_circle</v-icon>
              Febri Ardi Saputra
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
    </v-toolbar>
    <!-- /header -->

    <!-- content -->
    <v-content>
      <slot/>
    </v-content>
    <!-- /content -->

    <!-- footer -->
    <v-footer class="blue justify-center" dark height="auto">
        &copy;2019 &nbsp; <strong>Tsamany Project</strong>
    </v-footer>
    <!-- /footer -->
  </v-app>
</template>
<script>
  export default{
    methods: {
      linkCerevid(){
        return this.$router.push({path:'/guru/cerevid'})
      },
      linkCerecall(){
        return this.$router.push({path:'/guru/cerecall'})
      },
    }
  }
</script>
