<template>
    <div class="my_exams">
        <v-container>
            <v-toolbar color="orange darken-1" dark>
                <v-toolbar-title>Exam Details</v-toolbar-title>
            </v-toolbar>
            <v-container>
                <v-card>
                    <v-layout>
                    <v-flex md6 sm12 xs12>
                        <v-list>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Name</v-list-tile-title>
                                <v-list-tile-sub-title>SKD 3 (TKP) TO Mei</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Passing Percentage</v-list-tile-title>
                                <v-list-tile-sub-title>37%</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Instruction</v-list-tile-title>
                                <v-list-tile-sub-title>Change your</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Duration</v-list-tile-title>
                                <v-list-tile-sub-title>30 Mins</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Class</v-list-tile-title>
                                <v-list-tile-sub-title>Your status</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                    <v-flex md6 sm12 xs12>
                        <v-list>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Attempt Count</v-list-tile-title>
                                <v-list-tile-sub-title>Change your</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Start Date</v-list-tile-title>
                                <v-list-tile-sub-title>15-05-2019</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>End Date</v-list-tile-title>
                                <v-list-tile-sub-title>16-05-2019</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Expire days</v-list-tile-title>
                                <v-list-tile-sub-title>Unlimited</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                <v-list-tile-title>Price</v-list-tile-title>
                                <v-list-tile-sub-title>Rp. 1250.00</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>

                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn dark color="info" v-on="on">
                      Attempt Now
                      <v-icon right dark>launch</v-icon>
                    </v-btn>
                    
                    <v-btn @click="$router.go(-1)">Cancel</v-btn>
                  </template>

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
                  
                      <v-btn flat :disabled="loading" :loading="loading" color="primary" @click="loading = true">
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
  export default {
    data () {
      return {
        loading: false,
        dialog: false
      }
    },
    watch: {
      loading (val) {
        this.dialog = false
        if (!val) return
        setTimeout(() => (
          this.loading = false, 
          window.open("/cereout/exams/start","my_window", "width=1600, height=1020")), 3000)
      }
    },
    methods:{
      myFunction () {
        var windowObjectReference;
        var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
        windowObjectReference = window.open("http://www.cnn.com/", "CNN_WindowName", strWindowFeatures);
      },

    }

  }


</script>