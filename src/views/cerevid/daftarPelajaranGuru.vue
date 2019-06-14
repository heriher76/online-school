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
						        content-class="layout row wrap"
						        :expand="expand"
						        :hide-actions="true"
						        >
							        <template v-slot:item="props">
							      <!-- <v-layout row wrap fill-height ma-3> -->
							        <v-flex xs12 sm6 md4>
							          <v-card>
							            <v-img
							              v-bind:src="'http://admin.ceredinas.id/public/cover/' + props.item.cover"
							              height="200px"
							            	>
							                <!-- <v-flex offset-xs9 align-end flexbox>
							                  <v-btn fab dark small color="pink" style="opacity:0.85;">
							                    <v-icon dark>favorite</v-icon>
							                  </v-btn>
							                </v-flex> -->
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
		},
		created(){
	     this.getDataPelajaranbyTeacher()
	    },
	    computed: {
	      dataPelajaranbyTeacher(){
	      	if(typeof this.$store.state.dataPelajaranbyTeacher.data !== "undefined"){
				this.is_load1 = !this.is_load1
				this.showPelajaran = !this.showPelajaran
			}
	        return this.$store.state.dataPelajaranbyTeacher || {}
	      },
	      userId(){
	        return this.$store.state.dataUser || {}
	      },
		}
	}
</script>
