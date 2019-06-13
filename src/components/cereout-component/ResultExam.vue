<template>
    <div>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex md12 sm12 xs12>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex md9 style="padding-top:14px;padding-left:35px">                        
                               <h6 class="title">Pembahasan Soal </h6>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>

                <v-flex sm12 xs12 class="hidden-md-and-up">
                    <v-card style="padding:15px; height:100%"> 
                        <v-card style="padding:2px 5px">
                            <b>Navigasi Soal</b>
                        </v-card><br>
                        <a
                            class="btn-num"
                            v-for="(item, key, index) in detail" :key="item.id" 
                            @click="viewQuestion(key)"
                        >  
                            <span v-if="key+1 < 10 && hal+1==key+1" style="background:#03A9F4;padding:10px 14.6px">{{key+1}}</span> 
                            <span v-else-if="key+1 >= 10 && hal+1==key+1" style="background:#03A9F4;padding:10px 10.6px">{{key+1}}</span> 

                            <span v-else-if="key+1 < 10 && hal+1!=key+1" style="background:#BDBDBD;padding:10px 14.6px">{{key+1}}</span>
                            <span v-else-if="key+1 >= 10 && hal+1!=key+1" style="background:#BDBDBD;padding:10px 10.6px">{{key+1}}</span>
                        </a>
                        <div class="clear"></div>
                    </v-card>
                </v-flex>
                
                <v-flex md9 sm12 xs12>
                    <v-card style="padding:5px;">
                        <span style="margin:18px;font-size:18px"><b>Soal No. {{hal+1}}</b>
                           <span v-if="discuss.mark== 1">&nbsp;<v-icon color="green">done</v-icon></span>
                           <span v-else>&nbsp;<v-icon color="red">clear</v-icon></span> 
                        </span>
                        <div style="float:right; padding:2px 10px 0px 0px;color:#64B5F6">
                            <span>Jawaban Benar: {{discuss.discussion.correct_answer}}</span> &nbsp;|&nbsp;
                            <span>Jawaban Anda: {{discuss.answer}}</span>
                        </div>
                    </v-card>
                    
                    <v-card style="min-height:347px">
                        <div v-show="load_data" style="margin:0px auto; padding-top:40px; width:5%;">
                            <v-progress-circular
                            :size="40"
                            color="primary"
                            indeterminate
                            ></v-progress-circular>
                        </div>

                        <v-container style="padding-left:25px">
                            <!-- pertanyaan -->
                            <b>Pertanyaan:</b>
                            <p style="font-size:16px" v-html="discuss.discussion.question"></p>    
                            <div v-if="discuss.discussion.option_a!=null">
                                <b style="float:left">A.&nbsp;</b>
                                <span style="float:left" v-html="discuss.discussion.option_a"></span>
                                <span v-if="discuss.answer!= 'A' && discuss.discussion.correct_answer== 'A'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Benar</span>
                                <span v-if="discuss.answer== 'A' && discuss.discussion.correct_answer== 'A'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Anda</span>
                                <span v-if="discuss.answer== 'A' && discuss.discussion.correct_answer!= 'A'" style="color:red">&nbsp;<v-icon color="red" size="20">clear</v-icon>Jawaban Anda</span>
                                <div class="clear"></div>
                            </div>

                            <div v-if="discuss.discussion.option_b!=null">
                                <b style="float:left">B.&nbsp;</b>
                                <span style="float:left" v-html="discuss.discussion.option_b"></span>
                                <span v-if="discuss.answer!= 'B' && discuss.discussion.correct_answer== 'B'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Benar</span>
                                <span v-if="discuss.answer== 'B' && discuss.discussion.correct_answer== 'B'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Anda</span>
                                <span v-if="discuss.answer== 'B' && discuss.discussion.correct_answer!= 'B'" style="color:red">&nbsp;<v-icon color="red" size="20">clear</v-icon>Jawaban Anda</span>
                                <div class="clear"></div>
                            </div>

                            <div v-if="discuss.discussion.option_c!=null">
                                <b style="float:left">C.&nbsp;</b>
                                <span style="float:left" v-html="discuss.discussion.option_c"></span>
                                <span v-if="discuss.answer!= 'C' && discuss.discussion.correct_answer== 'C'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Benar</span>
                                <span v-if="discuss.answer== 'C' && discuss.discussion.correct_answer== 'C'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Anda</span>
                                <span v-if="discuss.answer== 'C' && discuss.discussion.correct_answer!= 'C'" style="color:red">&nbsp;<v-icon color="red" size="20">clear</v-icon>Jawaban Anda</span>
                                <div class="clear"></div>
                            </div>

                            <div v-if="discuss.discussion.option_c!=null">
                                <b style="float:left">D.&nbsp;</b>
                                <span style="float:left" v-html="discuss.discussion.option_c"></span>
                                <span v-if="discuss.answer!= 'D' && discuss.discussion.correct_answer== 'D'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Benar</span>
                                <span v-if="discuss.answer== 'D' && discuss.discussion.correct_answer== 'D'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Anda</span>
                                <span v-if="discuss.answer== 'D' && discuss.discussion.correct_answer!= 'D'" style="color:red">&nbsp;<v-icon color="red" size="20">clear</v-icon>Jawaban Anda</span>
                                <div class="clear"></div>
                            </div>

                            <div v-if="discuss.discussion.option_e!=null">
                                <b style="float:left">E.&nbsp;</b>
                                <span style="float:left" v-html="discuss.discussion.option_e"></span>
                                <span v-if="discuss.answer!= 'E' && discuss.discussion.correct_answer== 'E'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Benar</span>
                                <span v-if="discuss.answer== 'E' && discuss.discussion.correct_answer== 'E'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Anda</span>
                                <span v-if="discuss.answer== 'E' && discuss.discussion.correct_answer!= 'E'" style="color:red">&nbsp;<v-icon color="red" size="20">clear</v-icon>Jawaban Anda</span>
                                <div class="clear"></div>
                            </div>

                            <div v-if="discuss.discussion.option_f!=null">
                                <b style="float:left">F.&nbsp;</b>
                                <span style="float:left" v-html="discuss.discussion.option_f"></span>
                                <span v-if="discuss.answer!= 'F' && discuss.discussion.correct_answer== 'F'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Benar</span>
                                <span v-if="discuss.answer== 'F' && discuss.discussion.correct_answer== 'F'" style="color:green">&nbsp;<v-icon color="green" size="20">done_outline</v-icon>Jawaban Anda</span>
                                <span v-if="discuss.answer== 'F' && discuss.discussion.correct_answer!= 'F'" style="color:red">&nbsp;<v-icon color="red" size="20">clear</v-icon>Jawaban Anda</span>
                                <div class="clear"></div>
                            </div>
                            <!-- /pertanyaan -->
                            <hr>
                            <!-- penjelasan -->
                            <div>
                                <b>Penjelasan:</b>
                                <span v-html="discuss.discussion.explanation"></span>
                            </div>
                            <hr>
                            <div>
                                <b>Video Penjelasan:</b>
                                <div style="width:100%;height:400px">
                                    <iframe :src="'https://www.youtube.com/embed/V1Pl8CzNzCw'" style="width: 100%;height: 100%;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </div>
                            <!-- /penjelasan -->
                            <br>
                            
                            <v-card color="#B71C1C" dark>
                                <v-card-text>
                                <v-layout style="font-size:15px">
                                    <v-flex md4>
                                        <b>User Right</b>&nbsp;:&nbsp;<b>{{discuss.user_right}}</b>
                                    </v-flex>
                                    <v-flex md4>
                                        <b>User Wrong</b>&nbsp;:&nbsp;<b>{{discuss.user_wrong}}</b>
                                    </v-flex>
                                    <v-flex md4>
                                        <b>Score</b>&nbsp;:&nbsp;<b>{{discuss.score}}</b>
                                    </v-flex>
                                </v-layout>
                                </v-card-text>
                            </v-card>

                            <!-- {{discuss}} -->

                        </v-container>                    
                    </v-card>
                    <hr>
                    
                    <v-card style="padding:0px 18px">
                        <v-btn v-if="hal!=0" @click="previous(hal)" small> <v-icon left dark>keyboard_arrow_left</v-icon>Sebelumnya</v-btn>
                        <v-btn @click="next(hal)" small>Berikutnya <v-icon right dark>keyboard_arrow_right</v-icon></v-btn>  
                    </v-card>

                </v-flex>
    
                <v-flex md3 class="hidden-sm-and-down">
                    <v-card style="padding:15px; height:100%"> 
                        <v-card style="padding:2px 5px">
                            <b>Navigasi Soal</b>
                        </v-card><br>
                        <a
                            class="btn-num"
                            v-for="(item, key, index) in detail" :key="item.id" 
                            @click="viewQuestion(key)"
                        >  
                            <span v-if="key+1 < 10 && hal+1==key+1" style="background:#03A9F4;padding:10px 14.6px">{{key+1}}</span> 
                            <span v-else-if="key+1 >= 10 && hal+1==key+1" style="background:#03A9F4;padding:10px 10.6px">{{key+1}}</span> 

                            <span v-else-if="key+1 < 10 && hal+1!=key+1" style="background:#BDBDBD;padding:10px 14.6px">{{key+1}}</span>
                            <span v-else-if="key+1 >= 10 && hal+1!=key+1" style="background:#BDBDBD;padding:10px 10.6px">{{key+1}}</span>
                        </a>
                        <div class="clear"></div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props:["id"],
        
        data () {
            return {
                detail: [],
                load_data: true,
                hal: 0,
                discuss: [],

                quest: "",
                options: [],

            }
        },

        methods:{
            viewQuestion(index) {   
                this.hal     = index 
                this.discuss = this.detail[index]
            },

            previous(hal){
                if(hal > 0){
                    hal--
                    this.hal     = hal
                    this.discuss = this.detail[hal]
                }
            },

            next(hal){
                if(hal < this.detail.length-1){
                    hal++
                    this.hal     = hal
                    this.discuss = this.detail[hal]
                }
            },  
        },

        mounted(){
            axios.get('/cereouts/result/detail/'+this.id)
            .then(response => {
                this.detail    = response.data.data            
                this.load_data = false
                this.discuss   = this.detail[0]
            })
            .catch(error => {
                console.log(error.response)
            })
        }
    }
</script>

<style>
    a.btn-num{
        margin: 5px 5px 25px 5px; 
        float:left; 
        color:white
    }

    a.btn-num:hover{
        color: black
    }

    .navigasi {
        width:142px; 
        margin:0px auto
    }

    @media only screen and (max-width: 650px) {
        .navigasi {
            width:100%; 
        }
    }
</style>