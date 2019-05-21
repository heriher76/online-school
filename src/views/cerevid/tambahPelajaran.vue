<template>
  <div class="kelola-pelajaran">
    <!-- sub - navbar -->
    <subNavbarGuru />
    <!-- end sub - navbar -->
		<!-- content -->
		<v-container fluid>
				<v-layout row wrap>
					<v-flex xs12 sm12 md3>
						<v-card-text style="padding-top:0">
						<v-toolbar flat dark>
							<v-list  style="background-color:#c62828">
								<v-list-tile>
									<v-list-tile-title class="title">
										Kelola Pelajaran
									</v-list-tile-title>
								</v-list-tile>
							</v-list>
						</v-toolbar>
						<v-list dense class="pt-0">
							<v-list-tile
								@click="daftarPelajaran"
							>
								<v-list-tile-action>
									<v-icon>dashboard</v-icon>
								</v-list-tile-action>

								<v-list-tile-content>
									<v-list-tile-title>Daftar Pelajaran</v-list-tile-title>
								</v-list-tile-content>
							</v-list-tile>
							<v-list-tile
								@click="tambahPelajaran"
							>
								<v-list-tile-action>
									<v-icon>dashboard</v-icon>
								</v-list-tile-action>

								<v-list-tile-content>
									<v-list-tile-title>Tambah Pelajaran</v-list-tile-title>
								</v-list-tile-content>
							</v-list-tile>
						</v-list>
					</v-card-text>
					</v-flex>
					<v-flex xs12 sm12 md9>
              <v-card-text style="padding-top:0">
              <v-toolbar
                card
                color="red darken-4"
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
	export default {
		name:"tambah-pelajaran",
		components:{
			subNavbarGuru,
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
