<template>
  <div>
    <div v-for="(data, index) in datas">
      <div v-if="getIndexSection(data.id, index)">
        <div v-for="(materi, index) in data.texts">
          <div v-if="getIndexText(materi.id, index)">
            <div v-if="materi.id == ambilId">
              <v-layout justify-center style="position: relative;background-color:#fff;width:100%;height:0;padding-bottom: 56.25%;">
                <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; overflow: auto">
                  <v-container>
                    <div class="headline my-4">
                      {{materi.title}}
                    </div>
                    <v-divider></v-divider>
                    <p class="my-4">
                      {{materi.content}}
                    </p>
                  </v-container>
                </div>
              </v-layout>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['datas'],
    data: () => ({
      i: null,
      ketemu: false,
      is_learned: false
    }),
    methods:{
      getDataText(data1, data2){
        this.$store.dispatch('getDataText',{
          section_id: data1,
          id: data2
        })
        .then(response => {
        })
        .catch(error => {
          console.log(error)
        })
      },
      getIndexSection(materi, index){
        if(materi==this.ambilSectionId){
          this.i=index
          return true
        }else{
          return false
        }
      },
      getDataPelajaranbyUser() {
        this.$store.dispatch('getDataPelajaranbyUser')
          .then(response => {

          })
      },
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
      getIndexText(materi, index){
        if(materi==this.ambilId){
          this.getDataText(this.datas[this.i].id, this.datas[this.i].texts[index].id)
          if(!this.ketemu && !this.is_learned){
            if(this.dataPelajaranbyUser.data && !this.is_learned){
              for(var i=0;i<this.dataPelajaranbyUser.data.length;i++){
                if(this.dataPelajaranbyUser.data[i].course_id==this.courseId){
                  this.is_learned = true
                }
              }
              if(!this.is_learned){
                for(var j=0;j<this.datas[this.i].texts.length;j++){
                  if(this.datas[this.i].texts[j].last_seen!=null){
                    this.postLearned();
                    this.ketemu = true;
                    break;
                  }
                }
              }
            }
          }
          return true
        }else{
          return false
        }

      }
    },
    created(){
      this.getDataPelajaranbyUser()
    },
    computed:{
      dataPelajaranbyUser() {
        return this.$store.state.dataPelajaranbyUser || {}
      },
      courseId() {
        return this.$route.params.id || {}
      },
      userId() {
        return this.$store.state.dataUser || {}
      },
      ambilSectionId(){
        return this.$route.hash.split('-')[1] || {}
      },
      ambilId(){
        return this.$route.hash.split('-')[2] || {}
      }
    }
  }
</script>
