<template>
  <v-card color="#2c3e50">
    <v-layout
          fill-height
          align-center
          pa-5
        >
          <v-layout row wrap class="headline white--text">
            <v-flex class="display-1" md6 sm10 style="font-weight:normal;">
              Bahasa pemrograman PHP
            </v-flex>
            <v-spacer/>
            <v-flex md8>
              <subheading class="font-weight-light">
                Membahas bahasa pemrograman PHP dari tingkat dasar hingga tingkat menengah dilengkapi tutorial
              </subheading>
            </v-flex>
            <v-flex md8 xs12 sm12>
              <h4>
                Pengajar : <span  class="font-weight-light">John Doe</span>
              </h4>
            </v-flex>
            <v-flex md8>
              <v-card-actions>
                <v-rating
                  v-model="rating"
                  dense
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  half-increments
                  readonly
                  medium
                  class="pa-1"
                ></v-rating>
                <span class="subheading mt-1">
                  {{rating}} (329) Ulasan
                </span>
              </v-card-actions>
            </v-flex>
          </v-layout>
    </v-layout>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      rating: 4
    })
  }
</script>
