<template>
    <div class="cerecall_chat">
        <v-snackbar
            v-model="snackbar"
            :multi-line="'multi-line'"
            :right="'right'"
            :timeout="6000"
            :top="'top'"
            color="rgba(0,0,0,0.5)"
        >
            Berhasil dilaporkan
            <v-btn :color="'col'" flat @click="snackbar = false">
            Close
            </v-btn>
        </v-snackbar>

        <v-container>
            <div class="chat_box">
                <v-card color="#fff0f1">
                    <div class="header_chat">
                        <v-card color="#F44336" dark style="padding:10px">
                            <div class="head_info">
                                <div class="img_usr">
                                    <img :src="teacherInfo.teacher_photo" height="100%" width="100%" alt="">
                                </div>
                                    
                                <div style=" margin:0px 0px 0px 10px; float:left">
                                    <b style="font-size:18px;">{{teacherInfo.teacher_name}}</b><br>
                                    <span>{{chatRunning.lesson}}</span>
                                </div>

                                <div style="float:right">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">  
                                            <v-btn @click="dialog_report=true" icon dark flat>
                                                <v-icon v-on="on">info</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Laporkan</span>
                                    </v-tooltip>
                                    
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">  
                                            <v-btn @click="dialog1=true" icon dark flat>
                                                <v-icon v-on="on">done</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Akhiri</span>
                                    </v-tooltip>
                                </div>

                                    <v-dialog v-model="dialog_report" persistent max-width="400">
                                        <v-card>
                                            <v-card-title class="headline" style="float:left">Report Guru</v-card-title>
                                            <v-btn icon style="float:right;margin:15px" @click="dialog_report = false">
                                                <v-icon>close</v-icon>
                                            </v-btn>
                                            <div class="clear"></div>
                                            <form enctype="multipart/form-data">
                                            <v-card-text>
                                                <v-textarea
                                                    solo
                                                    :rules="[rules.required]"
                                                    v-model="reportMsg"
                                                    label="Isi Report"
                                                ></v-textarea>
                                                <input type="file" @change="selectedFile($event)">
                                            </v-card-text>                                        
                                            <v-card-actions>
                                                <v-btn color="red" dark block @click="this.report">Kirim Report</v-btn>
                                            </v-card-actions>
                                            </form>
                                        </v-card>
                                    </v-dialog>

                                    <v-dialog v-model="dialog1" persistent max-width="300">
                                        <v-card>
                                            <!-- <v-card-title class="headline">Yakin akan diakhiri?</v-card-title> -->
                                            <v-card-text>Apakah anda yakin ingin mengakhiri sesi konsultasi?</v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="green darken-1" flat @click="dialog1 = false">Tidak</v-btn>
                                                <v-btn @click="dialog2=true, dialog1=false" flat dark color="light-green">Ya</v-btn>

                                                <v-dialog v-model="dialog2" persistent max-width="380">
                                                    <v-card>
                                                        <v-card-title class="headline" style="float:left">Ulasan Guru</v-card-title>
                                                        <v-btn icon style="float:right;margin:15px" @click="dialog2 = false">
                                                            <v-icon>close</v-icon>
                                                        </v-btn>
                                                        <div class="clear"></div>
                                                        <v-card-text>
                                                            <div class="text-xs-center ">
                                                            Berikan bintang mu untuk guru ini
                                                                <div style="display:inline-block;">
                                                                    <star-rating 
                                                                        inactive-color="#E0E0E0"
                                                                        active-color="#424242"
                                                                        :increment="0.5"
                                                                        v-bind:star-size="40"
                                                                        :show-rating="false" 
                                                                        @rating-selected="setRating">
                                                                    </star-rating>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div v-show="textArea">
                                                                <v-textarea
                                                                    solo
                                                                    v-model="review"
                                                                    label="Berikan masukan untuk guru ini"
                                                                ></v-textarea>
                                                            </div>
                                                        </v-card-text>
                                                        <v-divider></v-divider>
                                                        <v-card-actions class="justify-space-between">
                                                            <v-btn @click="addRating" color="#B71C1C" block dark>Kirim Ulasan</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>                             
                                <div class="clear"></div>
                            </div>
                        </v-card>
                    </div>
                    <div class="live_chat" style="height:380px">
                        <div v-show="loadChat" style="background:rgba(0,0,0,0.2);text-align:center;z-index:1;position:absolute;width:100%;height:75%">
                            <fulfilling-bouncing-circle-spinner
                                style="margin:160px auto 0px auto"
                                :animation-duration="1500"
                                :size="40"
                                color="#fff"
                            />
                            <span style="color:white">loading...</span>
                        </div>

                        <div id="box" ref="msgDisplay">
                            <div v-for="(chat, index) in chatItem" :key="chat.id" class="box-chat">
                                <span v-if="chat.sender==1" class="chat-siswa">
                                    <v-img v-if="chat.is_image==1" @click.stop="dialog[index] = true" style="cursor:pointer" :src="chat.content" height="180px" width="260px">
                                        <template v-slot:placeholder>
                                            <v-layout
                                                fill-height
                                                align-center
                                                justify-center
                                                ma-0
                                            >
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-layout>
                                        </template>
                                    </v-img>
                                    <v-dialog v-model="dialog[index]" max-width="500">
                                        <v-img :src="chat.content"></v-img>
                                    </v-dialog>
                                    <span v-if="chat.is_image!=1">{{chat.content}}</span> 
                                    <span style="font-size:9px;margin-left:10px;">{{moment(chat.created_at).format('hh:mm')}}</span>
                                </span>
                                <span v-if="chat.sender==2" class="chat-guru">
                                    <v-img v-if="chat.is_image==1" @click.stop="dialog[index] = true" style="cursor:pointer" :src="chat.content" height="180px" width="260px">
                                        <template v-slot:placeholder>
                                            <v-layout
                                                fill-height
                                                align-center
                                                justify-center
                                                ma-0
                                            >
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-layout>
                                        </template>
                                    </v-img>
                                    <v-dialog v-model="dialog[index]" max-width="500">
                                        <v-img :src="chat.content"></v-img>
                                    </v-dialog>
                                    <span v-if="chat.is_image!=1">{{chat.content}}</span> 
                                    <span style="font-size:9px;margin-left:10px;">{{moment(chat.created_at).format('hh:mm')}}</span>
                                </span>
                                <div class="clear"></div>
                            </div>
                        </div>
                        
                        <div style="position:absolute;bottom:60px;left:0px;">
                            <v-btn v-show="btScroll" @click="scrollBottom" color="red" dark icon><v-icon>keyboard_arrow_down</v-icon></v-btn>
                            <!-- <div v-if="chatItem.length+=1">
                            {{chatItem.length}}
                            </div> -->
                        </div>

                    </div>

                    <div class="action_chat">
                        <input type="file" ref="file" style="display:none" @change="this.sendImg">
                        <button class="file-img" @click="$refs.file.click()"> <v-icon large color="red">insert_photo</v-icon> </button>
                        <form @submit.prevent @keyup.enter="sendMsg">
                            <input class="msg" type="text" v-model="content" placeholder="Ketik pesan">
                        </form>
                        <button class="send" @click="sendMsg"><v-icon color="red">send</v-icon></button>
                        <div class="clear"></div> 
                    </div>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script>
    // import Vue from "vue";
    import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
    import StarRating from 'vue-star-rating'
    import axios from 'axios';
    import moment from 'moment'
    export default {
        components: {
            StarRating,
            FulfillingBouncingCircleSpinner
        },

        data () {
            return {    
                dialog: [],
                cekTop: '',
                btScroll:false,
                interval:null,
                loadChat:true,
                snackbar:false,
                review: '',
                reportMsg: '',
                reportImg: null,
                rules: {
                    required: v => !!v || 'This field is required'
                },
                content: '',
                contentImg: '',
                chatRunning: [],
                teacherInfo: [],
                studentInfo: [],
                chatItem: [],     
                dialog_report:false,
                dialog1: false,
                dialog2: false,
                textArea: false,
                rating: 3,
                currentRating: "No Rating",
                cerecallTime: []

            }
        },
        methods: {
            moment,

            setRating: function(rating) {
                this.textArea = true
                this.rating = rating
            },

            showChat(){
                axios.get('/cerecall/chat/'+this.chatRunning.id)
                .then(response => {
                    this.loadChat = false
                    this.chatItem = response.data.data
                    setTimeout(() => (this.scrollBottom()), 0)
                })
                .catch(error => {
                    console.log(error.response)
                })
            },

            addRating(){
                this.dialog2  = false
                this.loadChat = true
                axios.put('/cerecall/history/'+this.chatRunning.id,{
                    student_id : this.studentInfo.student_id,
                    teacher_id : this.teacherInfo.teacher_id,
                    rating : this.rating,
                    review : this.review
                })
                .then(response=>{
                    this.loadChat = false
                    this.$swal("Sukses", "Percakapan berhasil diakhiri!")
                    this.$router.push({name: 'cerecall'})
                    // console.log(response.data)
                })
                .catch(error=>{
                    console.log(error.response)
                })
            },

            sendMsg(){
                axios.post('/cerecall/chat/'+this.chatRunning.id,{
                    content: this.content,
                    is_image: null,
                    sender: 1
                })
                .then(response => {
                    this.content = ''
                    setTimeout(() => (this.scrollBottom()), 0)
                })
                .catch(error => {
                    this.content = ''
                    setTimeout(() => (this.scrollBottom()), 0)
                })
            },

            sendImg(){
                this.contentImg = this.$refs.file.files[0];
                console.log(this.contentImg)
                let formData = new FormData();
                formData.append('content', this.contentImg);
                formData.append('is_image', 1);
                formData.append('sender', 1)

                console.log(this.formData)

                axios.post('/cerecall/chat/'+this.chatRunning.id, formData)
                .then(response => {
                    this.content = ''
                    setTimeout(() => (this.scrollBottom()), 0)
                    // console.log(response.data)
                })
                .catch(error => {
                    this.content = ''
                    setTimeout(() => (this.scrollBottom()), 0)
                    console.log(error.response)
                })
            },

            handleFileUpload(){
                this.reportImg = this.$refs.fileM.files[0];
            },

            selectedFile(event){
                // console.log(event)
                this.reportImg = event.target.files[0]
            },

            report(event){
                this.dialog_report = false
                
                let formData = new FormData();
                formData.append('student_id', this.studentInfo.student_id);
                formData.append('teacher_id', this.teacherInfo.teacher_id);
                formData.append('report', this.reportMsg)
                formData.append('image_url', this.reportImg);
      
                axios.post('/cerecall/report/'+this.chatRunning.id, formData)
                .then(response=>{
                    this.snackbar = true
                    console.log(response.data)
                })
                .catch(error=>{
                    console.log(error.response)
                })
            },

            scrollBottom(){
                var container = this.$el.querySelector("#box");
                container.scrollTop = container.scrollHeight;   
                this.cekTop = container.scrollTop
            }
        },
            
        updated() {  
            var container = this.$el.querySelector("#box");
            if(container.scrollTop < this.cekTop){
                this.btScroll = true
            }else if(container.scrollTop == this.cekTop){
                this.btScroll = false
            }

            axios.get('/cerecall/chat/'+this.chatRunning.id)
            .then(response => {
                this.chatItem = response.data.data
            })
            .catch(error => {
                console.log(error.response)
            })
        },

        created(){
            axios.get('/cerecall/student/history/running')
            .then(response => {
                this.chatRunning = response.data.data[0]
                this.teacherInfo = response.data.data[0].teacher
                this.studentInfo = response.data.data[0].student
                
                axios.get('/master/generalInformation')
                .then(res => {
                    this.cerecallTime = res.data.data[0].cerecall_time
                    var diff = moment(new Date()).minutes() - moment(this.chatRunning.created_at).minutes()
                    if(diff >= this.cerecallTime){
                        this.addRating()
                    }else{
                        this.showChat()
                    }
                })
                .catch(err => {
                    console.log(err.response)
                })

            })
            .catch(error => {
                console.log(error.response)
            })
        },
    }
