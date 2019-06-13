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
      i: null
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
      getIndexText(materi, index){
        if(materi==this.ambilId){
          this.getDataText(this.datas[this.i].id, this.datas[this.i].texts[index].id)
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
