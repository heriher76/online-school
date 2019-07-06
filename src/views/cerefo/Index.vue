<template>
	<div class="informasi">
	    <v-container grid-list-md>
	        <v-layout row wrap>
	            <v-flex md3 sm12 xs12>
	                <div>
	                    <div>
	                        <v-flex md12 sm12 xs12 style="margin-top: -4px;">
	                            <v-card style="padding:10px 20px;" color="#B71C1C" dark>
	                                <h6 class="title">KATEGORI</h6>
	                            </v-card>
	                        </v-flex>
	                        <ul class="side_bar">
	                            <v-divider></v-divider>
	                            <div v-show="load_data" style="margin:10px auto; width:5%;">
	                                <v-progress-circular
	                                :size="30"
	                                color="primary"
	                                indeterminate
	                                ></v-progress-circular>
	                            </div>
	                            <v-btn color="default" @click="allPost" style="border-radius: 10%;">Semua</v-btn>
	                            <v-btn v-for="category in this.categories" @click="allPostById(category.id)" color="default" style="border-radius: 10%;">{{category.cerepost_name}}</v-btn>
	                        </ul>
	                    </div>

	                </div>
	            </v-flex>

	            <v-flex md9 sm12 xs12>
	                    <v-layout row wrap>
	                        <v-flex md12 sm12 xs12>
	                            <v-card style="padding:10px 20px;" color="#B71C1C" dark>
	                                <h6 class="title">CEREFO TODAY</h6>
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

	                            <div v-for="post in posts" :key="post.id">
	                                <v-layout row wrap="" style="border-bottom:1px solid grey; padding:10px 0px">
	                                    <v-flex md5 sm12 xs12>
	                                        <div class="image_info">
	                                            <v-img
	                                                v-bind:src="post.image"
	                                                height="180"
	                                                class="grey darken-4"
	                                            ></v-img>
	                                        </div>
	                                    </v-flex>

	                                    <v-flex md7 sm12 xs12>
	                                        <div style="margin: 0px 25px">
	                                        	<label>{{post.created_at}}</label>
	                                            <h5 style="color:black;text-transform:capitalize" class="headline">{{post.title}}</h5>
	                                            <p v-if="post.content.length<350">{{post.content}}</p>
	                                            <p v-else>{{post.content.substring(0,350)+"..."}}</p>
	                                            <router-link :to="{name: 'cerefo_detail_post', params: {id: post.id, data: post} }">Baca Selanjutnya >></router-link>
												<br>
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
	                                                  <v-btn :to="{ name: 'cerefo_detail_post', params: {id: post.id}}" fab dark small style="opacity:0.85; float: left;" @click="simpanFavorit(post.id)">
	                                                  	{{post.comments}}
                                                        <v-icon dark>chat_bubble_outline</v-icon>
                                                      </v-btn>
	                                                </div>
	                                            </v-flex>
	                                        </div>
	                                    </v-flex>                      
	                                </v-layout>
	                            </div>
	                        </v-flex>
	                    </v-layout>
	            </v-flex>

	        </v-layout>
	    </v-container>
	    
	</div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return{
                load_data:true,
                posts:[],
                categories: []
            }
        },

        methods: {
        	allPost() {
        		this.load_data = true
        		axios.get('/cerepost/post')
        		.then(response => {
        			console.log(response)
        			this.posts = response.data.data
        		    this.load_data = false
        		})
        		.catch(error =>{
        		    console.log(error)
        		})
        	},
        	allPostById(id) {
        		this.load_data = true
        		axios.get('/cerepost/post/'+id)
        		.then(response => {
        			console.log(response)
        			this.posts = response.data.data
        		    this.load_data = false
        		})
        		.catch(error =>{
        		    console.log(error)
        		})
        	},
		    simpanFavorit(id){
        		axios.post('/cerepost/post/like/'+id)
        		.then(response => {
        			console.log(response)
        			this.posts.map(post => {
        				if(post.id == id) {
        					post.liked = true
        					post.likes += 1
        				}
        			})
        		})
        		.catch(error =>{
        		    console.log(error)
        		})
		    },
		    hapusFavorit(id){
        		axios.delete('/cerepost/post/unlike/'+id)
        		.then(response => {
        			console.log(response)
        			this.posts.map(post => {
        				if(post.id == id) {
        					post.liked = false
        					post.likes -= 1
        				}
        			})
        		})
        		.catch(error =>{
        		    console.log(error)
        		})
		    },
        },

        created(){
            this.allPost();

            axios.get('/cerepost')
            .then(response => {
            	console.log(response)
            	this.categories = response.data.data
                this.load_data = false
            })
            .catch(error =>{
                console.log(error)
            })
        }
        
    }
</script>

<style>
    .side_bar li{
        list-style: circle;
    }

    .side_bar li a{
        text-decoration: none;
        color: black;
    }
</style>