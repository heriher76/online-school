<template>
  <div v-if="datas.data">
    <div class="headline">
		    <div>Ulasan Pengguna</div>
    </div>
		<v-container fluid grid-list-md>
		  <v-layout row wrap>
			  <v-flex xs12 sm4 md3>
			    <v-card flat class="text-xs-center mt-4">
					  <div class="display-3 text-xs-center font-weight-normal">
              {{datas.data.rating}}
            </div>
						<v-card-text style="padding-top: 0">
							<v-rating
							  v-model="datas.data.rating"
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
								>
              </v-progress-linear>
              <v-progress-linear
						    color="yellow darken-3"
								height="18"
								value="75"
								>
              </v-progress-linear>
              <v-progress-linear
						    color="yellow darken-3"
								height="18"
								value="75"
								>
              </v-progress-linear>
              <v-progress-linear
						    color="yellow darken-3"
								height="18"
								value="75"
								>
              </v-progress-linear>
              <v-progress-linear
						    color="yellow darken-3"
								height="18"
								value="75"
								>
              </v-progress-linear>
              <v-progress-linear
						    color="yellow darken-3"
								height="18"
								value="75"
								>
              </v-progress-linear>
              <v-spacer/>
				    </v-flex>
			    </v-layout>
			  </v-flex>
			</v-layout>
		</v-container>
		<v-container fluid>
		  <v-flex>
		    <v-card flat>
			    <v-container grid-list-md>
			      <v-layout row wrap>
						  <div class="headline">
						    <div>Ulasan</div>
						  </div>
			        <v-flex xs12 sm12 md12>
						    <v-list three-line :expand="true">
							    <template v-for="review in datas.data.reviews">
									  <v-divider
									  ></v-divider>
									  <v-list-tile>
									    <v-list-tile-avatar size="50">
									      <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
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
									</template>
								</v-list>
					    </v-flex>
				     </v-layout>

             <v-container>
               <v-layout justify-end>
                 <v-flex md12>
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
                             <v-rating class="text-xs-center"
                               v-model="kasihRating"
                               color="yellow darken-3"
                               background-color="grey darken-1"
                             >
                             </v-rating>
                             <p class="text-xs-center">{{kasihRating}}</p>
                             <v-textarea
                               label="Isi Ulasan"
                               v-model="body"
                             ></v-textarea>
                           </v-card-text>

                           <v-card-actions>
                             <v-spacer></v-spacer>

                             <v-btn
                               color="green darken-1"
                               flat="flat"
                               @click="kirimUlasan"
                             >
                               Kirim
                             </v-btn>
                           </v-card-actions>
                         </v-card>
                       </v-dialog>
                     </v-layout>
                   </template>
                 </v-flex>
               </v-layout>
             </v-container>
			    </v-container>
			  </v-card>
      </v-flex>
    </v-container>
  </div>
</template>
<script>
  export default {
    props: ['datas'],
    data: () => ({
      dialog:false,
      kasihRating: 0,
      body: "",
    }),
    computed:{
			userId(){
				return this.$store.state.dataUser || {}
			},
    },
    methods: {
      async getDataDetailPelajaran() {
          this.$store.dispatch('getDataDetailPelajaran')
            .then(response => {
            })
      },
      kirimUlasan(){
        console.log(1)
        this.$store.dispatch('pushDataRating', {
          course_id: this.$route.params.id,
          star: this.kasihRating,
          isi: this.body,
          user_id: this.userId,
        })
        .then(response => {
          this.dialog = false
          this.getDataDetailPelajaran()
        })
        .catch(error => {
          this.dialog = false
          console.log(error)
        })
      }
    }
  }
</script>
