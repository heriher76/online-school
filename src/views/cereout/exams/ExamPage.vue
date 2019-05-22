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
                    <v-card style="padding:5px;">
                        <span style="margin:18px;font-size:18px"><b>Soal No. {{hal+1}}</b></span>
                    </v-card>
                    <v-card style="min-height:347px">
                        <v-container>
                            <p style="font-size:16px">{{quest}}</p>
                            <div style="float:left">
                                <label class="container" v-for="(n,key,index) in options" :key="n">
                                <input type="radio" :value="n" v-model="tmpanswer[hal]" name="opt">
                                <span class="checkmark"><p>{{n}} </p></span>
                                </label>   
                            </div>
                        </v-container>                    
                    </v-card>

                    <v-card>
                        <v-btn @click="previous(hal)" small> <v-icon left dark>keyboard_arrow_left</v-icon> Soal Sebelumnya</v-btn>
                        <v-btn @click="next(hal)" small>soal Berikutnya <v-icon right dark>keyboard_arrow_right</v-icon></v-btn>         
                    </v-card>
                </v-flex>

                <v-flex md3>
                    <v-card style="padding:15px;"> 
                        <div style="min-height:325px;">
                            <v-card style="padding:2px 5px">
                                <b>Navigasi Soal</b>
                            </v-card><br>
                            <a
                                class="btn-num"
                                v-for="(item, key, index) in questions" :key="item" 
                                @click="viewQuestion(key)"
                            >         
                                <span v-if="key+1 < 10 && tmpanswer[key]==null" style="background:#BDBDBD;padding:10px 14.6px">{{key+1}}</span>
                                <span v-else-if="key+1 >= 10 && tmpanswer[key]==null" style="background:#BDBDBD;padding:10px 10.6px">{{key+1}}</span>
                                
                                <span v-else-if="key+1 < 10 && tmpanswer[key]!=null" style="background:orange;padding:10px 14.6px">{{key+1}}</span>
                                <span v-else-if="key+1 >= 10 && tmpanswer[key]!=null" style="background:orange;padding:10px 10.6px">{{key+1}}</span>                             
                            </a>
                        </div>                   
                        <div class="clear"></div>
                        <v-divider></v-divider>
                        <v-btn block color="red" dark v-on:click="alertDisplay">Akhiri</v-btn>
                    </v-card>
                </v-flex>

            {{ answer }}
        
            </v-layout>
        </v-container>
    </v-div>
</template>

<style>
    a.btn-num{
        margin: 5px 5px 25px 5px; 
        float:left; 
        color:white
    }

    a.btn-num:hover{
        color: blue
    }

    .container {
        display: block;
        position: relative;
        margin-bottom:-20px;
    }

    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .checkmark {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        height: 16px;
        width: 16px;
        background-color: #eee;
        border-radius: 100%;
    }

    .checkmark p {
        margin-left:24px; 
        margin-top:-4px; 
        font-size:16px
    }

    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    .container input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .container input:checked ~ .checkmark:after {
        display: block;
    }

    .container .checkmark:after {
        top: 4px;
        left: 4px;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background: white;
    }
</style>


<script>
import Timer from "../../../components/Timer"

