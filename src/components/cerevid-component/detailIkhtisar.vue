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
          <div v-if="cekLearned()">
            <v-btn color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+courseId+'/materi'">Lanjutkan Belajar</v-btn>
          </div>
          <div v-else>
            <v-btn color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+courseId+'/materi'" @click="postLearned">Mulai Belajar</v-btn>
          </div>
    </div>
    <div v-else>
      <v-btn color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+courseId+'/materi'" @click="postLearned">Mulai Belajar</v-btn>
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
          course_id: this.courseId,
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
    cekLearned() {
      if(this.dataPelajaranbyUser.data){
        for(var i=0;i<this.dataPelajaranbyUser.data.length;i++){
          if(this.dataPelajaranbyUser.data[i].course_id==this.courseId){
            return true
            break;
          }
        }
      }
    },
  },
  created(){
   this.getDataPelajaranbyUser()
  },
  beforeMount(){
   this.cekLearned()
  },
  computed: {
    dataPelajaranbyUser(){
      return this.$store.state.dataPelajaranbyUser || {}
    },
    userId() {
      return this.$store.state.dataUser || {}
    },
    courseId() {
      return this.$route.params.id || {}
    },
  }
}
</script>
