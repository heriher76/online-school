<template>
  <v-layout v-resize="onResize" column align-center justify-center>
	<iframe src="https://admin.ceredinas.id/FAQ" :height="windowSize.y" width="100%"></iframe>
  </v-layout>
</template>
<script type='text/javascript'>
export default {
    data: () => ({
      windowSize: {
        x: 0,
        y: 0
      }
    }),

    mounted () {
      this.onResize()
    },

    methods: {
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      }
    }
  }
</script>
