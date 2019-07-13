<template>
  <v-app>
    <!-- header -->
    <div class="header">
    <v-toolbar app height="90">
      <v-toolbar-side-icon class="grey--text hidden-md-and-up" style="margin-right:-10px" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <a href="/">
          <v-img :src="require('../assets/images/logo_final2.png')" class="hidden-sm-and-down" width="200px"></v-img>
          <v-img :src="require('../assets/images/logo_final2.png')" class="hidden-md-and-up" style="margin-left:-10px" width="200px"></v-img>
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-show="loggedIn" class="hidden-sm-and-down" style="min-width:750px">
        <v-btn flat @click="linkDashboard" active-class="false">Dashboard</v-btn>
        <v-btn flat @click="linkCerevid" active-class="false">Cerevid</v-btn>
        <v-btn flat @click="linkCerecall" active-class="false">Cerecall</v-btn>
      </v-toolbar-items>

      <!-- <v-spacer></v-spacer> -->

      <v-btn v-if="!loggedIn" flat @click="linkLogin">Masuk</v-btn>

      <!-- header actions -->
      <div v-if="loggedIn" class="nav-action hidden-sm-and-down">

        <div class="nav-act">

            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-x
            >
            <template v-slot:activator="{ on }">
                <a v-on="on">
                <!-- <p style="color: black; font-size: 18px;">Hello, {{user.name}} !</p> --><v-icon>account_circle</v-icon><v-icon>arrow_drop_down</v-icon>
                </a>
            </template>

            <v-card>
                <v-list>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                    <img :src="userPhoto" alt="John">
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
      absolute
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
            <v-list-tile-avatar>
              <img :src="userPhoto">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title @click="linkAkun">{{user.name}}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                      <a @click="linkAkun">
                      <v-icon color="blue" v-on="on">edit</v-icon>
                      </a>
                  </template>
                  <span>My Account</span>
                </v-tooltip>
              </v-list-tile-title>

              <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>

              <v-list-tile-sub-title>
                <a style="color:red" flat @click="linkLogout">SIGN OUT</a>
              </v-list-tile-sub-title>

            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense v-show="loggedIn">
        <v-divider></v-divider>

        <v-list-tile @click="linkDashboard">
          <v-list-tile-content>
            <v-list-tile-title>DASHBOARD</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


        <v-list-tile @click="linkCerevid">
          <v-list-tile-content>
            <v-list-tile-title>CEREVID</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="linkCerecall">
          <v-list-tile-content>
            <v-list-tile-title>CERECALL</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile @click="linkPusatBantuan">
          <v-list-tile-content>
            <v-list-tile-title>PUSAT BANTUAN</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <!-- /navigation-drawer -->

    <LoadingScreen1 :loading="loadLogout"></LoadingScreen1>
  </div>
    <!-- /header -->

    <!-- content -->
    <v-content>
      <slot/>
    </v-content>
    <!-- /content -->

    <!-- footer -->
    <v-footer class="blue justify-center" dark height="auto">
        &copy; &nbsp; <strong>PT Cerebrum Media Tama Indonesia</strong>
    </v-footer>
    <!-- /footer -->
  </v-app>
</template>
<script>
  import axios from 'axios'
  import LoadingScreen1 from'../components/loading-screen/Loading1'

  export default{
    components:{
      LoadingScreen1
    },
    data() {
      return {
        bt_src:true,
        src: false,
        drawer: false,
        loadLogout: false,
        menu: false,
        user: [],
        userPhoto: '',
        cekStatus: ''
      }
    },

    computed:{
      loggedIn: function(){
        this.menu = false
        return this.$store.getters.loggedIn
      }
    },

    created() {
      this.incrementTime()
      const loggedIn = this.$store.getters.loggedIn
      const status = this.$store.state.status
      if (!loggedIn) {
          this.$router.push({path:'/guru/login'})
      }
      // if (loggedIn && status != 1) {
      //     this.$router.push({path:'/'})
      // }
    },

    mounted(){
      var OneSignal = window.OneSignal || [];
      OneSignal.push(function() {
        OneSignal.setDefaultNotificationUrl("http://localhost:8080/guru/cerecall/chat");
      });
      //===============================================================================
      axios.get('/auth/user')
      .then(response => {
        this.user = response.data.data
      })
      .catch(error => {
        console.log(error)
      })

      axios.get('https://api.ceredinas.id/api/auth/photoProfile/'+this.$store.state.dataUser, {responseType: 'blob'})
      .then(response => {
          // let imageNode = document.getElementById('myprofile');
          let imgUrl     = URL.createObjectURL(response.data)
          this.userPhoto = imgUrl
      })
      .catch(error => {
          console.log(error)
      })
    },
    methods: {
      incrementTime() {
        this.time = parseInt(this.time) + 1;

        axios.get('/auth/user')
        .then(response => {
          console.log(response.data.data)
          this.cekStatus = response.data.data.role
          if(this.cekStatus == 2){
            return this.$router.push({name:'home'})
          }
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      linkDashboard(){
        return this.$router.push({path:'/guru'})
      },
      linkPusatBantuan(){
        return this.$router.push({path:'/pusat bantuan'})
      },
      linkCerevid(){
        return this.$router.push({path:'/guru/cerevid'})
      },
      linkCerecall(){
        return this.$router.push({path:'/guru/cerecall'})
      },
      linkLogin(){
        this.$router.push({path:'/guru/login'})
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
        this.$router.push({path:'/guru/profile'})
      }
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
