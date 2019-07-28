<template>
    <div>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex md12>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex md9 style="padding-top:22px;padding-left:35px;text-transform:capitalize">                        
                               <h6 class="title">{{detQuest.tryout_name}}</h6>
                            </v-flex>
                            <v-flex md3>             
                                <!-- timer -->
                                <div style="width:280px;float:right;">
                                    <h6 class="subheading" style="margin-top:7px;float:left">Durasi:&nbsp;</h6> 
                                    <countdown v-show="StartTimer" :time="totalTime" :transform="transform" :leading-zero="false">
                                        <template slot-scope="props">
                                            <div>
                                                <div style="border:1px solid #BDBDBD;float:left;padding:8px;">
                                                    <span>{{ props.hours }} Jam</span>
                                                </div>
                                                <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px;">
                                                    <span>{{ props.minutes }} Menit</span>
                                                </div>
                                                <div style="border:1px solid #BDBDBD;float:left;padding:8px;">
                                                    <span> {{ props.seconds }} Detik</span>
                                                </div>
                                                <div class="clear"></div>
                                            </div>
                                        </template>
                                    </countdown>

                                    <div v-show="EndTimer" style="color:red">
                                        <v-dialog v-model="timeoutDialog" persistent max-width="290">
                                            <v-card>
                                                <v-card-title class="headline">Waktu Habis</v-card-title>
                                                <v-card-text>Waktu pengerjaan telah habis</v-card-text>
                                                <v-card-actions>
                                                <v-btn block color="green darken-1" flat dark @click="submit">OK</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>

                                        <div style="border:1px solid red;float:left;padding:8px">
                                            <span>00 Jam</span>
                                        </div>
                                        <div style="border:1px solid red;float:left;padding:8px;margin:0px 5px">
                                            <span>00 Menit</span>
                                        </div>
                                        <div style="border:1px solid red;float:left;padding:8px">
                                            <span>00 Detik</span>
                                        </div>
                                        <div class="clear"></div>
                                    </div>

                                </div>
                                <!-- timer -->

                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                
                <v-flex md9>
                    <v-card style="padding:5px;">
                        <span style="margin:18px;font-size:18px"><b>Soal No. {{hal+1}}</b></span>
                        <div v-if="scoringSystem==1" style="margin:0px 10px 0px 0px;font-size:16px;float:right">
                            <span style="color:#757575"><b>Nilai Benar : <span style="color:#0091EA">{{detQuest.correct_score}}</span></b></span>
                            <span style="margin:10px">|</span>
                            <span style="color:#757575"><b>Nilai Salah : <span style="color:red">{{detQuest.incorrect_score}}</span></b></span>    
                        </div>
                        <div v-else-if="scoringSystem==2" style="margin:0px 10px 0px 0px;font-size:16px;float:right">
                            <span style="color:#757575"><b>Bobot Soal: <span style="color:#8BC34A">{{detQuest.weight}}</span></b></span>
                        </div>
                        <div class="clear"></div>
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
                        <div class="clear"></div>
                    </v-card>
                </v-flex>
    
                <v-flex md3>
                    <v-card style="height:424px;padding:15px"> 
                        <v-card style="padding:2px 5px">
                            <b>Navigasi Soal</b>
                        </v-card><br>
                        <div style="margin:-10px 0px 10px 0px;width:100%;height:55%;overflow:auto">
                            <a
                                class="btn-num"
                                v-for="(item, key, index) in questions" :key="item.id" 
                                @click="viewQuestion(key)"
                            >  
                                <!-- ditandai -->
                                <span v-if="key+1 < 10 && markanswer[key]=='1'" style="background:orange;padding:10px 14.6px">{{key+1}} </span>       
                                <span v-else-if="key+1 >= 10 && markanswer[key]=='1'" style="background:orange;padding:10px 10.6px">{{key+1}}</span>
                                
                                <!-- no actions -->
                                <span v-else-if="key+1 < 10 && tmpanswer[key]==null" style="background:#BDBDBD;padding:10px 14.6px">{{key+1}}</span>
                                <span v-else-if="key+1 >= 10 && tmpanswer[key]==null" style="background:#BDBDBD;padding:10px 10.6px">{{key+1}}</span>
                                
                                <!-- terjawab -->
                                <span v-else-if="key+1 < 10 && tmpanswer[key]!=null" style="background:#8BC34A;padding:10px 14.6px">{{key+1}}</span>
                                <span v-else-if="key+1 >= 10 && tmpanswer[key]!=null" style="background:#8BC34A;padding:10px 10.6px">{{key+1}}</span>  
                            </a>
                            <div class="clear"></div>
                        </div>

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
                            </v-flex>
                        </v-layout>          
                        <v-divider></v-divider>
                        <v-btn block color="red" dark v-on:click="alertDisplay">Akhiri</v-btn>     
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <LoadingScreen3 :loading="loadSubmit"></LoadingScreen3>
    </div>
