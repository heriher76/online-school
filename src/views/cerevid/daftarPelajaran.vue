<template>
	<div class="daftar-pelajaranku">
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
	                <v-text-field
	                    label="Cari Pelajaran..."
	                    append-icon="search"
	                  >
	                </v-text-field>
		        </v-flex>
		      </v-layout>
		    </p>
		    <v-container
		      fluid
		      grid-list-md
		    >
		      <v-data-iterator
		        :items="dataPelajaranbyUser.data"
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
		                    <span class="grey--text">{{props.item.teacher}}</span>
		                  </div>
		                </v-card-title>
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
		    </v-container>
		</v-container>
		<!-- end scontent -->
	</div>
</template>
<script>
	import subNavbar from '../../components/cerevid-component/subNavbar'
	export default {
		name:"daftar-pelajaranku",
		components:{
			subNavbar,
		},
		data: () => ({
		      expand: true,
		      rowsPerPageItems: [4],
		}),
	  	methods: {
	        async getDataPelajaranbyUser(){
	          this.$store.dispatch('getDataPelajaranbyUser')
	          .then(response => {
	            console.log("telah load data..")
	          })
	        },

	    },
	    created(){
	     this.getDataPelajaranbyUser()
	    },
	    computed: {
	      dataPelajaranbyUser(){
	        return this.$store.state.dataPelajaranbyUser || {}
	      },
	      userId(){
	        return this.$store.state.dataUser || {}
	      },
		}
	}
</script>
