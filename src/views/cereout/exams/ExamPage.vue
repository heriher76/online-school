<template>
    <v-div>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex md12>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex md9 style="padding-top:22px;padding-left:35px">                        
                               <h6 class="title">Mata Pelajaran</h6>
                            </v-flex>
                            <v-flex md3>
                                <Timer/>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex md9>
                    <v-card style="padding:5px">
                        <span style="margin:18px;font-size:18px">Soal No. </span>
                    </v-card>
                    <v-divider></v-divider>
                    <div style="background:white">
                        <v-container>
                            <p style="font-size:16px">{{quest}}</p>
                            
                              <!-- <v-radio-group v-model="radioGroup">
                                <v-radio
                                    v-for="n in 4"
                                    :key="n"
                                    :label="n"
                                    :value="n"
                                ></v-radio>
                                </v-radio-group> -->

                            <div v-for="(n,key,index) in options" :key="n">
                                <label for="radio">     
                                    <input  type="radio" :value="n" v-model="tmpanswer[hal]" name="cek"> {{n}} 
                                </label>
                            </div>
                                                         
                        </v-container>                    
                    </div>
                    <v-btn @click="previous(hal)">Previous</v-btn>
                    <v-btn @click="next(hal)">Next</v-btn>
                </v-flex>
                <v-flex md3>
                    <v-card style="padding:15px">                    
                        <v-card>
                            <div v-for="(item, key, index) in questions" :key="item" ripple>
                                <a @click="viewQuestion(key)">{{no++}}</a>
                            </div>
                        </v-card>
                        
                        <v-btn @click="submit()">Submit</v-btn>
                    </v-card>
                </v-flex>
                {{answer}}
                {{tmpanswer}}
            </v-layout>
        </v-container>
    </v-div>
</template>


<script>

import Timer from "../../../components/Timer"

export default {
    components:{
        Timer
    },
    
    data: () => ({
        no:1,
        hal: 0,

        questions: [
            {
                id: '1', 
                quest: 'lorem ipsum dolor sit amet 1 ...', 
                options: {
                    opt_a: 'jancok1', 
                    opt_b: 'asu1',
                    opt_c: 'jangkrik1',
                    opt_d: 'bro1'
                },
            },

            {
                id: '2', 
                quest: 'lorem ipsum dolor sit amet 2 ...', 
                options: {
                    opt_a: 'jancok2', 
                    opt_b: 'asu2',
                    opt_c: 'jangkrik2',
                    opt_d: 'bro2'
                },
            },

            {
                id: '3', 
                quest: 'lorem ipsum dolor sit amet 3 ...', 
                options: {
                    opt_a: 'jancok3', 
                    opt_b: 'asu3',
                    opt_c: 'jangkrik3',
                    opt_d: 'bro3'
                },
            },

            {
                id: '4', 
                quest: 'lorem ipsum dolor sit amet 4 ...', 
                options: {
                    opt_a: 'jancok4', 
                    opt_b: 'asu4',
                    opt_c: 'jangkrik4',
                    opt_d: 'bro4'
                },
            },
        ],
            
        quest: "",
        options: [],


        answer: [],
        tmpanswer: []

    }),

    methods:{
        submit() {
            for(var i=0; i < this.questions.length; i++){
                var tmp = {
                    question_id: this.questions[i].id,
                    answer: this.tmpanswer[i],
                }              
                this.answer.push(tmp)
            }
        },

        viewQuestion(index) {   
            this.hal   = index 
            this.quest = this.questions[index].quest
            this.options = this.questions[index].options

            // var tmp = {
            //     question_id: this.questions[h].id,
            //     answer: this.tmpanswer,
            // }
            // this.answer.push(tmp)
        },

        previous(hal){
            if(hal > 0){
                hal--
                this.hal   = hal
                this.quest = this.questions[hal].quest
                this.options = this.questions[hal].options
            }
        },

        next(hal){
            if(hal < this.questions.length){
                hal++
                this.hal   = hal
                this.quest = this.questions[hal].quest
                this.options = this.questions[hal].options
            }
        },

        detectRefresh(){
            window.addEventListener('beforeunload', (event) => {
                // Cancel the event as stated by the standard.
                event.preventDefault();
                // Chrome requires returnValue to be set.
                event.returnValue = 'Are you sure you want to leave?';
            });
        },

        beforeDestroy() {
            window.removeEventListener('beforeunload', this.handler)
        },

        async handler(event) {
            event.preventDefault()
            try {
                // API call here
                await this.saveChanges()
                return '' // Prompt with default browser message
            } catch (err) {
                return undefined // Skip prompt
            }
        }
    },

    mounted(){
        this.detectRefresh();
        this.beforeDestroy();

        this.quest   = this.questions[0].quest;
        this.options = this.questions[0].options;
    }
}
</script>
