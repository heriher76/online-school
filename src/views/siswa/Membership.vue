<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
            <v-card color="#B71C1C" style="z-index:1;margin:-10px">
                <v-layout row wrap>
                    <v-flex md7>
                        <v-card-title style="margin-top:10px; color:white">
                            <h6 class="title">Membership</h6>
                        </v-card-title>
                    </v-flex>
                    <v-flex md5>
                        <v-card-title style="float:right">
                            <v-btn v-if="history!=0" small @click="btHistory">History</v-btn>
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-card>
    
            <v-card>
                <div style="padding:18px 0px;margin:0px 18px;border-bottom:1px solid #D50000">
                    <span style="color:#D50000">Anda Belum Menjadi Member!</span>
                    <h6 class="title" style="color:#D50000">Jadilah Member Sekarang!</h6>
                </div>
                <div style="padding:18px;">
                    <div v-show="load_data" style="margin:0px auto; padding-top:20px; width:5%;">
                        <v-progress-circular
                        :size="40"
                        color="primary"
                        indeterminate
                        ></v-progress-circular>
                    </div>
                    
                    <v-layout>
                        <v-flex md12>
                            <v-card v-for="item in items" :key="item.id" style="padding:15px;margin:11px">
                                <div style="float:left">
                                    <h5 class="headline" style="padding:8px;color:#D50000"><b>{{item.name}}</b></h5>
                                </div>
                                <div style="float:right">
                                    <v-btn color="#D50000" @click="detail(item)" dark>Beli</v-btn>
                                </div>
                                <div class="clear"></div>
                            </v-card>
                        </v-flex>
                    </v-layout>

                    <div class="clear"></div>
                </div>
                <LoadingScreen4 :loading="loadingSubmit"></LoadingScreen4>        
            </v-card>

            </v-flex>
            
            <!-- ringkasan tagihan -->
            <v-flex >
                <v-card v-show="showDetail" style="height:100%;min-width:250px; margin:0px 5px">
                    <v-card-title style="font-size:18px"><b>Detail Tagihan</b></v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="color:#424242">
                        <h6 class="title">{{ringkasan.name}}</h6>
                        <div style="margin-top:5px">
                            <div style="width:50%;float:left">
                                <span>Harga</span>    
                            </div>
                            <div style="width:50%;float:left">
                                <b>: Rp. {{formatPrice(ringkasan.price)}}</b>    
                            </div>
                            <div class="clear"></div>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions v-show="actKupon">
                        <a @click="showKupon" style="margin-left:6px;color:red"><b>Gunakan voucher</b></a>
                    </v-card-actions>
                    <v-card-actions v-show="actBayar">
                        <v-btn dark color="success" block @click="buyMember(ringkasan)">Bayar</v-btn>
                    </v-card-actions>
        
                    <v-card-actions v-show="fieldKupon" style="margin:0px 5px">
                        <v-text-field
                            style="margin-top:5px"
                            label="kode kupon"
                            v-model="kuponKode"
                        ></v-text-field>
                        <v-btn dark color="success" block @click="postVoucher(ringkasan)">Pakai</v-btn>
                    </v-card-actions>

                    <div v-show="responKupon">
                        <p v-if="resPayment.isCoupon == false" style="color:orange;margin:0px 15px">kupon tidak dapat digunakan</p>
                        <p v-else style="color:#42A5F5;margin:0px 15px">kupon berhasil digunakan</p>
                        <v-card-actions>
                            <v-btn dark color="success" block @click="lanjutBayar">Lanjut Pembayaran</v-btn>
                        </v-card-actions>
                    </div>
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
        data() {
            return{
                text_info: '',
                snackbar: '',

                history: [],

                responKupon: false,
                actKupon: true,
                actBayar: true,
                fieldKupon:false,
                showDetail:false,
                ringkasan:[],
                kuponKode: '',
                resPayment: [],

                dialog:false,
                load_data:true,
                loadingSubmit: false,    
                items: [],
                user: []
            }
        },

        components:{
            LoadingScreen4
        },
 
        mounted(){     
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

            Axios.get('/master/membership')
            .then(response => {
                this.load_data = false
                // console.log(response.data)
                this.items = response.data.data
            })
            .catch(error => {
                console.log(error.response)
            })

            // get history
            Axios.get('/payment/'+this.$store.state.dataUser)
            .then(response => {
                this.load_data = false
                this.history   = response.data.data
                // console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        },

        methods:{
            btHistory(){
                return this.$router.push({name: 'membership_history'})
            },

            detail(val){
                this.showDetail = true
                this.ringkasan  = val
            },
            showKupon(){
                this.actBayar   = false
                this.actKupon   = false
                this.fieldKupon = true
            },

            postVoucher(val){
                this.loadingSubmit=true,
                Axios.post('/payment/create',{
                    user_id: this.$store.state.dataUser,
                    nominal: val.price,
                    membership_id: val.id,
                    type: 1,
                    coupon_code: this.kuponKode 
                })
                .then(response => {
                    this.actKupon      = true
                    this.fieldKupon    = false
                    this.loadingSubmit = false
                    this.responKupon   = true
                    this.resPayment    = response.data
                })
                .catch(error => {
                    console.log(error.response)
                })
            },

            lanjutBayar(){
                snap.show();
                snap.pay(this.resPayment.snap_token, {
                        onSuccess:(result)=>{
                            this.snackbar  = true,
                            this.text_info = 'Transaksi berhasil dilakukan'
                            return this.$router.push({name: 'membership_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        },
                        onPending:(result)=>{
                            this.snackbar  = true,
                            this.text_info = result.status_message + ', silahkan lanjutkan pembayaran !'
                            return this.$router.push({name: 'membership_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        },
                        onError:(result)=>{
                            this.snackbar  = true,
                            this.text_info = 'Transaksi gagal dilakukan'
                            return this.$router.push({name: 'membership_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        },
                        onClose:()=>{
                            this.snackbar  = true,
                            this.text_info = 'Anda telah menutup halaman pembayaran'
                            return this.$router.push({name: 'membership_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        }
                })
            },
            
            buyMember(val){
                var n = 'cek'
                this.loadingSubmit=true,
                Axios.post('/payment/create',{
                    user_id: this.$store.state.dataUser,
                    nominal: val.price,
                    membership_id: val.id,
                    type: 1,
                    coupon_code: ''
                })
                .then(response => {
                    this.loadingSubmit=false
                    snap.show();
                    snap.pay(response.data.snap_token, {
                        onSuccess:(result)=>{
                            this.snackbar  = true,
                            this.text_info = 'Transaksi berhasil dilakukan'
                            return this.$router.push({name: 'membership_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        },
                        onPending:(result)=>{
                            this.snackbar  = true,
                            this.text_info = result.status_message + ', silahkan lanjutkan pembayaran !'
                            return this.$router.push({name: 'membership_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        },
                        onError:(result)=>{
                            this.snackbar  = true,
                            this.text_info = 'Transaksi gagal dilakukan'
                            return this.$router.push({name: 'membership_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        },
                        onClose:()=>{
                            this.snackbar  = true,
                            this.text_info = 'Anda telah menutup halaman pembayaran'
                            return this.$router.push({name: 'membership_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        }
                    })
                })
                .catch(error => {
                    console.log(error.response)
                })
            },

            formatPrice(value) {
                let val = (value/1).toFixed(0).replace('.', '')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
        }
    }
</script>
