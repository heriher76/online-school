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
                <v-toolbar-title>Tambah Video</v-toolbar-title>
              </v-toolbar>

              <form>
                <v-card-text style="background-color:#fff">
                  <v-text-field box v-model="title" label="Judul Video"></v-text-field>

                  <v-text-field v-model="link" box label="Link Video"></v-text-field>
                  
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
		name:"cerevid_tambah_video",
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
	methods: {
        submit(){
          this.btn_load = true;

          axios.defaults.headers = {  
            'Authorization': 'Bearer ' + this.$store.state.token 
          }
          axios.post('/sections/'+this.$route.params.idSection+'/videos/create', {
            title: this.title,
            video_url: this.link
          })
          .then(response => {
            this.btn_load = false;
            this.$swal('Sukses', 'Berhasil Menambahkan Video!', 'success')
            this.$router.push({path:'/guru/cerevid/detail-pelajaran/'+this.$route.params.id})
          })
          .catch(error => {
            this.btn_load = false;
            this.$swal('Oops', 'Gagal Menambahkan Video!', 'warning')
          })
        }
    }
  }
</script>
