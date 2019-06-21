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
						                <!-- <v-text-field
						                    label="Cari Pelajaran..."
						                    append-icon="search"
																class="mx-4"
						                  >
						                </v-text-field> -->
						                <v-autocomplete
						                  v-model="select"
						                  :loading="loading"
						                  :items="dataPelajaranbyTeacher.data"
						                  cache-items
						                  class="mx-3"
						                  flat
						                  label="Cari Pelajaran..."
						                  solo
						                  clearable
						                  append-icon="search"
						                  background-color="white"
						                  item-text="title"
						                >
					                        <template v-slot:item="data">
					                          <template>
					                            <v-list-tile @click="cariDetailPelajaran(data.item.id)">
					                              <v-list-tile-avatar>
					                                <img :src="data.item.cover">
					                              </v-list-tile-avatar>
					                              <v-list-tile-content>
					                                <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
					                                <v-list-tile-sub-title v-html="data.item.teacher.name"></v-list-tile-sub-title>
					                              </v-list-tile-content>
					                            </v-list-tile>
					                          </template>
					                        </template>
						                </v-autocomplete>
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
						        content-class="layout row wrap"
						        :expand="expand"
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
              is_load1 :true,
		      rowsPerPageItems: [4],
		}),
		methods: {
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
	        return this.$store.state.dataPelajaranbyTeacher || {}
	      },
	      userId(){
	        return this.$store.state.dataUser || {}
	      },
		}
	}
</script>
