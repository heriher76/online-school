<template>
    
</template>


<script>
export default {
    created(){
        this.$store.dispatch('destroyToken')
            .then(response => {
                this.$router.push({path:'/'})
                // window.location.href = "/"
            })
            // .catch(error => {
            //     console.log(error)
            //   })
    }
}
</script>
