<template>
    <div class="exam_result">
        <!-- sub content -->
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <!-- leader board -->
                <v-flex md12 sm12 xs12>
                    <v-card>
                        <div style="float:left">
                            <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px; text-transform:capitalize">Result Exam</h6></v-card-text>
                        </div>
                        <v-btn style="float:right;margin:13px 20px;" flat color="warning" @click="close">close</v-btn>
                        <div class="clear"></div>
                    </v-card>
                    <hr>
                    <v-card>
                        <v-tabs v-model="active" color="#B71C1C" dark slider-color="blue">
                            <v-tab v-for="n in name_tab" :key="n" ripple>
                                {{ n }}
                            </v-tab>
                            
                            <v-tab-item>
                                <v-layout>    
                                <v-flex xs12 sm9 offset-sm2>
                                    <v-card flat>
                                    <v-card-text style="text-transform:capitalize;font-size:16px">
                                        <v-layout>
                                            <v-flex md6>
                                                <table>
                                                    <tr><td width="200"><b>Nilai</b></td><td>{{data.score}}</td></tr>
                                                    <tr><td><b>Jawaban Benar</b></td><td>{{data.correct_answered}}</td></tr>
                                                    <tr><td><b>Jawaban Salah</b></td><td>{{data.incorrect_answered}}</td></tr>
                                                </table>
                                            </v-flex>
                                            {{data}}
                                            <v-flex md6>
                                                <table>
                                                    <tr><td width="200"><b>Tidak Dijawab</b></td><td>{{data.left_answered}}</td></tr>
                                                    <tr><td><b>Status</b></td>
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
                                </v-flex>
                                </v-layout>
                            </v-tab-item>

                            <v-tab-item>
                                <v-card flat>
                                    <ResultExam :id="id"/>
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