</template>

<script>   
    import LoadingScreen3 from'../../components/loading-screen/Loading3'
    import axios from 'axios';

    export default {
        props:["cereoutId", "scoringSystem", "attemptId"],

        components:{
            LoadingScreen3
        },
        
        data () {
            return {
                latex: '',
                
                load_data: true,

                StartTimer: true,
                EndTimer: false,
                timeoutDialog:false,

                cekDurasi: 0,//this.time * 60, //konversi ke detik
                timeUp: 0,
                interval: null,
                ////

                totalTime: 0,//this.time * 60000,//konversi ke milidetik
                hal: 0,
                detQuest: [],
                questions: [],       
                quest: "",
                options: [],
                loadSubmit: false,

                myTime: '',
                answer: [],

                tmpanswer: [],
                markanswer: []
            }
        },

        methods:{     
            //uncheck mark
            uncheck(val) {
                this.tmpanswer[val] = null
                
                if(val < this.questions.length-1){
                    this.next(val)
                    this.hal      = val
                    this.detQuest = this.questions[val]
                    this.quest    = this.questions[val].question
                    this.options  = this.questions[val].option
                }else{
                    this.previous(val)
                    this.hal      = val
                    this.detQuest = this.questions[val]
                    this.quest    = this.questions[val].question
                    this.options  = this.questions[val].option
                }
            },

            reRender() {
                if(window.MathJax) {
                    console.log('rendering mathjax');
                    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub], () => console.log('done'));
                }
            },
            alertDisplay() {
                this.$swal({
                    title: 'Apakah anda yakin?',
                    text: 'Silahkan batalkan, dan periksa kembali jawaban anda jika tidak yakin!',
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

            submit() {
                this.loadSubmit = true
                var ans = ''
                var n = ''
                
                this.myTime = Math.round(this.timeUp / 60)
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
                    }else{
                        ans = ''
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
                this.hal     = index
                this.detQuest= this.questions[index] 
                this.quest   = this.questions[index].question
                this.options = this.questions[index].option

                this.latex = this.quest.replace(/(<span[^>]+>|<span>|<\/span>)/g, '$')
            },

            previous(hal){
                if(hal > 0){
                    hal--
                    this.hal   = hal
                    this.detQuest  = this.questions[hal]
                    this.quest     = this.questions[hal].question
                    this.options   = this.questions[hal].option

                    this.latex = this.quest.replace(/(<span[^>]+>|<span>|<\/span>)/g, '$')
                }
            },

            next(hal){
                if(hal < this.questions.length-1){
                    hal++
                    this.hal   = hal
                    this.detQuest = this.questions[hal]
                    this.quest    = this.questions[hal].question
                    this.options  = this.questions[hal].option

                    this.latex = this.quest.replace(/(<span[^>]+>|<span>|<\/span>)/g, '$')
                }
            },

            transform(props) { //timer
                Object.entries(props).forEach(([key, value]) => {
                    // Adds leading zero
                    const digits = value < 10 ? `0${value}` : value;
                    props[key] = `${digits}`;
                });

                return props;
            },

            toggleTimer() {
                this.interval = setInterval(this.incrementTime, 1000);
            },
            incrementTime() {
                this.timeUp = parseInt(this.timeUp) + 1;

                if(this.timeUp == this.cekDurasi){
                    clearInterval(this.interval);
                    this.StartTimer   = false
                    this.EndTimer     = true
                    this.timeoutDialog= true
                }
            
            },
            
        },

        watch: {
            latex: function() {
                console.log('data changed')
                // this.reRender();
                this.$nextTick().then(()=>{
                    this.reRender();
                });
            }
        },

        mounted(){
            this.reRender();

            axios.get('/cereouts/question/' + this.cereoutId)
            .then(response => {
                this.load_data = false
                this.questions = response.data.data
                
                // this.startTimer()
                this.detQuest  = this.questions[0]
                this.quest     = this.questions[0].question
                this.options   = this.questions[0].option;
                
                this.latex     = this.quest.replace(/(<span[^>]+>|<span>|<\/span>)/g, '$')

                this.cekDurasi = this.detQuest.duration * 60
                this.totalTime = this.detQuest.duration * 60000

                this.toggleTimer() //aktifkan countUp
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
</style>