<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-layout row wrap>
                    <v-flex md6>
                        <v-card-title style="margin-top:2px">
                            <h6 class="title" style="color:orange">My Poin</h6>&nbsp;<span style="color:orange">:</span>&nbsp;
                            <h4 class="display-1" style="color:orange">0</h4>
                        </v-card-title>
                    </v-flex>
                    <v-flex md6>
                        <v-card-title style="float:right">
                            <v-btn small @click="topUp=true, history=false">Top up</v-btn>
                            <v-btn small  @click="history=true, topUp=false">History</v-btn>
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-card>

            <TopUp v-show="topUp"/>

            <History v-show="history"/>
            <!-- <v-card>
                
                cek
            </v-card> -->
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import TopUp from "../../components/siswa/TopUpPoin"
    import History from "../../components/siswa/HistoryPoin"

    export default {
        data() {
            return{
                topUp: false,
                history: false
            }
        },

        components:{
            History,
            TopUp
        }   
    }
</script>
