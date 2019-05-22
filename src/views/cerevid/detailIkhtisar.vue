<template>
	<div class="ikhtisar">
		<headerDetail />
		<v-container>
		    
		    <menuPelajaran/>
		    
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
	import menuPelajaran from '../../components/cerevid-component/menuPelajaran'
	export default {
		name:"ikhtisar",
		components:{
			headerDetail,
			menuPelajaran
		}
	}
</script>
