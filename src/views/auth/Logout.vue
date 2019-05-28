<template>
    
</template>


<script>
export default {
    created(){
        this.$store.dispatch('destroyToken')
            .then(response => {
                this.$router.push({path:'/'})
                // this.href.push({path: '/'})
            })
            // .catch(error => {
            //     console.log(error)
            //   })
    }
}
</script>
