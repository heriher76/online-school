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
			            	<div v-if="dataTeacherPerformance.data">
			            		<v-card-title>
				            		<div v-if="dataTeacherPerformance.data.photo_url">
								        <v-img
								          height="50"
								          width="50"
								          :src="dataTeacherPerformance.data.photo_url"
								        />
				            		</div>
				            		<div v-else>
								        <v-img
								          height="50"
								          width="50"
								          :src="require('@/assets/images/cerebrum.png')"
								        />
				            		</div>
				            		<h2 class="ml-4">{{dataTeacherPerformance.data.name}}</h2>
				            		<v-spacer></v-spacer>
				            		<div style="text-align: center;">
								        <v-rating
								          v-model="rating"
								          color="yellow darken-3"
								          background-color="grey darken-1"
								          empty-icon="$vuetify.icons.ratingFull"
								          half-increments
								          readonly
								        ></v-rating>
	    							</div>
				            		<h2 class="mx-2">{{dataTeacherPerformance.data.rating}}</h2>
				            	</v-card-title>
				            	<v-divider></v-divider>
				            	<v-card-text>
				            		<h3>Pendapatan : {{dataTeacherPerformance.data.coin}} Coin</h3>
				            		<h3>Banyak Konsultasi : {{dataTeacherPerformance.data.number_consultation}} Siswa</h3>
				            	</v-card-text>
				            	<v-divider></v-divider>
				            	<v-card-text>
				            		<v-spacer></v-spacer>
				            		<div v-if="user.status==1">
				            			<v-btn @click="changeTeacherStatus" color="green" class="white--text">Nonaktifkan Cerecall</v-btn>
				            		</div>
				            		<div v-else>
				            			<v-btn @click="changeTeacherStatus" color="red" class="white--text">Aktifkan Cerecall</v-btn>
				            		</div>
				            	</v-card-text>
				            </div>
			           	</v-card>
			        </v-flex>
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
			            <v-tabs
					      v-model="active"
					      color="red"
					      dark
					      slider-color="white"
					    >
					      <v-tab ripple>
					        Konfirmasi
					      </v-tab>
					      <v-tab ripple>
					        Histori
					      </v-tab>
					      <v-tab-item>
					        <v-card flat>
					          <v-card-text v-if="realtime()">
					          	<v-toolbar flat color="white">
			                    <v-toolbar-title>Konfirmasi Murid</v-toolbar-title>
				                </v-toolbar>
				                <v-data-table
									:headers="headers_konfirmasi"
	    							:items="dataTeacherConfirm.data"
				                    class="elevation-1"
				                >
				                	<template v-slot:items="props">
										<tr >
						                	<td>{{props.index+1}}</td>
					                		<td>{{props.item.student.student_name}}</td>
						                	<td>{{props.item.student.student_class}}</td>
						                	<td>{{props.item.lesson}}</td>
						                	<td>
						                		<div>
    												<v-btn color="green" class="white--text" @click="changeStatusHistoryCall(2)">Terima</v-btn>
    												<v-btn color="red" class="white--text" @click="changeStatusHistoryCall(3)">Tolak</v-btn>
						                		</div>
						                	</td>
										</tr>
					                </template>
				                </v-data-table>
					          </v-card-text>
					        </v-card>
					      </v-tab-item>
					      <v-tab-item>
					        <v-card flat>
					          <v-card-text>
					          	<v-toolbar flat color="white">
			                    <v-toolbar-title>Riwayat Chat</v-toolbar-title>
				                </v-toolbar>
				                <v-data-table
									:headers="headers_history"
	    							:items="dataHistoryChatGuru.data"
				                    class="elevation-1"
				                >
				                	<template v-slot:items="props">
										<tr v-if="props.item.teacher.teacher_id==userId">
					                		<td>{{props.index+1}}</td>
						                	<td>{{props.item.student.student_name}}</td>
						                	<td>{{props.item.student.student_class}}</td>
						                	<td>{{props.item.lesson}}</td>
						                	<td>{{props.item.rating}}</td>
						                	<td>{{props.item.review}}</td>
						                	<td>
						                		<div v-if="props.item.status==4">
    												<v-chip color="green" text-color="white">Selesai</v-chip>
						                		</div>
						                		<div v-else-if="props.item.status==1">
    												<v-chip color="blue" text-color="white">Diproses</v-chip>
						                		</div>
						                		<div v-else>
    												<v-chip color="red" text-color="white">Ditolak</v-chip>
						                		</div>

						                	</td>
										</tr>
					                </template>
				                </v-data-table>
					          </v-card-text>
					        </v-card>
					      </v-tab-item>
					    </v-tabs>
			                
			            </v-card>
						<div v-for="data in dataHistoryChatRunningGuru.data">
							<v-card-text style="text-align: center;">
								<h4>Anda memiliki chat aktif...</h4>
				                <v-btn color="red" class="white--text" @click="accept()">
									Lanjutkan Chat
								</v-btn>
							</v-card-text>	
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
  	import axios from 'axios'

  	Vue.use(VModal)

	export default {
        name: 'dashboard',
        components: {
            SideBar
        },
        data: () => ({
          rating:0,
          active: null,
          status: false,
          chatActive: false,
          confirm: 0,
          user: [],
          siswa:'heri',
          pelajaran: 'Pelajaran Bahasa Inggris',
	        headers_konfirmasi:[
						{text:'No.',value:'index'},
						{text:'Nama Murid',value:'student_name'},
						{text:'Kelas Murid',value:'student_class'},
						{text:'Pelajaran',value:'pelajaran'},
						{text:'Aksi',value:'aksi'},
					],
	        headers_history:[
						{text:'No.',value:'index'},
						{text:'Nama Murid',value:'student_name'},
						{text:'Kelas Murid',value:'student_class'},
						{text:'Pelajaran',value:'pelajaran'},
						{text:'Rating',value:'rating'},
						{text:'Review',value:'review'},
						{text:'Status',value:'status'},
					],
        }),
        methods: {
	          changeTeacherStatus(){
	          	if(this.user.status==1){
		            this.$store.dispatch('changeStatusTeacher',{status:'0'})
		            .then(response => {
		            })
		            this.getUser()
	        	}else{
		            this.$store.dispatch('changeStatusTeacher',{status:'1'})
		            .then(response => {
		            })
		            this.getUser()
	        	}
	          },
	          changeStatusHistoryCall(s){
		        this.$store.dispatch('changeStatusHistoryCall',{status:s,id:this.confirm})
		        .then(response => {
		        	this.$router.push({path:'/guru/cerecall/chat/'})
		        })
	          },
	          getTeacherPerformance(){
	            this.$store.dispatch('getTeacherPerformance')
	            .then(response => {
	            })
	          },
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
			  getTeacherConfirm(){
	            this.$store.dispatch('getTeacherConfirm')
	            .then(response => {
	            })
	          },
			  realtime(){
			  	this.getTeacherConfirm()
				return true
			  },
	          show () {
	          	this.$modal.show('consult');
	          },
	          accept () {
	          	return this.$router.push({path:'/guru/cerecall/chat/'})
	          },
	          hide () {
	            this.$modal.hide('consult');
	          },
	          getUser(){
			      axios.get('/auth/user')
			      .then(response => {
			        this.user = response.data.data
			      })
			      .catch(error => {
			        console.log(error)
			      })
	          }
        },
				created(){
					this.getTeacherPerformance()
					this.getHistoryChatGuru()
					this.getHistoryChatRunningGuru()
					this.getTeacherConfirm()
					this.getUser()
				},
				computed:{
		        dataTeacherPerformance(){
		          if(this.$store.state.dataTeacherPerformance.data){
		          	this.rating = parseFloat(this.$store.state.dataTeacherPerformance.data.rating)
		          	this.status = this.$store.state.dataTeacherPerformance.status
		          }
		          return this.$store.state.dataTeacherPerformance || {}
		        },
		        dataHistoryChatGuru(){
		          return this.$store.state.dataHistoryChatGuru || {}
		        },
				dataHistoryChatRunningGuru(){
		          if(this.$store.state.dataHistoryChatRunningGuru.data){
		          	this.chatActive = true
		          }else{
		          	this.chatActive = false
		          }
		          return this.$store.state.dataHistoryChatRunningGuru || {}
		        },
				dataTeacherConfirm(){
					if(this.$store.state.dataTeacherConfirm.data)
			          if(this.$store.state.dataTeacherConfirm.data.length){
			          	this.confirm = this.$store.state.dataTeacherConfirm.data[0].id
			          }
		          return this.$store.state.dataTeacherConfirm || {}
		        },
			      userId(){
			        return this.$store.state.dataUser || {}
			      },
				}
    }
</script>
