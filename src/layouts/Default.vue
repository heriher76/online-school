<template>
  <v-app>
    <!-- header -->
    <nav>
      <Header/>
    </nav>
    <!-- /header -->

    <!-- content -->
    <v-content>
      <slot/>
    </v-content>
    <!-- /content -->

    <!-- footer -->
    <Footer/>
    <!-- /footer -->
  </v-app>
</template>


<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },

  mounted(){  
    // if(this.$store.getters.loggedIn){
    //   axios.get('/auth/user')
    //   .then(response => {
    //     console.log('default_layout', response.data)
        
    //     if(response.data.status == true && response.data.data.status !=2){
    //       return this.$router.push({name: 'login'})
    //     }else if(response.data.status == false && response.data.data.status !=2){
    //       return this.$router.push({name: 'login'})
    //     }
        
    //   })
    //   .catch(error => {
    //     console.log(error.response)
    //   })
    // }
  },
}
</script>
