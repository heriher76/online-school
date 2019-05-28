<template>
	<div class="dashboard">

    <!-- sub content -->
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <!-- sidebar -->
        <v-flex md3 sm12 xs12>
            <v-card>
                <SideBar class="hidden-sm-and-down" style="float:left;"/>
            </v-card>
        </v-flex>
				
				<v-flex md9 sm12 xs12>
					<h1>CereCall Guru</h1>

			    	<v-flex md12>
			            <v-card>
			            	<modal name="consult" :height="200">
			            	  <center>
			            	  	<h1>Ada yang ingin konsultasi nih !</h1>
			            	  	<br>
			            	  	<h2>{{ siswa }}</h2>
			            	  	<p>{{ pelajaran }}</p>
			            	  	<br>
			            	  	<v-btn @click="accept" color="primary" depressed>Terima</v-btn>
			            	  	<v-btn @click="hide" color="warning" depressed>Tolak</v-btn>
			            	  </center>
			            	</modal>	
			                <v-toolbar flat color="white">
			                    <v-toolbar-title>Riwayat Chat</v-toolbar-title>
			                </v-toolbar>
			                <v-data-table
			                    class="elevation-1"
			                >
			                    <template>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    <td></td>
			                    </template>
			                </v-data-table>
			            </v-card>
			                <button @click="
			            		show
			            	">show dummy notification ? click here</button>
			        </v-flex>
			    </v-flex>
			</v-layout>
    </v-container>
    <!-- /sub content -->
	</div>
</template>

<script>
	import SideBar from '../../../components/guru/SideBar'
	import Vue from 'vue'
	import VModal from 'vue-js-modal'

  	Vue.use(VModal)
	
	export default {
        name: 'dashboard',
        components: {
            SideBar
        },
        data: () => ({
          siswa: 'Heri Hermawan',
          pelajaran: 'Pelajaran Bahasa Inggris'
        }),
        methods: {
          show () {
          	this.$modal.show('consult');
          },
          accept () {
          	return this.$router.push({path:'/guru/cerecall/chat'})
          },
          hide () {
            this.$modal.hide('consult');
          }
        }
    }
</script>