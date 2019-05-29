<template>
    <div v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="red"
        ></v-progress-circular>
      </div>
    </div>
</template>
<script>
export default {
    props: ['loading'],
    
    data(){
        return{
            
        }
    }
    
}
</script>
<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>