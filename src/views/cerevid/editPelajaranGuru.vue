<template>
  <div class="kelola-pelajaran">
    <!-- sub - navbar -->
    <subNavbarGuru />
    <!-- end sub - navbar -->
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
                <v-toolbar-title>Edit Pelajaran</v-toolbar-title>
              </v-toolbar>

              <form>
                <v-card-text style="background-color:#fff">
                  <v-text-field box v-model="dataDetailPelajaran.data.title" label="Judul Pelajaran" value=""></v-text-field>

                  <v-textarea
                    box
                    label="Ikhtisar"
                    v-model="dataDetailPelajaran.data.description"
                  ></v-textarea>

                  <v-text-field v-model="dataDetailPelajaran.data.curriculum" box label="Kurikulum" value=""></v-text-field>
                  
                  <input type="file" ref="file" style="display: none" v-on:change="handleFileUpload()">
                  <v-btn style="margin-left:-1px" @click="$refs.file.click()" small>Upload Cover</v-btn>
                  
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
	import subNavbarGuru from '../../components/cerevid-component/subNavbarGuru'
	import sidebarGuru from '../../components/cerevid-component/sidebarGuru'
	import axios from 'axios'

	export default {
		name:"tambah-pelajaran",
		components:{
			subNavbarGuru,
			sidebarGuru
		},
    data () {
      return {
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        title: '',
        lesson_id: '',
        curriculum: '',
        description: '',
        lessons: [],
        cover: '',
        right: null,
        btn_load: false
      }
	},
    computed: {
      dataDetailPelajaran(){
        return this.$store.state.dataDetailPelajaran || {}
      },
    },
    created() {
      this.getDataDetailPelajaran();

      axios.get('http://api.ceredinas.id/api/master/lesson')
        .then(response => {
          this.lessons = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
	methods: {
		async getDataDetailPelajaran(){
          this.$store.dispatch('getDataDetailPelajaran')
          .then(response => {
            console.log("telah load data..")
          })
        },
        handleFileUpload(){
          this.cover = this.$refs.file.files[0];
        },
        submit(){
          this.btn_load = true;

          let data = new FormData();
          data.append('cover', this.dataDetailPelajaran.data.cover);
          data.set('title', this.dataDetailPelajaran.data.title);
          data.set('description', this.dataDetailPelajaran.data.description);
          data.set('curriculum', this.dataDetailPelajaran.data.curriculum);
          data.set('lesson_id', this.dataDetailPelajaran.data.lesson_id);
          data.set('user_id', this.dataDetailPelajaran.data.dataUser);

          axios.defaults.headers = {  
            'Content-Type': 'multipart/form-data',  
            'Authorization': 'Bearer ' + this.$store.state.token 
          }
          axios.put('http://api.ceredinas.id/api/courses/'+this.$route.params.id, data)
          .then(response => {
            this.btn_load = false;
            this.$swal('Sukses', 'Berhasil Mengedit Pelajaran!', 'success')
            console.log(response.data)
          })
          .catch(error => {
            this.btn_load = false;
            this.$swal('Oops', 'Gagal Mengedit Pelajaran!', 'warning')
            console.log(error)
          })
        }
    }
  }
</script>
