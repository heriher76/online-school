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
                          <v-text-field v-model="question" label="Pertanyaan *" required></v-text-field>
                          <v-text-field v-model="option_a" label="Opsi A *" required></v-text-field>
                          <v-text-field v-model="option_b" label="Opsi B *" required></v-text-field>
                          <v-text-field v-model="option_c" label="Opsi C *" required></v-text-field>
                          <v-text-field v-model="option_d" label="Opsi D *" required></v-text-field>
                          <v-select
                            v-model="correct_answer" 
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
                    <v-btn color="blue darken-1" flat @click="createQuestion">Tambah</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

                <v-data-table
                    :headers="headers"
                    :items="questions"
                    class="elevation-1"
                >
                  <template v-slot:items="props">
                  <td>{{ props.index + 1 }}</td>
                  <td>{{ props.item.option_a }}</td>
                  <td>{{ props.item.option_b }}</td>
                  <td>{{ props.item.option_c }}</td>
                  <td>{{ props.item.option_d }}</td>
                  <td>{{ props.item.correct_answer }}</td>
                  <td>{{ props.item.question }}</td>
                  <td>
                    <v-btn color="blue" :to="'/guru/cerevid/detail-pelajaran/'+$route.params.id+'/'+$route.params.idSection+'/quiz/'+props.item.id+'/question/'+props.item.id">
                        <v-icon color="white--text">visibility</v-icon>
                        <span class="pa-1 white--text">Lihat</span>
                      </v-btn>
                      <v-btn color="red" @click="deleteQuestion(props.item.id)">
                        <v-icon color="white--text">delete</v-icon>
                        <span class="pa-1 white--text">Hapus</span>
                      </v-btn>
                  </td>
                  </template>
              </v-data-table>

              <v-toolbar
                card
                color="#353b48" 
                dark
              >
                <v-toolbar-title>Edit Judul Quiz</v-toolbar-title>
              </v-toolbar>

              <form>
                <v-card-text style="background-color:#fff">
                  <v-text-field box v-model="title" label="Judul Quiz" value=""></v-text-field>
                  
                  <v-divider></v-divider>
                  <v-card-actions style="background-color:#fff">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      depressed
                      @click="submit" 
                      :loading="btn_load" 
                    >
                      Simpan
                    </v-btn>
                  </v-card-actions>
                </v-card-text>
              </form>

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
		name:"cerevid_detail_quiz",
		components:{
			sidebarGuru
		},
    data () {
      return {
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: '',
        currentItem: '',
        title: '',
        questions: [],
        right: null,
        btn_load: false,
        tambahBab: false,
        corrects: ['A', 'B', 'C', 'D'],
        headers: [
            { text: 'No', value: 'no' },
            { text: 'Option A', value: 'option_a' },
            { text: 'Option B', value: 'option_b' },
            { text: 'Option C', value: 'option_c' },
            { text: 'Option D', value: 'option_d' },
            { text: 'Jawaban', value: 'correct_answer' },
            { text: 'Pertanyaan', value: 'question' },
            { text: 'Action', value: 'aksi' }
        ]
      }
	},
    created() {
      axios.get('http://api.ceredinas.id/api/sections/'+this.$route.params.idSection+'/quiz/'+this.$route.params.idQuiz)
        .then(response => {
          this.questions = response.data.data.question
          console.log(this.questions)
        })
        .catch(error => {
          console.log(error)
        })
    },
    watch: {
      correct_answer (newVal) {
        this.correct_answer= newVal
      }
    },
	   methods: {
        createQuestion() {
          this.tambahBab = false

          axios.defaults.headers = {   
            'Authorization': 'Bearer ' + this.$store.state.token 
          }
          axios.post('http://api.ceredinas.id/api/quiz/'+this.$route.params.idQuiz+'/create_question', {
            question: this.question,
            option_a: this.option_a,
            option_b: this.option_b,
            option_c: this.option_c,
            option_d: this.option_d,
            correct_answer: this.correct_answer,
          })
          .then(response => {
            console.log(response.data)
            this.btn_load = false;
            this.questions.push({id: response.data.data.id, question: this.question, option_a: this.option_a, option_b: this.option_b, option_c: this.option_c, option_d: this.option_d, correct_answer: this.correct_answer});
            this.$swal('Sukses', 'Berhasil Menambah Pertanyaan!', 'success')
          })
          .catch(error => {
            console.log(error)
            this.btn_load = false;
            this.$swal('Oops', 'Gagal Menambah Pertanyaan!', 'warning')
          })
        },
        deleteQuestion(id) {
          this.tambahBab = false

          axios.defaults.headers = {   
            'Authorization': 'Bearer ' + this.$store.state.token 
          }
          axios.delete('http://api.ceredinas.id/api/quiz/'+this.$route.params.idQuiz+'/delete_question/'+id)
          .then(response => {
            console.log(response.data)
            this.btn_load = false;
            var questions = this.questions.filter(x => {
              return x.id != id;
            })
            this.questions = questions
            this.$swal('Sukses', 'Berhasil Menghapus Pertanyaan!', 'success')
          })
          .catch(error => {
            console.log(error)
            this.btn_load = false;
            this.$swal('Oops', 'Gagal Menghapus Pertanyaan!', 'warning')
          })
        },
        submit(){
          this.btn_load = true;

          axios.defaults.headers = {  
            'Authorization': 'Bearer ' + this.$store.state.token 
          }
          axios.put('http://api.ceredinas.id/api/sections/'+this.$route.params.idSection+'/quiz/'+this.$route.params.idQuiz, {
            title: this.title,
            question: this.questions
          })
          .then(response => {
            this.btn_load = false;
            this.$swal('Sukses', 'Berhasil Mengedit Quiz!', 'success')
            this.$router.push({path:'/guru/cerevid/detail-pelajaran/'+this.$route.params.id})
          })
          .catch(error => {
            this.btn_load = false;
            this.$swal('Oops', 'Gagal Mengedit Quiz!', 'warning')
            console.log(error)
          })
        }
    }
  }
</script>
