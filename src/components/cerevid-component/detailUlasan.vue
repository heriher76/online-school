<template>
  <div v-if="countStar">
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
              {{datas.data.reviews.length}} Ulasan
						</v-card-text>
				  </v-card>
			  </v-flex>
			  <v-flex xs12 sm7 md9>
			    <v-layout row wrap>
				    <v-flex md10 sm12 xs12>
            <v-card flat>
              <v-layout row wrap>
                <v-flex md1 sm1 xs2><div class="subheading mt-2 pt-1 pl-3">5</div></v-flex>
                <v-flex md10 sm10 xs7>
        				<v-progress-linear
          				color="yellow darken-3"
          				height="18"
          				:value="star5"
          				>
                </v-progress-linear>
                </v-flex>
                <v-flex md1 sm1 xs3><div class="subheading mt-2 pt-1">{{star5.toFixed(2)}}%</div></v-flex>
              </v-layout>
            </v-card>
            <v-card flat>
              <v-layout row wrap>
                <v-flex md1 sm1 xs2><div class="subheading mt-2 pt-1 pl-3">4</div></v-flex>
                <v-flex md10 sm10 xs7>
                <v-progress-linear
                  color="yellow darken-3"
                  height="18"
                  :value="star4"
                  >
                </v-progress-linear>
                </v-flex>
                <v-flex md1 sm1 xs3><div class="subheading mt-2 pt-1">{{star4.toFixed(2)}}%</div></v-flex>
              </v-layout>
            </v-card>
            <v-card flat>
              <v-layout row wrap>
                <v-flex md1 sm1 xs2><div class="subheading mt-2 pt-1 pl-3">3</div></v-flex>
                <v-flex md10 sm10 xs7>
                <v-progress-linear
                  color="yellow darken-3"
                  height="18"
                  :value="star3"
                  >
                </v-progress-linear>
                </v-flex>
                <v-flex md1 sm1 xs3><div class="subheading mt-2 pt-1">{{star3.toFixed(2)}}%</div></v-flex>
              </v-layout>
            </v-card>
            <v-card flat>
              <v-layout row wrap>
                <v-flex md1 sm1 xs2><div class="subheading mt-2 pt-1 pl-3">2</div></v-flex>
                <v-flex md10 sm10 xs7>
                <v-progress-linear
                  color="yellow darken-3"
                  height="18"
                  :value="star2"
                  >
                </v-progress-linear>
                </v-flex>
                <v-flex md1 sm1 xs3><div class="subheading mt-2 pt-1">{{star2.toFixed(2)}}%</div></v-flex>
              </v-layout>
            </v-card>
            <v-card flat>
              <v-layout row wrap>
                <v-flex md1 sm1 xs2><div class="subheading mt-2 pt-1 pl-3">1</div></v-flex>
                <v-flex md10 sm10 xs7>
                <v-progress-linear
                  color="yellow darken-3"
                  height="18"
                  :value="star1"
                  >
                </v-progress-linear>
                </v-flex>
                <v-flex md1 sm1 xs3><div class="subheading mt-2 pt-1">{{star1.toFixed(2)}}%</div></v-flex>
              </v-layout>
            </v-card>
              <v-spacer/>
				    </v-flex>
			    </v-layout>
			  </v-flex>
			</v-layout>
		</v-container>
		<v-container fluid>
      <v-layout row wrap>
  		  <v-flex xs12 sm12 md12>
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
  									    <v-list-tile-content>
  									      <v-list-tile-title v-html="review.user.name">
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
  									      <v-list-tile-sub-title style="overflow: auto" v-html="review.body"></v-list-tile-sub-title>
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
                         <div v-if="cekReview()">
                          <v-btn :disabled="true"color="#2c3e50" class="white--text">Berikan Ulasan</v-btn>
                         </div>
                         <div v-else>
                          <v-btn
                           @click.stop="dialog = true"
                           dark color="#2c3e50"
                          >
                           Berikan Ulasan
                          </v-btn>
                         </div>
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
                                 :rules="[rules_rating.required]"
                               >
                               </v-rating>
                               <p class="text-xs-center">{{kasihRating}}</p>
                               <v-textarea
                                 label="Isi Ulasan"
                                 v-model="body"
                                 :rules="[rules_review.required]"
                               ></v-textarea>
                             </v-card-text>

                             <v-card-actions>
                               <v-spacer></v-spacer>

                               <v-btn
                                 color="green darken-1"
                                 flat="flat"
                                 @click="kirimUlasan"
                                 :disabled="!formIsValid"
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
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    props: ['datas'],
    data: () => ({
      dialog:false,
      kasihRating: 1,
      star1: 0,
      star2: 0,
      star3: 0,
      star4: 0,
      star5: 0,
      totalStar: 0,
      body: "",
      dataUser:[],
      rules_rating: {
        required: value => !!value || 'Wajib Diisi',
      },
      rules_review: {
        required: value => !!value || 'Wajib Diisi.',
      },
    }),
    computed:{
      countStar(){
        this.star5 = 0
        this.star4 = 0
        this.star3 = 0
        this.star2 = 0
        this.star1 = 0
        this.totalStar = 0
        if(this.datas.data){
          if(this.datas.data.reviews.length){
            for(var i=0;i<this.datas.data.reviews.length;i++){
              if(this.datas.data.reviews[i].star==1){
                this.star1+=1
              }else if(this.datas.data.reviews[i].star==2){
                this.star2+=1
              }else if(this.datas.data.reviews[i].star==3){
                this.star3+=1
              }else if(this.datas.data.reviews[i].star==4){
                this.star4+=1
              }else if(this.datas.data.reviews[i].star==5){
                this.star5+=1
              }
              this.totalStar+=1
            }
            this.star5 = 100*(this.star5/this.totalStar)
            this.star4 = 100*(this.star4/this.totalStar)
            this.star3 = 100*(this.star3/this.totalStar)
            this.star2 = 100*(this.star2/this.totalStar)
            this.star1 = 100*(this.star1/this.totalStar)
            return true
          }else{
            this.star5 = 0
            this.star4 = 0
            this.star3 = 0
            this.star2 = 0
            this.star1 = 0
            this.totalStar = 0
            return true
          }
        }
      },
      formIsValid() {
        return (
          this.kasihRating,
          this.body
        )
      },
			userId(){
				return this.$store.state.dataUser || {}
			},
    },
    mounted(){
      if(this.$store.getters.loggedIn){
        axios.get('/auth/user')
        .then(response => {
          this.dataUser      = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
      }

    },
    methods: {
      cekReview() {
        if(this.datas.data.reviews){
          for(var i=0;i<this.datas.data.reviews.length;i++){
            if(this.datas.data.reviews[i].user.id==this.dataUser.id){
              return true
              break;
            }
          }
        }
      },
      getCountStar(){
        this.star5 = 0
        this.star4 = 0
        this.star3 = 0
        this.star2 = 0
        this.star1 = 0
        this.totalStar = 0
        if(this.datas.data){
          if(this.datas.data.reviews.length){
            for(var i=0;i<this.datas.data.reviews.length;i++){
              if(this.datas.data.reviews[i].star==1){
                this.star1+=1
              }else if(this.datas.data.reviews[i].star==2){
                this.star2+=1
              }else if(this.datas.data.reviews[i].star==3){
                this.star3+=1
              }else if(this.datas.data.reviews[i].star==4){
                this.star4+=1
              }else if(this.datas.data.reviews[i].star==5){
                this.star5+=1
              }
              this.totalStar+=1
            }
            this.star5 = 100*(this.star5/this.totalStar)
            this.star4 = 100*(this.star4/this.totalStar)
            this.star3 = 100*(this.star3/this.totalStar)
            this.star2 = 100*(this.star2/this.totalStar)
            this.star1 = 100*(this.star1/this.totalStar)
            return true
          }else{
            this.star5 = 0
            this.star4 = 0
            this.star3 = 0
            this.star2 = 0
            this.star1 = 0
            this.totalStar = 0
            return true
          }
        }
      },
      getDataDetailPelajaran() {
          this.$store.dispatch('getDataDetailPelajaran')
            .then(response => {
            })
      },
      kirimUlasan(){
        this.$store.dispatch('pushDataRating', {
          course_id: this.$route.params.id,
          star: this.kasihRating,
          isi: this.body,
          user_id: this.userId,
        })
        .then(response => {
          this.star5 = 0
          this.star4 = 0
          this.star3 = 0
          this.star2 = 0
          this.star1 = 0
          this.totalStar = 0
          this.getCountStar()
          this.dialog = false
        })
        .catch(error => {
          this.dialog = false
          console.log(error)
        })
      }
    }
  }
</script>
