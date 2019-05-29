<template>
<div>
    <div style="width:180px;float:right; color:red" v-if="hours <= '00' && minutes <= '00' && seconds <= '00'">
        <!-- dialog time out -->
        <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">Waktu Habis</v-card-title>
            <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
            <v-card-actions>
            <v-btn color="green darken-1" flat @click="dialog = false" block>OK</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <!-- /dialog time out -->

        <h6 class="subheading" style="float:left">Timer :</h6>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px">
            <span>00</span>
        </div>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px">
            <span>00</span>
        </div>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px">
            <span>00</span>
        </div>
        <div class="clear"></div>
    </div>

    <div style="width:180px;float:right;" v-else>
        <h6 class="subheading" style="float:left">Timer :</h6> 
        <div style="border:1px solid #BDBDBD;float:left;padding:8px;">
            <span>{{ hours }}</span>
        </div>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px;">
            <span>{{ minutes }}</span>
        </div>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px;">
            <span>{{ seconds }}</span>
        </div>
        <div class="clear"></div>
    </div>
</div>
</template>


<script>
export default {
    props:['time'],
    data() {
        return {
            dialog:true,
            timer: null,
            totalTime: this.time * 60//konversi ke detik
        }
    },

    methods: {
        startTimer: function() {
            this.timer = setInterval(() => this.countdown(), 1000); //1000ms = 1 second
        },
        
        padTime: function(time){
            return (time < 10 ? '0' : '') + time;
        },
        countdown: function() {
            this.totalTime--;
        }
    },

    mounted() { // start otomatis
        this.startTimer()
    },

    computed: {
        hours: function() {        
            const hours = Math.trunc(this.totalTime / 60 /60) % 24;
            return this.padTime(hours);
        },
        minutes: function(){
            const minutes = Math.trunc(this.totalTime / 60) % 60;
            return this.padTime(minutes);
        },
        seconds: function() {
            const seconds = Math.trunc(this.totalTime - this.minutes) % 60;
            return this.padTime(seconds);
        }
    }
}
</script>
