<template>
    <v-container
      fluid
      grid-list-md
    >
      <v-data-iterator
        :items="datas.data"
        :rows-per-page-items="rowsPerPageItems"
        content-class="layout row wrap"
        :expand="expand"
        :hide-actions="true"
        >
        <template v-slot:item="props">
          <v-flex xs12 sm6 md3>
              <v-card>
                <v-img
                  v-bind:src="'http://admin.ceredinas.id/public/cover/'+ props.item.cover"
                  height="200px"
                >
                  <v-flex offset-xs9 align-end flexbox>
                    <v-btn fab dark small color="pink" style="opacity:0.85;">
                      <v-icon dark>favorite</v-icon>
                    </v-btn>
                  </v-flex>
                </v-img>

                <v-card-title primary-title>
                  <div>
                    <div class="headline">
                      <router-link v-bind:to="'/cerevid/detail-pelajaran/'+props.item.id" style="text-decoration: none;">{{props.item.title}}</router-link>
                    </div>
                    <span class="grey--text">{{props.item.teacher.name}}</span>
                  </div>
                </v-card-title>
                <div class="text-xs-center mt-1">
                    <v-rating
                      v-model="props.item.rating"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        half-increments
                        readonly
                  >
                  </v-rating>
                  <span class="subheading mr-2">

                  </span>
                </div>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <span class="text-uppercase">Deskripsi</span>
                  <v-btn
                    v-model="props.expanded"
                    icon
                    @click="props.expanded = !props.expanded"
                    >
                    <v-icon>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-slide-y-transition>
                  <v-card-text v-if="props.expanded">
                    {{props.item.description}}
                    <div class="subheading my-3">Kurikulum<v-divider></v-divider></div>
                    {{props.item.curriculum}}
                  </v-card-text>
                </v-slide-y-transition>
              </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
      <v-layout justify-center class="ma-3">
        <v-btn color="primary" to="/cerevid/semua-pelajaran">Lihat Selengkapnya</v-btn>
      </v-layout>

    </v-container>
</template>
<script>
  export default {
    props: ['datas'],
    data: () => ({
      expand: true,
      rowsPerPageItems: [4],
    }),
  }
</script>
