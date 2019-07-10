<template>
    <v-layout row wrap="">
        <v-flex md3>
            <div style="height:100px;width:85px;">
                <img :src="datas.data.photo_url" width="100%" height="100%" alt="" v-show='showImage'>
                <LoadingScreen1 :loading="is_load1"></LoadingScreen1>
            </div>

            <div v-show="edit_prof">
                <v-btn 
                    @click.stop="dialog = true" style="margin-left:-1px" small>Change</v-btn>

                    <v-dialog v-model="dialog" max-width="290">
                    <v-card>
                        <form enctype="multipart/form-data">
                        <v-card-title class="headline">Ganti Foto Profile</v-card-title>

                        <v-card-text>
                            <label for="foto">Upload Foto:</label>
                            <input name="photo" id="foto" ref="file" type="file" @change="this.handleFileUpload">
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="blue"
                            flat="flat"
                            @click="dialog = false"
                        >
                            Batal
                        </v-btn>

                        <v-btn
                            color="blue"
                            flat="flat"
                            @click="this.submitPhoto"
                        >
                            Update
                        </v-btn>
                        </v-card-actions>
                        </form>
                    </v-card>
                    </v-dialog>

                <hr style="width:85%">
                <a @click="changePass">Change Password </a>
            </div>
        </v-flex>
        <v-flex md9 style="font-size:14px;">
            <!--  -->
            <div v-show="edit_prof" class="edit_profile">
                <form @submit.prevent="login">
                    <v-text-field style="height:60px" v-model="datas.data.name" label="Name" placeholder="nama lengkap"></v-text-field>
                    <!-- <v-text-field style="height:60px" v-model="datas.data.email" label="Email" placeholder="email"></v-text-field>
                     -->
                    <v-text-field style="height:60px" v-model="datas.data.phone" label="Phone Number" placeholder="Nomor Handphone"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.address" label="Alamat" placeholder="Alamat"></v-text-field>
                    <v-select
                        v-model="datas.data.gender" 
                        :items="list_kelamin"
                        item-text="name"
                        item-value="name"
                        label="Jenis Kelamin"
                    ></v-select>
                    <v-text-field style="height:60px" v-model="datas.data.birth_place" label="Birth Place" placeholder="Tempat Lahir"></v-text-field>
                    <!-- <v-text-field style="height:60px" v-model="datas.data.birth_date" label="Birth Date" placeholder="Tanggal Lahir"></v-text-field> -->
                    <label>Tanggal Lahir</label>
                    <br>
                    <v-date-picker v-model="datas.data.birth_date"></v-date-picker>
                    <br><br>
                    <v-text-field style="height:60px" v-model="datas.data.parrent_name" label="Nama Orang Tua" placeholder="Nama Orang Tua"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.parrent_phone" label="Nomor Orang Tua" placeholder="Nomor Orang Tua"></v-text-field>
                    <br>
                    <label style="color: red">*Apabila tidak ingin mengganti kelas ataupun pilihan jurusan, maka tidak perlu diisi kembali</label>
                    <br>
                    <!-- Kelas -->
                    <label><b>Pilihan Kelas</b></label>
                    <br>
                    <label v-if="datas.data.class" style="background-color: yellow; border: solid 1px black; padding: 3px;">{{ datas.data.class.name_class }}</label>
                    <v-select
                        v-model="kelas" 
                        :items="listClass"
                        item-text="name"
                        item-value="id"
                        label="Kelas *"
                    ></v-select>
                    <br>
                    <!-- Pilihan Pertama -->
                    <label><b>Pilihan Pertama</b></label>
                    <br>
                    <label v-if="datas.data.option1" style="background-color: yellow; border: solid 1px black; padding: 3px;">{{ datas.data.option1.university_name }} - {{ datas.data.option1.department_name }}</label>
                    <v-select
                        v-model="option1_university_name" 
                        :items="listUniversity"
                        item-text="name"
                        item-value="id"
                        label="Universitas *"
                    ></v-select>    
                    <v-select
                        v-model="option1_department_name" 
                        :items="departmentUniversity1"
                        item-text="name"
                        item-value="id"
                        label="Jurusan *"
                    ></v-select>
                    <br>
                    <!-- Pilihan Kedua -->
                    <label><b>Pilihan Kedua</b></label>
                    <br>
                    <label v-if="datas.data.option2" style="background-color: yellow; border: solid 1px black; padding: 3px;">{{ datas.data.option2.university_name }} - {{ datas.data.option2.department_name }}</label>
                    <v-select
                        v-model="option2_university_name" 
                        :items="listUniversity"
                        item-text="name"
                        item-value="id"
                        label="Universitas *"
                    ></v-select>
                    <v-select
                        v-model="option2_department_name" 
                        :items="departmentUniversity2"
                        item-text="name"
                        item-value="id"
                        label="Jurusan *"
                    ></v-select>
                    <br>
                    <!-- Pilihan Ketiga -->
                    <label><b>Pilihan Ketiga</b></label>
                    <br>
                    <label v-if="datas.data.option3" style="background-color: yellow; border: solid 1px black; padding: 3px;">{{ datas.data.option3.university_name }} - {{ datas.data.option3.department_name }}</label>
                    <v-select
                        v-model="option3_university_name" 
                        :items="listUniversity"
                        item-text="name"
                        item-value="id"
                        label="Universitas *"
                    ></v-select>
                    <v-select
                        v-model="option3_department_name" 
                        :items="departmentUniversity3"
                        item-text="name"
                        item-value="id"
                        label="Jurusan *"
                    ></v-select>

                    <v-divider></v-divider>
                    <v-btn @click="submit" :loading="btn_load" dark>Update</v-btn>   
                    <v-btn @click="cancel" dark>Cancel</v-btn>  
                </form>
            </div>
            <!-- {{dataUser}} -->
            <!--  -->
            <ChangePassword v-show="chg_pass" @canceled="showEditProfile" :idUser="this.datas.data.id" :myemail="this.datas.data.email"/>
        </v-flex>
    </v-layout>
