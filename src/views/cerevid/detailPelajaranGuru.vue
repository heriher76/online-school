<template>
	<div class="detail-pelajaranku-guru">
		<!-- sub - navbar -->
		<subNavbarGuru />
		<!-- end sub - navbar -->
		<!-- content -->
    <v-container fluid>
				<v-layout row wrap>
					<v-flex xs12 sm12 md3>
						<v-card-text style="padding-top:0">
  						<v-toolbar flat dark>
  							<v-list  style="background-color:#c62828">
  								<v-list-tile>
  									<v-list-tile-title class="title">
  										Kelola Pelajaran
  									</v-list-tile-title>
  								</v-list-tile>
  							</v-list>
  						</v-toolbar>
  						<v-list dense class="pt-0">
  							<v-list-tile
  								@click="daftarPelajaran"
  							  >
  								<v-list-tile-action>
  									<v-icon>dashboard</v-icon>
  								</v-list-tile-action>

  								<v-list-tile-content>
  									<v-list-tile-title>Daftar Pelajaran</v-list-tile-title>
  								</v-list-tile-content>
  							</v-list-tile>
  							<v-list-tile
  								@click="tambahPelajaran"
  							  >
  								<v-list-tile-action>
  									<v-icon>dashboard</v-icon>
  								</v-list-tile-action>

  								<v-list-tile-content>
  									<v-list-tile-title>Tambah Pelajaran</v-list-tile-title>
  								</v-list-tile-content>
  							</v-list-tile>
  						</v-list>
					  </v-card-text>
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
                                    <v-dialog v-model="dialog" persistent max-width="600px">
                                      <template v-slot:activator="{ on }">
                                        <v-btn color="primary" dark v-on="on">Tambah Sub Judul</v-btn>
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
                                          <v-btn color="blue darken-1" flat @click="dialog = false">Tutup</v-btn>
                                          <v-btn color="blue darken-1" flat @click="dialog = false">Tambah</v-btn>
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
                              <v-layout class="justify-end">
                        			<v-container fluid>
                        				<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        					<img :src="imageUrl" height="150" v-if="imageUrl"/>
                        					<v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                        					<input
                        						type="file"
                        						style="display: none"
                        						ref="image"
                        						accept="image/*"
                        						@change="onFilePicked"
                        					>
                        				</v-flex>
                        			</v-container>
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
	export default {
		name:"detail-pelajaran-guru",
    data: () => ({
      dialog: false,
      title: "Image Upload",
  		imageName: '',
  		imageUrl: '',
  		imageFile: ''
    }),
		components:{
			subNavbarGuru,
		methods: {
		    daftarPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/daftar-pelajaran'})
				},
				tambahPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/tambah-pelajaran'})
				},
        pickFile () {
            this.$refs.image.click ()
        },

		    onFilePicked (e) {
    			const files = e.target.files
    			if(files[0] !== undefined) {
    				this.imageName = files[0].name
    				if(this.imageName.lastIndexOf('.') <= 0) {
    					return
    				}
    				const fr = new FileReader ()
    				fr.readAsDataURL(files[0])
    				fr.addEventListener('load', () => {
    					this.imageUrl = fr.result
    					this.imageFile = files[0] // this is an image file that can be sent to server...
    				})
    			} else {
    				this.imageName = ''
    				this.imageFile = ''
    				this.imageUrl = ''
    			}
    		}
    }
	}
}
</script>
