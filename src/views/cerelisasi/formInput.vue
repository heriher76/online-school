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
								      :counter="25"
								      :rules="nameRules"
								      label="Name"
								      required
								    ></v-text-field>

								    <!-- <v-text-field
								      v-model="email"
								      :rules="emailRules"
								      label="E-mail"
								      required
								    ></v-text-field> -->
 
								    <!-- Kelas -->
								    <v-select
								      v-model="kelas"
								      :items="item_kelas"
								      item-value="name"
								      item-text="name"
								      :rules="[v => !!v || 'Item is required']"
								      label="Kelas"
								      required
								      @change="selected1 = true"
								    ></v-select>
										<div>{{select}}</div>

									<label>Pilihan Pertama</label>
									<!-- Pilihan Pertama -->
									<v-layout row wrap>
										<v-flex md6 sm12 xs12>
										    <v-select
										      v-model="option1_university_name"
										      :items="listUniversity"
										      item-value="name"
										      item-text="name"
										      :rules="[v => !!v || 'Item is required']"
										      label="Perguruan Tinggi"
										      required
										      @change="selected2 = true"
										    ></v-select>
										</v-flex>
									    <v-flex md6 sm12 xs12>
											<v-select
										      v-model="option1_department_name"
										      :items="departmentUniversity1"
										      item-value="id"
										      item-text="name"
										      :rules="[v => !!v || 'Item is required']"
										      label="Jurusan"
										      required
										      @change="selected2 = true"
										    ></v-select>
										</v-flex>
									</v-layout>

									<label>Pilihan Kedua</label>
									<!-- Pilihan Kedua -->
								    <v-layout row wrap>
										<v-flex md6 sm12 xs12>
										    <v-select
										      v-model="option2_university_name"
										      :items="listUniversity"
										      item-value="name"
										      item-text="name"
										      :rules="[v => !!v || 'Item is required']"
										      label="Perguruan Tinggi"
										      required
										      @change="selected2 = true"
										    ></v-select>
										</v-flex>
									    <v-flex md6 sm12 xs12>
											<v-select
										      v-model="option2_department_name"
										      :items="departmentUniversity2"
										      item-value="id"
										      item-text="name"
										      :rules="[v => !!v || 'Item is required']"
										      label="Jurusan"
										      required
										      @change="selected2 = true"
										    ></v-select>
										</v-flex>
									</v-layout>

									<label>Pilihan Ketiga</label>
								    <!-- Pilihan Ketiga -->
								    <v-layout row wrap>
										<v-flex md6 sm12 xs12>
										    <v-select
										      v-model="option3_university_name"
										      :items="listUniversity"
										      item-value="name"
										      item-text="name"
										      :rules="[v => !!v || 'Item is required']"
										      label="Perguruan Tinggi"
										      required
										      @change="selected2 = true"
										    ></v-select>
										</v-flex>
									    <v-flex md6 sm12 xs12>
											<v-select
										      v-model="option3_department_name"
										      :items="departmentUniversity3"
										      item-value="id"
										      item-text="name"
										      :rules="[v => !!v || 'Item is required']"
										      label="Jurusan"
										      required
										      @change="selected2 = true"
										    ></v-select>
										</v-flex>
									</v-layout>

									<label>Skor TPS</label>
								    <v-text-field
								     	v-model="tps1"
								     	:counter="3"
								     	:rules="nilaiRules"
								     	label="Penalaran Umum"
								     	required
								    ></v-text-field>
								    <v-text-field
								     	v-model="tps2"
								     	:counter="3"
								     	:rules="nilaiRules"
								     	label="Pengetahuan Baca dan Tulis"
								     	required
								    ></v-text-field>
								    <v-text-field
								     	v-model="tps3"
								     	:counter="3"
								     	:rules="nilaiRules"
								     	label="Pengetahuan dan Pemahaman Umum"
								     	required
								    ></v-text-field>
								    <v-text-field
								     	v-model="tps4"
								     	:counter="3"
								     	:rules="nilaiRules"
								     	label="Pengetahuan Kuantitatif"
								     	required
								    ></v-text-field>

								    <div v-if="kelas == 'Saintek'">
									    <label>Skor TKA Saintek</label>
									    <v-text-field
									     	v-model="tka_saintek1"
									     	:counter="3"
									     	:rules="nilaiRules"
									     	label="Matematika SAINTEK"
									     	required
									    ></v-text-field>
									    <v-text-field
									     	v-model="tka_saintek2"
									     	:counter="3"
									     	:rules="nilaiRules"
									     	label="Fisika"
									     	required
									    ></v-text-field>
									    <v-text-field
									     	v-model="tka_saintek3"
									     	:counter="3"
									     	:rules="nilaiRules"
									     	label="Kimia"
									     	required
									    ></v-text-field>
									    <v-text-field
									     	v-model="tka_saintek4"
									     	:counter="3"
									     	:rules="nilaiRules"
									     	label="Biologi"
									     	required
									    ></v-text-field>
								    </div>

								    <div v-if="kelas == 'Soshum'">
									    <label>Skor TKA Soshum</label>
									    <v-text-field
									     	v-model="tka_soshum1"
									     	:counter="3"
									     	:rules="nilaiRules"
									     	label="Matematika SOSHUM"
									     	required
									    ></v-text-field>
									    <v-text-field
									     	v-model="tka_soshum2"
									     	:counter="3"
									     	:rules="nilaiRules"
									     	label="Geografi"
									     	required
									    ></v-text-field>
									    <v-text-field
									     	v-model="tka_soshum3"
									     	:counter="3"
									     	:rules="nilaiRules"
									     	label="Sejarah"
									     	required
									    ></v-text-field>
									    <v-text-field
									     	v-model="tka_soshum4"
									     	:counter="3"
									     	:rules="nilaiRules"
									     	label="Sosiologi"
									     	required
									    ></v-text-field>
									    <v-text-field
									     	v-model="tka_soshum5"
									     	:counter="3"
									     	:rules="nilaiRules"
									     	label="Ekonomi"
									     	required
									    ></v-text-field>
								    </div>

									<v-layout justify-end ma-4>
									    <v-btn
									      :disabled="!valid"
									      :loading="btn_load"
									      color="success"
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
				<LoadingScreen2 :loading="loadAnalisis"></LoadingScreen2>
	</div>
