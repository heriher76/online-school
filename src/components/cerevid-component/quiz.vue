<template>
  <div>
    <div>
      <div>
        <div>
          <v-layout justify-center style="position: relative;background-color:#fff;width:100%;height:0;padding-bottom: 56.25%;">
            <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; overflow: auto">
              <v-container>
                <div class="headline my-4">
                  {{datas.title}}
                  <v-divider></v-divider>
                </div>
                <v-container v-for="(questions, index) in datas.question">
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
                     <v-card-text>
                       <div v-for="(answer, index) in datas.question">
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
                         <v-divider></v-divider>
                       </div>
                     </v-card-text>
                     <v-card-actions>
                       <v-spacer></v-spacer>
                       <v-btn color="green darken-1" flat @click="dialog = false">OK</v-btn>
                     </v-card-actions>
                   </v-card>
                 </v-dialog>
              </v-container>
            </div>
          </v-layout>
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
      dialog : false
    }),
    methods:{
    },
    created(){
    },
    computed:{
    },
  }
</script>
