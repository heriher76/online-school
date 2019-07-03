<template>
  <v-layout>
    <v-expansion-panel :expand="true">
      <v-expansion-panel-content
        v-for="(section, index) in dataDetailMateri.data"
        >
        <template v-slot:header>
          <div>{{index+1}}. {{section.title}}</div>
        </template>
        <v-card>
          <div v-for="materi in section.videos">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>Materi | {{materi.title}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn color="green" :to="'/cerevid/detail-pelajaran/'+courseId+'/materi#1-'+section.id+'-'+materi.id">
                  <v-icon color="white--text">visibility</v-icon>
                  <span class="pa-1 white--text">Lihat</span>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider style="margin:0"></v-divider>
          </div>
          <div v-for="materi in section.texts">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>Materi | {{materi.title}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn  color="green" :to="'/cerevid/detail-pelajaran/'+courseId+'/materi#2-'+section.id+'-'+materi.id">
                  <v-icon color="white--text">visibility</v-icon>
                  <span class="pa-1 white--text">Lihat</span>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider style="margin:0"></v-divider>
          </div>
          <div v-for="materi in section.quiz">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>Materi | {{materi.title}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn  color="green" :to="'/cerevid/detail-pelajaran/'+courseId+'/materi#3-'+materi.section_id+'-'+materi.id">
                  <v-icon color="white--text">visibility</v-icon>
                  <span class="pa-1 white--text">Lihat</span>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider style="margin:0"></v-divider>
          </div>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>
<script>
  export default {
  	data: () => ({
  	}),
		methods: {
      getDataDetailMateri(){
        this.$store.dispatch('getDataDetailMateri')
        .then(response => {
        })
      },
		},
		created(){
			this.getDataDetailMateri()
		},
		computed: {
			dataDetailMateri(){
				return this.$store.state.dataDetailMateri || {}
			},
      courseId() {
        return this.$route.params.id || {}
      },
		},
  }
</script>
<style>
.theme--light.v-expansion-panel .v-expansion-panel__container{
	background-color: #2c3e50;
	color: #fff;
}
.theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon{
	color:#fff;
}
</style>