export default {
    components:{
        Timer
    },
    
    data: () => ({
        no:1,
        hal: 0,
        tes: 'red',

        text: '',
        dialog: false,

        questions: [
            {
                id: '1', 
                quest: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cumque ullam, est eligendi doloremque veniam natus nulla inventore labore suscipit quasi, nobis eum impedit a animi repellendus dolorum aliquam. Inventore 1 ...', 
                options: {
                    opt_a: 'jancok1', 
                    opt_b: 'asu1',
                    opt_c: 'jangkrik1',
                    opt_d: 'bro1'
                },
            },

            {
                id: '2', 
                quest: 'Lorem est eligendi doloremque veniam natus nulla inventore labore suscipit quasi, nobis eum impedit a animi repellendus dolorum aliquam. Inventore 2 ...', 
                options: {
                    opt_a: 'jancok2', 
                    opt_b: 'asu2',
                    opt_c: 'jangkrik2',
                    opt_d: 'bro2'
                },
            },

            {
                id: '3', 
                quest: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cumque ullam, est eligendi doloremque veniam natus nmpedit a animi repellendus dolorum aliquam. Inventore 3 ...', 
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

                        {
                id: '5', 
                quest: 'lorem sit amet 5 ...', 
                options: {
                    opt_a: 'jancok5', 
                    opt_b: 'asu5',
                    opt_c: 'jangkrik5',
                    opt_d: 'bro5'
                },
            },{
                id: '1', 
                quest: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cumque ullam, est eligendi doloremque veniam natus nulla inventore labore suscipit quasi, nobis eum impedit a animi repellendus dolorum aliquam. Inventore 1 ...', 
                options: {
                    opt_a: 'jancok1', 
                    opt_b: 'asu1',
                    opt_c: 'jangkrik1',
                    opt_d: 'bro1'
                },
            },

            {
                id: '2', 
                quest: 'Lorem est eligendi doloremque veniam natus nulla inventore labore suscipit quasi, nobis eum impedit a animi repellendus dolorum aliquam. Inventore 2 ...', 
                options: {
                    opt_a: 'jancok2', 
                    opt_b: 'asu2',
                    opt_c: 'jangkrik2',
                    opt_d: 'bro2'
                },
            },

            {
                id: '3', 
                quest: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cumque ullam, est eligendi doloremque veniam natus nmpedit a animi repellendus dolorum aliquam. Inventore 3 ...', 
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

                        {
                id: '5', 
                quest: 'lorem sit amet 5 ...', 
                options: {
                    opt_a: 'jancok5', 
                    opt_b: 'asu5',
                    opt_c: 'jangkrik5',
                    opt_d: 'bro5'
                },
            },
            {
                id: '1', 
                quest: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cumque ullam, est eligendi doloremque veniam natus nulla inventore labore suscipit quasi, nobis eum impedit a animi repellendus dolorum aliquam. Inventore 1 ...', 
                options: {
                    opt_a: 'jancok1', 
                    opt_b: 'asu1',
                    opt_c: 'jangkrik1',
                    opt_d: 'bro1'
                },
            },

            {
                id: '2', 
                quest: 'Lorem est eligendi doloremque veniam natus nulla inventore labore suscipit quasi, nobis eum impedit a animi repellendus dolorum aliquam. Inventore 2 ...', 
                options: {
                    opt_a: 'jancok2', 
                    opt_b: 'asu2',
                    opt_c: 'jangkrik2',
                    opt_d: 'bro2'
                },
            },

            {
                id: '3', 
                quest: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis cumque ullam, est eligendi doloremque veniam natus nmpedit a animi repellendus dolorum aliquam. Inventore 3 ...', 
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

                        {
                id: '5', 
                quest: 'lorem sit amet 5 ...', 
                options: {
                    opt_a: 'jancok5', 
                    opt_b: 'asu5',
                    opt_c: 'jangkrik5',
                    opt_d: 'bro5'
                },
            },
        ],
            
        quest: "",
        options: [],

        answer: [],
        tmpanswer: []

    }),


    methods:{
        alertDisplay() {
            this.$swal({
                title: 'Are you sure?',
                text: 'You can\'t revert your action',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes Delete it!',
                cancelButtonText: 'No, Keep it!',
                showCloseButton: true,
                showLoaderOnConfirm: true
            }).then((result) => {
                if(result.value) { 
                    this.submit()
                } else {
                    this.$swal('Cancelled', 'Your file is still intact', 'info')
                }
            })
        },

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
            if(hal < this.questions.length-1){
                hal++
                this.hal   = hal
                this.quest = this.questions[hal].quest
                this.options = this.questions[hal].options
            }
        },

        detectRefresh(){
            window.addEventListener('beforeunload', (event) => {
                // Cancel the event as stated by the standard.
                event.preventDefault()
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
