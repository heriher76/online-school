<template>
    <div class="leaderboard">
        <!-- sub content -->
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <!-- sidebar -->
                <v-flex md3 sm12 xs12>
                    <v-card>
                        <SideBar class="hidden-sm-and-down" style="float:left;"/>
                        <Navbar class="hidden-md-and-up" />
                    </v-card>
                </v-flex>
                <!-- /sidebar -->

                <!-- leader board -->
                <v-flex md9 sm12 xs12>
                    <v-card color="#B71C1C" dark>
                        <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px">Papan Peringkat</h6></v-card-text>
                    </v-card>
                    <br>
                    
                    <v-layout row wrap>
                      <v-flex md12 sm12 xs12>
                        <v-card>
                          <v-card color="#E53935" dark >
                            <v-card-text style="font-size:18px">Kelas <span v-if="user.class!=null">{{user.class.name_class}}</span></v-card-text>
                          </v-card>

                          <!-- loading -->
                          <div v-show="load_dataClass" style="margin:0px auto; padding:40px; width:5%;">
                              <v-progress-circular
                              :size="40"
                              color="primary"
                              indeterminate
                              ></v-progress-circular>
                          </div>
                          <!-- /loading -->

                          <div v-show="tablClass" class="tabl">
                            <v-data-table
                              :headers="headers"
                              :items="leaderClass"
                              disable-initial-sort
                            >
                              <template v-slot:items="props">
                                  <td v-if="props.item.name == user.name" style="background:#F5F5F5;color:red"><b>{{props.item.name}}</b></td>
                                  <td v-else>{{props.item.name}}</td>
                                  <td v-if="props.item.name == user.name" style="background:#F5F5F5;color:red"><b>{{props.item.score}}</b></td>
                                  <td v-else>{{props.item.score}}</td>
                              </template>
                            </v-data-table>
                          </div>
                        </v-card>
                      </v-flex>

                      <v-flex md12 sm12 xs12>
                        <v-card>
                          <v-card color="#E53935" dark >
                            <v-card-text style="font-size:18px">Pelajaran </v-card-text>
                          </v-card>

                          <!-- select -->
                          <v-layout style="padding:10px 20px">
                            <v-flex md12>
                                <v-select
                                    :items="dataLesson"
                                    label="Lihat di Pelajaran"
                                    name="pelajaran"
                                    v-model="pelajaran"
                                    item-text="name"
                                    item-value="id"
                                    @change="getDataPelajaranbyLesson"
                                ></v-select>
                            </v-flex>
                          </v-layout>
                          <!-- /select -->

                          <!-- loading -->
                          <div v-show="load_data" style="margin:0px auto; padding:40px; width:5%;">
                              <v-progress-circular
                              :size="40"
                              color="primary"
                              indeterminate
                              ></v-progress-circular>
                          </div>
                          <!-- /loading -->

                          <div v-show="tabl" class="tabl">
                            <v-data-table
                              :headers="headers"
                              :items="leader"
                              disable-initial-sort
                            >
                              <template v-slot:items="props">
                                  <td v-if="props.item.name == user.name" style="background:#F5F5F5;color:red"><b>{{props.item.name}}</b></td>
                                  <td v-else>{{props.item.name}}</td>
                                  <td v-if="props.item.name == user.name" style="background:#F5F5F5;color:red"><b>{{props.item.score}}</b></td>
                                  <td v-else>{{props.item.score}}</td>
                              </template>
                            </v-data-table>
                          </div>
                        </v-card>
                      </v-flex>
                    </v-layout>
                </v-flex>
                <!-- /leader board -->
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../components/cereout-component/SideBar'
    import Navbar from '../../components/cereout-component/Navbar'
    import Axios from 'axios';

    export default {
    name: 'leaderboard',
    components: {
      SideBar,
      Navbar,
    },
    data () {
      return {
        load_data: true,
        tabl: false,
        
        load_dataClass: true,
        tablClass: false,

        text_judul: "Kelas",

        user: [],

        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Nilai', value: 'score' }
        ],
        leaderClass: [],
        leader: [],
        
        classs: [],
	      kelas: '',
	      pelajaran: ''
      }
    },

    methods:{       
      async getDataPelajaranbyLesson(){
        this.$store.dispatch('getDataPelajaranbyLesson',{
          id: this.pelajaran
        })
        .then(response => {console.log('load data..')})
        .catch(error =>{console.log(error)})
        
        this.byLesson()
      },
         
      //get leaderboard by lesson id
      byLesson(){
        console.log('by lesson id')
        this.load_data = true
        this.tabl      = false
        Axios.get('/cereouts/leaderboard/lesson/'+this.pelajaran)//get by lesson id
        .then(response => {
          this.load_data = false
          this.tabl      = true
          this.text_judul= 'Pelajaran '//+this.pelajaran
          this.leader    = response.data.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response)
        })
      },
    },

    computed: {		
    	dataLesson(){
    		var data = []
				if(this.classs.data){
          for(var i=0;i<this.classs.data.length;i++){
            if(this.classs.data[i].id == this.$store.state.classId){
              data = this.classs.data[i].lessons
            }
          }
				}
    		return data
    	},
    },

    mounted(){
      // get user
      Axios.get('/auth/user')
      .then(response => {
          this.user = response.data.data
      })
      .catch(error => {
          console.log(error)
      })

      
      this.load_data = false
      Axios.get('/cereouts/leaderboard/'+this.$store.state.classId)//get by class_id user
      .then(response => {
        // this.tabl          = true
        this.load_dataClass= false
        this.tablClass     = true
        this.leaderClass = response.data.data
        // this.leader      = response.data.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error.response)
      })

      Axios.get('/master/class')//get class
      .then(response => {
        this.classs = response.data
        console.log(response.data)
      })
      .catch(error => {console.log(error.response)})

    }
  }
</script>

<style>
  .tabl{
    padding:0px 10px 30px 10px
  }
  @media only screen and (max-width: 1080px) {
    .tabl{
      padding:0px
    }
  }
</style>
