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
                <v-toolbar-title>List Pertanyaan</v-toolbar-title>
              </v-toolbar>

              <v-card>
              	<v-dialog v-model="tambahBab" persistent max-width="600px">
	              <template v-slot:activator="{ on }">
	                <v-btn color="primary" dark v-on="on">Tambah Pertanyaan</v-btn>
	              </template>
	              <v-card>
	                <v-card-title>
	                  <span class="headline">Tambah Pertanyaan</span>
	                </v-card-title>
	                <v-card-text>
	                  <v-container grid-list-md>
	                    <v-layout wrap>
	                      <v-flex xs12 sm6 md12>
	                        <v-text-field label="Pertanyaan *" required></v-text-field>
	                        <v-text-field label="Opsi A *" required></v-text-field>
	                        <v-text-field label="Opsi B *" required></v-text-field>
	                        <v-text-field label="Opsi C *" required></v-text-field>
	                        <v-text-field label="Opsi D *" required></v-text-field>
	                        <v-select
					          :items="corrects"
					          label="Jawaban Benar *"
					        ></v-select>
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
                    <td>{{ props.item.a }}</td>
                    <td>{{ props.item.b }}</td>
                    <td>{{ props.item.c }}</td>
                    <td>{{ props.item.d }}</td>
                    <td>{{ props.item.jawaban }}</td>
                    <td>{{ props.item.quiz }}</td>
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
		name:"cerevid_list_pertanyaan",
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
        corrects: ['A', 'B', 'C', 'D'],
        headers: [
            { text: 'No', value: 'no' },
            { text: 'Option A', value: 'a' },
            { text: 'Option B', value: 'b' },
            { text: 'Option C', value: 'c' },
            { text: 'Option D', value: 'd' },
            { text: 'Jawaban', value: 'jawaban' },
            { text: 'Quiz', value: 'quiz' },
            { text: 'Action', value: 'aksi' }
        ],
        quizs: [
            {
            	no: '1',
                a: 'betul',
                b: 'betuls',
                c: 'betulss',
                d: 'betulsss',
                jawaban: 'A',
                quiz: 'Apakah sia?'
            },
            {
            	no: '2',
                a: 'sebetul',
                b: 'sebetuls',
                c: 'sebetulss',
                d: 'sebetulsss',
                jawaban: 'B',
                quiz: 'Siapa anda?'
            },
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
