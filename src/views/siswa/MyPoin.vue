<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="#B71C1C">
                    <v-layout row wrap>
                        <v-flex md7>
                            <v-card-title style="margin-top:2px; color:white">
                                <h6 class="title" >Cerecoin Saya</h6>&nbsp;:&nbsp;
                                <h4 class="display-1">{{user.balance}}</h4>&nbsp;<span>poin</span>
                            </v-card-title>
                        </v-flex>
                        <v-flex md5>
                            <v-card-title style="float:right">
                                <v-btn small @click="btHistory">History</v-btn>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                </v-card>

                <v-card>
                    <div style="padding:18px">
                        <h6 class="title">Top Up Poin</h6>
                        <p>Silahkan pilih jumlah nominal topup!</p>
                        <hr>
                        <div v-show="load_data" style="margin:0px auto; padding-top:40px; width:5%;">
                            <v-progress-circular
                            :size="40"
                            color="primary"
                            indeterminate
                            ></v-progress-circular>
                        </div>

                        <div v-for="nom in nominals" :key="nom.id" class="card-border">
                            <v-card @click="alertTopUp(nom)" style="cursor:pointer; padding:20px; text-align:center">
                                <h6 class="title" >{{nom.nominal}} poin</h6>
                                <span style="font-size:12px">Rp. {{formatPrice(nom.harga)}}</span>
                            </v-card>
                        </div>

                        <div class="clear"></div>
                        
                        <div id="result-json" style="color:red"></div>
                    </div>
                    <LoadingScreen4 :loading="loadingSubmit"></LoadingScreen4>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import LoadingScreen4 from'../../components/loading-screen/Loading4'
    import Axios from 'axios';

    export default {
        data() {
            return{
                cekMember: '',
                
                text_info: '',
                snackbar: '',

                loadingSubmit:false,
                load_data:true,
                nominals:[],
                items:[],
                ///

                user: [],
            }
        },

        components:{
            LoadingScreen4
        },

        methods:{
            btHistory(){
                return this.$router.push({name: 'myPoin_history'})
            },

            alertTopUp(val) {
                this.$swal({
                    title: 'Apakah Anda Yakin?',
                    text: 'Anda akan melakukan topup saldo sejumlah '+val.nominal+' poin',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    if(result.value) { 
                        return this.postTopUp(val)
                    }
                })
            },

            postTopUp(val){
                this.loadingSubmit=true,
                Axios.post('/payment/create',{
                    user_id: this.user.id,
                    nominal: val.harga,
                    membership_id: val.id,
                    type: 2,
                    coupon_code: ''
                })
                .then(response => {
                    this.loadingSubmit=false
                    snap.show();
                    snap.pay(response.data.snap_token, {
                        onSuccess:(result)=>{
                            this.snackbar  = true,
                            this.text_info = 'Transaksi berhasil dilakukan'
                            return this.$router.push({name: 'myPoin_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        },
                        onPending:(result)=>{
                            this.snackbar  = true,
                            this.text_info = result.status_message + ', silahkan lanjutkan pembayaran !'
                            return this.$router.push({name: 'myPoin_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        },
                        onError:(result)=>{
                            this.snackbar  = true,
                            this.text_info = 'Transaksi gagal dilakukan'
                            return this.$router.push({name: 'myPoin_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        },
                        onClose:()=>{
                            this.snackbar  = true,
                            this.text_info = 'Anda telah menutup halaman pembayaran'
                            return this.$router.push({name: 'myPoin_history', params:{snackB: this.snackbar, textB: this.text_info}})
                        }
                    })
                
                })
                .catch(error => {
                    console.log(error.response)
                })
            },

            formatPrice(value) {
                let val = (value/1).toFixed(0).replace('.', '')
                // let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
        },
 
        mounted(){      
            Axios.get('/auth/user')
            .then(response => {
                this.user = response.data.data
                if(this.user.membership == 0){
                    return this.$router.push({name: 'membership'})
                }
            })
            .catch(error => {
                console.log(error)
            })

            Axios.get('/master/nominal')
            .then(response => {
                this.load_data = false
                this.nominals  = response.data.data
            })
            .catch(error => {
                console.log(error.response)
            })
        },
    }
</script>


<style>
.card-border{
    float:left; 
    padding:10px; 
    width:265px;
}
@media only screen and (max-width: 780px) {
    .card-border{
        width:159px;
    }
}

@media only screen and (max-width: 620px) {
    .card-border{
        width:100%;
    }
}
</style>
