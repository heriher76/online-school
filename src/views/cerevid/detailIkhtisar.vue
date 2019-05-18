<template>
	<div class="ikhtisar">
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
			        	<div>
			      	    	<div class="headline">
			              	    <div>Bahasa PHP dilengkapi tutorial 2019</div>
			                </div>
			            	<v-container>
			            		<v-layout>
			            			<v-flex>
						            	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						            	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						            	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						            	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						            	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						            	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					            	</v-flex>
				            	</v-layout>
			            	</v-container>
			      	    </div>
			      	<v-layout class="justify-center">
		        		<v-btn color="#2c3e50" class="white--text" to="/cerevid/detail-pelajaran/materi" >Mulai Belajar</v-btn>
		    		</v-layout>
		    	</v-flex>
		      </v-container>
		    </v-card>
		</v-container>
	</div>
</template>
<script>
	import headerDetail from '../../components/cerevid-component/headerDetail'
	export default {
		name:"ikhtisar",
		components:{
			headerDetail,
		}
	}
</script>