</script>


<style>
    .chat_box{
        width:80%;
        margin:0px auto;
    }

    #box{
        position: absolute;
        top:70px;
        padding:20px;
        left:0;
        width: 100%;
        height: 74%; 
        overflow: auto
    }

    .box-chat{
        padding:5px
    }

    .chat-guru{
        float:left;
        border-radius:0px 15px 15px 18px;
        background:white;
        padding:8px 10px
    }

    .chat-siswa{
        float:right;
        border-radius:15px 18px 0px 15px;
        background:#F44336;
        color:white;
        padding:8px 10px
    }
    
    @media only screen and (max-width: 650px) {
        .chat_box{
            width:100%;
        }
    }

    .head_info .img_usr{
        height:40px;
        width:40px;
        margin-top: 4.5px;
        float: left;
    }

    .head_info .img_usr img{
        border-radius: 100%;
    }

    .live_chat{
        /* margin: 20px; */
        /* padding: 20px; */
    }

    .action_chat{
        background:rgb(243, 239, 239);
        padding: 10px
    }

    .file-img{
        margin-top: 2px;
        margin-right: 4px;
        outline: none;
        float: left
    }
    input.msg{
        background: white;
        padding: 10px 15px;
        border-radius: 18px;
        width:90%;
        outline:none;
        float:left;
    }

    @media only screen and (max-width: 1265px) {    
        input.msg{
            width:73%;
        }
    } 

    .send{
        outline:none;
        float: left;
        margin: 8px 8px 0px 10px
    }
</style>