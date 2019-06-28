<template>
    <div class="history_call">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card class="elevation-5">
                        <div class="nav-result">
                            <ul>
                                <li><router-link :to="{name: 'cerecall'}">CARI GURU</router-link></li>
                                <li><router-link class="active" :to="{name: 'cerecall_history'}">RIWAYAT</router-link></li>
                            </ul>
                        </div>
                    </v-card>

                    <div v-show="load_data" style="margin:150px auto; width:5%;">
                        <v-layout column justify-center align-center>
                            <hollow-dots-spinner
                            :animation-duration="1000"
                            :dot-size="15"
                            :dots-num="3"
                            color="#ff1d5e"
                            />
                        </v-layout>
                    </div>
                    
                    <v-card v-show="listHistory" style="min-height:400px;" flat>
                        <div style="position: absolute;top:0px; left:0; width:100%; height:100%; overflow:auto">
                            <v-card style="margin:10px" class="elevation-8" v-for="item in history" :key="item.id">
                                <v-list style="padding:20px">
                                    <v-list-tile>
                                        <div style="width:60px;height:60px;margin-right:15px;border:1px solid #E0E0E0;border-radius:100%">
                                            <v-img
                                                v-if="item.teacher.teacher_photo!=null"
                                                style="border-radius:100%;" width="100%" height="100%"
                                                :src="item.teacher.teacher_photo"
                                            ></v-img>
                                        </div>
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ item.teacher.teacher_name }}</v-list-tile-title>
                                            <span style="font-size:14px; color:#757575">{{item.lesson}}</span>
                                        </v-list-tile-content>

                                        <v-list-tile-action>
                                            <v-list-tile-action-text>
                                                 <div style="float:right">
                                                    <v-chip color="info" v-if="item.status == 1" text-color="white">
                                                        Menunggu Konfirmasi
                                                    </v-chip>
                                                    <v-chip v-else-if="item.status == 2" color="warning" text-color="white">
                                                        Sedang Berlangsung
                                                    </v-chip> 
                                                    <v-chip v-else-if="item.status == 3" color="error" text-color="white">
                                                        Ditolak
                                                    </v-chip> 
                                                    <v-chip v-else-if="item.status == 4" color="success" text-color="white">
                                                        Selesai
                                                    </v-chip> 
                                                </div>
                                                <br>
                                                <span style="float:right;font-size:12px; color:#757575">{{moment(item.created_at).format('DD MMM YYYY, hh:mm')}}</span>
                                            </v-list-tile-action-text>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </v-list>
                            </v-card>        
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { HollowDotsSpinner } from 'epic-spinners'
export default {

    components:{
        HollowDotsSpinner
    },

    data() {
        return {
            listHistory:false,
            load_data:true,
            history: [],
            // teacher: []
        }
    },

    methods:{
        moment
    },

    mounted(){
        axios.get('/cerecall/student/history')
        .then(response => {
            this.load_data   = false
            this.listHistory = true
            this.history     = response.data.data
            // this.teacher = response.data.data.teacher
        })
        .catch(error => {
            console.log(error.response)
        })
    }
    
}
</script>


<style>
    .nav-result{
        background: #B71C1C;
        padding:10px;
    }
    .nav-result ul li{
        display: inline;
    }
    .nav-result ul li a{
        background:#D32F2F;
        color: white;
        padding: 12px 30px;
        margin: 0px 2px;
        text-decoration: none;
    }
    .nav-result ul li a.active{
        background:#E53935;
    }
    .nav-result ul li a:hover{
        background:#E53935;
    }
</style>