</template>
<script>
	import sideBar from '../../components/cerelisasi-component/sideBar'
  	import LoadingScreen2 from'../../components/loading-screen/Loading2'
  	import axios from 'axios'

  	export default {
	components: {
		sideBar,
		LoadingScreen2
	},
    data: () => ({
      valid: true,
      loadAnalisis: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Name must be less than 25 characters'
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
      dataAnalysis: null,
      points: [],
      departments: [],
      tps1: '',
      tps2: '',
      tps3: '',
      tps4: '',
      tka_saintek1: '',
      tka_saintek2: '',
      tka_saintek3: '',
      tka_saintek4: '',
      tka_soshum1: '',
      tka_soshum2: '',
      tka_soshum3: '',
      tka_soshum4: '',
      tka_soshum5: '',
      kelas: '',
      item_kelas: [],
      listUniversity: [],
      departmentUniversity1: '',
	  departmentUniversity2: '',
	  departmentUniversity3: '',
	  option1_department_name: '',
	  option2_department_name: '',
	  option3_department_name: '',
	  option1_university_name: '',
	  option2_university_name: '',
	  option3_university_name: '',
	  btn_load: false
    }),
    created() {
    	//get list Kelas
        axios.get('/master/class')
        .then(response => {
            console.log(response.data.data)
            this.item_kelas= response.data.data
        })
        .catch(error => {
            console.log(error)
        })

        //get list University
        axios.get('/master/getAllDataUniversity')
        .then(response => {
            console.log(response.data.data)
            this.listUniversity= response.data.data
        })
        .catch(error => {
            console.log(error)
        })

    	//get profile
        axios.defaults.headers = {  
          'Authorization': 'Bearer ' + this.$store.state.token
        }
        axios.get('/auth/user')
        .then(response => {
            console.log(response)
            this.name= response.data.data.name;
            (response.data.data.class) ? this.kelas = response.data.data.class.name_class : this.kelas = '';
            if(response.data.data.option1) {
            	this.option1_university_name = response.data.data.option1.university_name
            	this.option1_department_name = response.data.data.option1.department_id
            	console.log(this.option1_university_name)
            	this.listUniversity.map((univ) => {
            	    if (univ.name == this.option1_university_name) {
            	        this.departmentUniversity1 = univ.department
            	    }
            	})	
            }else{
            	this.option1_university_name = ''
            	this.option1_department_name = ''
            }

            if(response.data.data.option2) {
            	this.option2_university_name = response.data.data.option2.university_name
            	this.option2_department_name = response.data.data.option2.department_id

            	this.listUniversity.map((univ) => {
            	    if (univ.name == this.option2_university_name) {
            	        this.departmentUniversity2 = univ.department
            	    }
            	})	
            }else{
            	this.option2_university_name = ''
            	this.option2_department_name = ''
        	}

        	if(response.data.data.option3) {
            	this.option3_university_name = response.data.data.option3.university_name
            	this.option3_department_name = response.data.data.option3.department_id

            	this.listUniversity.map((univ) => {
            	    if (univ.name == this.option3_university_name) {
            	        this.departmentUniversity3 = univ.department
            	    }
            	})	
            }else{
            	this.option3_university_name = ''
            	this.option3_department_name = ''
        	}

        })
        .catch(error => {
            console.log(error)
        })
        
    	//get hasil analisis jika ada
    	axios.defaults.headers = {
		    'Authorization': 'Bearer ' + this.$store.state.token
		}
		axios.get('/cerelisasi/analysis')
		.then(response => {
			console.log(response)
		  this.dataAnalysis = response.data.data
		  if(this.dataAnalysis != null){
		  	this.$swal('Hasil Simulasi', 'Anda Sudah Melakukan Simulasi', 'success')
		  	this.$router.push({ name:'cerelisasi_analisis', params: { data: this.dataAnalysis, name: this.name } })
		  }else{
		  	this.loadAnalisis=false
		  }
		})
		.catch(error => {
		  console.log(error)
		})
    },
    watch: {
    	kelas(newKelas) {
    		this.kelas = newKelas
    	},
    	listUniversity() {
    		this.listUniversity.map((univ) => {
    	      if (univ.name == this.option1_university_name) {
    	          this.departmentUniversity1 = univ.department
    	      }

    	      if (univ.name == this.option2_university_name) {
    	          this.departmentUniversity2 = univ.department
    	      }

    	      if (univ.name == this.option3_university_name) {
    	          this.departmentUniversity3 = univ.department
    	      }
    	  })
    	},
    	option1_university_name (university1) {
    	  this.option1_university_name = university1
    	  this.listUniversity.map((univ) => {
    	      if (univ.name == this.option1_university_name) {
    	          this.departmentUniversity1 = univ.department
    	      }
    	  })
    	},
    	option2_university_name (university2) {
    	  this.option2_university_name = university2
    	  this.listUniversity.map((univ) => {
    	      if (univ.name == this.option2_university_name) {
    	          this.departmentUniversity2 = univ.department
    	      }
    	  })
    	},
    	option3_university_name (university3) {
    	  this.option3_university_name = university3
    	  this.listUniversity.map((univ) => {
    	      if (univ.name == this.option3_university_name) {
    	          this.departmentUniversity3 = univ.department
    	      }
    	  })
    	},
    	option1_department_name (department1) {
    	  this.option1_department_name = department1
    	},
    	option2_department_name (department2) {
    	  this.option2_department_name = department2
    	},
    	option3_department_name (department3) {
    	  this.option3_department_name = department3
    	},
    },
	methods: {
      validate () {
        if (this.$refs.form.validate()) {
			this.snackbar = true
			this.btn_load = true
			this.points.push(Number(this.tps1))
			this.points.push(Number(this.tps2))
			this.points.push(Number(this.tps3))
			this.points.push(Number(this.tps4))

			if(this.kelas == 'Saintek'){
				this.points.push(Number(this.tka_saintek1))
				this.points.push(Number(this.tka_saintek2))
				this.points.push(Number(this.tka_saintek3))
				this.points.push(Number(this.tka_saintek4))
			}else if(this.kelas == 'Soshum'){
				this.points.push(Number(this.tka_soshum1))
				this.points.push(Number(this.tka_soshum2))
				this.points.push(Number(this.tka_soshum3))
				this.points.push(Number(this.tka_soshum4))
				this.points.push(Number(this.tka_soshum5))
			}

			this.departments.push(this.option1_department_name)
			this.departments.push(this.option2_department_name)
			this.departments.push(this.option3_department_name)
			
			axios.defaults.headers = {
			    'Authorization': 'Bearer ' + this.$store.state.token
			}
			axios.post('/cerelisasi/analysis', {
				points: this.points,
				departments: this.departments
			})
			.then(response => {
			  this.btn_load = false
			  this.dataAnalysis = response.data.data
			  this.departments = []
			  this.point = []
			  this.$swal('Sukses', 'Berhasil Menganalisis Nilai!', 'success')
			  this.$router.push({ name:'cerelisasi_analisis', params: { data: this.dataAnalysis, name: this.name } })
			})
			.catch(error => {
			  this.btn_load = false
			  this.departments = []
			  this.point = []
			  this.$swal('Oops', 'Gagal Menganalisis Nilai!', 'warning')
			  console.log(error)
			})
        }
      },
	}
  }
</script>
