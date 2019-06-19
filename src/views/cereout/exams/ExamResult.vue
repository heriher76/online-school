<template>
    <div class="exam_result">
        <!-- sub content -->
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <!-- leader board -->
                <v-flex md12 sm12 xs12>
                    <v-card>
                        <div style="float:left">
                            <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px; text-transform:capitalize">Hasil Tryout</h6></v-card-text>
                        </div>
                        <v-btn style="float:right;margin:13px 20px;" color="warning" @click="close">Tutup</v-btn>
                        <div class="clear"></div>
                    </v-card>
                    <hr>
                    <!-- <v-card> -->
                        <v-tabs color="#B71C1C" dark v-model="active" slider-color="orange">
                            <v-tab v-for="n in name_tab" :key="n" ripple style="margin:0px 2px 0px 5px;background:#D32F2F">
                                {{ n }}
                            </v-tab>
                            
                            <v-tab-item>
                                <v-card flat style="height:400px;padding-top:50px">
                                    <v-card style="width:600px;margin:0px auto; padding:20px">
                                    <v-layout style="text-transform:capitalize;font-size:16px;">
                                        <v-flex md6 sm12 xs12>
                                            <table>
                                                <tr><td width="150"><b>Jawaban Benar</b></td><td>{{data.correct_answered}}</td></tr>
                                                <tr><td><b>Jawaban Salah</b></td><td>{{data.incorrect_answered}}</td></tr>
                                                <tr><td><b>Tidak Dijawab</b></td><td>{{data.left_answered}}</td></tr>
                                                
                                            </table>
                                        </v-flex>
                                        
                                        <v-flex md6 sm12 xs12>
                                            <table>
                                                <tr><td width="100"><b>Nilai</b></td><td>{{data.score}}</td></tr>
                                                <tr><td><b>Status</b></td>
                                                    <td>
                                                        <label v-if="data.result_status=='Lulus'" style="color:#0091EA">{{data.result_status}}</label>
                                                        <label v-else style="color:red">{{data.result_status}}</label>
                                                    </td>
                                                </tr>
                                            </table>
                                        </v-flex>
                                    </v-layout>
                                    </v-card>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item>
                                <v-card flat>
                                    <ResultExam :id="id"/>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    <!-- </v-card> -->
                    
                </v-flex>
                <!-- /leader board -->
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import ResultExam from "../../../components/cereout-component/ResultExam"
    import Axios from 'axios';

    export default {
        name: 'exam_result',
        props: ["id", "data", "act"],
        components: {
            ResultExam
        },

        data (){
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
            },

            close(){
                window.close()
            }
        },
    }
</script>

