<template>
  <div>

        <div v-if="!ambilId.length">
          <v-layout justify-center style="position: relative;width:100%;height:0;padding-bottom: 45%;">
            <iframe :src="'https://www.youtube.com/embed/'+datas[0].videos[0].video_url" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </v-layout>
          <div class="pt-4">
            <v-chip color="#34495e" text-color="white" class="subheading">
              <div color="primary">{{datas[0].course.title}}</div>
            </v-chip>
          </div>
          <div class="headline">{{datas[0].videos[0].title}}</div>
        </div>
        <div v-else>
          <div v-for="(data, index) in datas">
            <div v-if="getIndexSection(data.id, index)">
              <div v-for="(materi, index) in data.videos">
                <div v-if="getIndexVideo(materi.id, index)">
                  <div v-if="materi.id == ambilId">
                    <v-layout justify-center style="position: relative;background-color:#000;width:100%;height:0;padding-bottom: 45%;">
                            <iframe :src="'https://www.youtube.com/embed/'+materi.video_url" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </v-layout>
                    <div class="pt-4">
                      <v-chip color="#34495e" text-color="white" class="subheading">
                        <div color="primary">{{datas[0].course.title}}</div>
                      </v-chip>
                    </div>
                    <div class="headline">{{materi.title}}</div>
                  </div>
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
    }),
    methods:{
      getDataVideo(data1, data2){
        this.$store.dispatch('getDataVideo',{
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
      getIndexVideo(materi, index){
        if(materi==this.ambilId){
          this.getDataVideo(this.datas[this.i].id, this.datas[this.i].videos[index].id)
          return true
        }else{
          return false
        }

      }
    },
    computed:{
      ambilSectionId(){
        return this.$route.hash.split('-')[1] || {}
      },
      ambilId(){
        return this.$route.hash.split('-')[2] || {}
      }
    }
  }
</script>
