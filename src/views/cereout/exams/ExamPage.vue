<template>
    <div>
        <ExamAction :cereoutId="$route.params.id" :time="durasi" :attemptId="attemptId"/>
    </div>
</template>


<script>
import ExamAction from "../../../components/cereout-component/ExamAction"

export default {
    props:["durasi", "attemptId"],
    components:{
        ExamAction
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
    }
}
</script>
