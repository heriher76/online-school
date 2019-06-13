<template>
  <div>
    <div v-for="(data, index) in datas">
      <div v-if="getIndexSection(data.id, index)">
        <div v-for="(materi, index) in data.quiz">
          <div v-if="getIndexQuestion(materi.id, index)">
              <v-layout justify-center style="position: relative;background-color:#fff;width:100%;height:0;padding-bottom: 56.25%;">
                <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; overflow: auto">
                  <v-container>
                    <div class="headline my-4">
                      Quiz
                      <v-divider></v-divider>
                    </div>
                    <div v-for="(quiz, index) in dataQuiz">
                      <v-container v-for="(questions, index) in quiz.question">
                        <p class="subheading">
                          {{(index+1)+'. '+questions.question}}
                        </p>
                        <v-radio-group v-model="jawaban[index]">
                          <v-radio
                            :label="questions.option_a"
                            value="A"
                          ></v-radio>
                          <v-radio
                            :label="questions.option_b"
                            value="B"
                          ></v-radio>
                          <v-radio
                            :label="questions.option_c"
                            value="C"
                          ></v-radio>
                          <v-radio
                            :label="questions.option_d"
                            value="D"
                          ></v-radio>
                        </v-radio-group>
                        <v-divider></v-divider>
                      </v-container>
                      <v-dialog v-model="dialog" persistent max-width="400">
                         <template v-slot:activator="{ on }">
                           <v-layout justify-end>
                             <v-btn color="primary" dark v-on="on">Selesai</v-btn>
                           </v-layout>
                         </template>
                         <v-card>
                           <v-card-title class="headline">Hasil Pengisian</v-card-title>
                           <v-divider></v-divider>
                           <v-card-text>
                             <div v-for="(answer, index) in quiz.question">
                               <p>Soal no.{{index+1}}</p>
                               <p>Jawaban Anda = {{jawaban[index]}}</p>
                               <p>Jawaban yang Benar = {{answer.correct_answer}}</p>
                               <div v-if="jawaban[index++]==answer.correct_answer">
                                 <v-chip color="success" text-color="white">
                                  <v-avatar>
                                    <v-icon>done</v-icon>
                                  </v-avatar>
                                  Benar
                                </v-chip>
                               </div>
                               <div v-else>
                                 <v-chip color="red" text-color="white">
                                  <v-avatar>
                                    <v-icon>clear</v-icon>
                                  </v-avatar>
                                  Salah
                                </v-chip>
                               </div>
                               <br/>
                               <v-divider></v-divider>
                               <br/>
                             </div>
                           </v-card-text>
                           <v-card-actions>
                             <v-spacer></v-spacer>
                             <v-btn color="green darken-1" flat @click="dialog = false">OK</v-btn>
                           </v-card-actions>
                         </v-card>
                      </v-dialog>
                    </div>
                  </v-container>
                </div>
              </v-layout>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['datas'],
    data: () => ({
      jawaban : [],
      dialog : false,
      i: null,
    }),
    methods:{
      getDataQuiz(data1, data2){
        this.$store.dispatch('getDataQuiz',{
          section_id: data1,
          id: data2
        })
        .then(response => {
        })
        .catch(error => {
          console.log(error)
        })
      },
      getIndexSection(materi, index){
        if(materi==this.ambilSectionId){
          this.i=index
          return true
        }else{
          return false
        }
      },
      getIndexQuestion(materi, index){
        if(materi==this.ambilId){
          this.getDataQuiz(this.datas[this.i].id, this.datas[this.i].quiz[index].id)
          return true
        }else{
          return false
        }

      }
    },
    created(){
    },
    computed:{
      ambilSectionId(){
        return this.$route.hash.split('-')[1] || {}
      },
      ambilId(){
        return this.$route.hash.split('-')[2] || {}
      },
      dataQuiz(){
        return this.$store.state.dataQuiz || {}
      }
    }
  }
</script>
