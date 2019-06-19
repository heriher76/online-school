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
              <center><LoadingScreen1 :loading="is_load1"></LoadingScreen1></center>
              <v-tabs
                v-show="showTab"
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
                                  <v-btn color="green" :to="'/guru/cerevid/detail-pelajaran/'+$route.params.id+'/section/'+item.id+'/video/'+video.id">
                                    <v-icon color="white--text">visibility</v-icon>
                                    <span class="pa-1 white--text">Lihat</span>
                                  </v-btn>
                                </v-list-tile-action>
                                <v-list-tile-action>
                                  <v-btn color="red" @click="handleDeleteVideo(item.id, video.id)">
                                    <v-icon color="white--text">delete</v-icon>
                                    <span class="pa-1 white--text">Hapus</span>
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
                                  <v-btn color="green" :to="'/guru/cerevid/detail-pelajaran/'+$route.params.id+'/section/'+item.id+'/text/'+text.id">
                                    <v-icon color="white--text">visibility</v-icon>
                                    <span class="pa-1 white--text">Lihat</span>
                                  </v-btn>
                                </v-list-tile-action>
                                <v-list-tile-action>
                                  <v-btn color="red" @click="handleDeleteText(item.id, text.id)">
                                    <v-icon color="white--text">delete</v-icon>
                                    <span class="pa-1 white--text">Hapus</span>
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
                                  <v-btn color="green" :to="'/guru/cerevid/detail-pelajaran/'+$route.params.id+'/section/'+item.id+'/quiz/'+quiz_item.id">
                                    <v-icon color="white--text">visibility</v-icon>
                                    <span class="pa-1 white--text">Lihat</span>
                                  </v-btn>
                                </v-list-tile-action>
                                <v-list-tile-action>
                                  <v-btn color="red">
                                    <v-icon color="white--text">delete</v-icon>
                                    <span class="pa-1 white--text">Hapus</span>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>

                              <v-list-tile>
                                <v-list-tile-content>
                                  <v-list-tile-sub-title>
                                    <center>
                                    <v-btn color="orange" :to="'/guru/cerevid/detail-pelajaran/'+$route.params.id+'/'+item.id+'/tambah-video'">
                                      <v-icon color="white--text">add_box</v-icon>
                                      <span class="pa-1 white--text">Video</span>
                                    </v-btn>
                                    <v-btn color="green" :to="'/guru/cerevid/detail-pelajaran/'+$route.params.id+'/'+item.id+'/tambah-text'">
                                      <v-icon color="white--text">add_box</v-icon>
                                      <span class="pa-1 white--text">Text</span>
                                    </v-btn>
                                    <v-btn color="blue" :to="'/guru/cerevid/detail-pelajaran/'+$route.params.id+'/quiz'">
                                      <v-icon color="white--text">add_box</v-icon>
                                      <span class="pa-1 white--text">Quiz</span>
                                    </v-btn>
                                    <v-btn color="red" @click="handleDeleteSection(item.id)">
                                      <v-icon color="white--text">delete_forever</v-icon>
                                      <span class="pa-1 white--text">Hapus Kurikulum</span>
                                    </v-btn>
                                    </center>
                                  </v-list-tile-sub-title>
                                </v-list-tile-content>
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
                                                <v-text-field v-model="title" label="Nama Sub Judul*" required></v-text-field>
                                              </v-flex>
                                            </v-layout>
                                          </v-container>
                                          <small>*indicates required field</small>
                                        </v-card-text>
                                        <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn color="blue darken-1" flat @click="tambahBab = false">Tutup</v-btn>
                                          <v-btn color="blue darken-1" flat @click="this.submitSection">Tambah</v-btn>
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
																		      :value="100*(star5/totalStar)"
																		    ></v-progress-linear>
														            		<v-progress-linear
																		      color="yellow darken-3"
																		      height="18"
																		      :value="100*(star4/totalStar)"
																		    ></v-progress-linear>
														            		<v-progress-linear
																		      color="yellow darken-3"
																		      height="18"
																		      :value="100*(star3/totalStar)"
																		    ></v-progress-linear>
														            		<v-progress-linear
																		      color="yellow darken-3"
																		      height="18"
																		      :value="100*(star2/totalStar)"
																		    ></v-progress-linear>
														            		<v-progress-linear
																		      color="yellow darken-3"
																		      height="18"
																		      :value="100*(star1/totalStar)"
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
                                  <!-- <div>Forum</div> -->
                                </div>
                                
                                <v-layout row wrap>
                                  <v-flex xs12 sm12 md12>
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

                                    <div  v-for="(forum, index) in forums">
                                      <div :key="index" style="margin: 10px; padding: 10px; border: 1px solid black">
                                        <v-layout row wrap>
                                          <v-flex xs12 sm12 md2>
                                            <img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'" style="border-radius: 50%; height: 100px;">
                                          </v-flex>
                                          <v-flex xs12 sm12 md10>
                                            <b style="margin-bottom:0px;">{{forum.user}}</b>
                                            <br>
                                            <i>{{forum.posted}}</i>
                                            <p>{{forum.body}}</p>
                                            <v-btn color="blue" class="white--text" @click="replyUser(forum.id)">Balas</v-btn>
                                            <v-btn color="red" class="white--text" @click="handleDelete">Hapus</v-btn>
                                            <br><br>

                                            <v-expansion-panel popout>
                                              <v-expansion-panel-content>
                                                <template v-slot:header>
                                                  <div>Tampilkan Komentar...</div>
                                                </template>
                                                <v-card>
                                                  <v-card-text>
                                                    <div>
                                                      <v-layout row wrap>
                                                        <v-flex xs12 sm12 md2>
                                                          <img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'" style="border-radius: 50%; height: 80px;">
                                                        </v-flex>
                                                        <v-flex xs12 sm12 md10>
                                                          <b style="margin-bottom:0px;">asdfasdfsa</b>
                                                          <br>
                                                          <i>23 menit</i>
                                                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                                          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                                          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                        </v-flex>
                                                      </v-layout>
                                                    </div>
                                                  </v-card-text>
                                                </v-card>
                                              </v-expansion-panel-content>
                                            </v-expansion-panel>

                                            <!-- <b style="cursor: pointer;" @click="handleShowComment">Tampilkan Komentar...</b> -->
                                            <!-- komentar  -->
                                            <div class="komentar" v-show="showComment">
                                              <div style="margin: 10px; padding: 10px; border: 1px solid black">
                                                <v-layout row wrap>
                                                  <v-flex xs12 sm12 md2>
                                                    <img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'" style="border-radius: 50%; height: 80px;">
                                                  </v-flex>
                                                  <v-flex xs12 sm12 md10>
                                                    <b style="margin-bottom:0px;">asdfasdfsa</b>
                                                    <br>
                                                    <i>23 menit</i>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                  </v-flex>
                                                </v-layout>
                                              </div>
                                            </div>
                                            <!-- end komentar -->
                                          </v-flex>
                                        </v-layout>
                                      </div>
                                    </div>
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
  import LoadingScreen1 from'../../components/loading-screen/LoadingCerevid'
  import axios from 'axios'
	export default {
		name:"detail-pelajaran-guru",
    data: () => ({
      sections: '',
			reviews: '',
      forums: '',
      body: '',
      title: '',
      dialog:false,
      tambahBab: false,
      tambahMateri: false,
      is_load1: true,
      showTab: false,
      showComment: false,
      star1: 0,
      star2: 0,
      star3: 0,
      star4: 0,
      star5: 0,
      totalStar: 0
    }),
    methods: {
        async getDataDetailPelajaran(){
          this.$store.dispatch('getDataDetailPelajaran')
          .then(response => {
            console.log("telah load data..")
          })
        },
        handleShowComment() {
          this.showComment = true
        },
        replyUser(id) {
          this.$swal({
            title: "Masukkan Komentar!",
            input: 'textarea',
            showCancelButton: true,
            animation: "slide-from-top",
            inputPlaceholder: "Write something"
          }).then((willReply) => {
            if (!willReply.dismiss) {
              axios.defaults.headers = {  
                  'Authorization': 'Bearer ' + this.$store.state.token
              }
              axios.post('courses/'+this.$route.params.id+'/forums/create', {
                forums_id: id,
                body: willReply.value
              })
              .then(response => {
                this.$swal('Sukses', 'Berhasil Menambahkan Komentar!', 'success')
                // this.forums.unshift({body: this.body, posted: 'Just Now' , user: 'heri'});
              })
              .catch(error => {
                this.$swal('Oops', 'Gagal Menambahkan Komentar!', 'warning')
              })
            } else {
              console.log('false')
            }
          });
        },
        handleDeleteSection(id) {
          this.$swal({
            title: "Hapus Section ini?",
            text: "Apakah kamu yakin? Ini akan menghapus semua materi didalamnya!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!"
          }).then((willDelete) => {
            if (willDelete.value) {
              axios.defaults.headers = {  
                  'Authorization': 'Bearer ' + this.$store.state.token
              }
              axios.delete('/courses/'+this.$route.params.id+'/sections/'+id)
              .then(response => {
                this.$swal('Sukses', 'Berhasil Menghapus Section!', 'success')
                var sections = this.sections.filter(x => {
                  return x.id != id;
                })
                this.sections = sections
              })
              .catch(error => {
                this.$swal('Oops', 'Gagal Menghapus Section!', 'warning')
              })
            } else {
              console.log('safe')
            }
          });
        },
        handleDelete() {
          this.$swal({
            title: "Delete this comment?",
            text: "Are you sure? You won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete it!"
          }).then((willDelete) => {
            if (willDelete.value) {
              console.log('deleted')
            } else {
              console.log('safe')
            }
          });
        },
        findNestedText (obj, parent, value, i) {
            if (obj.id === value) {
                parent.splice(i,1)
            }
            if (obj && obj.texts && obj.texts.length > 0) {
                for (let j = 0; j < obj.texts.length; j++) {
                    this.findNestedText(obj.texts[j], obj.texts, value, j);
                }
            }
        },
        handleDeleteText(idSection, id){
          axios.defaults.headers = {  
              'Authorization': 'Bearer ' + this.$store.state.token
          }
          axios.delete('/sections/'+this.$route.params.idSection+'/texts/'+id)
          .then(response => {
            this.$swal('Sukses', 'Berhasil Menghapus Materi Teks!', 'success')
            
            for (let i = 0; i < this.sections.length; i++) {
                this.findNestedText(this.sections[i], this.sections, id, i); 
            }
            
          })
          .catch(error => {
            this.$swal('Oops', 'Gagal Menghapus Materi Teks!', 'warning')
          })
        },
        findNestedVideo (obj, parent, value, i) {
            if (obj.id === value) {
                parent.splice(i,1)
            }
            if (obj && obj.videos && obj.videos.length > 0) {
                for (let j = 0; j < obj.videos.length; j++) {
                    this.findNestedText(obj.videos[j], obj.videos, value, j);
                }
            }
        },
        handleDeleteVideo(idSection, id){
          axios.defaults.headers = {  
              'Authorization': 'Bearer ' + this.$store.state.token
          }
          axios.delete('/sections/'+this.$route.params.idSection+'/videos/'+id)
          .then(response => {
            this.$swal('Sukses', 'Berhasil Menghapus Materi Video!', 'success')
            
            for (let i = 0; i < this.sections.length; i++) {
                this.findNestedVideo(this.sections[i], this.sections, id, i); 
            }
            
          })
          .catch(error => {
            this.$swal('Oops', 'Gagal Menghapus Materi Video!', 'warning')
          })
        },
        submitSection() {
          this.tambahBab = false
          axios.defaults.headers = {  
              'Authorization': 'Bearer ' + this.$store.state.token
          }
          axios.post('/courses/'+this.$route.params.id+'/sections/create', {
            course_id: this.$route.params.id,
            title: this.title
          })
          .then(response => {
            this.$swal('Sukses', 'Berhasil Menambahkan Section!', 'success')
            this.sections.unshift({title: this.title, course_id: this.$route.params.id, id:response.data.data.id});
            this.title = ''
          })
          .catch(error => {
            this.$swal('Oops', 'Gagal Menambahkan Section!', 'warning')
          })
        },
        kirimForum(){
          this.dialog = false

          axios.defaults.headers = {  
              'Authorization': 'Bearer ' + this.$store.state.token
          }
          axios.post('courses/'+this.$route.params.id+'/forums/create', {
            course_id: this.$route.params.id,
            body: this.body
          })
          .then(response => {
            this.$swal('Sukses', 'Berhasil Menambahkan Komentar!', 'success')
            this.forums.unshift({body: this.body, posted: 'Just Now' , user: 'heri'});
          })
          .catch(error => {
            this.$swal('Oops', 'Gagal Menambahkan Komentar!', 'warning')
          })
        }
    },
    created(){
      this.getDataDetailPelajaran()
      // get sections of course
      axios.defaults.headers = {  
          'Authorization': 'Bearer ' + this.$store.state.token
      }
      axios.get('/courses/'+this.$route.params.id+'/sections')
      .then(response => {
        this.sections = response.data.data
      })
      .catch(error => {
        console.log(error)
      })

      // get reviews of course
      axios.defaults.headers = {  
          'Authorization': 'Bearer ' + this.$store.state.token
      }
      axios.get('/courses/'+this.$route.params.id+'/reviews')
      .then(response => {
        this.reviews = response.data.data

        for(var i=0;i<this.reviews.length;i++){
          if(this.reviews[i].star==1){
            this.star1+=1
          }else if(this.reviews[i].star==2){
            this.star2+=1
          }else if(this.reviews[i].star==3){
            this.star3+=1
          }else if(this.reviews[i].star==4){
            this.star4+=1
          }else if(this.reviews[i].star==5){
            this.star5+=1
          }
          this.totalStar+=1
        }
      })
      .catch(error => {
        console.log(error)
      })

      // get forums of course
      axios.defaults.headers = {  
          'Authorization': 'Bearer ' + this.$store.state.token
      }
      axios.get('/courses/'+this.$route.params.id+'/forums')
      .then(response => {
        this.forums = response.data.data
        console.log(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    computed: {
      dataDetailPelajaran(){
        if(typeof this.$store.state.dataDetailPelajaran.data !== "undefined"){
          this.is_load1 = false
          this.showTab = true
        }
        return this.$store.state.dataDetailPelajaran || {}
      },
    },
		components:{
			subNavbarGuru,
      sidebarGuru,
      LoadingScreen1
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