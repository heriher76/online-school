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
	                        <v-text-field label="Judul Quiz *" required></v-text-field>
	                      </v-flex>
	                    </v-layout>
	                  </v-container>
	                  <small>*indicates required field</small>
	                </v-card-text>
	                <v-card-actions>
	                  <v-spacer></v-spacer>
	                  <v-btn color="blue darken-1" flat @click="tambahBab = false">Tutup</v-btn>
	                  <v-btn color="blue darken-1" flat @click="tambahBab = false">Tambah</v-btn>
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
        btn_load: false,
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
        submit(){
          // this.btn_load = true;

          // let data = new FormData();
          // data.append('cover', this.dataDetailPelajaran.data.cover);
          // data.set('title', this.dataDetailPelajaran.data.title);
          // data.set('description', this.dataDetailPelajaran.data.description);
          // data.set('curriculum', this.dataDetailPelajaran.data.curriculum);
          // data.set('lesson_id', this.dataDetailPelajaran.data.lesson_id);
          // data.set('user_id', this.dataDetailPelajaran.data.dataUser);

          // axios.defaults.headers = {  
          //   'Content-Type': 'multipart/form-data',  
          //   'Authorization': 'Bearer ' + this.$store.state.token 
          // }
          // axios.put('http://api.ceredinas.id/api/courses/'+this.$route.params.id, data)
          // .then(response => {
          //   this.btn_load = false;
          //   console.log(response.data)
          // })
          // .catch(error => {
          //   this.btn_load = false;
          //   console.log(error)
          // })
        }
    }
  }
</script>
