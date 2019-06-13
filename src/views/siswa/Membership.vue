<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
            <v-card color="#B71C1C">
                <v-card-title style="color:white">
                    <h6 class="title">Membership</h6>
                </v-card-title>
            </v-card>
    
            <v-card>
                <div style="padding:18px 0px;margin:0px 18px;border-bottom:1px solid #D50000">
                    <h6 class="title" style="color:#D50000">Jadilah Member Sekarang!</h6>
                </div>
                <div style="padding:18px;">
                    <div v-show="load_data" style="margin:0px auto; padding-top:40px; width:5%;">
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
                </div>
                <LoadingScreen4 :loading="loadingSubmit"></LoadingScreen4>
        
            </v-card>

            <div id="result-json"></div>

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
                load_data:true,
                loadingSubmit: false,    
                items: [],
            }
        },

        components:{
            LoadingScreen4
        },
 
        mounted(){      
            Axios.get('/master/membership')
            .then(response => {
                this.load_data = false
                console.log(response.data)
                this.items = response.data.data
            })
            .catch(error => {
                console.log(error.response)
            })
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
