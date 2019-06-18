<template>
    <div>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex md12>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex md9 style="padding-top:22px;padding-left:35px;text-transform:capitalize">                        
                               <h6 class="title">{{name}}</h6>
                            </v-flex>
                            <v-flex md3>             
                                <!-- timer -->
                                <!-- <Timer :time="time"/> -->
                                <div style="width:180px;float:right; color:red" v-if="hours <= '00' && minutes <= '00' && seconds <= '00'">
                                   <!-- dialog time out -->
                                    <v-dialog v-model="timeoutDialog" persistent max-width="290">
                                    <v-card>
                                        <v-card-title class="headline">Waktu Habis</v-card-title>
                                        <v-card-text>Waktu pengerjaan telah habis</v-card-text>
                                        <v-card-actions>
                                        <v-btn block color="green darken-1" flat dark @click="submit">OK</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                    <!-- /dialog time out -->

                                    <h6 class="subheading" style="float:left">Timer :</h6>
                                    <div style="border:1px solid #BDBDBD;float:left;padding:8px">
                                        <span>00</span>
                                    </div>
                                    <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px">
                                        <span>00</span>
                                    </div>
                                    <div style="border:1px solid #BDBDBD;float:left;padding:8px">
                                        <span>00</span>
                                    </div>
                                    <div class="clear"></div>
                                </div>

                                <div style="width:180px;float:right;" v-else>
                                    <h6 class="subheading" style="float:left">Timer:&nbsp;</h6> 
                                    <div style="border:1px solid #BDBDBD;float:left;padding:8px;">
                                        <span>{{ hours }}</span>
                                    </div>
                                    <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px;">
                                        <span>{{ minutes }}</span>
                                    </div>
                                    <div style="border:1px solid #BDBDBD;float:left;padding:8px;">
                                        <span> {{ seconds }}</span>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <!-- timer -->
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                
                <v-flex md9>
                    <v-card style="padding:5px;">
                        <span style="margin:18px;font-size:18px"><b>Soal No. {{hal+1}}</b></span>
                    </v-card>
                    <v-card style="min-height:347px">
                        <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; overflow: auto">
                    
                            <div v-show="load_data" style="margin:0px auto; padding-top:40px; width:5%;">
                                <v-progress-circular
                                :size="40"
                                color="primary"
                                indeterminate
                                ></v-progress-circular>
                            </div>
                            <v-container>
                                <p style="font-size:16px" v-html="quest"></p>
                                <div v-for="(n,key,index) in options" :key="n.index">
                                    <label v-if="n.option!=null">
                                        <input type="radio" style="float:left;margin:4px" :value="key" v-model="tmpanswer[hal]" name="opt">
                                        <span style="float:left;" v-html="n.option"></span>
                                        <div class="clear"></div>
                                    </label> 
                                </div>
                            </v-container>                    
                        </div>
                    </v-card>
                
                    <v-card>
                        <div style="float:left">
                            <v-btn v-if="hal!=0" @click="previous(hal)" small> <v-icon left dark>keyboard_arrow_left</v-icon> Soal Sebelumnya</v-btn>
                            <v-btn v-if="hal+1!=questions.length" @click="next(hal)" small>soal Berikutnya <v-icon right dark>keyboard_arrow_right</v-icon></v-btn>  
                            
                        </div>
                        <div style="float:right;">
                            <v-btn @click="uncheck(hal)" small>hapus jawaban</v-btn>
                            <v-checkbox 
                                color="warning"
                                label="TANDAI SOAL" 
                                style="margin:4px 10px -50px 0px;float:right;" 
                                value="1" v-model="markanswer[hal]"
                            ></v-checkbox> 
                        </div>
                        <!-- <v-btn v-if="hal == markanswer[hal]" @click="delMark(hal)" dark color="orange" small>Hapus Tanda</v-btn>
                        <v-btn v-else @click="mark(hal)" small>Tandai</v-btn> -->
                        <div class="clear"></div>
                    </v-card>
                </v-flex>
    
                <v-flex md3>
                    <v-card style="padding:15px;height:100%"> 
                        <div style="min-height:90%;">
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
                                
                                <span v-else-if="key+1 < 10 && markanswer[key]=='1'" style="background:orange;padding:10px 14.6px">{{key+1}} </span>       
                                <span v-else-if="key+1 >= 10 && markanswer[key]=='1'" style="background:orange;padding:10px 10.6px">{{key+1}}</span>
                                
                                <span v-else-if="key+1 < 10 && tmpanswer[key]==null" style="background:#BDBDBD;padding:10px 14.6px">{{key+1}}</span>
                                <span v-else-if="key+1 >= 10 && tmpanswer[key]==null" style="background:#BDBDBD;padding:10px 10.6px">{{key+1}}</span>
                                
                                <span v-else-if="key+1 < 10 && tmpanswer[key]!=null" style="background:#8BC34A;padding:10px 14.6px">{{key+1}}</span>
                                <span v-else-if="key+1 >= 10 && tmpanswer[key]!=null" style="background:#8BC34A;padding:10px 10.6px">{{key+1}}</span>  
                            </a>
                            <div class="clear"></div>
                            
                            <v-card style="padding:2px 5px">
                                <b>Keterangan</b>
                            </v-card>
                            <v-layout>
                                <v-flex md5>
                                    <div><span style="width:15px;height:15px;background:#8BC34A; margin:2.6px; float:left"></span><span>Terjawab</span></div>
                                    <div><span style="width:15px;height:15px;background:orange; margin:2.6px; float:left"></span><span>Ditandai</span></div>
                                </v-flex>
                                <v-flex md7>
                                    <div><span style="width:15px;height:15px;background:#BDBDBD; margin:2.6px; float:left"></span><span>Belum Terjawab</span></div>
                                    <div><span style="width:15px;height:15px;background:#03A9F4; margin:2.6px; float:left"></span><span>Aktif</span></div>
                                </v-flex>
                            </v-layout>          
                        </div>     
                        <v-divider></v-divider>
                        <v-btn block color="red" dark v-on:click="alertDisplay">Akhiri</v-btn>                
                        <!-- <v-btn block color="red" dark @click="submit">Akhiri</v-btn> -->
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <LoadingScreen3 :loading="loadSubmit"></LoadingScreen3>
    </div>
