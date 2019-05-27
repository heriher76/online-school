<template>
    <div style="width:180px;float:right; color:red" v-if="hours <= '00' && minutes <= '00' && seconds <= '00'">
        
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <h6 class="subheading" style="float:left">Timer :</h6>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px;">
            <span>00</span>
        </div>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px">
            <span>00</span>
        </div>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px">
            <span>00</span>
        </div>
        <div class="clear"></div>
    </div>

    <div style="width:180px;float:right;" v-else>
        <h6 class="subheading" style="float:left">Timer :</h6>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px;">
            <span>{{ hours }}</span>
        </div>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px">
            <span>{{ minutes }}</span>
        </div>
        <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 
        \5px">
            <span>{{ seconds }}</span>
        </div>
        <div class="clear"></div>
    </div>
</template>


<script>
export default {
    data:() => ({
        dialog:true,
        timer: null,
        totalTime: 10
    }),

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
            const seconds = (this.totalTime - this.minutes) % 60;
            return this.padTime(seconds);
        }
    }
}
</script>
