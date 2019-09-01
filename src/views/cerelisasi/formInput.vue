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
								      label="Nama"
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
								      v-model="tipe"
								      :items="item_tipe"
								      item-value="value"
								      item-text="name"
								      label="Kategori"
								      required
								      @change="handleChangeTipe();"
								    ></v-select>

								    <v-select
								      v-if="tipe !== ''"
								      v-model="kelas"
								      :items="item_tipe[tipe].kelas"
								      item-value="no"
								      item-text="name"
								      label="Kelas"
								      required
								      @change="handleChangeKelas();"
								    ></v-select>

										<div>{{select}}</div>

									<v-select
									  v-if="tipe == 1"
								      v-model="semester"
								      :items="list_semester"
								      item-value="value"
								      item-text="name"
								      label="Maksimal Semester"
								      required
								      @change="changeSemester();"
								    ></v-select>

									<div v-if="semester !== '' && tipe ===	 1">
									<br>
										<div v-for="(i) in 6">
											<label v-if="sem[i-1].value">Semester {{i}}</label>
										    <div 
										    	v-if="sem[i-1].value"
										    	v-for="(item, index) in item_tipe[tipe].kelas[kelas].skor"
										    	>
											    <v-text-field
											    	v-model="tka[index]"
											     	:counter="3"
											     	:rules="nilaiRules"
											     	:label="item.name"
											     	required
											     	@change="inputNilaiSem(i)"
											    ></v-text-field>
										    </div>
										</div>
									</div>

									<div v-if="tipe === 0 && kelas !== ''">
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
									</div>

								    <div v-if="tipe === 0 && kelas !== ''">
								    <label>Skor TKA</label>
								    <v-text-field
								    	v-for="(lesson,index) in item_tipe[tipe].kelas[kelas].skor"
								    	v-model="tka[index]"
								     	:counter="3"
								     	:rules="nilaiRules"
								     	:label="lesson.name"
								     	required
								     	@change="inputTka(index)"
								    ></v-text-field>
								    </div>

									<center>
									    <v-btn
									      color="white"
						      			  @click="handleTambahJurusan();"
									    >
									      Tambah Jurusan
									    </v-btn>
									</center>

									<div v-for="(jur, index) in totalJurusan">
								    <label>Pilihan {{index+1}}</label>
									<!-- Pilihan Pertama -->
									<v-layout row wrap>
										<v-flex md6 sm12 xs12>
										    <v-select
										      v-model="universities_name[index]"
										      :items="listUniversity"
										      item-value="name"
										      item-text="name"
										      :rules="[v => !!v || 'Item is required']"
										      label="Perguruan Tinggi"
										      required
										      @change="changeIndexUniv(index);"
										    ></v-select>
										</v-flex>
									    <v-flex md6 sm12 xs12>
											<v-select
										      v-model="departments_name[index]"
										      :items="departmentUniversity[index]"
										      item-value="id"
										      item-text="name"
										      :rules="[v => !!v || 'Item is required']"
										      label="Jurusan"
										      required
										      @change="selected2 = true"
										    ></v-select>
										</v-flex>
									</v-layout>
									</div>

									<v-layout justify-end ma-4>
									    <v-btn
									      :disabled="departments_name.length == 0"
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
  	import Swal from 'sweetalert2'

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
      sem: [
      	{value: false},{value: false},{value: false},{value: false},{value: false},{value: false}
      ],
      points: [],
      universities: [],
      departments: [],
      totalJurusan: 0,
      idUniv: 0,
      listLesson: [],
      tps1: '',
      tps2: '',
      tps3: '',
      tps4: '',
      tka: [],
      nilai_semester: [],
      tipe: '',
      item_tipe: [
      	{
      		value: 0, 
      		name: 'SBMPTN', 
      		kelas: [
      			{no: 0, name: 'Saintek', skor: [
      					{name: 'Matematika SAINTEK'},
      					{name: 'Fisika'},
      					{name: 'Kimia'},
      					{name: 'Biologi'},
      				]
      			}, 
      			{no: 1, name: 'Soshum', skor: [
      					{name: 'Matematika SOSHUM'},
      					{name: 'Geografi'},
      					{name: 'Sejarah'},
      					{name: 'Sosiologi'},
      					{name: 'Ekonomi'}
      				]
      			}
      		]
      	},
      	{
      		value: 1, 
      		name: 'SNMPTN', 
      		kelas: [
      			{no: 0, name: 'IPA', skor: [
      					{name: 'Matematika IPA'},
      					{name: 'Fisika'},
      					{name: 'Kimia'},
      					{name: 'Biologi'},
      					{name: 'Bahasa Inggris'},
      					{name: 'Bahasa Indonesia'}
      				]
      			}, 
      			{no: 1, name: 'IPS', skor: [
      					{name: 'Matematika IPS'},
      					{name: 'Geografi'},
      					{name: 'Sosiologi'},
      					{name: 'Ekonomi'},
      					{name: 'Bahasa Inggris'},
      					{name: 'Bahasa Indonesia'}
      				]
      			}, 
      			{no: 2, name: 'Bahasa', skor: [
      					{name: 'Matematika'},
      					{name: 'Sastra Indonesia'},
      					{name: 'Antropologi'},
      					{name: 'Bahasa Asing'},
      					{name: 'Bahasa Inggris'},
      					{name: 'Bahasa Indonesia'}
      				]
      			}, 
      			{no: 3, name: 'SMK', skor: [
      					{name: 'Matematika'},
      					{name: 'Rata-rata Kompetensi'},
      					{name: 'Bahasa Inggris'},
      					{name: 'Bahasa Indonesia'}
      				]
      			}
      		]
      	}
      ],
      kelas: '',
      item_kelas: [],
      listUniversity: [],
      departmentUniversity: [],
	  departments_name: [],
	  universities_name: [],
	  semester: '',
	  list_semester: [
	  	{value: 1, name: 1},
	  	{value: 2, name: 2},
	  	{value: 3, name: 3},
	  	{value: 4, name: 4},
	  	{value: 5, name: 5},
	  	{value: 6, name: 6}
	  ],
	  btn_load: false
    }),
    created() {
    	//get list Kelas
        // axios.get('/master/class')
        // .then(response => {
        //     console.log(response.data.data)
        //     this.item_kelas= response.data.data
        // })
        // .catch(error => {
        //     console.log(error)
        // })

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
            // (response.data.data.class) ? this.kelas = 

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
    	tipe(value) {
    		this.tipe = value
    	},
    	kelas(newKelas) {
    		this.kelas = newKelas
    		this.item_kelas.map(item => {
    			console.log(item.name);
    			if(item.name == this.kelas){
    				this.listLesson = item.lessons
    			}
    		})
    		console.log(this.listLesson)
    	},
    	listUniversity() {
    		this.listUniversity.map((univ) => {
    	      if (univ.name == this.option1_university_name) {
    	          this.departmentUniversity1 = univ.department
    	      }
    	  })
    	},
    	universities_name (university1) {
    	  this.universities_name = university1
    	  console.log(this.universities_name);
    	  this.listUniversity.map((univ) => {
    	      if (univ.name == this.universities_name[this.idUniv]) {
    	          this.departmentUniversity[this.idUniv] = univ.department
    	          console.log(this.idUniv)
    	          console.log(this.departmentUniversity[this.idUniv])
    	      }
    	  })
    	},
    	departments_name (department1) {
    	  this.departments_name = department1
    	  console.log(this.departments_name)
    	},
    },
	methods: {
	  handleChangeTipe() {
	  	this.kelas = '';
	  	this.semester = '';
	  	this.points = [];
	  	this.tka = [];
	  },
	  handleChangeKelas() {
	  	this.points = [];
	  	this.tka = [];
	  },
	  changeIndexUniv(index) {
	  	console.log(index)
	  	this.idUniv = index
	  },
	  handleTambahJurusan() {
	  	if (this.totalJurusan == 3) {
	  		Swal.fire({
	  		  title: 'Apakah ingin melanjutkan?',
	  		  text: "Analisis lebih dari 3 jurusan akan dikenakan pemotongan saldo extra",
	  		  type: 'warning',
	  		  showCancelButton: true,
	  		  confirmButtonColor: '#3085d6',
	  		  cancelButtonColor: '#d33',
	  		  confirmButtonText: 'Ya'
	  		}).then((result) => {
	  		  if (result.value) {
	  			this.totalJurusan += 1;
	  		  }
	  		})
	  	}else{
	  		this.totalJurusan += 1;
	  	}
	  },
	  changeSemester() {
	  	for (var j = 0; j < this.semester; j++) {
	  		this.sem[j].value = true;
	  	}
	  	for (var k = this.semester; k < 6; k++) {
	  		this.sem[k].value = false;
	  		this.nilai_semester[k] = null;
	  	}
	  	console.log(this.semester);
	  },
	  inputTka (index) {
	  	let test = this.tka
	  	console.log(test)
	  },
	  inputNilaiSem (i) {
	  	console.log(this.sem)
	  	console.log(this.nilai_semester)
	  	let tests = this.nilai_semester
	  	console.log(tests[0])
	  },
      validate () {
        if (this.$refs.form.validate()) {
			this.snackbar = true
			this.btn_load = true

			this.nilai_semester = this.nilai_semester.filter(function(e){return e}); 
			
			this.points = this.tka.concat(this.nilai_semester, this.tps1, this.tps2, this.tps3, this.tps4)

			console.log(this.points)

			axios.defaults.headers = {
			    'Authorization': 'Bearer ' + this.$store.state.token
			}
			axios.post('/cerelisasi/analysis', {
				points: this.points,
				departments: this.departments_name,
				type: this.tipe
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
