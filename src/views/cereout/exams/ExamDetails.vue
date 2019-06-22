<template>
    <div class="my_exams">
        <v-container>
            <v-toolbar color="#B71C1C" dark>
                <v-toolbar-title>Detail Tryout</v-toolbar-title>
            </v-toolbar>
            <v-container>
                <v-card style="text-transform:capitalize">
                    <v-layout row wrap>
                    <v-flex md6 sm12 xs12>
                        <v-list>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Nama</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.name}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Passing Grade</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.passing_percentage}}%</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Intruksi</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.instruction}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Durasi</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.duration}} Mins</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Kelas</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.class}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                    <v-flex md6 sm12 xs12>
                        <v-list>
                          <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Pelajaran</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.lesson}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Batas Percobaan</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.attempt_count}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Tanggal Mulai</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.start_date}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Tanggal Berakhir</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.end_date}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Sistem Penilaian</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.scoring_system}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <!-- <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Harga</v-list-tile-title>
                                <v-list-tile-sub-title>{{detail.price}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile> -->
                        </v-list>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>

                <v-btn dark @click="action(detail)" color="info">
                  Coba Sekarang
                  <v-icon right dark>launch</v-icon>
                </v-btn>
                <v-btn @click="$router.go(-1)">Cancel</v-btn>

                <!-- loading -->
                <v-dialog v-model="loading" hide-overlay persistent width="400">
                  <v-card color="primary" dark>
                    <v-card-text>
                      Sedang menyiapkan, mohon tunggu sebentar
                      <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <!-- /loading -->
                </v-card>
            </v-container>
        </v-container>

        <!-- <v-snackbar
          v-model="snackbar"
          :multi-line="'multi-line'"
          :right="'right'"
          :timeout="6000"
          :top="'top'"
          color="rgba(0,0,0,0.5)"
        >
          Connection timeout
          <v-btn :color="'col'" flat @click="snackbar = false">
          Close
          </v-btn>
        </v-snackbar> -->

    </div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    props:["detail"],

    data () {
      return {
        user: [],
        // snackbar:false,
        loading: false,
        dialog: false
      }
    },

    mounted(){
      if(this.detail==null){
        return this.$router.push({name: 'my_exams'})
      }

      axios.get('/auth/user')
      .then(response => {this.user = response.data.data})
      .catch(error => {console.log(error)})
    },

    methods: {
      action(data) {
        this.loading = true
        if(this.user.membership == 1){
          axios.post('/cereouts/' + data.id + '/attempts', {
            user_id: this.$store.state.dataUser
          })
          .then(response => {
            this.loading = false
            console.log(response.data)
          
            if(response.data.status == true){ //cek user member atau bukan
              this.$router.push({name: 'dashboard'})
              let routeData = this.$router.resolve({name: 'exam_page', params:{id:data.id, name: data.name, durasi:data.duration, attemptId:response.data.data.id}});
              window.open(routeData.href,
                          'my_window', 
                          'width=1600, height=620, resizable=no',
                          '_blank'
                          )
            }
            else{
              return this.$swal('Mohon Maaf', 'Anda sudah mencapai batas maksimun percobaan', 'warning')
            }

          })
          .catch(error =>{
              console.log(error)
          })
        }
        else if(this.user.membership == 0){
          this.loading = false
          return this.$swal({
              title: 'Anda belum menjadi member',
              text: 'apakah anda ingin menjadi member?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Ya',
              cancelButtonText: 'Tidak',
              showCloseButton: true,
              showLoaderOnConfirm: true
            }).then((result) => {
              if(result.value) { 
                return this.$router.push({name: 'membership'})
              }
            })
        }
        // else{
        //   this.snackbar = true
        // }
      },
    },

  }


</script>