<template>
	<div>
		<v-card color="red darken-4">
			<v-container class="white--text  pa-4">
				<div class="ma-4">
					<div class="display-1">Cerelisasi</div>
					<div class="headline">Simulasi Perhitungan Nilai Masuk Universitas favorit</div>
				</div>
			</v-container>
		</v-card>
		<v-container fluid grid-list-md>
			<v-layout row wrap>
						<!-- sidebar -->
						<v-flex md3 sm12 xs12>
								<v-card>
										<sideBar class="hidden-sm-and-down" style="float:left;"/>
								</v-card>
						</v-flex>
						<v-flex md9 sm12 xs12>
							<v-card>
								<v-container>
                  <div class="headline">Hasil Analisis</div>
                  <v-divider></v-divider>
                  <v-layout row wrap>
                    <v-flex md4 sm4 xs12>
                      <v-card flat>
                        <v-card-text>
                          <div class="headline my-4">{{ this.name }}</div>
                          <v-flex md6 sm12 xs12>
                            <v-toolbar flat dark>
                              <v-list>
                                <v-list-tile>
                                  <div class="title" style="text-align:center">
                                    Skor Anda
                                  </div>
                                </v-list-tile>
                              </v-list>
                            </v-toolbar>
                            <v-card>
                              <v-card-text>
                                <div class="display-1" style="text-align:center">{{ this.hasilAnalisis.my_point }}</div>
                              </v-card-text>
                            </v-card>
                          </v-flex>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex md8 sm12 xs12>
                      <v-card  flat>
                        <v-card-text>
                          <div class="headline my-4">Ranking Nasional</div>
                          <v-layout row wrap>
                            <v-flex md4 sm12 xs12>
                              <v-toolbar flat dark class="background-color:green">
                                <v-list>
                                  <v-list-tile>
                                    <div class="title" style="text-align:center">
                                      Ranking Nasional
                                    </div>
                                  </v-list-tile>
                                </v-list>
                              </v-toolbar>
                              <v-card>
                                <v-card-text>
                                  <div class="display-1" style="text-align:center">#{{ this.hasilAnalisis.national_ranks.my_rank }} / #{{ this.hasilAnalisis.national_ranks.other_ranks.slice(-1)[0].rank }}</div>
                                </v-card-text>
                                <v-card-actions class="justify-center">
                                  <v-btn block flat @click="ranking_nasional=true">Lihat Detail</v-btn>
                                </v-card-actions>
                              </v-card>
                              <v-dialog
                                v-model="ranking_nasional"
                                max-width="800"
                              >
                                <v-card>
                                  <v-card-title class="headline">Detail Ranking Nasional</v-card-title>
                                  <v-card-text>
                                    <v-data-table
                                      :items="this.hasilAnalisis.national_ranks.other_ranks"
                                      class="elevation-1"
                                      hide-actions
                                      hide-headers
                                    >
                                      <template v-slot:items="props">
                                        <td>#{{ props.item.rank }}</td>
                                        <td>{{ (hasilAnalisis.national_ranks.my_rank == props.item.rank) ? name : other_name }}</td>
                                        <td class="text-xs-right">{{ props.item.total_point }}</td>
                                      </template>
                                    </v-data-table>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn
                                      color="green darken-1"
                                      flat="flat"
                                      @click="ranking_nasional = false"
                                    >
                                      Kembali
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-flex>
                            <v-flex md8 sm12 xs12>
                              <v-card
                                class="mx-auto text-xs-center"
                                color="green"
                                dark
                                max-width="600"
                              >
                                <v-card-text>
                                  <v-sheet color="rgba(0, 0, 0, .12)">
                                    <v-sparkline
                                      :value="value"
                                      color="rgba(255, 255, 255, .7)"
                                      height="100"
                                      padding="24"
                                      stroke-linecap="round"
                                      smooth
                                    >
                                      <template v-slot:label="item">
                                        {{ item.value }}
                                      </template>
                                    </v-sparkline>
                                  </v-sheet>
                                </v-card-text>

                                <v-card-text>
                                  <div class="display-1 font-weight-thin">Grafik Nilai Ranking Nasional</div>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions class="justify-center">
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-layout>
                          <div v-for="(department, index) in this.hasilAnalisis.department_ranks">
                            <div class="headline my-4">Ranking Jurusan {{index+1}} - {{ department.department.name }}</div>
                            <v-layout row wrap>
                              <v-flex md4 sm12 xs12>
                                <v-toolbar flat dark>
                                  <v-list>
                                    <v-list-tile>
                                      <div class="title" style="text-align:center">
                                        Ranking Jurusan
                                      </div>
                                    </v-list-tile>
                                  </v-list>
                                </v-toolbar>
                                <v-card>
                                  <v-card-text>
                                    <div class="display-1" style="text-align:center">#{{department.ranks.my_rank}} / #{{department.ranks.other_ranks.length}}</div>
                                  </v-card-text>
                                  <v-card-actions class="justify-center">
                                    <v-btn block flat @click="showModal(department)">Lihat Detail</v-btn>
                                  </v-card-actions>
                                </v-card>
                                
                              </v-flex>
                              <v-flex md8 sm12 xs12>
                                <v-card
                                  class="mx-auto text-xs-center"
                                  max-width="600"
                                >
                                  <v-card-text>
                                    <div class="headline">Daya Tampung & Peminat Jurusan</div>
                                    <v-divider class="ma-2"></v-divider>
                                    <v-progress-linear
                                      :height="12"
                                      :value="(department.department.capacity / department.department.interrested_num)*100"
                                      background-color="error"
                                      color="success"
                                    >
                                    </v-progress-linear>
                                    <div class="headline ma-2">Peminat : {{department.department.interrested_num}} Org</div>
                                    <div class="headline ma-2">Daya Tampung : {{department.department.capacity}} Org</div>
                                    <div class="headline ma-2">Keketatan : {{department.department.tightness}} Org</div>
                                    <div class="headline ma-2">Passing Grade : {{department.department.passing_grade}} </div>
                                  </v-card-text>
                                  <v-card-text>
                                    <div class="headline">Status Potensi Jurusan</div>
                                    <v-divider class="ma-2"></v-divider>
                                    <v-progress-circular
                                      :rotate="360"
                                      :size="180"
                                      :width="15"
                                      :value="department.accuracy"
                                      color="teal"
                                    >
                                      <div class="display-3 ma-2">{{department.accuracy}}%</div>
                                    </v-progress-circular>
                                    <div class="display-1 ma-2">{{department.status}}</div>
                                  </v-card-text>
                                </v-card>
                              </v-flex>
                            </v-layout>
                          </div>
                          <!-- end v for -->
                          <v-dialog
                            v-model="dialog"
                            max-width="800"
                          >
                            <v-card>
                              <v-card-title class="headline">Detail Ranking {{modal_department.department.name}}</v-card-title>
                              <v-card-text>
                                <v-data-table
                                  :items="modal_department.ranks.other_ranks"
                                  class="elevation-1"
                                  hide-actions
                                  hide-headers
                                >
                                  <template v-slot:items="props">
                                    <td>#{{ props.item.rank }}</td>
                                    <td>{{ (modal_department.ranks.my_rank == props.item.rank) ? name : other_name }}</td>
                                    <td class="text-xs-right">{{ props.item.total_point }}</td>
                                  </template>
                                </v-data-table>
                              </v-card-text>

                              <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                  color="green darken-1"
                                  flat="flat"
                                  @click="dialog = false"
                                >
                                  Kembali
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                          <!-- modal -->
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <br>
                  <div style="text-align:center">
                    <label>Setelah mereset data anda tidak dapat lagi melihat hasil analisis saat ini dan akan dikenakan biaya pada analisis selanjutnya.</label>
                    <br>
                    <v-btn
                      color="error darken-2"
                      dark
                      @click="dialogReset = !dialogReset"
                    >
                      Reset Poin Analisis
                    </v-btn>
                  </div>
                  <v-dialog v-model="dialogReset" max-width="500px">
                    <v-card>
                      <v-card-text>
                        <div>* Melakukan Reset akan mengurangi poin anda. Apakah anda setuju ?</div>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="error" @click="dialogReset = false">Tidak Setuju</v-btn>
                        <v-btn flat color="success" @click="handleResetAnalisis">Setuju</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
								</v-container>
              </v-card>
            </v-flex>
					</v-layout>
				</v-container>
	</div>
