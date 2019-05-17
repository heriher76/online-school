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
                <v-btn
                :loading="loading1"
                :disabled="loading1"
                color="info"
                @click="loader = 'loading1'"
                >
                Attempt Now
                <v-icon right dark>launch</v-icon>
                </v-btn>
                <v-btn @click="$router.go(-1)">Cancel</v-btn>
                </v-card>
            </v-container>
        </v-container>
    </div>
</template>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        loader: null,
        loading1: false
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    }
  }
</script>