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

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  // created() {
  //     const loggedIn = this.$store.getters.loggedIn
  //     console.log(loggedIn)
  //     if (!loggedIn) {
  //         this.$router.push({path:'/guru/login'})
  //     }
  // }
}
</script>
