	<template>
		<v-container
	    id="about"
	    tag="section"
	  >
	    <p class="display-1 text-uppercase font-weight-light">
	      Featured
	    </p>
			<div class="subheading">(Berdasarkan Pelajaran)</div>
			<div v-for="post in datas">
		    <h4 class="font-weight-light"><v-icon>keyboard_arrow_right</v-icon>{{post.name}}</h4>
		    <v-container
		      fluid
		      grid-list-md
		    >
		      <v-layout row wrap fill-height>
		        <v-flex xs12 sm6 md3 v-for="pelajaran in post.courses">
		          <v-card>
		            <v-img
		              v-bind:src="'http://admin.ceredinas.id/public/cover/'+ pelajaran.cover"
		              height="200px"
		            >
		                <v-flex offset-xs9 align-end flexbox>
		                  <v-btn fab dark small color="pink" style="opacity:0.85;">
		                    <v-icon dark>favorite</v-icon>
		                  </v-btn>
		                </v-flex>
		            </v-img>

		            <v-card-title primary-title>
		              <div>
		                <div class="headline">
		                  <router-link v-bind:to="'/cerevid/detail-pelajaran/'+pelajaran.id" style="text-decoration: none;">{{pelajaran.title}}</router-link>
		                </div>
		                <span class="grey--text">{{pelajaran.teacher.name}}</span>
		              </div>
		            </v-card-title>
					<div class="text-xs-center mt-1">
					    <v-rating
					    	v-model="pelajaran.rating"
					        color="yellow darken-3"
					        background-color="grey darken-1"
					        half-increments
					        readonly
						>
						</v-rating>
						<span class="caption mr-2">

					  </span>
					</div>
					<v-spacer></v-spacer>
		            <v-card-actions>
		              <v-spacer></v-spacer>
		              <span class="text-uppercase">Deskripsi</span>
		              <v-btn icon @click="show = !show">
		                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
		              </v-btn>
		            </v-card-actions>

		            <v-slide-y-transition>
	                <v-card-text v-show="show">
	                  <v-divider class="mb-4"></v-divider>
	                  {{pelajaran.description}}
	                  <div class="subheading my-3">Kurikulum<v-divider></v-divider></div>
	                  {{pelajaran.curriculum}}
	                </v-card-text>
		            </v-slide-y-transition>
		          </v-card>
		        </v-flex>
		      </v-layout>
		    </v-container>
			</div>
	  </v-container>
	</template>
<script>
  export default {
    props: ['datas'],
    data: () => ({
      show: false,
    })
  }
</script>
