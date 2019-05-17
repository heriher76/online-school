<template>
	<div class="daftar-pelajaranku">
		<!-- sub - navbar -->
		<subNavbar />
		<!-- end sub - navbar -->
		<!-- content -->
		<v-container>
		    <p class="display-1 text-uppercase font-weight-light">
		      <v-layout row wrap pa-3>

		        <v-flex xs12 sm8 md8>
		          Daftar Pelajaran
		        </v-flex>
		        <v-flex xs12 sm4 md4>
	                <v-text-field
	                    label="Cari Pelajaran..."
	                    append-icon="search"
	                  >
	                </v-text-field>
		        </v-flex>
		      </v-layout>
		    </p>
		    <v-container
		      fluid
		      grid-list-md
		    >
		      <v-layout row wrap fill-height>
		        <v-flex xs12 sm6 md3 v-for="i in 2" :key="`3${i}`" xs3>
		          <v-card>
		            <v-img
		              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
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
		                  <router-link to="/cerevid/detail-pelajaran/ikhtisar" style="text-decoration: none;">Ilmu Hukum</router-link>
		                </div>
		                <span class="grey--text">John Doe, Ph.D</span>
		              </div>
		            </v-card-title>
					<div class="text-xs-center mt-1">
					    <v-rating
					    	v-model="rating"
					        color="yellow darken-3"
					        background-color="grey darken-1"
					        half-increments
					        readonly
						>
						</v-rating>
						<span class="caption mr-2">
						   {{rating}} (30)
					    </span>
					</div>
					<v-spacer></v-spacer>
		            <v-card-actions>
		              <v-spacer></v-spacer>
		              <span class="text-uppercase">Ikhtisar</span>
		              <v-btn icon @click="show = !show">
		                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
		              </v-btn>
		            </v-card-actions>

		            <v-slide-y-transition>
		              <v-card-text v-show="show">
		                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
		              </v-card-text>
		            </v-slide-y-transition>
		          </v-card>
		        </v-flex>
		      </v-layout>
		    </v-container>
		</v-container>
		<!-- end scontent -->
	</div>
</template>
<script>
	import subNavbar from '../../components/cerevid-component/subNavbar'
	export default {
		name:"daftar-pelajaranku",
		components:{
			subNavbar,
		}
	}
</script>
