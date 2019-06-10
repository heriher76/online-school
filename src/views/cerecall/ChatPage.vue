<template>
    <div class="cerecall_chat">
        <v-container>
            <div class="chat_box">
                <v-card>
                    <div class="header_chat">
                        <v-card style="padding:10px">
                            <div class="head_info">
                                <div class="img_usr">
                                    <img src="https://picsum.photos/510/300?random" height="100%" width="100%" alt="">
                                </div>
                                    
                                <div style="font-size:18px; margin:12px 0px 0px 8px; float:left">
                                    <b>Bean English {{$route.params.guruId}}</b>
                                </div>

                                <div style="float:right">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">  
                                            <v-btn @click="dialog1=true" icon dark color="light-green">
                                                <v-icon v-on="on">done</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Akhiri</span>
                                    </v-tooltip>
                                    <v-menu :nudge-width="100">
                                        <template v-slot:activator="{ on }" style="margin-bottom:-80px">
                                            <span v-on="on" flat style="cursor:pointer"><v-icon>more_vert</v-icon></span>
                                        </template>
                                        <v-list>
                                        
                                            <v-dialog v-model="dialog_report" persistent max-width="400">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn color="black" flat="" dark v-on="on">Laporkan</v-btn>
                                                </template>
                                                <v-card>
                                                    <v-card-title class="headline">Laporkan Guru</v-card-title>
                                                    
                                                    <v-card-text>
                                                        <v-textarea
                                                            solo
                                                            label="Isi Laporan"
                                                        ></v-textarea>
                                                    </v-card-text>

                                                    <input type="file" style="margin-left:16px">
                                                    
                                                    <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="red" flat @click="dialog_report = false">Batal</v-btn>
                                                    <v-btn color="primary" flat @click="dialog_report = false">Kirim</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>

                                        </v-list>
                                    </v-menu>
                                </div>

                                    <v-dialog v-model="dialog1" persistent max-width="300">
                                        <v-card>
                                            <v-card-title class="headline">Yakin akan diakhiri?</v-card-title>
                                            <v-card-text>Fitur ini akan memotong poin anda secara otomatis.</v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="green darken-1" flat @click="dialog1 = false">Jangan</v-btn>
                                                <v-btn @click="dialog2=true, dialog1=false" flat dark color="light-green">akhiri</v-btn>

                                                <v-dialog v-model="dialog2" persistent max-width="380">
                                                    <v-card>
                                                        <v-card-title class="headline" primary-title>
                                                            Rate Bean English {{$route.params.guruId}}
                                                        </v-card-title>
                                                        <v-card-text>
                                                            If you enjoy, please take a few seconds to rate your experience with your teacher. It really helps!
                                                            <div class="text-xs-center mt-5">
                                                                <div style="display:inline-block;">
                                                                    <star-rating 
                                                                        inactive-color="#E0E0E0"
                                                                        active-color="#FFC107"
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
                                                                    name="input-7-4"
                                                                    label="Berikan masukan untuk gurumu"
                                                                ></v-textarea>
                                                            </div>
                                                        </v-card-text>
                                                        <v-divider></v-divider>
                                                        <v-card-actions class="justify-space-between">
                                                            <v-btn @click="dialog2=false" flat>No Thanks</v-btn>
                                                            <v-btn @click="dialog2=false" color="primary" flat>Rate Now</v-btn>
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
                    <div class="live_chat">
                        hello
                    </div>

                    <!-- <v-text-field
                        v-model="message"
                        :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
                        :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
                        :prepend-icon="icon"
                        box
                        clear-icon="mdi-close-circle"
                        clearable
                        label="Message"
                        type="text"
                        @click:append="toggleMarker"
                        @click:append-outer="sendMessage"
                        @click:prepend="changeIcon"
                        @click:clear="clearMessage"
                    ></v-text-field> -->
                    <div class="action_chat">
                        <input type="text" placeholder="ketik pesan">
                    </div>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<style>
    .chat_box{
        width:80%;
        margin:0px auto;
    }

    
    @media only screen and (max-width: 650px) {
        .chat_box{
            width:100%;
        }
    }

    .header_chat{

    }

    .head_info{

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
        margin: 20px;
    }

    .action_chat{
        background:rgb(243, 239, 239);
        padding: 10px
    }

    .action_chat input{
        background: white;
        padding: 5px 10px;
        width: 100%;
    }
</style>


<script>
    import StarRating from 'vue-star-rating'
    export default {
        components: {
            StarRating,
        },

        data () {
            return {            
                dialog_report:false,
                dialog1: false,
                dialog2: false,
                textArea: false,
                rating: 3,
                currentRating: "No Rating",

                 password: 'Password',
                    show: false,
                    message: 'Hey!',
                    marker: true,
                    iconIndex: 0,
                    icons: [
                        'mdi-emoticon',
                        'mdi-emoticon-cool',
                        'mdi-emoticon-dead',
                        'mdi-emoticon-excited',
                        'mdi-emoticon-happy',
                        'mdi-emoticon-neutral',
                        'mdi-emoticon-sad',
                        'mdi-emoticon-tongue'
                    ]
            }
        },
        methods: {
            showTextarea(){
                this.textArea = true
            },
            

            setRating: function(rating) {
                this.textArea = true
                // this.rating = "You have Selected: " + rating + " stars";
            },

            toggleMarker () {
                this.marker = !this.marker
            },
            sendMessage () {
                this.resetIcon()
                this.clearMessage()
            },
            clearMessage () {
                this.message = ''
            },
            resetIcon () {
                this.iconIndex = 0
            },
            changeIcon () {
                this.iconIndex === this.icons.length - 1
                ? this.iconIndex = 0
                : this.iconIndex++
            }
        },

         computed: {
            icon () {
                return this.icons[this.iconIndex]
            }
        },
    }
</script>