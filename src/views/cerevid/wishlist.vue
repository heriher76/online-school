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
        :pagination.sync="pagination"
				content-class="layout row wrap"
				:expand="expand"
				:search="search"
        :custom-filter="filterSearch"
				no-data-text="Pelajaran tidak tersedia"
				no-results-text="Pelajaran tidak ditemukan"
        :hide-actions="true"
				>
        <template v-slot:item="props">
          <v-flex xs12 sm6 md3>
            <v-card>
              <v-img v-bind:src="props.item.course.cover" height="200px">
                <v-flex offset-xs9 align-end flexbox>
                  <v-btn fab dark small color="pink" style="opacity:0.85;" @click="hapusFavorit(props.item.id)">
                    <v-icon dark>favorite</v-icon>
                  </v-btn>
                </v-flex>
              </v-img>

              <v-card-title primary-title>
                <div>
                  <div class="headline">
                    <router-link v-bind:to="'/cerevid/detail-pelajaran/'+props.item.course.course_id" style="text-decoration: none;">
                      <div v-if="props.item.course.title.length<32">{{props.item.course.title}}</div>
                      <div v-else>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <span v-on="on">{{props.item.course.title.substring(0,29)}}...</span>
                          </template>
                          <span>{{props.item.course.title}}</span>
                        </v-tooltip>
                      </div>
                    </router-link>
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
      <v-layout row wrap>
        <v-flex class="mt-4" offset-md10 offset-sm8 md2 sm4 xs12 style="text-align:right">
          <v-select
            :items="rowsPerPageItems"
            label="Tampil Data per Halaman"
            v-model="pagination.rowsPerPage"
            outline
          ></v-select>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <v-pagination
          v-model="pagination.page"
          :length="parseInt(Math.ceil(pagination.totalItems/pagination.rowsPerPage)) || 1"
          :total-visible="5"
        ></v-pagination>
      </div>
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
    pagination: {
      rowsPerPage: 8,
      totalItems: 0,
      page: 1
    },
    search: '',
    rowsPerPageItems: [4,8,12],
    isiAwal: true
  }),
  methods: {
    filterSearch(items, search, filter) {
      return items.filter(datas => {
        return datas.course.title.toLowerCase().includes(search.toLowerCase())
      })
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
        .then(response => {
          this.isiAwal = true
        })
        .catch(error => {
          this.$swal('Oopps', 'Gagal Menghapus Favorit...', 'warning')
        })
    }

  },
  created() {
    this.getDataFavoritbyUser()
  },
  computed: {
    dataFavoritbyUser() {
      if(this.$store.state.dataFavoritbyUser.data && this.isiAwal){
        this.pagination.totalItems = this.$store.state.dataFavoritbyUser.data.length
        this.isiAwal = false
      }
      return this.$store.state.dataFavoritbyUser || {}
    },
    userId() {
      return this.$store.state.dataUser || {}
    },
  }
}
</script>
