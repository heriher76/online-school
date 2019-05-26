<template>
  <div>
    <div class="headline">
      <div>{{datas.data.title}}</div>
    </div>
    <v-container>
      <v-layout>
        <v-flex>
          {{datas.data.description}}
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout class="justify-center">
      <v-btn color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+this.$route.params.id+'/materi'" >Mulai Belajar</v-btn>
    </v-layout>
  </div>
</template>
<script>
  export default {
    props: ['datas'],
    data: () => ({
    })
  }
</script>
