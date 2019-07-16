<template>
<v-container fluid grid-list-md class="cerejur">
  <p class="display-1 text-uppercase font-weight-light">
    <v-layout row wrap>
      <v-flex xs12 sm8 md8>
        DAFTAR UNIVERSITAS
      </v-flex>
      <v-flex xs12 sm4 md4>
        <v-text-field label="Cari Universitas..." append-icon="search" v-model="search">
        </v-text-field>
      </v-flex>
    </v-layout>
  </p>
  <v-data-iterator
    :items="this.daftarUniversitas"
    :rows-per-page-items="rowsPerPageItems"
    :pagination.sync="pagination"
    content-class="layout row wrap"
    :expand="expand"
    :search="search"
    :custom-filter="filterSearch"
    no-data-text="Universitas tidak tersedia"
    no-results-text="Universitas tidak ditemukan"
    :hide-actions="true"
    >
    <template v-slot:item="props">
      <v-flex xs12 sm6 md4 lg3>
        <v-card>
          <v-img v-bind:src="props.item.link_image" height="320px">
            <v-flex offset-xs9 align-end flexbox>
              
            </v-flex>
          </v-img>	
          <v-card-title primary-title>
            <div>
              <div class="headline">
                <router-link :to="{ name: 'cerejur_detail_universitas', params: { name: props.item.name, address: props.item.address, description: props.item.description, link_image: props.item.link_image, phone: props.item.phone, id: props.item.id } }" style="text-decoration: none;">
                  <div v-if="props.item.name.length<32">{{props.item.name}}</div>
                  <div v-else>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <span v-on="on">{{props.item.name.substring(0,29)}}...</span>
                      </template>
                      <span>{{props.item.name}}</span>
                    </v-tooltip>
                  </div>
                </router-link>
              </div>
            </div>
          </v-card-title>
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
  <div class="text-xs-center">
    <v-pagination
      v-model="pagination.page"
      :length="parseInt(Math.ceil(pagination.totalItems/pagination.rowsPerPage)) || 1"
      :total-visible="5"
    ></v-pagination>
  </div>
  </v-layout>
</v-container>
</template>
<script>
import axios from 'axios'

export default {
  name: "cerejur",
  data: () => ({
    expand: true,
    pagination: {
      rowsPerPage: 8,
      totalItems: 0,
      page: 1
    },
    search: '',
    rowsPerPageItems: [4,8,12],
    isiAwal: true,
    daftarUniversitas: []
  }),
  methods: {
    filterSearch(items, search, filter) {
      return items.filter(datas => {
        return datas.name.toLowerCase().includes(search.toLowerCase())
      })
    }
  },
  created() {
      axios.defaults.headers = {
        'Authorization': 'Bearer ' + this.$store.state.token
      }
      axios.get('/cerejur/university')
      .then(response => {
      	console.log(response.data.data)
      	this.daftarUniversitas = response.data.data
      	if(response.data.data && this.isiAwal){
	        this.pagination.totalItems = response.data.data.length
	        this.isiAwal = false
	    }
      })
      .catch(error => {
        console.log(error)
      })  
  }
}
</script>
