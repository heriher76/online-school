<template>
  <div class="kelola-pelajaran">
    
		<!-- content -->
		<v-container fluid>
				<v-layout row wrap>
					<v-flex xs12 sm12 md3>
    					<sidebarGuru />
					</v-flex>
					<v-flex xs12 sm12 md9>
              <v-card-text style="padding-top:0">
              <v-toolbar
                card
                color="#353b48" 
                dark
              >
                <v-toolbar-title>List Quiz</v-toolbar-title>
              </v-toolbar>

              <v-card>
              	<v-dialog v-model="tambahBab" persistent max-width="600px">
	              <template v-slot:activator="{ on }">
	                <v-btn color="primary" dark v-on="on">Tambah Quiz</v-btn>
	              </template>
	              <v-card>
	                <v-card-title>
	                  <span class="headline">Tambah Quiz</span>
	                </v-card-title>
	                <v-card-text>
	                  <v-container grid-list-md>
	                    <v-layout wrap>
	                      <v-flex xs12 sm6 md12>
	                        <v-text-field v-model="title" label="Judul Quiz *" required></v-text-field>
	                      </v-flex>
	                    </v-layout>
	                  </v-container>
	                  <small>*indicates required field</small>
	                </v-card-text>
	                <v-card-actions>
	                  <v-spacer></v-spacer>
	                  <v-btn color="blue darken-1" flat @click="tambahBab = false">Tutup</v-btn>
	                  <v-btn color="blue darken-1" flat @click="submitQuiz">Tambah</v-btn>
	                </v-card-actions>
	              </v-card>
	            </v-dialog>

                <v-data-table
                    :headers="headers"
                    :items="quizs"
                    class="elevation-1"
                >
                    <template v-slot:items="props">
                    <td>{{ props.item.no }}</td>
                    <td>{{ props.item.title }}</td>
                    <td>{{ props.item.section }}</td>
                    <td>
                    	<v-btn color="blue" :to="'/guru/cerevid/detail-pelajaran/'+$route.params.id+'/quiz/'+props.item.no">
                          <v-icon color="white--text">visibility</v-icon>
                          <span class="pa-1 white--text">Lihat</span>
                        </v-btn>
                        <v-btn color="red">
                          <v-icon color="white--text">delete</v-icon>
                          <span class="pa-1 white--text">Hapus</span>
                        </v-btn>
                    </td>
                    </template>
                </v-data-table>
            </v-card>

            </v-card-text>
					</v-flex>
				</v-layout>
		</v-container>
		<!-- end scontent -->
	</div>
</template>

<script>
	import sidebarGuru from '../../components/cerevid-component/sidebarGuru'
	import axios from 'axios'

	export default {
		name:"cerevid_list_quiz",
		components:{
			sidebarGuru
		},
    data () {
      return {
        title: '',
        konten: '',
        right: null,
        tambahBab: false,
        headers: [
            { text: 'No', value: 'no' },
            { text: 'Judul', value: 'title' },
            { text: 'Section', value: 'section' },
            { text: 'Action', value: 'aksi' }
        ],
        quizs: [
            {
            	no: '1',
                title: 'Quiz Pertama',
                section: 'Dasar Programming'
            },
            {
            	no: '2',
                title: 'Quiz Kedua',
                section: 'Dasar Programming'
            }
        ]
      }
	},
	methods: {
        submitQuiz(){
          this.tambahBab = false;

          axios.defaults.headers = {   
            'Authorization': 'Bearer ' + this.$store.state.token 
          }
          axios.post('http://api.ceredinas.id/api/sections/'+this.$route.params.idSection+'/quiz/create', {
            title: this.title
          })
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }
    }
  }
</script>
