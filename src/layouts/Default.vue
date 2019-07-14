<template>
  <v-app>
    <!-- header -->
    <nav>
      <Header/>
      <!-- <h1>{{cekStatus}}</h1> -->
    </nav>
    <!-- /header -->

    <!-- content -->
    <v-content>
      <v-dialog v-model="dialogRunning" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">Tryout Masih Berjalan </v-card-title>
            <v-card-text>Anda belum menyelesaikan tryout, selesaikan sekarang !!</v-card-text>
            <v-card-actions>
            <v-btn block color="green darken-1" flat dark @click="attemptRunning">Oke</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>

      <slot/>
    </v-content>
    <!-- /content -->

    <!-- footer -->
    <Footer/>
    <!-- /footer -->
  </v-app>
</template>


<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },

  data(){
    return {
      cekStatus: [],

      time: 0,
      interval: null,

      data:[],
      dialogRunning:false
    }
  },

  methods:{
    attemptRunning(){
      this.dialogRunning = false
      this.$router.push({name: 'dashboard'})
      let routeData = this.$router.resolve({name: 'exam_page', params:{id: this.data.tryout_id, scoringSystem: this.data.scoring_system, attemptId: this.data.id}});
        window.open(routeData.href,
                    'my_window', 
                    'width=1600, height=620, resizable=no',
                    '_blank'
                    )
    },

    toggleTimer() {
        this.interval = setInterval(this.incrementTime, 1000);
    },
    incrementTime() {
        this.time = parseInt(this.time) + 1;
        if(this.$store.state.token!=null){
          axios.get('/auth/user')
          .then(response => {
            // console.log(response.data.data)
            this.cekStatus = response.data.data.role
            if(this.cekStatus == 1){
              return window.location.href = "/guru"
              // return this.$router.push({name:'dashboard_guru'})
            }
          })
          .catch(error => {
            console.log(error.response)
          })

          axios.get('/cereouts/running')
          .then(response => {
            if(response.data.status == true){
              this.dialogRunning = true
              this.data = response.data.data

              console.log(this.data)

              //tambah kondisi waktu berakhir
            }
            else if(response.data.status == false){
              this.dialogRunning = false
              this.data = response.data.data
            }
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },

  },


  mounted(){  
    // if(this.$store.getters.loggedIn){
      this.toggleTimer()
    // }

    var OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.setDefaultNotificationUrl("https://app.cerebrum.id/cerecall/chat");
    });

  },  
}
</script>
