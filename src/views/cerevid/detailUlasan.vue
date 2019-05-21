<template>
	<div class="ulasan">
		<headerDetail />
		<v-container>
		    <v-toolbar
		      height="40"
		    >
		      <v-toolbar-items>
		        <v-btn to="/cerevid/detail-pelajaran/ikhtisar" flat color="#2c3e50"  style="text-decoration: none">Ikhtisar</v-btn>
		        <v-btn to="/cerevid/detail-pelajaran/kurikulum" flat color="#2c3e50"  style="text-decoration: none">Kurikulum</v-btn>
		        <v-btn to="/cerevid/detail-pelajaran/ulasan" flat color="#2c3e50"  style="text-decoration: none">Ulasan</v-btn>
		        <v-btn to="/cerevid/detail-pelajaran/profil-pengajar" flat color="#2c3e50"  style="text-decoration: none">Profil Pengajar</v-btn>
		      </v-toolbar-items>
		    </v-toolbar>
		    <v-card>
		      <v-container fluid grid-list-md>
		      	<v-flex style="margin:0px 20px;">
			      	    	<div class="headline">
			              	    <div>Ulasan Pengguna</div>
			                </div>
			            	<v-container fluid grid-list-md>
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
				            	</v-layout>
			            	</v-container>
		    			</v-flex>
		      </v-container>
		      <v-container fluid>
		      	<v-flex>
		      		<v-card flat>
			           	<v-container grid-list-md>
			            	<v-layout row wrap>
						      	<div class="headline">
						            <div>Ulasan</div>
						        </div>
			            		<v-flex xs12 sm4 md12>
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
				           	<v-container>
				           		<v-layout justify-end>
					           		<flex md12>
													<template>
													  <v-layout row justify-center>
															<v-btn
																dark color="#2c3e50"
																@click.stop="dialog = true"
															>
																Berikan Ulasan
															</v-btn>

													    <v-dialog
													      v-model="dialog"
													      max-width="450"
													    >
													      <v-card>
													        <v-card-title class="headline">Berikan Ulasan</v-card-title>

													        <v-card-text justify-center>
										                <v-rating
																			class="text-xs-center"
										                  v-model="berikanRating"
										                  color="yellow darken-3"
										                  background-color="grey darken-1"
										                >
										                </v-rating>
										                <p class="text-xs-center">{{berikanRating}}</p>
														        <v-textarea
														          label="Isi Ulasan"
														        ></v-textarea>
													        </v-card-text>

													        <v-card-actions>
													          <v-spacer></v-spacer>

													          <v-btn
													            color="green darken-1"
													            flat="flat"
													            @click="dialog = false"
													          >
													            Kirim
													          </v-btn>
													        </v-card-actions>
													      </v-card>
													    </v-dialog>
													  </v-layout>
													</template>
					           		</flex>
				           		</v-layout>
				           	</v-container>
			            </v-container>
			        </v-card>
		    	</v-flex>
		      </v-container>
		    </v-card>
		</v-container>
	</div>
</template>
<script>
	import headerDetail from '../../components/cerevid-component/headerDetail'
	export default {
		name:"ulasan",
		data: () => ({
			dialog: false,
			rating: 4.5,
			berikanRating: 0,
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
			headerDetail,
		}
	}
</script>
