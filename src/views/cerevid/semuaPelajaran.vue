<template>
<v-container fluid grid-list-md class="cerevid_semua_pelajaran">
  <p class="display-1 text-uppercase font-weight-light">
    <v-layout row wrap>
      <v-flex xs12 sm8 md8>
        Daftar Pelajaran
      </v-flex>
      <v-flex xs12 sm4 md4>
        <v-text-field label="Cari Pelajaran..." append-icon="search" v-model="search">
        </v-text-field>
      </v-flex>
    </v-layout>
  </p>
  <v-data-iterator
    :items="dataDaftarPelajaran.data"
    :rows-per-page-items="rowsPerPageItems"
    content-class="layout row wrap"
    :expand="expand"
    :search="search"
    :custom-filter="filterSearch"
    no-data-text="Pelajaran tidak tersedia"
    no-results-text="Pelajaran tidak ditemukan"
    >
    <template v-slot:item="props">
      <v-flex xs12 sm6 md4 lg3>
        <v-card>
          <v-img v-bind:src="props.item.cover" height="200px">
            <v-flex offset-xs9 align-end flexbox>
              <div v-if="props.item">
                <div v-if="cekFavorit(props.item.id)">
                  <div v-for="fav in dataFavoritbyUser.data">
                    <div v-if="fav.course.course_id==props.item.id">
                      <v-btn fab dark small color="pink" style="opacity:0.85;" @click="hapusFavorit(fav.id)">
                        <v-icon dark>favorite</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <v-btn fab dark small style="opacity:0.85;" @click="simpanFavorit(props.item.id)">
                    <v-icon dark>favorite</v-icon>
                  </v-btn>
                </div>
              </div>
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
            <v-rating v-model="props.item.rating" color="yellow darken-3" background-color="grey darken-1" half-increments readonly>
            </v-rating>
            <span class="subheading mr-2">

            </span>
          </div>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span class="text-uppercase">Deskripsi</span>
            <v-btn v-model="props.expanded" icon @click="props.expanded = !props.expanded">
              <v-icon>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <v-slide-y-transition>
            <v-card-text v-if="props.expanded">
              {{props.item.description}}
              <div class="subheading my-3">Kurikulum<v-divider></v-divider>
              </div>
              {{props.item.curriculum}}
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </template>
  </v-data-iterator>
</v-container>
</template>
<script>
export default {
  name: "cerevid_semua_pelajaran",
  data: () => ({
    expand: true,
    pagination: {
      rowsPerPage: 8
    },
    search: '',
    rowsPerPageItems: [4],
  }),
  methods: {
    filterSearch(items, search, filter) {
      return items.filter(datas => {
        return datas.title.toLowerCase().includes(search.toLowerCase())
      })
    },
    getDataPelajaran() {
      this.$store.dispatch('getDataPelajaran')
        .then(response => {
        })
    },
    getDataFavoritbyUser() {
      this.$store.dispatch('getDataFavoritbyUser')
        .then(response => {})
    },
    simpanFavorit(id) {
      this.$store.dispatch('pushDataFavorit', {
          user_id: this.userId,
          course_id: id,
        })
        .then(response => {})
        .catch(error => {
          this.$swal('Oopps', 'Gagal Menyimpan ke Favorit...', 'warning')
        })
    },
    hapusFavorit(favorit_id) {
      this.$store.dispatch('delDataFavorit', {
          user_id: this.userId,
          favorit_id: favorit_id,
        })
        .then(response => {})
        .catch(error => {
          this.$swal('Oopps', 'Gagal Menghapus Favorit...', 'warning')
        })
    },
    cekFavorit(id) {
      if (this.dataFavoritbyUser.data) {
        for (var i = 0; i < this.dataFavoritbyUser.data.length; i++) {
          if (this.dataFavoritbyUser.data[i].course.course_id == id) {
            return true
            break;
          }
        }
      }
    },
  },
  created() {
    this.getDataPelajaran()
    this.getDataFavoritbyUser()
  },
  computed: {
    dataDaftarPelajaran() {
      return this.$store.state.dataPelajaran || {}
    },
    dataFavoritbyUser() {
      return this.$store.state.dataFavoritbyUser || {}
    },
  },
}
</script>
