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
										Form Pengisian Nilai Siswa
									</div>
								  <v-form
								    ref="form"
								    v-model="valid"
								    lazy-validation
								  >
								    <v-text-field
								      v-model="name"
								      :counter="10"
								      :rules="nameRules"
								      label="Name"
								      required
								    ></v-text-field>

								    <v-text-field
								      v-model="email"
								      :rules="emailRules"
								      label="E-mail"
								      required
								    ></v-text-field>

								    <v-select
								      v-model="select"
								      :items="items"
								      :rules="[v => !!v || 'Item is required']"
								      label="Kelas"
								      required
								      @change="selected1 = true"
								    ></v-select>
										<div>{{select}}</div>
								    <v-select
								      v-model="select2"
								      :items="items2"
								      :rules="[v => !!v || 'Item is required']"
								      label="Perguruan Tinggi"
								      v-show="selected1"
								      required
								      @change="selected2 = true"
								    ></v-select>
										<div v-show="selected2">{{select +' - '+ select2}}</div>
								    <v-select
								      v-model="select3"
								      :items="items3"
								      :rules="[v => !!v || 'Item is required']"
								      label="Perguruan Tinggi"
								      v-show="selected2"
								      required
								      @change="selected3 = true"

								    ></v-select>
									  <v-text-field
									    v-model="nilai"
									    :counter="3"
									    :rules="nilaiRules"
									    label="Nilai UTBK"
									    required
									    v-show="selected3"

									  ></v-text-field>
										<v-layout justify-end ma-4>
									    <v-btn
									      :disabled="!valid"
									      color="success"
												v-show="selected3"
						      			@click="validate"
									    >
									      Kirim
									    </v-btn>
										</v-layout>
								  </v-form>
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
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      nilai: null,
      nilaiRules: [
        v => !!v || 'Nilai UTBK is required',
        v => (v && v.length <= 3) || 'Nilai UTBK must be less than 3 characters',
        v => (v && v.length <= 3 && !isNaN(v)) || 'Nilai UTBK must be a number',
      ],
      select: null,
      selected1: false,
      select2: null,
      selected2: false,
      select3: null,
      selected3: false,
      items: [
        'Soshum',
        'Saintek',
      ],
      items2: [
        'Universitas Indonesia',
        'Institut Teknologi Bandung',
        'Telkom University',
      ],
      items3: [
        'Teknik Informatika',
        'Ilmu Hukum',
      ],
    }),
		methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
					this.$router.push({name:'cerelisasi_analisis'})
        }
      },
		}
  }
</script>
