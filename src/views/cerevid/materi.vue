<template>
  <div class="materi">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 md9>
        <div  v-if="tipeMateri == 'video'">
          <materiVideo />
        </div>
        <div  v-else-if="tipeMateri == 'text'">
          <materiText />
        </div>
        <div  v-else>
          <materiQuiz />
        </div>
      </v-flex>
      <v-flex xs12 sm12 md3>
        <v-toolbar color="#34495e" dark flat>
          <v-list-tile>
            <v-icon class="pr-3">book</v-icon>
            <v-list-tile-title>Bahasa Pemrograman PHP</v-list-tile-title>
          </v-list-tile>
        </v-toolbar>
        <v-card style="position: relative;width:100%;height:0;padding-bottom: 155%;">

          <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; overflow:auto">
          <v-list three-line >
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
              >
                {{ item.header }}
              </v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-tile
                v-else
                :key="item.title"
                avatar
                @click="tipeMateri = item.tipe"
              >
                <v-list-tile-avatar>
                  <v-icon v-if="item.tipe == 'video'">videocam</v-icon>
                  <v-icon v-else-if="item.tipe == 'text'">assignment</v-icon>
                  <v-icon v-else>create</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-3>
      <v-flex md9>
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
                          <div>
                              <v-container>
                                <v-layout>
                                  <v-flex>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
              <v-tab-item
                :value="'forum-diskusi'"
              >
                <v-card>
                  <v-container fluid>
                    <v-flex class="mx-4">
              			    <v-list three-line expand="true">
              							<template v-for="(item, index) in forum">
              							   <v-subheader
              								         v-if="item.header"
              									       :key="item.header"
                                       class="headline"
              							   >
                                  {{item.header}}
              								 </v-subheader>
                               <v-divider
              									 v-else-if="item.divider"
              									 :key="index"
              									 :inset="item.inset"
              								 >
                               </v-divider>
              								 <v-list-tile
              								    v-else
              									  :key="item.nama"
              									  avatar
              								 >
              								 <v-list-tile-avatar size="50">
              								     <img :src="item.avatar">
              								 </v-list-tile-avatar>
                               <v-list-tile-content>
              								     <v-list-tile-title v-html="item.nama" class="ml-3">
              									   </v-list-tile-title>
              								 <v-list-tile-sub-title v-html="item.ulasan" class="ml-3"></v-list-tile-sub-title>
              								     </v-list-tile-content>
              								 </v-list-tile>
              							</template>
              	        </v-list>
                        <v-container class="text-xs-center">
                          <v-textarea
                            name="input-7-1"
                            label="Tulis Pertanyaan"
                            hint="Isi pertanyaan anda disini."
                          ></v-textarea>
                          <div class="justify-end">
                  		       <v-btn color="#2c3e50" class="white--text" v-on="on">Kirim Pertanyaan</v-btn>
                          </div>
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
  export default {
    name: "materi",
    components: {
      materiVideo,
      materiText,
      materiQuiz
    },
    data () {
      return {
        tipeMateri: 'video',
  			forum: [
            { header: 'Berikan Pertanyaan' },
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
              nama: 'James Doom',
              ulasan: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
            },
            { divider: true, inset: true },
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
              nama: 'Steven Connors',
              ulasan: "Wish I could come, but I'm out of town this weekend."
            },
            { divider: true, inset: true },
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
              nama: 'Sandra Adams',
              ulasan: "Do you have Paris recommendations? Have you ever been?"
            }
          ],
        items: [
          { header: 'Percabangan' },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'if-else',
            subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
            tipe: 'video'
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'if-elseif-else',
            subtitle: "Wish I could come, but I'm out of town this weekend.",
            tipe: "text"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'switch',
            subtitle: "Do you have Paris recommendations? Have you ever been?",
            tipe: "quiz"
          },
          { header: 'Perulangan' },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'for',
            subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
            tipe: 'video'
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'while',
            subtitle: "Wish I could come, but I'm out of town this weekend.",
            tipe: "text"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'foreach',
            subtitle: "Do you have Paris recommendations? Have you ever been?",
            tipe: "quiz"
          },
          { header: 'Perulangan' },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'for',
            subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
            tipe: 'video'
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'while',
            subtitle: "Wish I could come, but I'm out of town this weekend.",
            tipe: "text"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'foreach',
            subtitle: "Do you have Paris recommendations? Have you ever been?",
            tipe: "quiz"
          },
        ]
      }
    }
  }
</script>
