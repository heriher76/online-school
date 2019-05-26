<template>
  <div class="header">
    <v-toolbar app height="90">
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/">
          <v-img :src="require('../assets/images/logo_final2.png')" width="200px"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="linkInformasi" active-class="false">Informasi</v-btn>
        <v-menu v-if="loggedIn" :nudge-width="100">
          <template v-slot:activator="{ on }">
              <v-btn v-on="on" flat>Cerelink<v-icon>arrow_drop_down</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-tile @click="linkCerevid" active-class="false">Cerevid</v-list-tile>
            <v-list-tile @click="linkCereout" active-class="false">Cereout</v-list-tile>
            <v-list-tile @click="linkCerelisasi" to="" active-class="false">Cerelisasi</v-list-tile>
            <v-list-tile @click="linkCerecall" active-class="false">Cerecall</v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat to="" active-class="false">Kontak</v-btn>

        <!-- search -->
        <v-text-field style="margin:14px 25px; width:300px" flat prepend-inner-icon="search" placeholder="Search"></v-text-field>
        <!-- /search -->

      </v-toolbar-items>

      <!-- <v-spacer></v-spacer> -->

      <v-btn v-if="!loggedIn" flat @click="linkLogin">Sign In</v-btn>
      
      <!-- header actions -->
      <div v-if="loggedIn" class="nav-action">
        <div class="nav-bal">
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <router-link to="/my poin">
                <v-icon style="margin:-2px" v-on="on">add</v-icon>
                </router-link>
            </template>
            <span>Top up</span>
            </v-tooltip>

            <b>Poin : 999999 </b>

            <div class="clear"></div>
        </div>

        <div class="nav-act">
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <router-link to="/cerevid/daftar-pelajaran">
                <v-icon color="blue" v-on="on">book</v-icon>
                </router-link>
            </template>
            <span>Pelajaran saya di Cerevid</span>
            </v-tooltip>

            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <router-link to="/cerevid/wishlist">
                <v-icon color="pink" v-on="on">favorite</v-icon>
                </router-link>
            </template>
            <span>Wishlist Cerevid</span>
            </v-tooltip>

            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <router-link to="">
                <v-icon color="#F44336" v-on="on">email</v-icon>
                </router-link>
            </template>
            <span>Pesan</span>
            </v-tooltip>

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
                <v-btn color="primary" flat @click="linkAkun">My Account</v-btn>
                <v-btn color="red" flat to="/logout">Sign Out</v-btn>
                <!-- <v-btn color="red" flat @click="menu = false">Sign Out</v-btn> -->
                </v-card-actions>
            </v-card>
            </v-menu>

        </div>
    </div>
    <!-- header actions -->
    </v-toolbar>
  </div>
</template>


<script>
export default {
  data:() => ({
    menu: false
  }),

  computed:{
    loggedIn: function(){
      return this.$store.getters.loggedIn
    }
  },

  methods: {
    linkInformasi(){
      this.$router.push({path:'/informasi'})
    },
    linkCerevid(){
      return this.$router.push({path:'/cerevid'})
    },
    linkCereout(){
      this.$router.push({path:'/cereout/dashboard'})
    },
    linkCerelisasi(){
      this.$router.push({path:'/cerelisasi'})
    },
    linkCerecall(){
      this.$router.push({path:'/cerecall'})
    },

    linkLogin(){
      this.$router.push({path:'/login'})
    },

    linkAkun(){
      this.menu = false
      this.$router.push({path:'/my account'})
    }

    // linkAkun(){
    //   menu = false
    //   this.$router.push({path:'/cerecall'})
    // }
  }
}
</script>


<style>
  .nav-action{
    border-left:1px solid #E0E0E0; 
    padding-left:25px
  }

  .nav-bal{
    margin-top:10px;
  }

  .nav-bal a{
    padding: 2px;
    margin-left: 10px;
    float: right;
    background-color: #FAFAFA;
  }

  .nav-bal a:hover{
    text-decoration: none;
    background-color: #F5F5F5
  }

  .nav-bal b{
    color:#B71C1C;
    float:right; 
    margin-top:3px
  }

  .nav-act{
  float: right;
  margin-top: 15px;
  }

  .nav-act span{
  margin: 10px;
  }
</style>