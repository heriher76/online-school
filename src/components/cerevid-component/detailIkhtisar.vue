<template>
<div v-if="datas.data">
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
    <div v-if="dataPelajaranbyUser.data">
      <div v-if="!dataPelajaranbyUser.data.length">
        <v-btn color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+this.$route.params.id+'/materi'" @click="postLearned">Mulai Belajar</v-btn>
      </div>
      <div v-else>
        <div v-for="d in dataPelajaranbyUser.data">
          <div v-if="d.course_id==this.$route.params.id">
            <v-btn color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+this.$route.params.id+'/materi'">Lanjutkan Belajar</v-btn>
          </div>
          <div v-else>
            <v-btn color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+this.$route.params.id+'/materi'" @click="postLearned">Mulai Belajar</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <v-btn color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+this.$route.params.id+'/materi'" @click="postLearned">Mulai Belajar</v-btn>
    </div>
  </v-layout>
</div>
</template>
<script>

export default {
  props: ['datas'],
  components: {
  },
  data: () => ({
  }),
  methods: {
    postLearned() {
      this.$store.dispatch('pushDataLearned', {
          course_id: this.$route.params.id,
          user_id: this.userId,
        })
        .then(response => {
        })
        .catch(error => {
        })
    },
    async getDataPelajaranbyUser() {
      this.$store.dispatch('getDataPelajaranbyUser')
        .then(response => {
        })
    },
  },
  created(){
   this.getDataPelajaranbyUser()
  },
  computed: {
    dataPelajaranbyUser(){
      return this.$store.state.dataPelajaranbyUser || {}
    },
    userId() {
      return this.$store.state.dataUser || {}
    },
  }
}
</script>
