<template>
    <div class="informasi">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md8 sm12 xs12>
                        <v-layout row wrap>
                            <v-flex md12 sm12 xs12>
                                <v-card style="padding:10px 20px;" color="#B71C1C" dark>
                                    <h6 class="title">DETAIL UNIVERSITAS</h6>
                                </v-card>
                            </v-flex>
                            <v-flex md12 sm12 xs12>
                                <div v-show="load_data" style="margin:10px auto; width:5%;">
                                    <v-progress-circular
                                    :size="40"
                                    color="primary"
                                    indeterminate
                                    ></v-progress-circular>
                                </div>

                                <div>
                                    <v-layout row wrap="" style="border-bottom:1px solid grey; padding:10px 0px">
                                        <v-flex md5 sm12 xs12>
                                            <div class="image_info">
                                                <v-img
                                                    v-bind:src="this.link_image"
                                                    height="300"
                                                    class="grey darken-4"
                                                ></v-img>
                                            </div>
                                        </v-flex>

                                        <v-flex md7 sm12 xs12>
                                            <div style="margin: 0px 25px">
                                                <h5 style="color:black;text-transform:capitalize" class="headline">{{this.name}}</h5>
                                                <p>{{this.description}}</p>
												
	                                            <v-icon style="float: left;">home</v-icon><p style="float: left;">{{this.address}}</p>
                                                <br><br>
                                                <v-icon style="float: left;">phone</v-icon><p>{{this.phone}}</p>
                                            </div>
                                        </v-flex>                      
                                    </v-layout>
                                </div>
                            </v-flex>
                            
                            <v-flex md12>
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
                                                  <v-list-tile-title v-html="item.user.name" class="ml-3"></v-list-tile-title>
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
                </v-flex>
                
                <v-flex md4 sm12 xs12>
                    <div>
                        <div style="margin:0px 15px">
                            <div style="margin:10px 22px">
                                <h6 class="title">FAKULTAS</h6>
                            </div>
                            <ol class="side_bar">
                                <v-divider></v-divider>
                                <div v-show="load_data" style="margin:10px auto; width:5%;">
                                    <v-progress-circular
                                    :size="30"
                                    color="primary"
                                    indeterminate
                                    ></v-progress-circular>
                                </div>
                                <li v-for="(faculty, index) in faculties" :key="faculty.id" style="margin-left: 15px; margin-top: 10px;">
                                    <b>{{faculty.name}}</b>
                                    <ol class="side_bar">
                                        <li v-for="(department, i) in faculty.department" :key="department.id">
                                            <router-link :to="{ name: 'cerejur_detail_jurusan', params: { name: department.name, capacity: department.capacity, description: department.description, video_url: department.video_url, interrested_num: department.interrested_num, passing_grade: department.passing_grade, id: department.id, list_faculty: faculties } }" style="cursor: pointer;">{{department.name}}</router-link>
                                        </li>
                                        <br>
                                    </ol>
                                </li>
                                
                            </ol>
                        </div>

                    </div>
                </v-flex>
            </v-layout>

        </v-container>
        
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
    	props: ['name', 'address', 'description', 'link_image', 'phone', 'id'],

        data() {
            return{
                load_data:true,    
                faculties:[],
                forums:[],
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
		    kirimKomentar() {
		      this.loading_balas=true
		      axios.post('/cerejur/forum', {
		      	univ_id : this.id,
	      		user_id : this.myid,
	      		comment_id : this.forumId,
	      		content : this.body_balas
		      })
		      .then(response => {
		          this.loading_balas=false
		          this.$swal('Sukses', 'Berhasil Mengirim Balasan...', 'success')
		          
		          // get again forum comment
		          axios.get('/cerejur/forum/'+this.id)
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
		      axios.post('/cerejur/forum', {
		      	univ_id : this.id,
	      		user_id : this.myid,
	      		comment_id : null,
	      		content : this.body
		      })
		      .then(response => {
		          this.loading=false
		          this.$swal('Sukses', 'Berhasil Mengirim Pertanyaan...', 'success')
		          
		          // get again forum comment
		          axios.get('/cerejur/forum/'+this.id)
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

        created(){
        	axios.get('/auth/user')
            .then(response => {console.log(response)
                this.load_data = false
                this.myname = response.data.data.name
                this.myid = response.data.data.id
            })
            .catch(error =>{
                console.log(error)
            })

            axios.get('/cerejur/faculty/'+this.id)
            .then(response => {console.log(response)
                this.load_data = false
                this.faculties = response.data.data
            })
            .catch(error =>{
                console.log(error)
            })

            axios.get('/cerejur/forum/'+this.id)
            .then(response => {console.log(response)
                this.load_data = false
                this.forums = response.data.data
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

<style>
	.side_bar li{
	    list-style: circle;
	}

	.side_bar li a{
	    color: black;
	}
    /* .image-info{
        height:180px;
        width:260px;
    }
    
    @media only screen and (max-width: 1080px) {
        
        .image-info{
            display: none
        }
    
    } */

</style>
