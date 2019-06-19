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
                <v-toolbar-title>Tambah Pelajaran</v-toolbar-title>
              </v-toolbar>

              <form>
                <v-card-text style="background-color:#fff">
                  <v-text-field box v-model="title" label="Judul Pelajaran" value=""></v-text-field>

                  <v-textarea
                    box
                    label="Ikhtisar"
                    v-model="description"
                  ></v-textarea>

                  <v-text-field v-model="curriculum" box label="Kurikulum" value=""></v-text-field>

                  <v-select
                    :items="this.lessons"
                    item-text="name"
                    item-value="id"
                    v-model="lesson_id"
                    box
                    label="Pilih Mata Pelajaran"
                  ></v-select>
                  
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
    created() {
      axios.get('http://api.ceredinas.id/api/master/lesson')
        .then(response => {
          this.lessons = response.data.data
          console.log(this.lessons)
        })
        .catch(error => {
          console.log(error)
        })
    },
		methods: {
        handleFileUpload(){
          this.cover = this.$refs.file.files[0];
        },
        submit(){
          this.btn_load = true;

          let data = new FormData();
          data.append('cover', this.cover);
          data.set('title', this.title);
          data.set('description', this.description);
          data.set('curriculum', this.curriculum);
          data.set('lesson_id', this.lesson_id);

          axios.defaults.headers = {  
            'Content-Type': 'multipart/form-data',  
            'Authorization': 'Bearer ' + this.$store.state.token 
          }
          axios.post('http://api.ceredinas.id/api/courses/create', data)
          .then(response => {
            this.btn_load = false;
            this.$swal('Sukses', 'Berhasil Menambah Pelajaran!', 'success')
            this.$router.push({path:'/guru/cerevid/daftar-pelajaran'})
          })
          .catch(error => {
            this.btn_load = false;
            this.$swal('Oops', 'Gagal Menambah Pelajaran!', 'warning')
          })
        },
		    daftarPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/daftar-pelajaran'})
				},
				tambahPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/tambah-pelajaran'})
				},
		},
  }
</script>
