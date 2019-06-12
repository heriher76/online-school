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
          <div v-for="data in datas">
            <div v-for="(materi, index) in data.videos">
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
</template>
<script>
  export default {
    props:['datas'],
    data: () => ({
    }),
    computed:{
      ambilId(){
        return this.$route.hash.substring(1) || {}
      }
    }
  }
</script>