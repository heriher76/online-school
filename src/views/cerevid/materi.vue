<template>
<div class="materi">
  <v-container fluid v-if="dataDetailMateri.data">
    <v-layout row wrap>
      <v-flex xs12 sm12 md8>
        <v-card-text style="padding-top: 0">
          <div v-if="tipeMateri == 'video'">
            <materiVideo :datas="dataDetailMateri.data" />
          </div>
          <div v-else-if="tipeMateri == 'text'">
            <materiText :datas="dataDetailMateri.data" />
          </div>
          <div v-else-if="tipeMateri == 'quiz'">
            <materiQuiz :datas="dataDetailMateri.data" />
          </div>
          <div v-else>
            <v-layout justify-center style="position: relative;background-color:#fff;width:100%;height:0;padding-bottom: 56.25%;">
              <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; overflow: auto">
                <v-container>
                  <div class="headline my-4">
                    Not Found :(
                  </div>
                  <p>
                    Materi tidak ditemukan.
                  </p>
                </v-container>
              </div>
            </v-layout>
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
            <v-list three-line>
              <template v-for="(item, index) in dataDetailMateri.data">
                <v-subheader>
                  {{index+1}}. {{ item.title }}
                </v-subheader>
                <v-divider></v-divider>
                <div v-for="materi in item.videos">
                  <v-list-tile avatar @click="tipeMateri = 'video'" :href="'#1-'+item.id+'-'+materi.id">
                    <v-list-tile-avatar>
                      <v-icon class="mt-3">videocam</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="materi.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="materi.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-spacer></v-spacer>
                    <div v-if="materi.last_seen!=null">
                      <v-list-tile-avatar>
                        <v-icon class="mt-3" color="green">done</v-icon>
                      </v-list-tile-avatar>
                    </div>
                  </v-list-tile>
                </div>
                <div v-for="materi in item.texts">
                  <v-list-tile avatar @click="tipeMateri = 'text'" :href="'#2-'+item.id+'-'+materi.id">
                    <v-list-tile-avatar>
                      <v-icon class="mt-3">assignment</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="materi.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="materi.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-spacer></v-spacer>
                    <div v-if="materi.last_seen!=null">
                      <v-list-tile-avatar>
                        <v-icon class="mt-3" color="green">done</v-icon>
                      </v-list-tile-avatar>
                    </div>
                  </v-list-tile>
                </div>
                <div v-for="materi in item.quiz">
                  <v-list-tile avatar @click="tipeMateri = 'quiz'" :href="'#3-'+materi.section_id+'-'+materi.id">
                    <v-list-tile-avatar>
                      <v-icon class="mt-3">create</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="materi.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="materi.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-spacer></v-spacer>
                    <div v-if="materi.last_seen!=null">
                      <v-list-tile-avatar>
                        <v-icon class="mt-3" color="green">done</v-icon>
                      </v-list-tile-avatar>
                    </div>
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
        <v-tabs color="#f5f5f5" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
          <v-tabs-slider color="#34495e"></v-tabs-slider>
          <v-tab :href="'#materi'" style="text-decoration:none;">
            materi
          </v-tab>
          <v-tab :href="'#forum-diskusi'" style="text-decoration:none;">
            Forum Diskusi
          </v-tab>
          <v-tabs-items>
            <v-tab-item :value="'materi'">
              <v-card>
                <v-container fluid>
                  <v-flex class="mx-4">
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
            <v-tab-item :value="'forum-diskusi'">
              <v-card>
                <v-container fluid>
                  <v-flex class="mx-4">
                    <v-list three-line :expand="true">
                      <template v-for="item in dataDetailForum.data">
                        <v-list-tile avatar>
                          <v-list-tile-avatar size="50">
                            <v-icon x-large class="mt-3">account_circle</v-icon>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="item.user" class="ml-3"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.body" class="ml-3"></v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-list-tile-action-text>
                              {{ item.posted }}
                            </v-list-tile-action-text>
                            <v-list-tile-action-text>
                              <a @click="tampilForm(item.id)">Balas</a>
                            </v-list-tile-action-text>
                          </v-list-tile-action>
                        </v-list-tile>
                        <div>
                          <v-divider class="ml-4"></v-divider>
                          <v-list-tile avatar class="ml-4">
                            <v-list-tile-avatar size="50">
                              <img src="https://cdn.vuetifyjs.com/images/john.jpg" class="mt-3" alt="John">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="item.user" class="ml-3"></v-list-tile-title>
                              <v-list-tile-sub-title v-html="item.body" class="ml-3"></v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <v-list-tile-action-text>
                                {{ item.posted }}
                              </v-list-tile-action-text>
                              <v-list-tile-action-text>
                                <a @click="tampilForm(item.id)">Balas</a>
                              </v-list-tile-action-text>
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-container class="text-xs-center" v-if="forumId==item.id">
                            <v-form @submit.prevent="kirimPertanyaan" ref="form">
                              <v-textarea name="input-7-1" v-model="body" label="Tulis Pertanyaan" hint="Isi pertanyaan anda disini." :rules="[rules_body.required]"></v-textarea>
                              <div class="justify-end">
                                <v-btn color="#2c3e50" class="white--text" @click="kirimPertanyaan">Kirim Pertanyaan</v-btn>
                              </div>
                            </v-form>
                          </v-container>
                        </div>
                        <v-divider></v-divider>
                      </template>
                    </v-list>
                    <v-container class="text-xs-center">
                      <v-form @submit.prevent="kirimPertanyaan" ref="form">
                        <v-textarea name="input-7-1" v-model="body" label="Tulis Pertanyaan" hint="Isi pertanyaan anda disini." :rules="[rules_body.required]"></v-textarea>
                        <div class="justify-end">
                          <v-btn :disabled="!formIsValid" color="#2c3e50" class="white--text" @click="kirimPertanyaan">Kirim Pertanyaan</v-btn>
                        </div>
                      </v-form>
                    </v-container>
                    <v-layout class="justify-center">
                    </v-layout>
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

export default {
  name: "materi",
  components: {
    materiVideo,
    materiText,
    materiQuiz,
  },
  data() {
    return {
      tipeMateri: 'video',
      body: "",
      rules_body: {
        required: value => !!value || 'Required.',
      },
      forumId: null,
    }
  },
  methods: {
    tampilForm(id){
      if(this.forumId==null){
        this.forumId = id
      }else{
          this.forumId = null
      }
    },
    async getDataDetailMateri() {
      this.$store.dispatch('getDataDetailMateri')
        .then(response => {})
    },
    async getDataDetailForum() {
      this.$store.dispatch('getDataDetailForum')
        .then(response => {})
    },
    cekMateri() {
      if (this.$route.hash.split('-')[0].substring(1) == 1) {
        this.tipeMateri = 'video'
      } else if (this.$route.hash.split('-')[0].substring(1) == 2) {
        this.tipeMateri = 'text'
      } else if (this.$route.hash.split('-')[0].substring(1) == 3) {
        this.tipeMateri = 'quiz'
      } else if (!this.$route.hash.length) {
        this.tipeMateri = 'video'
      } else {
        this.tipeMateri = 'not found'
      }
    },
    kirimPertanyaan() {
      this.$store.dispatch('pushDataForum', {
          course_id: this.$route.params.id,
          isi: this.body,
          user_id: this.userId,
        })
        .then(response => {
          this.$refs.form.reset()
        })
        .catch(error => {
          this.$refs.form.reset()
          this.$swal('Oopps', 'Gagal Mengirim Pertanyaan...', 'warning')
        })
    }
  },
  created() {
    this.getDataDetailMateri()
    this.getDataDetailForum()
    this.cekMateri()
  },
  computed: {
    formIsValid() {
      return (
        this.body
      )
    },
    dataDetailMateri() {
      return this.$store.state.dataDetailMateri || {}
    },
    dataDetailForum() {
      return this.$store.state.dataDetailForum || {}
    },
    userId() {
      return this.$store.state.dataUser || {}
    },
  },
}
</script>
