<template>
    <div class="exam_result">
        <!-- sub content -->
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                
                <!-- leader board -->
                <v-flex md12 sm12 xs12>
                    <v-card>
                        <v-card-text class="px-0"><h6 class="title" style="color:black;margin:4px 20px; text-transform:capitalize">Result Exam</h6></v-card-text>
                    </v-card>
                    <hr>
                    <v-card>
                        <v-tabs v-model="active" color="deep-orange" dark slider-color="blue">
                            <v-tab v-for="n in name_tab" :key="n" ripple>
                                {{ n }}
                            </v-tab>
                            
                            <v-tab-item>
                                <v-card flat>
                                <v-card-text style="text-transform:capitalize;font-size:15px">
                                    <v-layout>
                                        <v-flex md6>
                                            <table>
                                                <tr><td width="200"><b>Skor</b></td><td>{{data.score}}</td></tr>
                                                <tr><td><b>Jawaban Benar</b></td><td>{{data.correct_answered}}</td></tr>
                                                <tr><td><b>Jawaban Salah</b></td><td>{{data.incorrect_answered}}</td></tr>
                                            </table>
                                        </v-flex>
                                        <v-flex md6>
                                            <table>
                                                <tr><td width="200"><b>Tidak Terjawab</b></td><td>{{data.left_answered}}</td></tr>
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
                                    <DetailResult :detail="detail"/>
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
    import DetailResult from "../../../components/cereout-component/DetailResult"
    import Axios from 'axios';

    export default {
        name: 'exam_result',
        props: ["id", "data", "act"],
        components: {
            DetailResult
        },

        data (){
            return {
                detail :[],
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
            Axios.get('/cereouts/result/detail/'+this.id)
            .then(response => {
                this.detail = response.data.data
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
</script>

