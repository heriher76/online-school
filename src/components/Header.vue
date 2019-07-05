<template>
  <div class="header">
    <v-toolbar app height="90">
      <v-toolbar-side-icon class="grey--text hidden-md-and-up" style="margin-right:-10px" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <a href="/">
          <v-img :src="require('../assets/images/logo_final2.png')" class="hidden-sm-and-down" width="200px"></v-img>
          <v-img :src="require('../assets/images/logo_final2.png')" class="hidden-md-and-up" style="margin-left:-10px" width="200px"></v-img>
        </a>
      </v-toolbar-title>
      <v-toolbar-items class="nav-tool hidden-sm-and-down">  
        <v-btn v-if="!loggedIn" flat @click="linkHome" active-class="false">Home</v-btn>
        <v-btn flat @click="linkInformasi" active-class="false">Informasi</v-btn>
        <v-btn v-if="loggedIn" flat @click="linkCerevid" active-class="false">Cerevid</v-btn>
        <v-btn v-if="loggedIn" flat @click="linkCereout" active-class="false">Cereout</v-btn>
        <v-btn v-if="loggedIn" flat @click="linkCerelisasi" active-class="false">Cerelisasi</v-btn>
        <v-btn v-if="loggedIn" flat @click="linkCerecall" active-class="false">Cerecall</v-btn>
        <v-btn v-if="loggedIn" flat @click="linkCerejur" active-class="false">Cerejur</v-btn>
        <v-btn v-if="loggedIn" flat @click="linkCerefo" active-class="false">Cerefo</v-btn>
        <v-btn flat @click="linkTentang" active-class="false">Tentang</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-btn v-if="!loggedIn" flat @click="linkLogin">Masuk</v-btn>

      <!-- header action responsive -->
      <div class="nav-act-resp">
          <v-menu
            v-model="menuRespn"
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
                    <img v-if="user.photo_url!=null" :src="user.photo_url">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                    <v-list-tile-title>{{user.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                </v-list>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="linkAkun">Akun Saya</v-btn>
                <v-btn color="red" flat @click="linkLogout">Keluar</v-btn>
                </v-card-actions>
            </v-card>
          </v-menu>
      </div>
      <!-- /header action responsive -->

      <!-- header actions -->
      <div v-if="loggedIn" class="hidden-sm-and-down">
        <div class="hidden-lg-and-up">
          <v-menu
            v-model="menuDrop"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
          <template v-slot:activator="{ on }">
            <a v-on="on">
            <v-icon>list</v-icon><v-icon>arrow_drop_down</v-icon>
            </a>
          </template>
              <v-card height="130px" style="padding-top:25px">
                <v-list>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img v-if="user.photo_url!=null" :src="user.photo_url">
                    </v-list-tile-avatar>

                    <v-list-tile-content style="height:100px;">
                      <v-list-tile-title @click="linkAkun">{{user.name}}
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                              <a @click="linkAkun">
                              <v-icon color="blue" v-on="on">edit</v-icon>
                              </a>
                          </template>
                          <span>Akun Saya</span>
                        </v-tooltip>
                      </v-list-tile-title>

                      <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
                    
                      <v-list-tile-sub-title>
                        <a style="color:red" flat @click="linkLogout">Keluar</a>
                        <div style="float:right;">
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
                              <router-link to="/cerevid/favorit">
                              <v-icon color="pink" v-on="on">favorite</v-icon>
                              </router-link>
                          </template>
                          <span>Pelajaran Favorit di Cerevid</span>
                          </v-tooltip>

                          <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                              <router-link to="">
                              <v-icon color="#F44336" v-on="on">email</v-icon>
                              </router-link>
                          </template>
                          <span>Cerecall Masuk</span>
                          </v-tooltip>
                        </div>  
                      </v-list-tile-sub-title>

                      <v-list-tile-sub-title>
                        <div class="nav-bal">
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <router-link v-if="cekMember=='0'" to="/membership">
                                <v-icon style="margin:-2px" v-on="on">add</v-icon>
                                </router-link>
                                <router-link v-else-if="cekMember=='1'" to="/my poin">
                                <v-icon style="margin:-2px" v-on="on">add</v-icon>
                                </router-link>
                            </template>
                            <span>Top up</span>
                            </v-tooltip>

                            <b>Cerecoin : {{user.balance}} </b>

                            <div class="clear"></div>
                        </div>
                      </v-list-tile-sub-title>

                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
          </v-menu>
        </div>
      </div>
      
      <div v-if="loggedIn" class="nav-action hidden-md-and-down">
        <div class="nav-bal">
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <router-link v-if="user.class==null" :to="{name: 'my_account', params:{snackb: 'true'}}">
                <v-icon style="margin:-2px" v-on="on">add</v-icon>
                </router-link>
                <router-link v-else-if="cekMember=='0'" to="/membership">
                <v-icon style="margin:-2px" v-on="on">add</v-icon>
                </router-link>
                <router-link v-else-if="cekMember=='1'" to="/my poin">
                <v-icon style="margin:-2px" v-on="on">add</v-icon>
                </router-link>
            </template>
            <span>Top up</span>
            </v-tooltip>
            <b>Cerecoin : {{user.balance}} </b>

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
                <router-link to="/cerevid/favorit">
                <v-icon color="pink" v-on="on">favorite</v-icon>
                </router-link>
            </template>
            <span>Pelajaran Favorit di Cerevid</span>
            </v-tooltip>

            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <router-link to="">
                <v-icon color="#F44336" v-on="on">email</v-icon>
                </router-link>
            </template>
            <span>Cerecall Masuk</span>
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
                      <img v-if="user.photo_url!=null" :src="user.photo_url">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                      <v-list-tile-title>{{user.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                  </v-list-tile>
                  </v-list>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="linkAkun">Akun Saya</v-btn>
                  <v-btn color="red" flat @click="linkLogout">Keluar</v-btn>
                  </v-card-actions>
              </v-card>
            </v-menu>
        </div>
      </div>
      <!-- header actions -->     

    </v-toolbar>

    <!-- navigation-drawer -->
    <v-navigation-drawer 
      v-model="drawer" 
      fixed
      temporary
    >
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          <router-link to="/">
            <v-img :src="require('../assets/images/logo_final2.png')" width="200px"></v-img>
          </router-link>
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-toolbar flat v-if="loggedIn" style="padding:30px 0px" class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar style="margin-top:-50px">
              <img v-if="user.photo_url!=null" :src="user.photo_url">
            </v-list-tile-avatar>

            <v-list-tile-content style="height:100px;">
              <v-list-tile-title @click="linkAkun">{{user.name}}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                      <a @click="linkAkun">
                      <v-icon color="blue" v-on="on">edit</v-icon>
                      </a>
                  </template>
                  <span>Akun Saya</span>
                </v-tooltip>
              </v-list-tile-title>

              <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
            
              <v-list-tile-sub-title>
                <a style="color:red" flat @click="linkLogout">Keluar</a>
                <div style="float:right;">
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
                      <router-link to="/cerevid/favorit">
                      <v-icon color="pink" v-on="on">favorite</v-icon>
                      </router-link>
                  </template>
                  <span>Pelajaran Favorit di Cerevid</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                      <router-link to="">
                      <v-icon color="#F44336" v-on="on">email</v-icon>
                      </router-link>
                  </template>
                  <span>Cerecall Masuk</span>
                  </v-tooltip>
                </div>  
              </v-list-tile-sub-title>

              <v-list-tile-sub-title>
                <div class="nav-bal">
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <router-link v-if="user.class==null" :to="{name: 'my_account', params:{snackb: 'true'}}">
                      <v-icon style="margin:-2px" v-on="on">add</v-icon>
                      </router-link>
                      <router-link v-else-if="cekMember=='0'" to="/membership">
                      <v-icon style="margin:-2px" v-on="on">add</v-icon>
                      </router-link>
                      <router-link v-else-if="cekMember=='1'" to="/my poin">
                      <v-icon style="margin:-2px" v-on="on">add</v-icon>
                      </router-link>
                    </template>
                    <span>Top up</span>
                    </v-tooltip>

                    <b>Cerecoin : {{user.balance}} </b>

                    <div class="clear"></div>
                </div>
              </v-list-tile-sub-title>

            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-if="!loggedIn" @click="linkHome">
          <v-list-tile-content>
            <v-list-tile-title>HOME</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile @click="linkInformasi">
          <v-list-tile-content>
            <v-list-tile-title>INFORMASI</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <div v-if="loggedIn">
          <v-list-tile @click="linkCerevid">
            <v-list-tile-content>
              <v-list-tile-title>CEREVID</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="linkCereout">
            <v-list-tile-content>
              <v-list-tile-title>CEREOUT</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="linkCerelisasi">
            <v-list-tile-content>
              <v-list-tile-title>CERELISASI</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="linkCerecall">
            <v-list-tile-content>
              <v-list-tile-title>CERECALL</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="linkCerejur">
            <v-list-tile-content>
              <v-list-tile-title>CEREJUR</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="linkCerefo">
            <v-list-tile-content>
              <v-list-tile-title>CEREFO</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <v-list-tile @click="linkTentang">
          <v-list-tile-content>
            <v-list-tile-title>TENTANG</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
          
      </v-list>
    </v-navigation-drawer>
    <!-- /navigation-drawer -->

    <LoadingScreen1 :loading="loadLogout"></LoadingScreen1>
  </div>
</template>


<script>
import axios from 'axios'
import LoadingScreen1 from'../components/loading-screen/Loading1'

export default {
  props:["snackb"],
  components:{
    LoadingScreen1
  },
  data() {
    return {
      menuDrop:false,
      bt_src:true,
      src: false,
      drawer: false,
      loadLogout: false,
      menu: false,
      menuRespn: false,
      user: [],
      userPhoto: '',
      cekMember:[]
    }
  },

  computed:{
    loggedIn: function(){
      this.menu = false
      return this.$store.getters.loggedIn
    }
  },

  mounted(){      
    if(this.$store.getters.loggedIn){
      axios.get('/auth/user')
      .then(response => {
        this.user      = response.data.data
        this.cekMember = response.data.data.membership
      })
      .catch(error => {
        console.log(error)
      })
    }

  },

  methods: {
    linkHome(){
      this.$router.push({path:'/'})
    },
    linkInformasi(){
      this.$router.push({path:'/informasi'})
    },
    linkCerevid(){
      return this.$router.push({path:'/cerevid'})
    },
    linkCereout(){
      // window.location.href = "/cereout/dashboard"
      this.$router.push({path:'/cereout/dashboard'})
    },
    linkCerelisasi(){
      this.$router.push({path:'/cerelisasi'})
    },
    linkCerecall(){
      this.$router.push({path:'/cerecall'})
    },
    linkCerejur(){
      this.$router.push({path:'/cerejur'})
    },
    linkCerefo(){
      this.$router.push({path:'/cerefo'})
    },

    linkTentang(){
      this.$router.push({path:'/about'})
    },

    linkLogin(){
      this.$router.push({path:'/login'})
    },

    linkLogout(){
      this.menu = false
      this.loadLogout = true

      if (!this.loadLogout) return
      setTimeout(() => (
        this.loadLogout = false,
        this.$router.push({path:'/logout'}) 
      ), 3000)      
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
  @media only screen and (max-width: 1160px) {
    .nav-action{
      display: none;
    }
  }

  @media only screen and (max-width: 1160px) {
    .nav-act-resp{
      display: block
    }
  }

  .nav-act-resp{
    display: none
  }

  .nav-tool{
    margin-left: 70px;
    width:600px
  }

  .nav-action{
    float: right;
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