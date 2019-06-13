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
                        <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px">Leaderboard {{text_judul}}</h6></v-card-text>
                    </v-card>
                    <br>
                    <v-card>
                        <!-- select -->
                        <v-layout style="padding:0px 50px">
                          <v-flex md6 sm12 xs12>
                            <v-select
                                :items="classs.data"
                                label="Pilih Kelas"
                                name="kelas"
                                v-model="kelas"
                                item-text="name"
                                item-value="id"
                                data-foo=""
                                @change="byClass"
                            ></v-select>
                          </v-flex>
                          <v-flex md6 sm12 xs12>
                              <v-select
                                  :items="dataLesson"
                                  label="Pilih Pelajaran"
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

                        <div v-show="tabl" style="padding:0px 50px 30px 50px">
                          <table border="1" style="font-size:16px">
                            <thead>
                              <tr>
                                <th width="40px">No</th>
                                <th width="85%">Nama</th>
                                <th width="80px">Skor</th>
                              </tr>
                            </thead>
                            <tbody style="text-align:center">
                              <tr v-for="(item,index) in leader" :key="item.id">
                                <td>{{index+1}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.score}}</td>
                              </tr>
                              <tr v-if="leader == 0">
                                <td colspan="3"><span style="color:#757575">Data tidak ditemukan</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                    </v-card>
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
        cek: '',

        load_data: true,
        tabl: false,
        text_judul: '',
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
         
      //get leaderboard by class id
      byClass(val){
        this.load_data = true
        this.tabl      = false
        Axios.get('/cereouts/leaderboard/'+this.kelas)//get by class id
        .then(response => {
          this.load_data = false
          this.tabl      = true
          this.text_judul= 'In Class '+this.kelas
          this.leader = response.data.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response)
        })
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
          this.text_judul= 'In Lesson '+this.pelajaran
          this.leader = response.data.data
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
              if(this.classs.data[i].id == this.kelas){
                  data = this.classs.data[i].lessons
              }
          }
				}
    		return data
    	},
    },

    mounted(){
      Axios.get('/cereouts/leaderboard/'+this.$store.state.classId)//get by class_id user
      .then(response => {
        this.load_data = false
        this.tabl      = true
        this.leader    = response.data.data
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
      .catch(error => {
        console.log(error.response)
      })

    }
  }
</script>