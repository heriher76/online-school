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
                
                <v-card v-for="nom in nominals" :key="nom.id" @click="alertTopUp(nom)" style="float:left; text-align:center; cursor:pointer; padding:15px 25px; margin:11px">
                    <h6 class="title" >{{nom.nominal}} poin</h6>
                    <span style="font-size:12px">Rp. {{formatPrice(nom.harga)}}</span>
                </v-card>

                <div class="clear"></div>
            </div>
        <LoadingScreen4 :loading="loadingSubmit"></LoadingScreen4>
        <!-- <v-btn @click="payButton">Pay!</v-btn> -->

        <div id="result-json" style="color:red"></div>
     
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
                text_info: '',
                snackbar: false,
                loadingSubmit:false,
                load_data:true,
                nominals:[]
            }
        },
        mounted(){
            Axios.get('/master/nominal')
            .then(response => {
                this.load_data = false
                this.nominals  = response.data.data
                // console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        },

        methods:{
            payButton(){
                snap.pay('6d068adc-c368-42a5-842a-8d6f9f660c3a', {
                    onSuccess: function(result){
                        console.log('success')
                        console.log(result)
                    },
                    onPending: function(result){
                        document.getElementById('result-json').innerHTML = result.transaction_status;
                        
                        console.log('pending');
                        console.log(result);
                    },
                    onError: function(result){
                        document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
                        
                        console.log('error');
                        console.log(result);
                    },
                    onClose: function(){console.log('customer closed the popup without finishing the payment');
                    }
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
                    nominal: val.nominal,
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

