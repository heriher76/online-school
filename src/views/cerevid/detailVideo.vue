<template>
  <div class="kelola-pelajaran">
    
		<!-- content -->
		<v-container fluid>
				<v-layout row wrap>
					<v-flex xs12 sm12 md3>
    					<sidebarGuru />
					</v-flex>
					<v-flex xs12 sm12 md9>
              <v-card-text style="padding-top:0">
              <v-toolbar
                card
                color="#353b48" 
                dark
              >
                <v-toolbar-title>Edit Video</v-toolbar-title>
              </v-toolbar>

              <form>
                <v-card-text style="background-color:#fff">
                  <v-text-field box v-model="this.title" label="Judul Video" value=""></v-text-field>

                  <v-text-field v-model="this.link" box label="Link Video" value=""></v-text-field>
                  
                  <v-divider></v-divider>
                  <v-card-actions style="background-color:#fff">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      depressed
                      @click="submit" 
                      :loading="btn_load" 
                    >
                      Simpan
                    </v-btn>
                  </v-card-actions>
                </v-card-text>
              </form>

            </v-card-text>
					</v-flex>
				</v-layout>
		</v-container>
		<!-- end scontent -->
	</div>
</template>

<script>
	import sidebarGuru from '../../components/cerevid-component/sidebarGuru'
	import axios from 'axios'

	export default {
		name:"cerevid_detail_video",
		components:{
			sidebarGuru
		},
    data () {
      return {
        title: '',
        link: '',
        right: null,
        btn_load: false
      }
	},
    created() {
      axios.get('http://api.ceredinas.id/api/sections/'+this.$route.params.idSection+'/videos/'+this.$route.params.idVideo)
        .then(response => {
          this.title = response.data.data.title,
          this.link = 'https://www.youtube.com/watch?v='+response.data.data.video_url
        })
        .catch(error => {
          console.log(error)
        })
    },
	methods: {
        submit(){
          this.btn_load = true;

          axios.defaults.headers = {  
            'Authorization': 'Bearer ' + this.$store.state.token 
          }
          axios.put('http://api.ceredinas.id/api/sections/'+this.$route.params.idSection+'/videos/'+this.$route.params.idVideo, {
            title: this.title,
            video_url: this.link
          })
          .then(response => {
            this.btn_load = false;
            this.$swal('Sukses', 'Berhasil Mengedit Video!', 'success')
            console.log(response.data)
          })
          .catch(error => {
            this.btn_load = false;
            this.$swal('Oops', 'Gagal Mengedit Video!', 'warning')
            console.log(error)
          })
        }
    }
  }
</script>
