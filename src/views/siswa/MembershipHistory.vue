<template>
    <v-container>
        <v-snackbar
            v-model="snackbar"
            :multi-line="'multi-line'"
            :right="'right'"
            :timeout="6000"
            :top="'top'"
            color="rgba(0,0,0,0.5)"
        >
            {{ text_info }}
            <v-btn :color="'col'" flat @click="snackbar = false">
            Close
            </v-btn>
        </v-snackbar>

        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
            <v-card color="#B71C1C" style="z-index:1;margin:-10px">
                <v-card-title style="margin-top:0px; color:white">
                    <v-btn color="white" @click="$router.push({name:'membership'})" icon small >
                        <v-icon color="#B71C1C">keyboard_arrow_left</v-icon>
                    </v-btn>
                    <h6 class="title">Riwayat Transaksi</h6>
                </v-card-title>
            </v-card>
    
            <v-card>
                <div style="padding:18px 18px 0px 18px">
                <h6 class="title">History</h6>
                <p>Riwayat transaksi pembelian member.</p>
                <hr>
                </div>      
                <div v-show="load_data" style="margin:0px auto; padding:20px; width:5%;">
                    <v-progress-circular
                        :size="40"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </div>
                <v-list two-line v-show="listCard">
                <template v-for="(item, index) in items">
                    <v-list-tile :key="index" avatar ripple @click="showPayment(item)">
                    <v-list-tile-content>
                        <div v-if="item.nominal == null">
                        <span style="font-size:12px; color:#757575">Membership</span>
                        <v-list-tile-title>{{ item.membership_name }}</v-list-tile-title>
                        </div>
                        <div v-else>
                        <span style="font-size:12px; color:#757575">Top up</span>
                        <v-list-tile-title>{{ item.membership_name }} poin</v-list-tile-title>
                        </div>
                        <v-list-tile-sub-title>Rp. {{formatPrice(item.harga)}}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-list-tile-action-text>
                        <v-chip color="info" v-if="item.status == 0" text-color="white">
                            Belum Selesai
                        </v-chip>
                        <v-chip color="success" v-else-if="item.status == 1" text-color="white">
                            Sukses
                        </v-chip>
                        <v-chip v-else-if="item.status == 2" color="warning" text-color="white">
                            Tertunda
                        </v-chip> 
                        <v-chip v-else-if="item.status == 4" color="grey" text-color="white">
                            Kadaluarsa
                        </v-chip> 
                        </v-list-tile-action-text>
                        <v-list-tile-action-text><span style="font-size:12px; color:#757575">{{ item.created_at }}</span></v-list-tile-action-text>
                    </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
                </template>
                </v-list>
                <LoadingScreen4 :loading="loadingSubmit"></LoadingScreen4>    
            </v-card>
            </v-flex>
            <!-- /ringkasan tagihan -->
        </v-layout>
    </v-container>
</template>

<script>  
    import LoadingScreen4 from'../../components/loading-screen/Loading4'   
    import Axios from 'axios';

    export default {
        props: ["snackB", "textB"],
        components:{
            LoadingScreen4
        },
        data() {
            return{
                loadingSubmit:false,
                text_info: '',
                snackbar: false,

                load_data: true,
                listCard: false,
                items: [],
                user: []
            }
        },

        methods:{
            showPayment(val){
                this.loadingSubmit = true
                if(val.status == 0){
                    Axios.put('/payment/update/'+val.id)
                    .then(response => {
                        // console.log(response.data)
                        this.loadingSubmit = false
                        snap.show()
                        snap.pay(response.data.snap_token, {
                            onSuccess:(result)=>{
                                this.snackbar  = true,
                                this.text_info = 'Transaksi berhasil dilakukan'
                                this.updateHistory()
                            },
                            onPending:(result)=>{
                                this.snackbar  = true,
                                this.text_info = 'Transaksi tertunda' + ', silahkan lanjutkan pembayaran !'
                                this.updateHistory()
                            },
                            onError:(result)=>{
                                this.snackbar  = true,
                                this.text_info = 'Transaksi gagal dilakukan'
                                this.updateHistory()
                            },
                            onClose:()=>{
                                this.snackbar  = true,
                                this.text_info = 'Anda telah menutup halaman pembayaran'
                                this.updateHistory()
                            }
                        })
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
                }else if(val.status == 2){
                    this.loadingSubmit = false
                    snap.show()
                    snap.pay(val.snap_token, {
                        onSuccess:(result)=>{
                            this.snackbar  = true,
                            this.text_info = 'Transaksi berhasil dilakukan'
                            this.updateHistory()
                        },
                        onPending:(result)=>{
                            this.snackbar  = true,
                            this.text_info = 'Transaksi tertunda' + ', silahkan lanjutkan pembayaran !'
                            this.updateHistory()
                        },
                        onError:(result)=>{
                            this.snackbar  = true,
                            this.text_info = 'Transaksi gagal dilakukan'
                            this.updateHistory()
                        },
                        onClose:()=>{
                            this.snackbar  = true,
                            this.text_info = 'Anda telah menutup halaman pembayaran'
                            this.updateHistory()
                        }
                    })
                }
            },

            updateHistory(){
                this.listCard  = false,
                this.load_data = true
                Axios.get('/payment/'+this.$store.state.dataUser)
                .then(response => {
                    this.load_data = false
                    this.listCard  = true
                    this.items     = response.data.data
                    // console.log(response.data)
                })
                .catch(error => {
                    console.log(error.response)
                })
            },

            formatPrice(value) {
                let val = (value/1).toFixed(0).replace('.', '')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
        },

        mounted(){
            this.snackbar = this.snackB
            this.text_info= this.textB

            Axios.get('/auth/user')
            .then(response => {
                this.user = response.data.data
                if(this.user.membership == 1){
                    return this.$router.push({name: 'my_poin'})
                }
            })
            .catch(error => {
                console.log(error)
            })

            Axios.get('/payment/'+this.$store.state.dataUser)
            .then(response => {
                this.load_data = false
                this.listCard  = true
                this.items     = response.data.data
            })
            .catch(error => {
                console.log(error.response)
            })
        }
    }
</script>
