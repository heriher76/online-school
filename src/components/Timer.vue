<template>
    <div style="width:180px;float:right; color:red" v-if="minutes <= '00' && seconds <= '00'">
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
        <div style="border:1px solid #BDBDBD;float:left;padding:8px;margin:0px 5px">
            <span>{{ seconds }}</span>
        </div>
        <div class="clear"></div>
    </div>
</template>


<script>
export default {
    data:() => ({
        timer: null,
        totalTime: 3600
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
