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
                <v-tab
                  :href="'#forum'"
                  style="text-decoration:none;"
                >
                  Forum
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
                                  <div>{{ dataDetailPelajaran.data.title }}</div>
                                </div>
                                <v-container fluid>
                                  <v-layout>
                                    <v-flex>
                                        {{ dataDetailPelajaran.data.description }}
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                              </div>
                              <v-layout class="justify-center">
                                <v-btn color="warning" class="white--text" v-bind:to="'/guru/cerevid/detail-pelajaran/'+dataDetailPelajaran.data.id+'/edit'" >Ubah</v-btn>
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
                            v-for="(item,i) in this.sections"
                            :key="i"
                          >
                            <template v-slot:header>
                              <div>{{ item.title }}</div>
                            </template>
                            <v-card>
                              <v-list-tile
                                v-for="(video,j) in item.videos"
                                :key="j"
                              >
                                <v-list-tile-content>
                                  <v-list-tile-sub-title>{{ video.title }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn  color="green">
                                    <v-icon color="white--text">visibility</v-icon>
                                    <span class="pa-1 white--text">Lihat</span>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>
                              
                              <v-divider style="margin:0"></v-divider>
                              
                              <v-list-tile
                                v-for="(text,k) in item.texts"
                                :key="k"
                              >
                                <v-list-tile-content>
                                  <v-list-tile-sub-title>{{ text.title }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn color="green">
                                    <v-icon color="white--text">visibility</v-icon>
                                    <span class="pa-1 white--text">Lihat</span>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>

                              <v-divider style="margin:0"></v-divider>
                              
                              <v-list-tile
                                v-for="(quiz_item,l) in item.quiz"
                                :key="l"
                              >
                                <v-list-tile-content>
                                  <v-list-tile-sub-title>{{ quiz_item.title }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn color="green">
                                    <v-icon color="white--text">visibility</v-icon>
                                    <span class="pa-1 white--text">Lihat</span>
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
											            		<div class="display-3 text-xs-center font-weight-normal">{{dataDetailPelajaran.data.rating}}</div>
													                <v-card-text style="padding-top: 0">
													                <v-rating
													                  v-model="dataDetailPelajaran.data.rating"
													                  dense
													                  color="yellow darken-3"
													                  background-color="grey darken-1"
													                  half-increments
													                  readonly
													                >
													                </v-rating>
													                  
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
															          <template v-for="(review, index) in reviews">
															            <v-subheader
															              v-if="review.header"
															              :key="review.header"
															            >
															            </v-subheader>

															            <v-divider
															              v-else-if="review.divider"
															              :key="index"
															              :inset="review.inset"
															            ></v-divider>

															            <v-list-tile
															              v-else
															              :key="review.user"
															              avatar
															            >
															              <v-list-tile-avatar size="50">
															                <img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'">
															              </v-list-tile-avatar>

															              <v-list-tile-content>
															                <v-list-tile-title v-html="review.user">
															                </v-list-tile-title>
															                <v-rating
															                  v-model="review.star"
															                  dense
															                  color="yellow darken-3"
															                  background-color="grey darken-1"
															                  readonly
															                  small
															                >
															                </v-rating>
															                <v-list-tile-sub-title v-html="review.body"></v-list-tile-sub-title>
															              </v-list-tile-content>
															            </v-list-tile>

                                          <v-divider style="margin:0"></v-divider>

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
                
                
                  <v-tab-item
                    :value="'forum'"
                    >
                    <v-card>
                      <v-container fluid>
                        <v-flex  class="mx-4">
                          <v-container grid-list-md>
                              <v-layout row wrap>
                                <div class="headline">
                                  <div>Forum</div>
                                </div>
                                <v-layout row wrap>
                                  
                                  <v-flex xs12 sm12 md12>
                                    <v-list three-line expand="true">
                                        <template v-for="(forum, index) in forums">
                                          <v-subheader
                                            v-if="forum.header"
                                            :key="forum.header"
                                          >
                                          </v-subheader>

                                          <v-divider
                                            v-else-if="forum.divider"
                                            :key="index"
                                            :inset="forum.inset"
                                          ></v-divider>

                                          <v-list-tile
                                            v-else
                                            :key="forum.user"
                                            avatar
                                          >
                                            <v-list-tile-avatar size="50">
                                              <img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'">
                                            </v-list-tile-avatar>

                                            <v-list-tile-content>
                                              <v-list-tile-title v-html="forum.user">
                                              </v-list-tile-title>
                                              
                                              <v-list-tile-sub-title v-html="forum.body"></v-list-tile-sub-title>
                                            </v-list-tile-content>
                                          </v-list-tile>
                                          
                                          <v-divider style="margin:0"></v-divider>

                                        </template>
                                        
                                        <v-btn
                                          dark color="#2c3e50"
                                          @click.stop="dialog = true"
                                        >
                                          Posting Forum
                                        </v-btn>

                                        <v-dialog
                                          v-model="dialog"
                                          max-width="450"
                                        >
                                          <v-card>
                                            <v-card-title class="headline">Posting Forum</v-card-title>

                                            <v-card-text justify-center>
                                              <v-textarea
                                                label="Isi Pesan"
                                                v-model="body"
                                              ></v-textarea>
                                            </v-card-text>

                                            <v-card-actions>
                                              <v-spacer></v-spacer>

                                              <v-btn
                                                color="green darken-1"
                                                flat="flat"
                                                @click="kirimForum"
                                              >
                                                Kirim
                                              </v-btn>
                                            </v-card-actions>
                                          </v-card>
                                        </v-dialog>

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
  import axios from 'axios'
	export default {
		name:"detail-pelajaran-guru",
    data: () => ({
      sections: '',
			reviews: '',
      forums: '',
      body: '',
      dialog:false,
      tambahBab: false,
      tambahMateri: false
    }),
    methods: {
        async getDataDetailPelajaran(){
          this.$store.dispatch('getDataDetailPelajaran')
          .then(response => {
            console.log("telah load data..")
          })
        },
        kirimForum(){
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
          axios.post('courses/'+this.$route.params.id+'/forums/create', {
            course_id: this.$route.params.id,
            body: this.body,
            user_id: this.$store.state.dataUser
          })
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }
    },
    created(){
      this.getDataDetailPelajaran()
      // get sections of course
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      axios.get('/courses/'+this.$route.params.id+'/sections')
      .then(response => {
        this.sections = response.data.data
      })
      .catch(error => {
        console.log(error)
      })

      // get reviews of course
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      axios.get('/courses/'+this.$route.params.id+'/reviews')
      .then(response => {
        console.log(response.data.data)
        this.reviews = response.data.data
      })
      .catch(error => {
        console.log(error)
      })

      // get forums of course
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      axios.get('/courses/'+this.$route.params.id+'/forums')
      .then(response => {
        console.log(response.data.data)
        this.forums = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    computed: {
      dataDetailPelajaran(){
        return this.$store.state.dataDetailPelajaran || {}
      },
    },
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