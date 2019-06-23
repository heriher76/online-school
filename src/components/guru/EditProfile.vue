<template>
    <v-layout row wrap="">
        <v-flex md3>
            <div style="height:100px;width:85px;">
                <img :src="photo" width="100%" height="100%" alt="" v-show='showImage'>
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
                    <v-text-field style="height:60px" v-model="datas.data.name" label="Nama" placeholder="Nama Lengkap"></v-text-field>
                    <!-- <v-text-field style="height:60px" v-model="datas.data.email" label="Email" placeholder="email"></v-text-field>
                     -->
                    <v-text-field style="height:60px" v-model="datas.data.phone" label="Nomor Telepon" placeholder="Nomor Telepon"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.address" label="Alamat" placeholder="Alamat"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.gender" label="Jenis Kelamin" placeholder="Jenis Kelamin"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.birth_place" label="Tempat Lahir" placeholder="Tempat Lahir"></v-text-field>
                    <label>Tanggal Lahir</label>
                    <br>
                    <v-date-picker v-model="datas.data.birth_date"></v-date-picker>
                    <br><br>
                    <v-text-field style="height:60px" v-model="datas.data.parrent_name" label="Nama Orang Tua" placeholder="Nama Orang Tua"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.parrent_phone" label="Nomor Orang Tua" placeholder="Nomor Orang Tua"></v-text-field>
                    <!-- <v-text-field style="height:60px" v-if="datas.data.class" v-model="datas.data.class.name_class" label="Class" placeholder="class"></v-text-field> -->
                    <!-- <v-text-field style="height:60px" v-if="datas.data.option1" v-model="datas.data.option1.department_name" label="Pilihan Pertama" placeholder="pilihan pertama"></v-text-field> -->
                    <!-- <v-text-field style="height:60px" v-if="datas.data.option2" v-model="datas.data.option2" label="Pilihan Kedua" placeholder="pilihan kedua"></v-text-field> -->
                    <!-- <v-text-field style="height:60px" v-if="datas.data.option3" v-model="datas.data.option3" label="Pilihan Ketiga" placeholder="pilihan ketiga"></v-text-field> -->
                    <v-divider></v-divider>
                    <v-btn @click="submit" :loading="btn_load" dark>Update</v-btn>  
                    <v-btn @click="cancel" dark>Cancel</v-btn> 
                </form>
            </div>
            <!--  -->
            <ChangePassword v-show="chg_pass" @canceled="showEditProfile" :idUser="this.datas.data.id" :email="this.datas.data.email"/>
        </v-flex>
    </v-layout>
</template>

<script>
    import ChangePassword from "./ChangePassword"
    import axios from 'axios'
    import LoadingScreen1 from'../../components/loading-screen/LoadingCerevid'
    
    export default {
        props: ['datas', 'photo'],
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
            option1: '',
            option2: '',
            option3: '',
            is_load1 :false,
            showImage:true
        }),
        components:{
            ChangePassword,
            LoadingScreen1
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
                this.dialog = false
                this.showImage = !this.showImage
                this.is_load1 = !this.is_load1
                
                let data = new FormData();
                data.append('photo', this.file);
                
                axios.defaults.headers = {  
                    'Content-Type': 'application/json', 
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + this.$store.state.token
                }

                axios.post('http://api.ceredinas.id/api/auth/changePhotoProfile/'+this.$store.state.dataUser, data)
                .then(response => {
                  this.showImage = !this.showImage
                  this.is_load1 = !this.is_load1
                  this.$swal('Sukses', 'Berhasil Mengganti Photo Profile!', 'success')
                  console.log(response.data)
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
                this.$store.dispatch('editProfileUser', {
                    name: this.datas.data.name,
                    gender: this.datas.data.gender,
                    phone: this.datas.data.phone,
                    birth_place: this.datas.data.birth_place,
                    birth_date: this.datas.data.birth_date,
                    parrent_name: this.datas.data.parrent_name,
                    parrent_phone: this.datas.data.parrent_phone,
                    address: this.datas.data.address,
                    file: this.file
                })
                .then(response => {
                  this.btn_load = false
                  this.$swal('Sukses', 'Berhasil Mengganti Profile!', 'success')
                  // this.$router.push({path: '/'})
                })
                .catch(error => {
                  this.btn_load = false
                  this.$swal('Oops', 'Gagal Mengganti Profile!', 'warning')
                  // this.$swal('Oopps', 'Your email or password is invalid', 'warning')
                })
            }
        }
    }
</script>