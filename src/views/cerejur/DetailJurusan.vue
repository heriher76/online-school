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
          </v-card-text>
        </v-flex>
        <br/>
        <v-flex xs12 sm12 md4 style="padding-top: 15px;">
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
        </v-flex>
	  </v-layout>
	</v-container>
  </div>
</div>
</template>

<script>
    export default {
    	props: ['name', 'capacity', 'description', 'video_url', 'interrested_num', 'passing_grade', 'id'],
	}
</script>