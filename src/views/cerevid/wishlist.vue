<template>
<div class="wishlist">
  <!-- sub - navbar -->
  <subNavbar />
  <!-- end sub - navbar -->
  <!-- content -->
  <v-container>
    <p class="display-1 text-uppercase font-weight-light">
      <v-layout row wrap pa-3>

        <v-flex xs12 sm8 md8>
          Daftar Pelajaran
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field label="Cari Pelajaran..." append-icon="search" v-model="search">
          </v-text-field>
        </v-flex>
      </v-layout>
    </p>
    <v-container fluid grid-list-md>
      <v-data-iterator
				:items="dataFavoritbyUser.data"
				:rows-per-page-items="rowsPerPageItems"
				content-class="layout row wrap"
				:expand="expand"
				:search="search"
        :custom-filter="filterSearch"
				no-data-text="Pelajaran tidak tersedia"
				no-results-text="Pelajaran tidak ditemukan"
				>
        <template v-slot:item="props">
          <v-flex xs12 sm6 md3>
            <v-card>
              <v-img v-bind:src="'http://admin.ceredinas.id/public/cover/'+ props.item.course.cover" height="200px">
                <v-flex offset-xs9 align-end flexbox>
                  <div v-for="datas in dataDaftarPelajaran.data">
                    <div v-if="datas.title==props.item.course.title">
                      <v-btn fab dark small color="pink" style="opacity:0.85;" @click="hapusFavorit(props.item.id)">
                        <v-icon dark>favorite</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-flex>
              </v-img>

              <v-card-title primary-title>
                <div>
                  <div class="headline">
                    <div v-for="datas in dataDaftarPelajaran.data">
                      <div v-if="datas.title==props.item.course.title">
                        <router-link v-bind:to="'/cerevid/detail-pelajaran/'+datas.id" style="text-decoration: none;">{{props.item.course.title}}</router-link>
                      </div>
                    </div>
                  </div>
                  <span class="grey--text">{{props.item.course.teacher.name}}</span>
                </div>
              </v-card-title>
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
                  {{props.item.course.description}}
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
  </v-container>
  <!-- end scontent -->
</div>
</template>
<script>
import subNavbar from '../../components/cerevid-component/subNavbar'
export default {
  name: "daftar-pelajaran-favoritku",
  components: {
    subNavbar,
  },
  data: () => ({
    expand: true,
    rowsPerPageItems: [4],
    search: '',
  }),
  methods: {
    filterSearch(items, search, filter) {
      return items.filter(datas => {
        return datas.course.title.toLowerCase().includes(search.toLowerCase())
      })
    },
    getDataPelajaran() {
      this.$store.dispatch('getDataPelajaran')
        .then(response => {})
    },
    getDataFavoritbyUser() {
      this.$store.dispatch('getDataFavoritbyUser')
        .then(response => {})
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
    }

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
    userId() {
      return this.$store.state.dataUser || {}
    },
  }
}
</script>