</template>

<script>
    // import Timer from "../cereout-component/Timer"    
    import LoadingScreen3 from'../../components/loading-screen/Loading3'
    import axios from 'axios';

    export default {
        props:["name","cereoutId", "time", "attemptId"],

        components:{
            // Timer,
            LoadingScreen3
        },
        
        data () {
            return {
                loadSubmit: false,
                timeoutDialog:true,
                timer: null,
                totalTime: this.time * 60,//konversi ke detik

                load_data: true,

                hal: 0,
                questions: [],       
                quest: "",
                options: [],

                myTime: '',
                answer: [],

                tmpanswer: [],
                markanswer: []
            }
        },


        methods:{
            alertDisplay() {
                this.$swal({
                    title: 'Apakah anda yakin?',
                    text: 'Silahkan batalkan, dan periksa kembali jawaban anda jika anda tidak yakin',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya Lanjutkan!',
                    cancelButtonText: 'Tidak, Batalkan!',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    if(result.value) { 
                        return this.submit()
                    }
                })
            },

            //uncheck mark
            uncheck(val) {
                this.tmpanswer[val] = false
            },

            submit() {
                this.loadSubmit = true
                var ans = ''
                var n = ''
                
                // this.myTime = this.hours +""+ this.minutes +"Menit"+ this.seconds +"Detik"
                this.myTime = this.minutes
                for(var i=0; i < this.questions.length; i++){
                    if(this.tmpanswer[i] == 0){
                        ans = 'A'
                    }else if(this.tmpanswer[i] == 1){
                        ans = 'B'
                    }else if(this.tmpanswer[i] == 2){
                        ans = 'C'
                    }else if(this.tmpanswer[i] == 3){
                        ans = 'D'
                    }else if(this.tmpanswer[i] == 4){
                        ans = 'E'
                    }else if(this.tmpanswer[i] == 5){
                        ans = 'F'
                    }

                    if(this.markanswer[i]==null){
                        n = 0
                    }else{
                        n = 1
                    }
                    
                    var tmp = {
                        question_id: this.questions[i].id,                
                        answer: ans,
                        mark: n
                    }              
                    this.answer.push(tmp)
                }

                axios.post('/cereouts/'+this.cereoutId+'/attempts/'+this.attemptId+'/valuation', {
                    my_time: this.myTime,
                    answers: this.answer
                })
                .then(response => {
                    this.loadSubmit = false
                    console.log(response.data)
                    this.$router.push({name: 'exam_result', params:{id: this.attemptId, data: response.data.data, act:0}})
                })
                .catch(error => {
                    console.log(error.response)
                })
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

            // mark(hal){
            //     if(hal < this.questions.length-1){
            //         this.markanswer[hal].push(1)
            //     }

            //     console.log(hal)
            // },

            // delMark(hal){
            //     const index = this.markanswer.indexOf(hal) //mencari index
            //     this.markanswer.splice(index, 1)
            // },

            //function timer
            startTimer: function() {
                this.timer = setInterval(() => this.countdown(), 1000); //1000ms = 1 second
            },
            
            padTime: function(time){
                return (time < 10 ? '0' : '') + time;
            },
            countdown: function() {
                this.totalTime--;
            }
            //function timer
        },

        computed: {
            //function timer
            hours: function() {        
                const hours = Math.trunc(this.totalTime / 60 /60) % 24;
                return this.padTime(hours);
            },
            minutes: function(){
                const minutes = Math.trunc(this.totalTime / 60) % 60;
                return this.padTime(minutes);
            },
            seconds: function() {
                const seconds = Math.trunc(this.totalTime - this.minutes) % 60;
                return this.padTime(seconds);
            }
            //function timer
        },

        mounted(){
            axios.get('/cereouts/question/' + this.cereoutId)
            .then(response => {
                this.load_data = false
                this.questions = response.data.data
                
                this.startTimer()

                this.quest     = this.questions[0].question
                this.options   = this.questions[0].option;
                // console.log(response.data)
            })
            .catch(error =>{
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

    /* .container {
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
    } */
</style>