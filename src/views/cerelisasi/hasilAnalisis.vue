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
                          <div class="headline my-4">Chakra Bernat Yusuf</div>
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
                                  <div class="display-1" style="text-align:center">#3 / #247</div>
                                </v-card-text>
                                <v-card-actions class="justify-center">
                                  <v-btn block flat @click="dialog=true">Lihat Detail</v-btn>
                                </v-card-actions>
                              </v-card>
                              <v-dialog
                                v-model="dialog"
                                max-width="800"
                              >
                                <v-card>
                                  <v-card-title class="headline">Detail Ranking Nasional</v-card-title>
                                  <v-card-text>
                                    <v-data-table
                                      :items="desserts"
                                      class="elevation-1"
                                      hide-actions
                                      hide-headers
                                    >
                                      <template v-slot:items="props">
                                        <td>#1</td>
                                        <td>{{ props.item.nama }}</td>
                                        <td class="text-xs-right">{{ props.item.skor }}</td>
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
                                        ${{ item.value }}
                                      </template>
                                    </v-sparkline>
                                  </v-sheet>
                                </v-card-text>

                                <v-card-text>
                                  <div class="display-1 font-weight-thin">Grafik Ranking Nasional</div>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions class="justify-center">
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-layout>

                            <div class="headline my-4">Ranking Jurusan 1 - Teknik Informatika</div>
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
                                    <div class="display-1" style="text-align:center">#3 / #247</div>
                                  </v-card-text>
                                  <v-card-actions class="justify-center">
                                    <v-btn block flat @click="dialog=true">Lihat Detail</v-btn>
                                  </v-card-actions>
                                </v-card>
                                <v-dialog
                                  v-model="dialog"
                                  max-width="800"
                                >
                                  <v-card>
                                    <v-card-title class="headline">Detail Ranking Nasional</v-card-title>
                                    <v-card-text>
                                      <v-data-table
                                        :items="desserts"
                                        class="elevation-1"
                                        hide-actions
                                        hide-headers
                                      >
                                        <template v-slot:items="props">
                                          <td>#1</td>
                                          <td>{{ props.item.nama }}</td>
                                          <td class="text-xs-right">{{ props.item.skor }}</td>
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
                                      :value="90"
                                      background-color="success"
                                      color="error"
                                    >
                                    </v-progress-linear>
                                    <div class="headline ma-2">Peminat : 1000 Org</div>
                                    <div class="headline ma-2">Daya Tampung : 100 Org / 10%</div>
                                  </v-card-text>
                                  <v-card-text>
                                    <div class="headline">Status Potensi Jurusan</div>
                                    <v-divider class="ma-2"></v-divider>
                                    <v-progress-circular
                                      :rotate="360"
                                      :size="180"
                                      :width="15"
                                      :value="78"
                                      color="teal"
                                    >
                                      <div class="display-3 ma-2">78%</div>
                                    </v-progress-circular>
                                    <div class="display-1 ma-2">Bagus</div>
                                  </v-card-text>
                                </v-card>
                              </v-flex>
                            </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <div style="text-align:center">
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
                        <v-btn flat color="success" @click="dialogReset = false">Setuju</v-btn>
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
  export default {
		components: {
			sideBar
		},
    data: () => ({
      hasilAnalisis: '',
      dialog: false,
      dialogReset: false,
      no:0,
        desserts: [
          {
            nama: 'John Doe',
            skor: 100
          },
          {
            nama: 'Lorem Ipsum',
            skor: 99
          },
        ],
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760
      ],
    }),
    created() {
      this.hasilAnalisis = this.$route.params.data
      console.log(this.$route.params.data)
    },
		methods: {
		}
  }
</script>
