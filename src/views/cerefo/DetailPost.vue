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
        <v-flex xs12 sm12 md8 style="padding-top: 15px;" v-show="!load_data">
          <v-toolbar color="#34495e" dark flat>
            <v-list-tile>
              <v-list-tile-title>{{this.post.title}}</v-list-tile-title>
            </v-list-tile>
          </v-toolbar>
          <v-card style="position: relative;width:100%;padding-bottom: auto;">

            <div style="margin-left: 10px;">
              <p>{{this.post.content}}</p>
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
        <br>
        <v-flex xs12 sm12 md4 v-show="!load_data">
          <v-card-text>
            <v-layout justify-center style="position: relative;width:100%;height:0;padding-bottom: 45%;">
              <iframe :src="'https://www.youtube.com/embed/'+this.post.video" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </v-layout>
          </v-card-text>
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
    			post: ''
    		}
    	},

    	methods: {
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
    	}
	}
</script>