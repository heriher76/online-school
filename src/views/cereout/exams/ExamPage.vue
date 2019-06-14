<template>
    <div>
        <ExamAction :cereoutId="$route.params.id" :name="name" :time="durasi" :attemptId="attemptId"/>

        <!-- hello:{{cek}} -->
    </div>
</template>


<script>
import ExamAction from "../../../components/cereout-component/ExamAction"

export default {
    props:["name","durasi", "attemptId"],
    components:{
        ExamAction
    },

    data(){
        return {
            cek : '',
        }
    },
    
    methods:{
        detectRefresh(){
            window.addEventListener('beforeunload', (event) => {
                // Cancel the event as stated by the standard.
                event.preventDefault()
                // Chrome requires returnValue to be set.
                event.returnValue = 'Are you sure you want to leave?';
            });
        },

        beforeDestroy() {
            window.removeEventListener('beforeunload', this.handler)
        },

        async handler(event) {
            event.preventDefault()
            try {
                // API call here
                await this.saveChanges()
                return '' // Prompt with default browser message
            } catch (err) {
                return undefined // Skip prompt
            }
        }
    },

    mounted(){
        this.detectRefresh();
        this.beforeDestroy();
        
        var n

        document.addEventListener("visibilitychange", function() {
            console.log(document.hidden);
            // Modify behavior...
            // alert('Mau Nyontek ya')
            TweenMax.set($focus,{className:'+=active'});
        });

        window.addEventListener('blur', function(){
            console.log('blur');
            // alert('Mau nyontek yaa')
        }, false);

        window.addEventListener('focus', function(){
            console.log('focus');
        }, false);

        console.log(n)

    }
}
</script>
