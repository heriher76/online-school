<template>
<div class="materi">
  <div>
    <v-container>
      <v-layout row wrap>
      	<div v-show="load_data" style="margin:10px auto; width:5%;">
            <v-progress-circular
            :size="30"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </div>
        <v-flex xs12 sm12 md12 style="padding-top: 15px;" v-show="!load_data">
          <v-toolbar color="#34495e" dark flat>
            <v-list-tile>
              <v-list-tile-title>{{this.post.title}}</v-list-tile-title>
            </v-list-tile>
          </v-toolbar>
          <v-card style="position: relative;width:100%;padding-bottom: auto;">

            <div style="margin-left: 10px;">
              <br>
              <center>
              	<v-flex md5 sm12 xs12>
              	    <div class="image_info">
                        <v-layout justify-center style="position: relative;width:100%;height:100%;padding-bottom: 45%;" v-if="post.video">
                          <iframe :src="'https://www.youtube.com/embed/'+this.post.video" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </v-layout>

              	        <v-img
              	            v-bind:src="post.image"
              	            width="auto"
                            height="auto"
              	            class="grey darken-4"
                            v-else
                            style="max-height: 360px;"
              	        ></v-img>
              	    </div>
              	</v-flex>
              </center>
              <br>
              <p v-html="this.post.content"></p>
                <v-flex align-end flexbox>
                    <div v-if="post">
                      <div v-if="post.liked">
                      <v-btn fab dark small color="pink" style="opacity:0.85; float: left;" @click="hapusFavorit(post.id)">
                      	  {{post.likes}}
                        <v-icon dark >thumb_up_alt</v-icon>
                      </v-btn>
                      </div>
                      <div v-else>
                          <v-btn fab dark small style="opacity:0.85; float: left;" @click="simpanFavorit(post.id)">
                            {{post.likes}}
                            <v-icon dark>thumb_up_alt</v-icon>
                          </v-btn>
                      </div>
                      <v-btn fab dark small style="opacity:0.85; float: left;" @click="simpanFavorit(post.id)">
                      	{{post.comments}}
                      <v-icon dark>chat_bubble_outline</v-icon>
                    </v-btn>
                    </div>
                </v-flex>
              <br><br><br>
              <b>{{this.post.created_at}}</b>
              <br>
			         <label>Ditulis Oleh: {{this.post.user}}</label>
            </div>

          </v-card>
        </v-flex>
        
	  </v-layout>

	  <v-layout row wrap mt-3>

	    <v-flex md8>
        <v-tabs color="#f5f5f5" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
          <v-tab :href="'#forum-diskusi'" style="text-decoration:none;">
            Forum Diskusi
          </v-tab>
          <v-tabs-items>
            <v-tab-item :value="'forum-diskusi'">
              <v-card>
                <v-container>
                  <v-layout>
                  <v-flex md12 sm12 xs12>
                    <v-list three-line>
                      <template v-for="item in this.forums">
                        <v-list-tile>
                          <v-list-tile-content style="overflow-x:auto">
                            <v-card flat>
                            <v-list-tile-title v-html="item.name" class="ml-3"></v-list-tile-title>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <span v-on="on">
                                  <v-list-tile-sub-title v-html="item.content" class="ml-3"></v-list-tile-sub-title>
                                </span>
                              </template>
                              <span>{{item.content}}</span>
                            </v-tooltip>
                          </v-card>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-list-tile-action-text>
                              {{ item.created_at }}
                            </v-list-tile-action-text>
                            <v-list-tile-action-text>
                              <a @click="tampilForm(item.id)">Balas</a>
                            </v-list-tile-action-text>
                          </v-list-tile-action>
                        </v-list-tile>
                        <div v-if="item.nested.length">
                          <div v-for="comments in item.nested">
                            <v-divider class="ml-4"></v-divider>
                            <v-list-tile class="ml-4">
                              <v-list-tile-content style="overflow-x:auto">
                                <v-card flat>
                                  <v-list-tile-title v-html="comments.nested_name" class="ml-3"></v-list-tile-title>
                                  <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                      <span v-on="on">
                                        <v-list-tile-sub-title v-html="comments.nested_content" class="ml-3"></v-list-tile-sub-title>
                                      </span>
                                    </template>
                                    <span>{{comments.nested_content}}</span>
                                  </v-tooltip>
                                </v-card>
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <!-- <v-list-tile-action-text>
                                  {{ comments.nested }}
                                </v-list-tile-action-text> -->
                                <!-- <v-list-tile-action-text>
                                  <a @click="tampilForm(item.id)">Balas</a>
                                </v-list-tile-action-text> -->
                              </v-list-tile-action>
                            </v-list-tile>
                          </div>
                        </div>
                            <v-container class="text-xs-center" v-show="forumId==item.id">
                              <v-form @submit.prevent="kirimKomentar" ref="formKomentar">
                                <v-textarea name="input" v-model="body_balas" label="Tulis Balasan" hint="Isi balasan anda disini."></v-textarea>
                                <div class="justify-end">
                                  <v-btn :loading="loading_balas" :disabled="!formIsValidBalas" color="#2c3e50" class="white--text" @click="kirimKomentar">Kirim Balasan</v-btn>
                                </div>
                              </v-form>
                            </v-container>
                        <v-divider></v-divider>
                      </template>
                    </v-list>
                    <v-container class="text-xs-center">
                      <v-form @submit.prevent="kirimPertanyaan" ref="form">
                        <v-textarea name="input-7-1" v-model="body" label="Tulis Pertanyaan" hint="Isi pertanyaan anda disini." :rules="[rules_body.required]"></v-textarea>
                        <div class="justify-end">
                          <v-btn :loading="loading" :disabled="!formIsValid" color="#2c3e50" class="white--text" @click="kirimPertanyaan">Kirim Pertanyaan</v-btn>
                        </div>
                      </v-form>
                    </v-container>
                    <v-layout class="justify-center">
                    </v-layout>
                  </v-flex>
                </v-layout>
                </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>

	  </v-layout>
	</v-container>
  </div>
