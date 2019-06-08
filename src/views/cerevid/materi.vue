<template>
  <div class="materi">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 md8>
        <v-card-text style="padding-top: 0">
          <div  v-if="tipeMateri == 'video'">
            <materiVideo :datas="dataDetailMateri.data"/>
          </div>
          <div  v-else-if="tipeMateri == 'text'">
            <materiText :datas="dataDetailMateri.data"/>
          </div>
          <div  v-else>
            <materiQuiz :datas="dataDetailMateri.data"/>
          </div>
        </v-card-text>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <v-toolbar color="#34495e" dark flat>
          <v-list-tile>
            <v-list-tile-title>Materi Pelajaran</v-list-tile-title>
          </v-list-tile>
        </v-toolbar>
        <v-card style="position: relative;width:100%;height:0;padding-bottom: 100%;">

          <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; overflow:auto">
          <v-list three-line >
            <template v-for="(item, index) in dataDetailMateri.data">
              <v-subheader>
                {{index+1}}. {{ item.title }}
              </v-subheader>
              <v-divider></v-divider>
              <div v-for="materi in item.videos">
                <v-list-tile
                  avatar
                  @click="tipeMateri = 'video'"
                  :href="'#'+materi.id"
                >
                  <v-list-tile-avatar>
                    <v-icon class="mt-3">videocam</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="materi.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="materi.subtitle"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </div>
              <div v-for="materi in item.texts">
                  <v-list-tile
                    avatar
                    @click="tipeMateri = 'text'"
                    :href="'#'+materi.id"
                  >
                    <v-list-tile-avatar>
                      <v-icon class="mt-3">assignment</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="materi.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="materi.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </div>
              <div v-for="materi in item.quiz">
                    <v-list-tile
                      avatar
                      @click="tipeMateri = 'quiz'"
                      :href="'#'+materi.section_id+'-'+materi.id"
                    >
                      <v-list-tile-avatar>
                        <v-icon class="mt-3">create</v-icon>
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title v-html="materi.title"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="materi.subtitle"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
              </div>
            </template>
          </v-list>
        </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-3>
      <v-flex md8>
        <v-tabs
          color="#f5f5f5"
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
        >
          <v-tabs-slider color="#34495e"></v-tabs-slider>
          <v-tab
            :href="'#materi'"
            style="text-decoration:none;"
          >
            materi
          </v-tab>
          <v-tab
            :href="'#forum-diskusi'"
            style="text-decoration:none;"
          >
            Forum Diskusi
          </v-tab>
          <v-tab
            :href="'#share'"
            style="text-decoration:none;"
          >
            Share
          </v-tab>

          <v-tabs-items>
            <v-tab-item
              :value="'materi'"
            >
              <v-card>
                <v-container fluid>
                  <v-flex  class="mx-4">
                    <v-container grid-list-md>
                      <v-layout row wrap>
                                  <v-flex>
                                    <div class="headline">
                                      <div>{{dataDetailMateri.data[0].course.title}}</div>
                                    </div>
                                    {{dataDetailMateri.data[0].course.description}}
                                  </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                </v-container>
              </v-card>
            </v-tab-item>
              <v-tab-item
                :value="'forum-diskusi'"
              >
                <v-card>
                  <v-container fluid>
                    <v-flex class="mx-4">
              			    <v-list three-line :expand="true">
              							<template v-for="item in dataDetailForum.data">
              								<v-list-tile
              								  avatar
              							  >
              								<v-list-tile-avatar size="50">
                                <v-icon x-large>account_circle</v-icon>
              								</v-list-tile-avatar>
                              <v-list-tile-content>
              								  <v-list-tile-title v-html="item.user" class="ml-3"></v-list-tile-title>
              								  <v-list-tile-sub-title v-html="item.body" class="ml-3"></v-list-tile-sub-title>
              								</v-list-tile-content>
                              <v-list-tile-action>
                                <v-list-tile-action-text>
                                  {{ item.posted }}
                                </v-list-tile-action-text>
                              </v-list-tile-action>
              								 </v-list-tile>
                                <v-divider></v-divider>
              							</template>
              	        </v-list>
                        <v-container class="text-xs-center">
                          <form @submit.prevent="kirimPertanyaan">
                            <v-textarea
                              name="input-7-1"
                              v-model="body"
                              label="Tulis Pertanyaan"
                              hint="Isi pertanyaan anda disini."
                              :rules="[rules_body.required]"
                            ></v-textarea>
                            <div class="justify-end">
                    		       <v-btn color="#2c3e50" class="white--text" @click="kirimPertanyaan">Kirim Pertanyaan</v-btn>
                            </div>
                            <LoadingScreen :loading="is_load"></LoadingScreen>
                          </form>
                        </v-container>
        			      	<v-layout class="justify-center">
          		    		</v-layout>
                    </v-flex>
                  </v-container>
                </v-card>
              </v-tab-item>
                <v-tab-item
                  :value="'share'"
                >
                  <v-card>
                    <v-container fluid>
                      <v-flex  class="mx-4">
                        <v-container grid-list-md>
                          <v-layout row wrap>
                              <div>
                                  <v-container>
                                    <v-layout>
                                      <v-flex>
                                        <div class="headline">Bagikan post ini :</div>
                                        <v-icon>twitter</v-icon>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                              </div>
                          </v-layout>
                        </v-container>
                      </v-flex>
                    </v-container>
                  </v-card>
                </v-tab-item>
          </v-tabs-items>
        </v-tabs>
        </v-flex>
      </v-layout>
  </v-container>
</div>
</template>
<script>
	import materiVideo from '../../components/cerevid-component/video'
  import materiText from '../../components/cerevid-component/text'
  import materiQuiz from '../../components/cerevid-component/quiz'
  import LoadingScreen from'../../components/loading-screen/Loading2'

  export default {
    name: "materi",
    components: {
      materiVideo,
      materiText,
      materiQuiz,
      LoadingScreen
    },
    data: () => ({
      tipeMateri: 'video',
      body: "",
      is_load: false,
      rules_body: {
        required: value => !!value || 'Required.',
      },
    }),
  	methods: {
        async getDataDetailMateri(){
          this.$store.dispatch('getDataDetailMateri')
          .then(response => {
            console.log("telah load data..")
          })
        },
        async getDataDetailForum(){
          this.$store.dispatch('getDataDetailForum')
          .then(response => {
            console.log("telah load data..")
          })
        },
      kirimPertanyaan(){
        this.is_load = true
        this.$store.dispatch('pushDataForum', {
          course_id: this.$route.params.id,
          isi: this.body,
          user_id: this.userId,
        })
        .then(response =>{
          this.is_load = false
          this.body = ''
        })
        .catch(error => {
          this.is_load = false
          this.body = ''
          this.$swal('Oopps', 'Gagal Mengirim Pertanyaan...', 'warning')
        })
      }

    },
    created(){
      this.getDataDetailMateri()
      this.getDataDetailForum()
    },
    computed: {
      dataDetailMateri(){
        return this.$store.state.dataDetailMateri || {}
      },
      dataDetailForum(){
        return this.$store.state.dataDetailForum || {}
      },
      userId(){
        return this.$store.state.dataUser || {}
      },
    },
  }
</script>
