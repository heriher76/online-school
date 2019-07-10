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
												:headers="headers"
    										:items="dataHistoryChatGuru.data"
			                  class="elevation-1"
			                >
			                	<template v-slot:items="props">
									<tr v-if="props.item.teacher.teacher_id==userId">
				                		<td>{{props.index+1}}</td>
					                	<td>{{props.item.student.student_name}}</td>
					                	<td>{{props.item.student.student_class}}</td>
					                	<td>{{props.item.rating}}</td>
					                	<td>{{props.item.review}}</td>
									</tr>
				                </template>
			                </v-data-table>
			            </v-card>
									<div v-for="data in dataHistoryChatRunningGuru.data">
			                <v-btn color="red" class="white--text" @click="accept()">
												Anda memiliki chat aktif, Klik untuk Lanjutkan Chat
											</v-btn>
									</div>
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
          pelajaran: 'Pelajaran Bahasa Inggris',
	        headers:[
						{text:'No.',value:'index'},
						{text:'Nama Murid',value:'student_name'},
						{text:'Kelas Murid',value:'student_class'},
						{text:'Rating',value:'rating'},
						{text:'Review',value:'review'},
					],
        }),
        methods: {
	          getHistoryChatGuru(){
	            this.$store.dispatch('getHistoryChatGuru')
	            .then(response => {
	            })
	          },
						getHistoryChatRunningGuru(){
	            this.$store.dispatch('getHistoryChatRunningGuru')
	            .then(response => {
	            })
	          },
	          show () {
	          	this.$modal.show('consult');
	          },
	          accept () {
	          	return this.$router.push({path:'/guru/cerecall/chat/'})
	          },
	          hide () {
	            this.$modal.hide('consult');
	          }
        },
				created(){
					this.getHistoryChatGuru()
					this.getHistoryChatRunningGuru()
				},
				computed:{
		        dataHistoryChatGuru(){
		          return this.$store.state.dataHistoryChatGuru || {}
		        },
						dataHistoryChatRunningGuru(){
		          return this.$store.state.dataHistoryChatRunningGuru || {}
		        },
			      userId(){
			        return this.$store.state.dataUser || {}
			      },
				}
    }
</script>