</template>

<script>
    import ChangePassword from "../siswa/ChangePassword"
    import axios from 'axios'
    import LoadingScreen1 from'../../components/loading-screen/LoadingCerevid'
    
    export default {
        props: ['datas', 'photo', 'listUniversity', 'listClass'],
        data: () => ({
            chg_pass:false,
            edit_prof:true,
            btn_load: false,
            btn_upload: false,
            dialog:false,
            name: '',
            gender: '',
            phone: '',
            birth_place: '',
            birth_date: '',
            parrent_name: '',
            parrent_phone: '',
            address: '',
            file: '',
            kelas: '',
            departmentUniversity1: [],
            departmentUniversity2: [],
            departmentUniversity3: [],
            option1_department_name: '',
            option2_department_name: '',
            option3_department_name: '',
            option1_university_name: '',
            option2_university_name: '',
            option3_university_name: '',
            birth_date: new Date().toISOString().substr(0, 10),
            list_kelas: [],
            list_kelamin: [
                { name: 'Laki - Laki' },
                { name: 'Perempuan' }
            ],
            is_load1 :false,
            showImage:true
        }),
        components:{
            ChangePassword,
            LoadingScreen1
        },
        watch: {
          birth_date (date) {
            this.birth_date= date
            // console.log(this.birth_date)
          },
          kelas (newVal) {
            this.kelas= newVal
          },
          option1_university_name (university1) {
            // console.log(university1)
            this.option1_university_name = university1
            this.listUniversity.map((univ) => {
                if (univ.id == this.option1_university_name) {
                    this.departmentUniversity1 = univ.department
                }
            })
          },
          option2_university_name (university2) {
            // console.log(university2)
            this.option2_university_name = university2
            this.listUniversity.map((univ) => {
                if (univ.id == this.option2_university_name) {
                    this.departmentUniversity2 = univ.department
                }
            })
          },
          option3_university_name (university3) {
            // console.log(university3)
            this.option3_university_name = university3
            this.listUniversity.map((univ) => {
                if (univ.id == this.option3_university_name) {
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
        methods:{
            cancel() {
                this.$emit('canceled', 'true')
            },
            showEditProfile() {
                this.edit_prof = true
                this.chg_pass  = false
            },
            changePass() {
                this.edit_prof = false
                this.chg_pass  = true
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            },
            submitPhoto (event) {
                // console.log(this.file)
                this.dialog = false
                this.btn_upload = true
                this.showImage = !this.showImage
                this.is_load1 = !this.is_load1
                
                let data = new FormData();
                data.append('photo', this.file);
                
                axios.defaults.headers = {  
                    'Content-Type': 'application/json', 
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + this.$store.state.token
                }

                axios.post('https://api.ceredinas.id/api/auth/changePhotoProfile/'+this.$store.state.dataUser, data)
                .then(response => {
                  this.showImage = !this.showImage
                  this.is_load1 = !this.is_load1
                  this.$swal('Sukses', 'Berhasil Mengganti Photo Profile!', 'success')
                  .then(() => {
                        window.location.href = "/my account"
                    })
                })
                .catch(error => {
                  this.showImage = !this.showImage
                  this.is_load1 = !this.is_load1
                  this.$swal('Oops', 'Gagal Mengganti Photo Profile!', 'warning')
                  console.log(error)
                })
            },
            submit (event) {
                this.btn_load = true

                let asalKelas = '';
                (this.datas.data.class) ? asalKelas = this.datas.data.class.name_class : asalKelas = ''

                let pilihanSatu = '';
                (this.datas.data.option1) ? pilihanSatu = this.datas.data.option1.department_id : pilihanSatu = ''

                let pilihanDua = '';
                (this.datas.data.option2) ? pilihanDua = this.datas.data.option2.department_id : pilihanDua = ''

                let pilihanTiga = '';
                (this.datas.data.option3) ? pilihanTiga = this.datas.data.option3.department_id : pilihanTiga = ''

                this.$store.dispatch('editProfileUser', {
                    name: this.datas.data.name,
                    gender: this.datas.data.gender,
                    phone: this.datas.data.phone,
                    address: this.datas.data.address,
                    birth_place: this.datas.data.birth_place,
                    birth_date: this.datas.data.birth_date,
                    parrent_name: this.datas.data.parrent_name,
                    parrent_phone: this.datas.data.parrent_phone,
                    class_id: this.kelas || asalKelas,
                    option1: this.option1_department_name || pilihanSatu,
                    option2: this.option2_department_name || pilihanDua,
                    option3: this.option3_department_name || pilihanTiga
                })
                .then(response => {
                    this.btn_load = false
                    this.$swal('Sukses', 'Berhasil Mengganti Profile!', 'success')
                    .then(() => {
                        window.location.href = "/my account"
                    })
                    // this.$router.push({path: '/'})
                })
                .catch(error => {
                  this.btn_load = false
                  this.$swal('Oops', 'Gagal Mengubah Profile!', 'warning')
                  
                })
            }
        }
    }
</script>