</template>
<script>
	import sideBar from '../../components/cerelisasi-component/sideBar'
  import axios from 'axios'
  export default {
		components: {
			sideBar
		},
    data: () => ({
      hasilAnalisis: '',
      name: '',
      other_name: '###########################',
      modal_department: '',
      ranking_nasional: false,
      dialog: false,
      dialogReset: false,
      no:0,
      value: [],
    }),
    created() {
      this.hasilAnalisis = this.$route.params.data
      this.hasilAnalisis.national_ranks.other_ranks.map((nilai) => {
        this.value.unshift(nilai.total_point)
      }) 
      console.log(this.value)
      this.modal_department = this.hasilAnalisis.department_ranks[0]
      this.name = this.$route.params.name
      console.log(this.$route.params.data)
    },
		methods: {
      handleResetAnalisis() {
        this.dialogReset=false
        axios.defaults.headers = {
          'Authorization': 'Bearer ' + this.$store.state.token
        }
        axios.post('/cerelisasi/reset_analysis')
        .then(response => {
          console.log(response)
          this.$swal('Sukses', 'Berhasil Reset Analisis', 'success')
          this.$router.push({ name:'cerelisasi_form_input_siswa' })
        })
        .catch(error => {
          this.$swal('Oops', 'Gagal Reset Analisis', 'warning')
          console.log(error)
        })
      },
      showModal(data) {
        this.modal_department = data
        this.dialog = true
      }
		}
  }
</script>
