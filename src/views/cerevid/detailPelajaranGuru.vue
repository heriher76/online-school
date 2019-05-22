<template>
	<div class="detail-pelajaranku-guru">
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
            <div class="px-3">
              <v-tabs
                color="#f5f5f5"
                next-icon="mdi-arrow-right-bold-box-outline"
                prev-icon="mdi-arrow-left-bold-box-outline"
                show-arrows
              	>
                <v-tabs-slider color="#34495e"></v-tabs-slider>
                <v-tab
                  :href="'#ikhtisar'"
                  style="text-decoration:none;"
                >
                  Ikhtisar
                </v-tab>
                <v-tab
                  :href="'#kurikulum'"
                  style="text-decoration:none;"
                >
                  Kurikulum
                </v-tab>
                <v-tab
                  :href="'#ulasan'"
                  style="text-decoration:none;"
                >
                  Ulasan
                </v-tab>
                <v-tabs-items>
                  <v-tab-item
                    :value="'ikhtisar'"
                    >
                    <v-card>
                      <v-container fluid>
                        <v-flex  class="mx-4">
                          <v-container grid-list-md>
                            <v-layout row wrap>
                              <div>
                                <div class="headline">
                                  <div>Bahasa PHP dilengkapi tutorial 2019</div>
                                </div>
                                <v-container fluid>
                                  <v-layout>
                                    <v-flex>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                              </div>
                              <v-layout class="justify-center">
                                <v-btn color="warning" class="white--text" to="/cerevid/detail-pelajaran/materi" >Ubah</v-btn>
                            </v-layout>
                            </v-layout>
                          </v-container>
                        </v-flex>
                      </v-container>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item
                    :value="'kurikulum'"
                    >
                    <v-card>
                      <v-container fluid>
                        <v-flex  class="mx-4">
                          <v-expansion-panel expand="true">
                          <v-expansion-panel-content
                            v-for="(item,i) in 5"
                            :key="i"
                          >
                            <template v-slot:header>
                              <div>Looping - 7 Materi</div>
                            </template>
                            <v-card>
                              <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-sub-title>Materi 1 | For</v-list-tile-sub-title>
                                  </v-list-tile-content>
                                  <v-list-tile-action>
                                    <v-btn  color="green">
                                      <v-icon color="white--text">visibility</v-icon>
                                      <span class="pa-1 white--text">Lihat</span>
                                    </v-btn>
                                  </v-list-tile-action>
                                </v-list-tile>
                                <v-divider style="margin:0"></v-divider>
                              <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-sub-title>Materi 2 | While</v-list-tile-sub-title>
                                  </v-list-tile-content>
                                  <v-list-tile-action>
                                    <v-btn disabled>
                                      <v-icon>lock</v-icon>
                                      <span class="pa-1">Lihat</span>
                                    </v-btn>
                                  </v-list-tile-action>
                                </v-list-tile>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                              <v-layout class="justify-end">
                                <v-container>
                                  <v-layout row justify-center>
                                    <v-dialog v-model="tambahBab" persistent max-width="600px">
                                      <template v-slot:activator="{ on }">
                                        <v-btn color="primary" dark v-on="on">Tambah Bab</v-btn>
                                      </template>
                                      <v-card>
                                        <v-card-title>
                                          <span class="headline">Tambah Sub Judul</span>
                                        </v-card-title>
                                        <v-card-text>
                                          <v-container grid-list-md>
                                            <v-layout wrap>
                                              <v-flex xs12 sm6 md12>
                                                <v-text-field label="Nama Sub Judul*" required></v-text-field>
                                              </v-flex>
                                            </v-layout>
                                          </v-container>
                                          <small>*indicates required field</small>
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="blue darken-1" flat @click="tambahBab = false">Tutup</v-btn>
                                          <v-btn color="blue darken-1" flat @click="tambahBab = false">Tambah</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="tambahMateri" persistent max-width="600px">
                                      <template v-slot:activator="{ on }">
                                        <v-btn color="primary" dark v-on="on">Tambah Materi</v-btn>
                                      </template>
                                      <v-card>
                                        <v-card-title>
                                          <span class="headline">Tambah Materi</span>
                                        </v-card-title>
                                        <v-card-text>
                                          <v-container grid-list-md>
                                            <v-layout wrap>
                                              <v-flex xs12 sm6 md12>
                                                <v-text-field label="Nama" required></v-text-field>
                                              </v-flex>
                                            </v-layout>
                                          </v-container>
                                          <small>*indicates required field</small>
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="blue darken-1" flat @click="tambahMateri = false">Tutup</v-btn>
                                          <v-btn color="blue darken-1" flat @click="tambahMateri = false">Tambah</v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </v-dialog>
                                  </v-layout>
                                </v-container>
                            </v-layout>
                        </v-flex>
                      </v-container>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item
                    :value="'ulasan'"
                    >
                    <v-card>
                      <v-container fluid>
                        <v-flex  class="mx-4">
                          <v-container grid-list-md>
								            	<v-layout row wrap>
											      		<div class="headline">
											            <div>Ulasan</div>
											        	</div>
								            		<v-layout row wrap>
								            			<v-flex xs12 sm4 md3>
											            	<v-card flat class="text-xs-center mt-4">
											            		<div class="display-3 text-xs-center font-weight-normal">{{rating}}</div>
													                <v-card-text style="padding-top: 0">
													                <v-rating
													                  v-model="rating"
													                  dense
													                  color="yellow darken-3"
													                  background-color="grey darken-1"
													                  half-increments
													                  readonly
													                >
													                </v-rating>
													                  (329) Ulasan
													                </v-card-text>
											            	</v-card>
										            	</v-flex>
								            			<v-flex xs12 sm7 md9>
								            				<v-layout row wrap>
									            				<v-flex md10>
												            		<v-progress-linear
																		      color="yellow darken-3"
																		      height="18"
																		      value="75"
																		    ></v-progress-linear>
														            		<v-progress-linear
																		      color="yellow darken-3"
																		      height="18"
																		      value="75"
																		    ></v-progress-linear>
														            		<v-progress-linear
																		      color="yellow darken-3"
																		      height="18"
																		      value="75"
																		    ></v-progress-linear>
														            		<v-progress-linear
																		      color="yellow darken-3"
																		      height="18"
																		      value="75"
																		    ></v-progress-linear>
														            		<v-progress-linear
																		      color="yellow darken-3"
																		      height="18"
																		      value="75"
																		    ></v-progress-linear><v-spacer/>
																			</v-flex>
																		</v-layout>
																	</v-flex>
								            			<v-flex xs12 sm12 md12>
																    <v-list three-line expand="true">
															          <template v-for="(item, index) in items">
															            <v-subheader
															              v-if="item.header"
															              :key="item.header"
															            >
															            </v-subheader>

															            <v-divider
															              v-else-if="item.divider"
															              :key="index"
															              :inset="item.inset"
															            ></v-divider>

															            <v-list-tile
															              v-else
															              :key="item.nama"
															              avatar
															            >
															              <v-list-tile-avatar size="50">
															                <img :src="item.avatar">
															              </v-list-tile-avatar>

															              <v-list-tile-content>
															                <v-list-tile-title v-html="item.nama">
															                </v-list-tile-title>
															                <v-rating
															                  v-model="rating"
															                  dense
															                  color="yellow darken-3"
															                  background-color="grey darken-1"
															                  readonly
															                  small
															                >
															                </v-rating>
															                <v-list-tile-sub-title v-html="item.ulasan"></v-list-tile-sub-title>
															              </v-list-tile-content>
															            </v-list-tile>
															          </template>
															      </v-list>
										            	</v-flex>
									           		</v-layout>
															</v-layout>
                          </v-container>
                        </v-flex>
                      </v-container>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
            </div>
          </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>
<script>
  import subNavbarGuru from '../../components/cerevid-component/subNavbarGuru'
  import sidebarGuru from '../../components/cerevid-component/sidebarGuru'
	export default {
		name:"detail-pelajaran-guru",
    data: () => ({
			rating: 4,
      tambahBab: false,
      tambahMateri: false,
			items: [
          { header: 'Today' },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            nama: 'James Doom',
            ulasan: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            nama: 'Steven Connors',
            ulasan: "Wish I could come, but I'm out of town this weekend."
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            nama: 'Sandra Adams',
            ulasan: "Do you have Paris recommendations? Have you ever been?"
          }
        ]
    }),
		components:{
			subNavbarGuru,
      sidebarGuru
    },
	}
</script>

<style>
.theme--light.v-expansion-panel .v-expansion-panel__container{
  background-color: #353b48;
  color: #fff;
}
.theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon{
  color:#fff;
}
</style>