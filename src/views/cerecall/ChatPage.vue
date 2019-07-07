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
                                            <!-- <form enctype="multipart/form-data"> -->
                                            <v-card-text>
                                                <v-textarea
                                                    solo
                                                    v-model="reportMsg"
                                                    label="Isi Report"
                                                ></v-textarea>
                                                <!-- <input name="photo" ref="file" type="file" @change="this.handleFileUpload"> -->
                                                <input type="file" id="file" ref="myFiles" class="custom-file-input" @change="previewFiles" multiple>
                                            </v-card-text>                                        
                                            <v-card-actions>
                                                <v-btn color="red" dark block @click="report">Kirim Report</v-btn>
                                            </v-card-actions>
                                            <!-- </form> -->
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
                                                            <v-btn @click="addRating" color="#B71C1C" block dark>Rate Now</v-btn>
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
                        <div style="position: absolute;top:70px;padding:20px;left:0;width: 100%;height: 74%; overflow: auto">
                            <div v-for="chat in chatItem" :key="chat.id" class="box-chat">
                                <span v-if="chat.sender==1" class="chat-siswa">
                                    <v-img v-if="chat.is_image==1" :src="chat.content" height="200px"></v-img>
                                    <span>{{chat.content}}</span> 
                                </span>
                                <span v-if="chat.sender==2" class="chat-guru">
                                    <v-img v-if="chat.is_image==1" :src="chat.content" height="200px"></v-img>
                                    <span>{{chat.content}}</span>
                                </span>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>

                    <div class="action_chat">
                        <input type="file" ref="file" style="display: none">
                        <button class="file-img" @click="$refs.file.click()"> <v-icon large color="red">insert_photo</v-icon> </button>
                        <form @submit.prevent="sendMsg" @keyup.enter="sendMsg">
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
    import StarRating from 'vue-star-rating'
    import axios from 'axios';
    export default {
        components: {
            StarRating,
        },

        data () {
            return {     
                
                snackbar:false,  
                // file: '',
                files: [],
                review: '',
                reportMsg: '',
                // reportImg: '',
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

            }
        },
        methods: {
            setRating: function(rating) {
                this.textArea = true
                this.rating = rating
            },

            addRating(){
                this.dialog2=false
                axios.put('/cerecall/history/'+this.chatRunning.id,{
                    student_id : this.studentInfo.student_id,
                    teacher_id : this.teacherInfo.teacher_id,
                    rating : this.rating,
                    review : this.review
                })
                .then(response=>{
                    this.$swal("Sukses", "Percakapan berhasil diakhiri!")
                    this.$router.push({name: 'cerecall'})
                    console.log(response.data)
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
                    axios.get('/cerecall/chat/'+this.chatRunning.id)
                    .then(response => {
                        this.chatItem = response.data.data
                    })
                    .catch(error => {console.log(error.response)})
                    // console.log(response.data)
                })
                .catch(error => {
                    console.log(error.response)
                })
            },
            sendImg(){
                axios.post('/cerecall/chat/'+this.chatRunning.id,{
                    content: this.contentImg,
                    is_image: 1,
                    sender: 1
                })
                .then(response => {
                    this.content = ''
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error.response)
                })
            },

            report(){
                console.log(this.files)
                let reportImg = new FormData();
                reportImg.append('photo', this.files);

                console.log(reportImg)

                this.dialog_report = false
                axios.post('/cerecall/report/'+this.chatRunning.id,{
                    student_id: this.studentInfo.student_id,
                    teacher_id: this.teacherInfo.teacher_id,
                    report: this.reportMsg,
                    image_url: reportImg
                })
                .then(response=>{
                    this.snackbar = true
                    console.log(response.data)
                })
                .catch(error=>{
                    console.log(error.response)
                })
            },

            previewFiles() {
                this.files = this.$refs.myFiles.files[0]
            }

            // handleFileUpload(){
            //     this.file = this.$refs.file.files[0];
            // },
        },

        created(){
            axios.get('/cerecall/chat/'+this.chatRunning.id)
            .then(response => {
                this.chatItem = response.data.data
            })
            .catch(error => {
                console.log(error.response)
            })
        },

        mounted(){
            axios.get('/cerecall/student/history/running')
            .then(response => {
                this.chatRunning = response.data.data[0]
                this.teacherInfo = response.data.data[0].teacher
                this.studentInfo = response.data.data[0].student
                // console.log(this.cekChat)
                axios.get('/cerecall/chat/'+this.chatRunning.id)
                .then(response => {
                    this.chatItem = response.data.data
                })
                .catch(error => {
                    console.log(error.response)
                })
            })
            .catch(error => {
                console.log(error.response)
            })

            var OneSignal = require('onesignal-node'); 
            var myClient = new OneSignal.Client({      
                userAuthKey: 'NjZjNGVkODMtODllZi00YzQzLWE1YzYtNGM0MTRlODY2NTc3',  
                app: { appAuthKey: 'ZmNhY2QzNmMtNDZiZS00ODkyLTg4ZDktNWViNTc3NzBiYmE5', appId: '2d19fd0a-de81-4b9c-86dc-d85c34c10ca6' }      
            });  

            myClient.viewNotifications('limit=1', function (err, httpResponse, data) {      
                if (httpResponse.statusCode === 200 && !err) {      
                    console.log(data);      
                }      
            }); 
            
            // myClient.viewNotification('notificationId', function (err, httpResponse, data) {      
            //     if (httpResponse.statusCode === 200 && !err) {      
            //         console.log(data);      
            //     }      
            // }); 

        },
    }
</script>


<style>
    .chat_box{
        width:80%;
        margin:0px auto;
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
        padding: 20px;
    }

    .action_chat{
        background:rgb(243, 239, 239);
        padding: 10px
    }

    .file-img{
        margin-top: 2px;
        outline: none;
        float: left
    }
    input.msg{
        background: white;
        padding: 10px 15px;
        border-radius: 18px;
        width:92%;
        float:left;
        outline:none;
        float:left;
    }

    .send{
        outline:none;
        margin: 8px 0px 0px 10px
    }
</style>