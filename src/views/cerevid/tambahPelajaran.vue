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
                <v-toolbar-title>Submit a post</v-toolbar-title>
              </v-toolbar>

              <v-card-text style="background-color:#fff">
                <v-text-field box label="Judul Pelajaran" value=""></v-text-field>

                <v-textarea
                  box
                  label="Ikhtisar"
                ></v-textarea>

                <v-divider></v-divider>
                <v-card-actions style="background-color:#fff">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    depressed
                  >
                    Simpan
                  </v-btn>
                </v-card-actions>
              </v-card-text>

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
        right: null
      }
	  },
		methods: {
		    daftarPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/daftar-pelajaran'})
				},
				tambahPelajaran(){
		      return this.$router.push({path:'/cerevid/guru/tambah-pelajaran'})
				},
		},
  }
</script>
