<template>
  <v-app>
    <!-- header -->
    <Header/>
    <!-- /header -->

    <!-- content -->
    <v-content>
      <router-view/>
    </v-content>
    <!-- /content -->

    <!-- footer -->
    <Footer/>
    <!-- /footer -->
  </v-app>
</template>


<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}

</script>
