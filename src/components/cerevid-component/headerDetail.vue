<template>
  <v-card color="#2c3e50">
    <v-layout
          fill-height
          align-center
          pa-5
        >
          <v-layout row wrap class="headline white--text" v-if="datas.data">
            <v-flex class="display-1" md6 sm10 style="font-weight:normal;">
              {{datas.data.title}}
            </v-flex>
            <v-spacer/>
            <v-flex md8>
              <div class="font-weight-light">
                {{datas.data.description}}
              </div>
            </v-flex>
            <v-flex md8 xs12 sm12>
              <h4>
                Pengajar : <span  class="font-weight-light">{{datas.data.teacher.name}}</span>
              </h4>
            </v-flex>
            <v-flex md8>
              <v-card-actions>
                <v-rating
                  v-model="datas.data.rating"
                  dense
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  half-increments
                  readonly
                  medium
                  class="pa-1"
                ></v-rating>
                <span class="subheading mt-1">
                </span>
              </v-card-actions>
            </v-flex>
          </v-layout>
    </v-layout>
  </v-card>
</template>
<script>
  export default {
    props: ['datas'],
    data: () => ({
    })
  }
</script>
