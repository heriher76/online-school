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
                <v-toolbar-title>Edit Pertanyaan</v-toolbar-title>
              </v-toolbar>

              <form>
                <v-card-text style="background-color:#fff">
                  <v-text-field box v-model="question" label="Pertanyaan *" required></v-text-field>
                  <v-text-field box v-model="option_a" label="Opsi A *" required></v-text-field>
                  <v-text-field box v-model="option_b" label="Opsi B *" required></v-text-field>
                  <v-text-field box v-model="option_c" label="Opsi C *" required></v-text-field>
                  <v-text-field box v-model="option_d" label="Opsi D *" required></v-text-field>
                  <v-select box v-model="correct_answer"
    		            :items="corrects"
    		            label="Jawaban Benar *"
    		          ></v-select>
                  
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
		name:"cerevid_detail_pertanyaan",
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
        corrects: ['A', 'B', 'C', 'D'],
        right: null,
        btn_load: false
      }
	},
    created() {
      axios.get('http://api.ceredinas.id/api/quiz/'+this.$route.params.idQuiz+'/show_question/'+this.$route.params.idQuestion)
        .then(response => {
          console.log(response)
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
        submit(){
          this.btn_load = true;

          axios.defaults.headers = {  
            'Authorization': 'Bearer ' + this.$store.state.token 
          }
          axios.put('http://api.ceredinas.id/api/quiz/'+this.$route.params.idQuiz+'/update_question/'+this.$route.params.idQuestion, {
            question : this.question,
            option_a : this.option_a,
            option_b : this.option_b,
            option_c : this.option_c,
            option_d : this.option_d,
            correct_answer : this.correct_answer
          })
          .then(response => {
            this.btn_load = false;
            console.log(response.data)
          })
          .catch(error => {
            this.btn_load = false;
            console.log(error)
          })
        }
    }
  }
</script>
