<template>
    <div class="my_exams">
        <v-container>
            <v-toolbar color="orange darken-1" dark>
                <v-toolbar-title>Exam Details</v-toolbar-title>
            </v-toolbar>
            <v-container>
                <v-card style="text-transform:capitalize">
                    <v-layout>
                    <v-flex md6 sm12 xs12>
                        <v-list>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Name</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.name}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Passing Percentage</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.passing_percentage}}%</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Instruction</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.instruction}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Duration</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.duration}} Mins</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Class</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.class}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                    <v-flex md6 sm12 xs12>
                        <v-list>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Attempt Count</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.attempt_count}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Start Date</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.start_date}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>End Date</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.end_date}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Scoring System</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.scoring_system}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Price</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.price}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>

                <v-btn dark @click="action(detail.id)" color="info">
                  Attempt Now
                  <v-icon right dark>launch</v-icon>
                </v-btn>
                <v-btn @click="$router.go(-1)">Cancel</v-btn>

                <v-dialog v-model="dialog" width="500">
                  <!-- <template v-slot:activator="{ on }">
                    <v-btn dark color="info" v-on="on">
                      Attempt Now
                      <v-icon right dark>launch</v-icon>
                    </v-btn>
                    
                    <v-btn @click="$router.go(-1)">Cancel</v-btn>
                  </template> -->

                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                      Terms &amp; Conditions
                    </v-card-title>

                    <v-card-text>
                      <p>Ujian ini berbayar. Poin yang anda miliki akan terpotong secara otomotis ketika memulai ujian. Waktu penghitung ujian tidak dapat berhenti. Apakah anda bersedia?</p>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                  
                      <v-btn flat :disabled="loading" :loading="loading" color="primary" @click="action(detail.id)">
                      I accept &amp; start the exam
                      </v-btn>

                      <v-dialog v-model="loading" hide-overlay persistent width="300">
                        <v-card color="primary" dark>
                          <v-card-text>
                            Please stand by
                            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                </v-card>
            </v-container>
        </v-container>
    </div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    // props:["detail"],
    props: {
      detail: {
        type:Array,
        default: []
      }
    },
    data () {
      return {
        loading: false,
        dialog: false
      }
    },

    mounted(){
      if(this.detail==null){
        return this.$router.push({name: 'my_exams'})
      }
    },

    methods: {
      action(id) {
        // console.log(id)
        this.loading = true

        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
        axios.post('/cereouts/' + id + '/attempts', {
          user_id: 31
        })
        .then(response => {
          this.loading = false
          // console.log(response.data)
          if(response.data.status == false){
            let routeData = this.$router.resolve({name: 'exam_page', params:{id:id}});
            window.open(routeData.href,
                        'my_window', 
                        'width=1600, height=620, resizable=no',
                        '_blank'
                        )
          }else{
            return this.dialog = true
          }

        })
        .catch(error =>{
            console.log(error)
        })
        
        // this.dialog  = false
        // this.loading = true
        // let routeData = this.$router.resolve({name: 'exam_page', params:{id:id}});

        // if (!this.loading) return
        // setTimeout(() => (
        //   this.loading = false, 
        //   window.open(
        //               routeData.href,
        //               'my_window', 
        //               'width=1600, height=620, resizable=no',
        //               '_blank'
        //               )
        //             ), 
        //   3000)
      }
    },

  }


</script>