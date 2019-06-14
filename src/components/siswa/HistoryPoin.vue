<template>
  <div class="history">
    <v-card>
        <div style="padding:18px 18px 0px 18px">
          <h6 class="title">History</h6>
          <p>Riwayat transaksi</p>
          <hr>
        </div>      
        <div v-show="load_data" style="margin:0px auto; padding-top:40px; width:5%;">
          <v-progress-circular
          :size="40"
          color="primary"
          indeterminate
          ></v-progress-circular>
        </div>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile :key="index" avatar ripple @click="showList(item)">
              <v-list-tile-content>
                <div v-if="item.membership_name != null">
                  <span style="font-size:12px; color:#757575">Membership</span>
                  <v-list-tile-title>{{ item.membership_name }}</v-list-tile-title>
                </div>
                <div v-else>
                  <span style="font-size:12px; color:#757575">Top up</span>
                  <v-list-tile-title>{{ item.nominal }} poin</v-list-tile-title>
                </div>
                <v-list-tile-sub-title>Rp. {{formatPrice(item.nominal)}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>
                  <v-chip color="success" v-if="item.status == 1" text-color="white">
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
    </v-card>
  </div>
</template>

<script>
import Axios from 'axios';
  export default {
    data () {
      return {
        load_data: true,
        items: []
      }
    },

    methods:{
      showList(val){
        // console.log(val)
        if(val.status == 2){
          snap.show()
          snap.pay(val.snap_token, {
            onSuccess: function(result){console.log('success');console.log(result);},
            onPending: function(result){console.log('pending');console.log(result);},
            onError: function(result){console.log('error');console.log(result);},
            onClose: function(){console.log('customer closed the popup without finishing the payment');}
          })
        }
      },

      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
    },

    mounted(){
      Axios.get('/payment/'+this.$store.state.dataUser)
        .then(response => {
            this.load_data = false
            this.items     = response.data.data
            // console.log(response.data)
        })
        .catch(error => {
            console.log(error.response)
        })
    }
  }
</script>