</div>
</template>

<script>
	import axios from 'axios'

    export default {
    	data() {
    		return {
    			load_data: true,
    			post: '',
    			forums: [],
          myname: "",
          myid: "",
          body: "",
          body_balas: "",
          rules_body: {
            required: value => !!value || 'Required.',
          },
          forumId: null,
          loading: false,
          loading_balas: false
    		}
    	},

    	methods: {
        tampilForm(id){
          if(this.forumId==null){
            this.forumId = id
          }else if(this.forumId!=id){
            this.forumId = id
          }else{
              this.forumId = null
          }
        },
    		simpanFavorit(id){
        		axios.post('/cerepost/post/like/'+id)
        		.then(response => {
        			console.log(response)
					this.post.liked = true
					this.post.likes += 1
        		})
        		.catch(error =>{
        		    console.log(error)
        		})
		    },
		    hapusFavorit(id){
        		axios.delete('/cerepost/post/unlike/'+id)
        		.then(response => {
        			console.log(response)
        			this.post.liked = false
        			this.post.likes -= 1
        		})
        		.catch(error =>{
        		    console.log(error)
        		})
		    },
        kirimKomentar() {
          this.loading_balas=true
          axios.post('/cerepost/post/comment/'+this.$route.params.id, {
            univ_id : this.id,
            user_id : this.myid,
            comment_id : this.forumId,
            content : this.body_balas
          })
          .then(response => {
              this.loading_balas=false
              this.$swal('Sukses', 'Berhasil Mengirim Balasan...', 'success')
              
              // get again forum comment
              axios.get('/cerepost/post/comment/'+this.$route.params.id)
              .then(response => {
                  this.load_data = false
                  this.forums = response.data.data
              })
              .catch(error =>{
                  console.log(error)
              })

              this.body_balas = null
              this.$refs.form.reset()
            })
            .catch(error => {
              this.loading_balas=false
              this.$refs.form.reset()
              this.$swal('Oopps', 'Gagal Mengirim Balasan...', 'warning')
            })
        },
		    kirimPertanyaan() {
		      this.loading=true
		      axios.post('/cerepost/post/comment/'+this.$route.params.id, {
	      		content : this.body
		      })
		      .then(response => {
		          this.loading=false
		          this.$swal('Sukses', 'Berhasil Mengirim Pertanyaan...', 'success')
		          
		          // get again forum comment
		          axios.get('/cerepost/post/comment/'+this.$route.params.id)
		          .then(response => {
		              this.load_data = false
		              this.forums = response.data.data
		          })
		          .catch(error =>{
		              console.log(error)
		          })

		      	  this.body = null
		          this.$refs.form.reset()
		        })
		        .catch(error => {
		          this.loading=false
		          this.$refs.form.reset()
		          this.$swal('Oopps', 'Gagal Mengirim Pertanyaan...', 'warning')
		        })
		    },
    	},

    	created() {
    		axios.get('/cerepost/post/show/'+this.$route.params.id)
            .then(response => {
            	console.log(response)
            	this.post = response.data.data[0]
                this.load_data = false
            })
            .catch(error =>{
                console.log(error)
            })

            axios.get('/cerepost/post/comment/'+this.$route.params.id)
            .then(response => {
            	console.log(response)
            	this.forums = response.data.data
                this.load_data = false
            })
            .catch(error =>{
                console.log(error)
            })
    	},

    	computed: {
        	formIsValid() {
        	  return (
        	    this.body
        	  )
        	},
          formIsValidBalas() {
            return (
              this.body_balas
            )
          },
        }
	}
</script>