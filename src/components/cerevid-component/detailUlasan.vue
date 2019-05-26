<template>
  <div>
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
						    <v-list three-line expand="true">
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
					      <flex md12>
						      <template>
									  <v-layout row justify-center>
                      <v-dialog
                        v-model="dialog"
                        width="500"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn
                            color="#2c3e50"
                            dark
                            v-on="on"
                          >
                            Berikan Ulasan
                          </v-btn>
                        </template>

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
                             v-model="body"
                            ></v-textarea>
                          </v-card-text>
                          {{dataReview}}
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="green darken-1"
                              flat="flat"
                              @click="kirimReview()"
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
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    props: ['datas'],
    data: () => ({
      dialog:false,
      berikanRating: 0,
      body,
    	auth: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQxMTQwMzM4YjNjMzBiMzQ0M2FjMWEzYjBlZDYwMzQ4Y2I0M2QxZGVlNjZkMzBhMzJjM2YwZjI4YzEzMDFjMGUyMGMyMDg1MWM5MGQ0MmJkIn0.eyJhdWQiOiIxIiwianRpIjoiZDExNDAzMzhiM2MzMGIzNDQzYWMxYTNiMGVkNjAzNDhjYjQzZDFkZWU2NmQzMGEzMmMzZjBmMjhjMTMwMWMwZTIwYzIwODUxYzkwZDQyYmQiLCJpYXQiOjE1NTg4MTE1MzQsIm5iZiI6MTU1ODgxMTUzNCwiZXhwIjoxNTkwNDMzOTM0LCJzdWIiOiIzMiIsInNjb3BlcyI6W119.V7KZDWkUeqAgxhgiMgx6gcfhW4E1nmOorEhxxN0qM8zDzqnAlEJ1I7L63idl9EVFbCkUWKgm-vL9J0C3ndv4IsOV9H1cZ0c1u-KPmsWi_LpjQWP1ETtAmY6_RTc3ChZtETLc9Z5-dhfpKGEFp-dzg3izdrSr24iGFWz-2YrCXLwlf67po8Ln5n7INpHcDuOVjSnOebyeKkUbeB-kGR8ZzvCLPZ46LhP82_OH6T5vcKmF9rZy5mHumH4uHmfZTNS88OnuqDqlp0pzC1coLQAv7bMG25uZirjRaM0wfhv2-oswckPfVz9I28MB8OmuRLi6fWYOrrmJRm5o8m0NXEmiiDstCGC_eJM9cK_4MzoHaY4LQ0ulXvJCQv-sHgUjGXIYqyFhCMjlNBfxLs_U1dFjdDbnUV0r0jmlxILoQODnpLpiop2DXZbzvaq1bzMg3GEruVDD9L9qNv1jfCW0D8gKo6NMgkKFzQya9iFtdCVfqi3ez2iLz6hfGla8Vs19pPwuS2vSbWFiiWmXem4bPayu1yFBYkOWvXPB9qtAAqFG-dE20wjxl36gqCNBx02oGXZzGl9RHWayOf0GXkwr-imeTwrYfj63sQbZYT7wEuun-KozdaYbp_skcNbBnbxkCvjtmxcM7XB24p-UM4-kCnBoSNCcJVvPjSch00uoXnvetdM",
      dataReview: {
        "course_id": this.$route.params.id,
      	"star": berikanRating,
      	"body": body,
      	"user_id": 3
      }
    }),
    methods: {
      async kirimReview(){
				const response = await axios.post('http://api.ceredinas.id/api/courses/'+this.$route.params.id+'/reviews/create',this.dataReview,{'headers': {'Authorization': this.auth}})
        .then(response =>{
          callback(response.data.message);
          console.log(response.data.message);
        }).catch(err =>{
          console.log(err);
        })
      }
    }
  }
</script>
