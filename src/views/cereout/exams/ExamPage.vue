<template>
    <v-div>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex md12>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex md10 style="padding-top:22px;padding-left:35px">                        
                               <h6 class="title">Mata Pelajaran</h6>
                            </v-flex>
                            <v-flex md2>
                                <div style="width:157px;float:right">
                                    <h6 class="subheadning" style="float:left">Timer :</h6>
                                    <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px;">
                                        <span>99</span><br>
                                    </div>
                                    <div style="border:1px solid #BDBDBD;float:left;padding:8px">
                                        <span>99</span>
                                    </div>
                                    <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px">
                                        <span>99</span>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex md9>
                    <v-card style="padding:5px">
                        <span style="margin:18px;font-size:18px">Soal No. {{no}}</span>
                    </v-card>
                    <v-divider></v-divider>
                    <div style="background:white">
                        <v-container>
                            <p style="font-size:16px">{{quest}}</p>
                            
                            <v-radio-group v-model="radioGroup">
                                <v-radio
                                    v-for="n in 4"
                                    :key="n"
                                    :label="`Jawaban ${n}`"
                                    :value="n"
                                ></v-radio>
                            </v-radio-group>
                        </v-container>                    
                    </div>
                </v-flex>
                <v-flex md3>
                    <v-card style="padding:15px">
                    
                        <v-card>
                            <div style="border:1px solid black;" v-for="item in questions" :key="item">
                                
                                <a @click="viewQuestion(i++)">{{no++}}</a>
                            </div>
                        </v-card>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-div>
</template>

<script>
export default {
    data: () => ({
        i: 0,
        no:1,
        questions: [
            {id:3, questi: "haris bugil monyet 1... ", option_a: "su", option_b: "cok", option_c:"jancok", option_d: "kentu"},
            {id:4, questi: "haris bugil anu 2... ", option_a: "su", option_b: "cok", option_c:"jancok", option_d: "kentu"},
            {id:1, questi: "haris bugil brengsek 3... ", option_a: "su", option_b: "cok", option_c:"jancok", option_d: "kentu"},
            {id:2, questi: "haris bugil busuk 4... ", option_a: "su", option_b: "cok", option_c:"jancok", option_d: "kentu"},
        ],
        quest: "ceke",
        cek: "cobacoba"
    }),
    methods:{
        viewQuestion(index) {
            // console.log(this.question.filter(question => question.id));
            this.quest = this.questions[index].questi;
        }
    }
}
</script>
