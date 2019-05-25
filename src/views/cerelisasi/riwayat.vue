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
									<div class="headline">
										Riwayat Analisis
									</div>
                  <v-divider class="ma-2"></v-divider>
                  <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-timeline dense clipped>
                        <v-timeline-item
                          fill-dot
                          class="white--text mb-5"
                          color="red"
                          large
                        >
                          <template v-slot:icon>
                            <span>JL</span>
                          </template>
                        </v-timeline-item>

                        <v-slide-x-transition
                          group
                        >
                          <v-timeline-item
                            v-for="event in timeline"
                            :key="event.id"
                            class="mb-3"
                            color="pink"
                            small
                          >
                            <v-layout justify-space-between>
                              <v-flex xs7 v-text="event.text"></v-flex>
                              <v-flex xs5 text-xs-right v-text="event.time"></v-flex>
                            </v-layout>
                          </v-timeline-item>
                        </v-slide-x-transition>

                        <v-timeline-item
                          class="mb-4"
                          hide-dot
                        >
                          <span>TODAY</span>
                        </v-timeline-item>

                        <v-timeline-item
                          class="mb-3"
                          color="success"
                          icon-color="grey lighten-2"
                          small
                        >
                          <v-layout justify-space-between>
                            <v-flex xs7>John Leider melakukan analisis pada jurusan Teknik Elektro - Universitas Indonesia</v-flex>
                            <v-flex xs5 text-xs-right>15:26</v-flex>
                          </v-layout>
                        </v-timeline-item>

                        <v-timeline-item
                          class="mb-3"
                          color="warning"
                          small
                        >
                          <v-layout justify-space-between>
                            <v-flex xs7>
                              <v-chip
                                class="white--text ml-0"
                                color="red"
                                label
                                small
                              >
                                #1
                              </v-chip>
                              John leider Peringkat #1 pada ranking jurusan.
                            </v-flex>
                            <v-flex xs5 text-xs-right>15:25</v-flex>
                          </v-layout>
                        </v-timeline-item>

                        <v-timeline-item
                          class="mb-3"
                          color="primary"
                          small
                        >
                          <v-layout justify-space-between>
                            <v-flex xs7>
                              John Leider mereset hasil analisisnya, saldo dikurangi 10000 poin dan mendapat kesempatan 3x analisis jurusan
                            </v-flex>
                            <v-flex xs5 text-xs-right>15:25</v-flex>
                          </v-layout>
                        </v-timeline-item>

                        <v-timeline-item
                          color="success"
                          small
                        >
                          <v-layout justify-space-between>
                            <v-flex xs7>
                              John Leider melakukan analisis pertamanya.
                            </v-flex>
                            <v-flex xs5 text-xs-right>15:25</v-flex>
                          </v-layout>
                        </v-timeline-item>
                      </v-timeline>
                    </v-flex>
                    <v-flex md6 sm6 xs12>
    									<div class="headline">
    										Ranking Terbaru
    									</div>
                      <v-list two-line>
                        <template v-for="(item, index) in items">
                          <v-list-tile
                            avatar
                          >
                            <v-list-tile-content>
                              <v-list-tile-title>#1 - John Leider</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-action>
                            <v-list-tile-sub-title>SMAN 1 Bandung</v-list-tile-sub-title>
                            </v-list-action>
                          </v-list-tile>
                          <v-divider
                            v-if="index + 1 < items.length"
                            :key="index"
                          ></v-divider>
                        </template>
                      </v-list>
                    </v-flex>
                  </v-layout>
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
        selected: [2],
        items: [
          {
            action: '15 min',
            headline: 'Brunch this weekend?',
            title: 'Ali Connors',
            subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          {
            action: '2 hr',
            headline: 'Summer BBQ',
            title: 'me, Scrott, Jennifer',
            subtitle: "Wish I could come, but I'm out of town this weekend."
          },
          {
            action: '6 hr',
            headline: 'Oui oui',
            title: 'Sandra Adams',
            subtitle: 'Do you have Paris recommendations? Have you ever been?'
          },
          {
            action: '12 hr',
            headline: 'Birthday gift',
            title: 'Trevor Hansen',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?'
          },
          {
            action: '18hr',
            headline: 'Recipe to try',
            title: 'Britta Holt',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
          },
          {
            action: '18hr',
            headline: 'Recipe to try',
            title: 'Britta Holt',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
          }
        ],
    }),
		methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
		}
  }
</script>
