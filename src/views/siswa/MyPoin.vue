<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
            <v-card color="#B71C1C">
                <v-layout row wrap>
                    <v-flex md7>
                        <v-card-title style="margin-top:2px; color:white">
                            <h6 class="title" >Dompet Saya</h6>&nbsp;:&nbsp;
                            <h4 class="display-1">{{user.balance}}</h4>&nbsp;<span>poin</span>
                        </v-card-title>
                    </v-flex>
                    <v-flex md5>
                        <v-card-title style="float:right">
                            <v-btn small color="white" v-show="btTopUp" @click="Up">Top up</v-btn>
                            <v-btn small v-show="btHistory" @click="His">History</v-btn>
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-card>

            <TopUp :data="user" v-show="topUp"/>
            <History v-show="history"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import TopUp from "../../components/siswa/TopUpPoin"
    import History from "../../components/siswa/HistoryPoin"
    import Axios from 'axios';

    export default {
        data() {
            return{
                user: [],
                btTopUp: false,
                btHistory:true,

                topUp: true,
                history: false,
            }
        },

        components:{
            History,
            TopUp
        },

        methods:{
            Up(){
                this.topUp     = true
                this.history   = false
                this.btTopUp   = false 
                this.btHistory = true
            },

            His(){
                this.topUp     = false
                this.history   = true
                this.btTopUp   = true
                this.btHistory = false
            }
        },
 
        mounted(){      
            Axios.get('/auth/user')
            .then(response => {
                this.user = response.data.data
            })
            .catch(error => {
                console.log(error)
            })
        },
    }
</script>
