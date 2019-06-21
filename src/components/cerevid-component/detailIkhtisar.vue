<template>
<div v-if="datas.data">
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
      <div v-if="dataPelajaranbyUser.data">
            <div v-if="cekLearned()">
              <v-btn :disabled="!ketemu" color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+courseId+'/materi#'+tipeMateri+'-'+sectionId+'-'+id">Lanjutkan Belajar</v-btn>
            </div>
            <div v-else>
              <div class="body-2 red--text">Materi Belum Tersedia...</div>
              <v-btn :disabled="!ketemu" color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+courseId+'/materi#'+tipeMateri+'-'+sectionId+'-'+id" @click="postLearned">Mulai Belajar</v-btn>
            </div>
      </div>
      <div v-else>
        <v-btn :disabled="!ketemu" color="#2c3e50" class="white--text" :to="'/cerevid/detail-pelajaran/'+courseId+'/materi#'+tipeMateri+'-'+sectionId+'-'+id" @click="postLearned">Mulai Belajar</v-btn>
      </div>
    </v-layout>
  </div>
</div>
</template>
<script>

export default {
  props: ['datas'],
  components: {
  },
  data: () => ({
    tipeMateri: 1,
    sectionId: 0,
    id: 0,
    ketemu: false
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
    getDataPelajaranbyUser() {
      this.$store.dispatch('getDataPelajaranbyUser')
        .then(response => {
        })
    },
    getDataDetailMateri(){
      this.$store.dispatch('getDataDetailMateri')
      .then(response => {
      })
    },
    cekMateri() {
      this.ketemu=false
      if(this.dataDetailMateri.data){
        for(var i=0;i<this.dataDetailMateri.data.length;i++){
          for(var j=0;this.dataDetailMateri.data[i].videos.length;j++){
              this.ketemu = true
              this.tipeMateri=1
              this.sectionId=this.dataDetailMateri.data[i].id
              this.id=this.dataDetailMateri.data[i].videos[j].id
              break;
              return true
            
          }
          if(this.ketemu){
            break;
            return true
          }
          for(var j=0;this.dataDetailMateri.data[i].texts.length;j++){
            
              this.ketemu = true
              this.tipeMateri=2
              this.sectionId=this.dataDetailMateri.data[i].id
              this.id=this.dataDetailMateri.data[i].texts[j].id
              break;
              return true
            
          }
          if(this.ketemu){
            break;
            return true
          }
          for(var j=0;this.dataDetailMateri.data[i].quiz.length;j++){
            
              this.ketemu = true
              this.tipeMateri=3
              this.sectionId=this.dataDetailMateri.data[i].id
              this.id=this.dataDetailMateri.data[i].quiz[j].id
              break;
              return true
            
          }
          if(this.ketemu){
            break;
            return true
          }
            return true
        }
            return true
      }
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
    this.getDataDetailMateri()
  },
  beforeMount(){
   this.cekLearned()
  },
  computed: {
    dataPelajaranbyUser(){
      this.cekMateri()
      return this.$store.state.dataPelajaranbyUser || {}
    },
    dataDetailMateri(){
      return this.$store.state.dataDetailMateri || {}
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
