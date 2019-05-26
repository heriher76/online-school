<template>
  <div class="materi">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 md8>
        <v-card-text style="padding-top: 0">
          <div  v-if="tipeMateri == 'video'">
            <materiVideo/>
          </div>
          <div  v-else-if="tipeMateri == 'text'">
            <materiText/>
          </div>
          <div  v-else>
            <materiQuiz/>
          </div>
        </v-card-text>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <v-toolbar color="#34495e" dark flat>
          <v-list-tile>
            <v-icon class="pr-3">book</v-icon>
            <v-list-tile-title>{{items.data[0].course.title}}</v-list-tile-title>
          </v-list-tile>
        </v-toolbar>
        <v-card style="position: relative;width:100%;height:0;padding-bottom: 100%;">

          <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; overflow:auto">
          <v-list three-line >
            <template v-for="(item, index) in items.data">
              <v-subheader>
                {{ item.title }}
              </v-subheader>
              <v-divider></v-divider>
              <div v-for="materi in item.videos">
                <v-list-tile
                  avatar
                  @click="tipeMateri = 'video'"
                >
                  <v-list-tile-avatar>
                    <v-icon>videocam</v-icon>
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
                  >
                    <v-list-tile-avatar>
                      <v-icon>assignment</v-icon>
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
                      @click="tipeMateri = 'text'"
                    >
                      <v-list-tile-avatar>
                        <v-icon>create</v-icon>
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
                          <div>
                              <v-container>
                                <v-layout>
                                  <v-flex>
                                    <div class="headline">
                                      <div>{{items.data[0].course.title}}</div>
                                    </div>
                                    {{items.data[0].course.description}}
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
              							<template v-for="item in forum.data">
              								 <v-list-tile
              									  avatar
              								 >
              								 <v-list-tile-avatar size="50">
                                   <v-icon x-large>account_circle</v-icon>
              								 </v-list-tile-avatar>
                               <v-list-tile-content>
              								     <v-list-tile-title v-html="item.user" class="ml-3">
              									   </v-list-tile-title>
              								 <v-list-tile-sub-title v-html="item.body" class="ml-3"></v-list-tile-sub-title>
              								     </v-list-tile-content>
              								 </v-list-tile>
                                <v-divider></v-divider>
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
  import axios from 'axios'

  export default {
    name: "materi",
    components: {
      materiVideo,
      materiText,
      materiQuiz
    },
    data: () => ({
        tipeMateri: 'video',
  			forum: [],
        items: [],
        auth: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQxMTQwMzM4YjNjMzBiMzQ0M2FjMWEzYjBlZDYwMzQ4Y2I0M2QxZGVlNjZkMzBhMzJjM2YwZjI4YzEzMDFjMGUyMGMyMDg1MWM5MGQ0MmJkIn0.eyJhdWQiOiIxIiwianRpIjoiZDExNDAzMzhiM2MzMGIzNDQzYWMxYTNiMGVkNjAzNDhjYjQzZDFkZWU2NmQzMGEzMmMzZjBmMjhjMTMwMWMwZTIwYzIwODUxYzkwZDQyYmQiLCJpYXQiOjE1NTg4MTE1MzQsIm5iZiI6MTU1ODgxMTUzNCwiZXhwIjoxNTkwNDMzOTM0LCJzdWIiOiIzMiIsInNjb3BlcyI6W119.V7KZDWkUeqAgxhgiMgx6gcfhW4E1nmOorEhxxN0qM8zDzqnAlEJ1I7L63idl9EVFbCkUWKgm-vL9J0C3ndv4IsOV9H1cZ0c1u-KPmsWi_LpjQWP1ETtAmY6_RTc3ChZtETLc9Z5-dhfpKGEFp-dzg3izdrSr24iGFWz-2YrCXLwlf67po8Ln5n7INpHcDuOVjSnOebyeKkUbeB-kGR8ZzvCLPZ46LhP82_OH6T5vcKmF9rZy5mHumH4uHmfZTNS88OnuqDqlp0pzC1coLQAv7bMG25uZirjRaM0wfhv2-oswckPfVz9I28MB8OmuRLi6fWYOrrmJRm5o8m0NXEmiiDstCGC_eJM9cK_4MzoHaY4LQ0ulXvJCQv-sHgUjGXIYqyFhCMjlNBfxLs_U1dFjdDbnUV0r0jmlxILoQODnpLpiop2DXZbzvaq1bzMg3GEruVDD9L9qNv1jfCW0D8gKo6NMgkKFzQya9iFtdCVfqi3ez2iLz6hfGla8Vs19pPwuS2vSbWFiiWmXem4bPayu1yFBYkOWvXPB9qtAAqFG-dE20wjxl36gqCNBx02oGXZzGl9RHWayOf0GXkwr-imeTwrYfj63sQbZYT7wEuun-KozdaYbp_skcNbBnbxkCvjtmxcM7XB24p-UM4-kCnBoSNCcJVvPjSch00uoXnvetdM",
    }),
  	methods: {
  		async loadApi(){
  			const response = await axios.get('http://api.ceredinas.id/api/courses/'+this.$route.params.id+'/sections',{'headers': {'Authorization': this.auth}})
  			this.items = response.data
  		},
    		async loadApiForum(){
    			const response = await axios.get('http://api.ceredinas.id/api/courses/'+this.$route.params.id+'/forums',{'headers': {'Authorization': this.auth}})
    			this.forum = response.data
    		},
  	},
  	mounted(){
  		this.loadApi()
    	this.loadApiForum()
  	}
  }
</script>
