<template>
    <div>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex md12>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex md9 style="padding-top:22px;padding-left:35px">                        
                               <h6 class="title">Mata Pelajaran </h6>
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
                        <div v-show="load_data" style="margin:0px auto; padding-top:40px; width:5%;">
                            <v-progress-circular
                            :size="40"
                            color="primary"
                            indeterminate
                            ></v-progress-circular>
                        </div>
                        <v-container>
                            <p style="font-size:16px">{{quest}}</p>
                            <div style="float:left">
                                <label class="container" v-for="(n,key,index) in options" :key="n">
                                <input type="radio" :value="n.option" v-model="tmpanswer[hal]" name="opt">
                                <span class="checkmark"><p>{{n.option}} </p></span>
                                </label>   
                            </div>
                        </v-container>                    
                    </v-card>

                    <v-card>
                        <v-btn @click="previous(hal)" small> <v-icon left dark>keyboard_arrow_left</v-icon> Soal Sebelumnya</v-btn>
                        <v-btn @click="next(hal)" small>soal Berikutnya <v-icon right dark>keyboard_arrow_right</v-icon></v-btn>  
                        
                        <v-btn @click="mark(hal)" small>Tandai</v-btn>
                        
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
                                v-for="(item, key, index) in questions" :key="item.id" 
                                @click="viewQuestion(key)"
                            >  
                            
                                <span v-if="key+1 < 10 && hal+1==key+1" style="background:#03A9F4;padding:10px 14.6px">{{key+1}}</span> 
                                <span v-else-if="key+1 >= 10 && hal+1==key+1" style="background:#03A9F4;padding:10px 10.6px">{{key+1}}</span> 

                                <span v-else-if="key+1 < 10 && tmpanswer[key]==null" style="background:#BDBDBD;padding:10px 14.6px">{{key+1}}</span>
                                <span v-else-if="key+1 >= 10 && tmpanswer[key]==null" style="background:#BDBDBD;padding:10px 10.6px">{{key+1}}</span>
                                
                                <span v-else-if="key+1 < 10 && tmpanswer[key]!=null" style="background:#8BC34A;padding:10px 14.6px">{{key+1}}</span>
                                <span v-else-if="key+1 >= 10 && tmpanswer[key]!=null" style="background:#8BC34A;padding:10px 10.6px">{{key+1}}</span>  

                                <!-- <span v-else-if="key+1 < 10 && markanswer[key]!=key" style="background:orange;padding:10px 14.6px">{{key+1}} </span>
                                <span v-else-if="key+1 >= 10 && markanswer[key]!=key" style="background:orange;padding:10px 10.6px">{{key+1}}</span>                                                      -->
                            </a>
                            <div class="clear"></div>
                            
                            <v-card style="padding:2px 5px">
                                <b>Keterangan</b>
                            </v-card>
                            <v-layout>
                                <v-flex md5>
                                    <div>
                                        <span style="width:15px;height:15px;background:#8BC34A; margin:2.6px; float:left"></span> 
                                       <span>Terjawab</span>
                                    </div>

                                    <div>
                                        <span style="width:15px;height:15px;background:orange; margin:2.6px; float:left"></span> 
                                       <span>Ditandai</span>
                                    </div>
                            
                                </v-flex>
                                <v-flex md7>
                                    <div>
                                        <span style="width:15px;height:15px;background:#BDBDBD; margin:2.6px; float:left"></span> 
                                       <span>Belum Terjawab</span>
                                    </div>

                                    <div>
                                        <span style="width:15px;height:15px;background:#03A9F4; margin:2.6px; float:left"></span> 
                                       <span>Aktif</span>
                                    </div>

                                </v-flex>
                            </v-layout>

                        </div>     
                        <v-divider></v-divider>
                        <v-btn block color="red" dark v-on:click="alertDisplay">Akhiri</v-btn>
                    </v-card>
                </v-flex>
            {{ answer }}
            <!-- {{questions}} -->
            <!-- {{tmpanswer}} -->

            <!-- {{ markanswer }} -->
        
            </v-layout>
        </v-container>
    </div>
</template>


<style>
    a.btn-num{
        margin: 5px 5px 25px 5px; 
        float:left; 
        color:white
    }

    a.btn-num:hover{
        color: black
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
    import Timer from "../cereout-component/Timer"
    
    import axios from 'axios';

    export default {
        props:{
            idQuestion: String
        },

        components:{
            Timer
        },
        
        data: () => ({
            load_data: true,
            dialog: false,

            hal: 0,
            questions: [],       
            quest: "",
            options: [],

            answer: [],
            tmpanswer: [],

            markanswer: []
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
                this.quest = this.questions[index].question
                this.options = this.questions[index].option
            },

            previous(hal){
                if(hal > 0){
                    hal--
                    this.hal   = hal
                    this.quest = this.questions[hal].question
                    this.options = this.questions[hal].option
                }
            },

            next(hal){
                if(hal < this.questions.length-1){
                    hal++
                    this.hal   = hal
                    this.quest = this.questions[hal].question
                    this.options = this.questions[hal].option
                }
            },

            mark(hal){
                this.markanswer.push(hal)
            }
        },

        mounted(){
            
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
            axios.get('/cereouts/question/' + this.idQuestion)
            .then(response => {
                this.load_data = false
                this.questions = response.data.data

                this.quest     = this.questions[0].question
                this.options   = this.questions[0].option;
                // console.log(response.data)
            })
            .catch(error =>{
                console.log(error)
            })

            
            
        }
    }
</script>
