<template>
    <div>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex md12>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex md9 style="padding-top:14px;padding-left:35px">                        
                               <h6 class="title">Pembahasan Soal </h6>
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
                            <p style="font-size:16px">{{discuss}}</p>
                            <div style="float:left">
                                <label class="container" v-for="(n,key,index) in options" :key="n.index">
                                <input type="radio" :value="key" v-model="tmpanswer[hal]" name="opt">
                                <span class="checkmark"><p>{{n.option}} </p></span>
                                </label>   
                            </div>
                        </v-container>                    
                    </v-card>
                    
                    <v-card>
                        <v-btn @click="previous(hal)" small> <v-icon left dark>keyboard_arrow_left</v-icon>Sebelumnya</v-btn>
                        <v-btn @click="next(hal)" small>Berikutnya <v-icon right dark>keyboard_arrow_right</v-icon></v-btn>  
                    </v-card>

                </v-flex>
    
                <v-flex md3>
                    <v-card style="padding:15px; height:100%"> 
                        <v-card style="padding:2px 5px">
                            <b>Navigasi Soal</b>
                        </v-card><br>
                        <div class="navigasi">
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
                        </div>     
                    </v-card>
                </v-flex>

            <!-- {{detail}}
            {{discuss}} -->
        
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props:["detail"],
        
        data () {
            return {
                // load_data: true,
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
            // this.load_data = false
            this.discuss   = this.detail[0];
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