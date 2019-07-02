<template>
	<div class="daftar-pelajaranku-guru">
		<!-- sub - navbar -->
		<subNavbarGuru :datas="dataPelajaranbyTeacher.data" />
		<!-- end sub - navbar -->
		<!-- content -->
		<v-container fluid>
				<v-layout row wrap>
					<v-flex xs12 sm12 md3>
						<sidebarGuru/>
					</v-flex>
					<v-flex xs12 sm12 md9>
						<v-card>
							<v-card-text>
							    <p class="display-1 text-uppercase font-weight-light">
							      <v-layout row wrap ma-3>
							        <v-flex xs12 sm12 md8>
							          Daftar Pelajaran
							        </v-flex>
							        <v-flex xs12 sm12 md4>
						                <v-text-field
						                    label="Cari Pelajaran..."
						                    append-icon="search"
											class="mx-4"
											v-model="search"
						                  >
						                </v-text-field>
							        </v-flex>
							      </v-layout>
							    </p>
							</v-card-text>
							<LoadingScreen1 :loading="is_load1"></LoadingScreen1>
						    <v-container
						      fluid
						      grid-list-md
						      v-show='showPelajaran'
						      >
						      	<v-data-iterator
				                    :items="dataPelajaranbyTeacher.data"
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
							      <!-- <v-layout row wrap fill-height ma-3> -->
							        <v-flex xs12 sm6 md4>
							          <v-card>
							            <v-img
							              v-bind:src="props.item.cover"
							              height="200px"
							            	>
							                <v-flex offset-xs7 align-end flexbox>
							                  <v-btn dark color="pink" @click="handleDeleteCourse(props.item.id)"> Hapus
							                    <v-icon dark>highlight_off</v-icon>
							                  </v-btn>
							                </v-flex>
							            </v-img>

							            <v-card-title primary-title>
							              <div>
							                <div class="headline">
							                	<router-link v-bind:to="'/guru/cerevid/detail-pelajaran/'+props.item.id" style="text-decoration: none;">{{props.item.title}}</router-link>
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
										</div>
										<!-- <v-spacer></v-spacer>
							            <v-card-actions class="ma-2">
							              <v-icon color="success">check</v-icon>
							              <span class="text-uppercase pa-1">Sudah ditampilkan</span>
							            </v-card-actions> -->
							          </v-card>
							        </v-flex>
									
							    	<!-- </v-layout> -->
							    	</template>
						    	</v-data-iterator>
						    	<v-layout row wrap>
						    	<v-flex class="mt-4" offset-md10 offset-sm8 md2 sm4 xs12 style="text-align:right">
						    	    <v-select
						    	      :items="rowsPerPageItems"
						    	      label="Per Halaman"
						    	      v-model="pagination.rowsPerPage"
						    	      outline
						    	    ></v-select>
						    	  </v-flex>
						    	</v-layout>
						    	<div class="text-xs-center">
						    	  <v-pagination
						    	    v-model="pagination.page"
						    	    :length="parseInt(Math.ceil(pagination.totalItems/pagination.rowsPerPage)) || 1"
						    	    :total-visible="7"
						    	  ></v-pagination>
						    	</div>
								<br/>
							</v-container>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		<!-- end scontent -->
	</div>
</template>
<script>
	import subNavbarGuru from '../../components/cerevid-component/subNavbarGuru'
	import sidebarGuru from '../../components/cerevid-component/sidebarGuru'
    import LoadingScreen1 from'../../components/loading-screen/LoadingCerevid'
    import axios from 'axios'
	export default {
		name:"tambah-pelajaran",
		components:{
			subNavbarGuru,
			sidebarGuru,
			LoadingScreen1
		},
		data: () => ({
		      expand: true,
		      showPelajaran: false,
		      pagination: {
			    rowsPerPage: 6,
			    totalItems: 0,
			    page: 1
			  },
			  search: '',
              is_load1 :true,
		      rowsPerPageItems: [3,6,9],
		      isiAwal: true
		}),
		methods: {
			filterSearch(items, search, filter) {
		      return items.filter(datas => {
		        return datas.title.toLowerCase().includes(search.toLowerCase())
		      })
		    },
		    daftarPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/daftar-pelajaran'})
				},
			tambahPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/tambah-pelajaran'})
				},
			async getDataPelajaranbyTeacher(){
	          this.$store.dispatch('getDataPelajaranbyTeacher')
	          .then(response => {
	            console.log("telah load data..")
	          })
	        },
	        cariDetailPelajaran(id){
	          this.$router.push({path:'/guru/cerevid/detail-pelajaran/'+id})
	        },
	        handleDeleteCourse(id){
	          this.$swal({
	            title: "Hapus Pelajaran Ini?",
	            text: "Apakah Kamu Yakin?",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#3085d6",
	            confirmButtonText: "Ya, Hapus!"
	          }).then((willDelete) => {
	              if (willDelete.value) {
	                axios.defaults.headers = {  
	                  'Authorization': 'Bearer ' + this.$store.state.token
	                }
	                axios.delete('/courses/'+id)
	                .then(response => {
					  var courses = this.dataPelajaranbyTeacher.data.filter(x => {
						return x.id != id;
					  })
					  this.dataPelajaranbyTeacher.data = courses
	                  this.$swal('Sukses', 'Berhasil Menghapus Pelajaran!', 'success')
	                })
	                .catch(error => {
	                  console.log(error)
	                  this.$swal('Oops', 'Gagal Menghapus Pelajaran!', 'warning')
	                })
	              }
	          });
	        }
		},
		created(){
	     this.getDataPelajaranbyTeacher()
	    },
	    computed: {
	      dataPelajaranbyTeacher(){
	      	if(typeof this.$store.state.dataPelajaranbyTeacher.data !== "undefined"){
				this.is_load1 = false
				this.showPelajaran = true
			}
			if(this.$store.state.dataPelajaranbyTeacher.data && this.isiAwal){
		        this.pagination.totalItems = this.$store.state.dataPelajaranbyTeacher.data.length
		        this.isiAwal = false
		    }
	        return this.$store.state.dataPelajaranbyTeacher || {}
	      },
	      userId(){
	        return this.$store.state.dataUser || {}
	      },
		}
	}
</script>
