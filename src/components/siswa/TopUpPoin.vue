<template>
    <div class="topup_poin">
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
                
                <div v-show="cardNominal" v-for="nom in nominals" :key="nom.id" class="card-border">
                    <v-card @click="alertTopUp(nom)" style="cursor:pointer; padding:20px; text-align:center">
                        <h6 class="title" >{{nom.nominal}} poin</h6>
                        <span style="font-size:12px">Rp. {{formatPrice(nom.harga)}}</span>
                    </v-card>
                </div>

                <v-layout v-show="cardMember">
                    <v-flex md12>
                        <v-card v-for="item in items" :key="item.id" style="padding:15px;margin:11px">
                            <div style="float:left">
                                <h6 class="title" style="color:#D50000">{{item.name}}</h6>
                                <span style="font-size:12px; color:#D50000">Rp. {{ formatPrice(item.price) }}</span>
                            </div>
                            <div style="float:right">
                                <v-btn color="#D50000" @click="alertBuy(item)" dark>Beli</v-btn>
                            </div>
                            <div class="clear"></div>
                        </v-card>
                    </v-flex>
                </v-layout>

                <div class="clear"></div>
                
                <div id="result-json" style="color:red"></div>
            </div>
        <LoadingScreen4 :loading="loadingSubmit"></LoadingScreen4>
        <!-- <v-btn @click="payButton">Pay!</v-btn> -->
        </v-card>
    </div>
</template>

<script>
    import LoadingScreen4 from'../../components/loading-screen/Loading4'
    import Axios from "axios"
    export default {
        props:["data"],
        components:{
            LoadingScreen4
        },
        data(){
            return {
                cardNominal: false,
                cardMember: false,

                cekMember: [],
                text_info: '',
                snackbar: false,
                loadingSubmit:false,
                load_data:true,
                nominals:[],
                items:[]
            }
        },
        mounted(){
            Axios.get('/auth/user')
            .then(response => {
                this.cekMember = response.data.data.membership
                console.log(this.cekMember)
            })
            .catch(error => {
                console.log(error.response)
            })

            if(this.cekMember == 0){
                Axios.get('/master/membership')
                .then(response => {
                    this.load_data = false
                    this.cardMember= true
                    this.items     = response.data.data
                })
                .catch(error => {
                    console.log(error.response)
                })
            }
            else if(this.cekMember == 1){
                Axios.get('/master/nominal')
                .then(response => {
                    this.load_data   = false
                    this.cardNominal = true
                    this.nominals    = response.data.data
                })
                .catch(error => {
                    console.log(error.response)
                })
            }
        },

        methods:{
            alertBuy(val) {
                this.$swal({
                    title: 'Apakah Anda Yakin?',
                    text: 'Anda akan membeli paket '+val.name,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    if(result.value) { 
                        return this.buyMember(val)
                    }
                })
            },

            buyMember(val){
                // this.snackbar  = true
                // this.text_info = 'Success'
                this.loadingSubmit=true,
                Axios.post('/payment/create',{
                    user_id: this.$store.state.dataUser,
                    nominal: val.price,
                    membership_id: val.id,
                    type: 1
                })
                .then(response => {
                    this.loadingSubmit=false
                    snap.show();
                    snap.pay(response.data.snap_token, {
                        onSuccess: function(result){
                            document.getElementById('result-json').innerHTML = result.status_message;
                            console.log('success')
                            console.log(result)
                        },
                        onPending: function(result){
                            document.getElementById('result-json').innerHTML = result.status_message;                        
                            console.log('pending');
                            console.log(result);
                        },
                        onError: function(result){
                            document.getElementById('result-json').innerHTML = result.status_message;     
                            console.log('error');
                            console.log(result);
                        },
                        onClose: function(){
                            document.getElementById('result-json').innerHTML = 'customer closed the popup without finishing the payment'
                            console.log('customer closed the popup without finishing the payment');
                        }
                    })
                })
                .catch(error => {
                    console.log(error.response)
                })
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
                        return this.topUp(val)
                    }
                })
            },

            topUp(val){
                // this.snackbar  = true
                // this.text_info = 'Success'
                this.loadingSubmit=true,
                Axios.post('/payment/create',{
                    user_id: this.data.id,
                    nominal: val.harga,
                    type: 2
                })
                .then(response => {
                    this.loadingSubmit=false
                    snap.show();
                    snap.pay(response.data.snap_token, {
                        onSuccess: function(result){
                            document.getElementById('result-json').innerHTML = result.status_message;
                            console.log('success')
                            console.log(result)
                        },
                        onPending: function(result){
                            document.getElementById('result-json').innerHTML = result.status_message;                        
                            console.log('pending');
                            console.log(result);
                        },
                        onError: function(result){
                            document.getElementById('result-json').innerHTML = result.status_message;     
                            console.log('error');
                            console.log(result);
                        },
                        onClose: function(){
                            document.getElementById('result-json').innerHTML = 'customer closed the popup without finishing the payment'
                            console.log('customer closed the popup without finishing the payment');
                        }
                    })
                    // window.open("https://app.sandbox.veritrans.co.id/snap/v2/vtweb/"+response.data.snap_token)
                    // window.open("https://app.sandbox.veritrans.co.id/snap/v2/vtweb/"+response.data.snap_token,
                    //             'my_window', 
                    //             'width=1600, height=620, resizable=no',
                    //             '_blank'
                    //             )
                })
                .catch(error => {
                    console.log(error.response)
                })
            },

            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
        }
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
