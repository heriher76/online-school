<template>
<div class="materi">
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm12 md8>
          <v-card-text>
            <v-layout justify-center style="position: relative;width:100%;height:0;padding-bottom: 45%;">
              <iframe :src="'https://www.youtube.com/embed/'+this.video_url" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </v-layout>
            <br>
            <v-toolbar color="#34495e" dark flat>
              <v-list-tile>
                <v-list-tile-title>Detail Jurusan</v-list-tile-title>
              </v-list-tile>
            </v-toolbar>
            
            <v-card style="position: relative;width:100%;padding-bottom: auto;">

              <div style="margin-left: 10px;">
                <h1>{{this.name}}</h1>    
                <p>{{this.description}}</p>

                <label>Passing Grade: <b>{{ this.passing_grade }}</b></label>
                <br>
                <label>Peminat: <b>{{ this.interrested_num }}</b></label>
                <br>
                <label>Daya Tampung: <b>{{ this.capacity }}</b></label>
              </div>
        
              <v-btn color="primary" :to="{ name: 'cerelisasi_form_input' }">Buka Cerelisasi</v-btn>
            </v-card>

          </v-card-text>
        </v-flex>
        <br/>
        <v-flex xs12 sm12 md4 style="padding-top: 15px;">
          <div>
              <div style="margin:0px 15px">
                  <div style="margin:10px 22px">
                      <h6 class="title">FAKULTAS</h6>
                  </div>
                  <ol class="side_bar">
                      <v-divider></v-divider>
                      <div v-show="load_data" style="margin:10px auto; width:5%;">
                          <v-progress-circular
                          :size="30"
                          color="primary"
                          indeterminate
                          ></v-progress-circular>
                      </div>
                      <li v-for="(faculty, index) in list_faculty" :key="faculty.id" style="margin-left: 15px; margin-top: 10px;">
                          <b>{{faculty.name}}</b>
                          <ol class="side_bar">
                              <li v-for="(department, i) in faculty.department" :key="department.id" @click="changeDepartment(department.name, department.capacity, department.description, department.video_url, department.interrested_num, department.passing_grade, department.id);">
                                  <router-link :to="{ name: 'cerejur_detail_jurusan', params: { name: department.name, capacity: department.capacity, description: department.description, video_url: department.video_url, interrested_num: department.interrested_num, passing_grade: department.passing_grade, id: department.id } }" style="cursor: pointer;">{{department.name}}</router-link>
                              </li>
                              <br>
                          </ol>
                      </li>
                      
                  </ol>
              </div>

          </div>
        </v-flex>
	  </v-layout>
	</v-container>
  </div>
</div>
</template>

<script>
  export default {
    props: ['name', 'capacity', 'description', 'video_url', 'interrested_num', 'passing_grade', 'id', 'list_faculty'],
	  methods: {
      changeDepartment(name, capacity, description, video_url, interrested_num, passing_grade, id) {
        this.name = name
        this.capacity = capacity
        this.description = description
        this.video_url = video_url
        this.interrested_num = interrested_num
        this.passing_grade = passing_grade
        this.id = id
      },
    } 
  }
</script>