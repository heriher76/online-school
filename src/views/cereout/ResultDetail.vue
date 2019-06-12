<template>
    <div class="result-detail">
        <!-- sub content -->
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <!-- sidebar -->
                <v-flex md3 sm12 xs12>
                    <v-card>
                        <SideBar class="hidden-sm-and-down" style="float:left;"/>
                    </v-card>
                </v-flex>
                <!-- /sidebar -->
                
                <!-- leader board -->
                <v-flex md9 sm12 xs12>
                    <v-card>
                        <div style="float:left; margin-top:9px">
                            <v-btn color="primary" @click="$router.go(-1)" icon small dark>
                                <v-icon>keyboard_arrow_left</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text class="px-0"><h6 class="title" style="color:black;margin:4px 20px; text-transform:capitalize">Result Detail For {{data.tryout.name}}</h6></v-card-text>
                    </v-card>
                    <hr>
                    <v-card>
                        <v-tabs v-model="active" color="#B71C1C" dark slider-color="blue">
                            <v-tab v-for="n in name_tab" :key="n" ripple>
                                {{ n }}
                            </v-tab>
                            
                            <v-tab-item>
                                <v-card flat>
                                <v-card-text style="text-transform:capitalize;font-size:15px">
                                    <v-layout>
                                        <v-flex md6>
                                            <table>
                                                <tr><td width="200"><b>Nama Tryout</b></td><td>{{data.tryout.name}}</td></tr>
                                                <tr><td><b>Durasi</b></td><td>{{data.my_time}} Menit</td></tr>
                                                <tr><td><b>Skor</b></td><td>{{data.score}}</td></tr>
                                                <tr><td><b>Total Soal Terjawab</b></td><td>{{data.total_answer}}</td></tr>
                                            </table>
                                        </v-flex>
                                        <v-flex md6>
                                            <table>
                                                <tr><td width="200"><b>Jawaban Benar</b></td><td>{{data.correct_answered}}</td></tr>
                                                <tr><td><b>Jawaban Salah</b></td><td>{{data.incorrect_answered}}</td></tr>
                                                <tr><td><b>left_answered</b></td><td>{{data.left_answered}}</td></tr>
                                                <tr><td><b>Status Hasil</b></td>
                                                    <td>
                                                        <label v-if="data.result_status=='Lulus'" style="color:#0091EA">{{data.result_status}}</label>
                                                        <label v-else style="color:red">{{data.result_status}}</label>
                                                    </td>
                                                </tr>
                                            </table>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>

                                </v-card>
                            </v-tab-item>

                            <v-tab-item>
                                <v-card flat>
                                    <DetailResult :id="id"/>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>
                </v-flex>
                <!-- /leader board -->
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>


<script>
import SideBar from "../../components/cereout-component/SideBar"
import DetailResult from "../../components/cereout-component/DetailResult"

import Axios from 'axios';

export default {
    name: 'result-detail',
    props:['id','data', 'act'],
    components: {
        SideBar,
        DetailResult
    },
    data () {
        return {
            active: this.act,
            name_tab : [
                'Detail', 
                'Pembahasan'        
            ]
        }
    },
    methods: {
        next () {
            const active = parseInt(this.active)
            this.active = (active < 2 ? active + 1 : 0)
        }
    },

    mounted(){
        if(this.data==null){
            return this.$router.push({name: 'my_results'})
        }
    }
}
</script>
