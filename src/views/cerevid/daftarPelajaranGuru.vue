<template>
	<div class="daftar-pelajaranku-guru">
		<!-- sub - navbar -->
		<subNavbarGuru />
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
						    <v-container
						      fluid
						      grid-list-md
						      >
						      <v-layout row wrap fill-height ma-3>
						        <v-flex xs12 sm6 md4>
						          <v-card>
						            <v-img
						              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
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
						                	<router-link to="/cerevid/guru/detail-pelajaran" style="text-decoration: none;">Ilmu Hukum</router-link>
						                </div>
						                <span class="grey--text">John Doe, Ph.D</span>
						              </div>
						            </v-card-title>
									<div class="text-xs-center mt-1">
										<v-rating
											v-model="rating"
											color="yellow darken-3"
											background-color="grey darken-1"
											half-increments
											readonly
											>
										</v-rating>
										<span class="caption mr-2">
											{{rating}} (30)
										</span>
									</div>
									<v-spacer></v-spacer>
						            <v-card-actions class="ma-2">
						              <v-icon color="success">check</v-icon>
						              <span class="text-uppercase pa-1">Sudah ditampilkan</span>
						            </v-card-actions>
						          </v-card>
						        </v-flex>
								<v-flex xs12 sm6 md4>
									<v-card>
										<v-img
											src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
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
													<router-link to="/cerevid/guru/detail-pelajaran" style="text-decoration: none;">Ilmu Hukum</router-link>
												</div>
												<span class="grey--text">John Doe, Ph.D</span>
											</div>
										</v-card-title>
										<div class="text-xs-center mt-1">
											<v-rating
												v-model="rating"
												color="yellow darken-3"
												background-color="grey darken-1"
												half-increments
												readonly
											>
											</v-rating>
											<span class="caption mr-2">
												{{rating}} (30)
											</span>
										</div>
										<v-spacer></v-spacer>
										<v-card-actions class="ma-2">
											<v-icon color="red">close</v-icon>
											<div class="text-uppercase pa-1">Data Belum terisi</div>
										</v-card-actions>
									</v-card>
								</v-flex>
						    	</v-layout>
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
	export default {
		name:"tambah-pelajaran",
		components:{
			subNavbarGuru,
			sidebarGuru
		},
		methods: {
		    daftarPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/daftar-pelajaran'})
				},
				tambahPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/tambah-pelajaran'})
				},
		},
	}
</script>
