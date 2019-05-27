<template>
  <div>
    <div v-for="data in datas">
      <div v-for="materi in data.quiz">
        <div v-if="materi.id == ambilId">>
          <v-layout justify-center style="position: relative;background-color:#fff;width:100%;height:0;padding-bottom: 56.25%;">
            <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; overflow: auto">
              <v-container>
                <div class="headline my-4">
                  {{materi.title}}
                </div>
                <p>
                  {{materi.content}}
                </p>
              </v-container>
            </div>
          </v-layout>
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