<template>
	<div class="profilPengajar">
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
		      <v-container fluid>
		      	<v-flex  style="margin:0px 20px;">
			      	<div class="headline">
			            <div>Profil Pengajar</div>
			        </div>
			        <v-container grid-list-md>
			            <v-layout row wrap>
			            	<v-flex xs12 sm4 md3>
								<v-list-tile-avatar size="100" class="ml-2">
									<img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
				                </v-list-tile-avatar>
				                <v-layout row wrap class="my-3">
				                	<v-icon>book</v-icon>
				                	<div class="subheading pl-2">20 Pelajaran</div>
				                </v-layout>
					        </v-flex>
			            	<v-flex xs12 sm8 md9>
			            		<div class="headline">
			            			Arnold Bann
			            		</div>
			            		<div class="subheading font-weight-normal pb-2 pl-2">
			            			Web Developer
			            		</div>
			            		<div>
						        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						    	</div>
			            		<div>
						        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						    	</div>
					        </v-flex>
				        </v-layout>
			        </v-container>
		    	</v-flex>
		      </v-container>
		    </v-card>
		</v-container>
	</div>
</template>
<script>
	import headerDetail from '../../components/cerevid-component/headerDetail'
	export default {
		name:"profilPengajar",
		components:{
			headerDetail,
		}
	}
</script>
