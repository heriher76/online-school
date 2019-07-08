<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>


<script>
  const default_layout = "default";

  export default {
    computed: {
      layout() {
        if(this.$route.meta.layout!=null)
        return (this.$route.meta.layout) + '-layout';
      }
    }
  }
</script>
