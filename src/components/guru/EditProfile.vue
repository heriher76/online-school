<template>
    <v-layout row wrap="">
        <v-flex md3>
            <div style="height:100px;width:85px;">
                <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" width="100%" height="100%" alt="">
            </div>
            <div v-show="edit_prof">
                <v-btn 
                    @click.stop="dialog = true" style="margin-left:-1px" small>Change</v-btn>

                    <v-dialog v-model="dialog" max-width="290">
                    <v-card>
                        <v-card-title class="headline">Ganti Foto Profile</v-card-title>

                        <v-card-text>
                            <label for="foto">Upload Foto:</label>
                            <input id="foto" ref="file" type="file" @change="this.handleFileUpload">
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
                    <v-text-field style="height:60px" v-model="datas.data.phone" label="Phone Number" placeholder="nomor telepon"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.gender" label="Gender" placeholder="gender"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.birth_place" label="Birth Place" placeholder="birth place"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.birth_date" label="Birth Date" placeholder="birth date"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.parrent_name" label="Parrent Name" placeholder="parrent name"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.parrent_phone" label="Parrent Phone" placeholder="parrent phone"></v-text-field>
                    <!-- <v-text-field style="height:60px" v-model="datas.data.class.name_class" label="Class" placeholder="class"></v-text-field> -->
                    <!-- <v-text-field style="height:60px" v-model="datas.data.option1.department_name" label="Pilihan Pertama" placeholder="pilihan pertama"></v-text-field> -->
                    <v-text-field style="height:60px" v-model="datas.data.option2" label="Pilihan Kedua" placeholder="pilihan kedua"></v-text-field>
                    <v-text-field style="height:60px" v-model="datas.data.option3" label="Pilihan Ketiga" placeholder="pilihan ketiga"></v-text-field>
                    <v-divider></v-divider>
                    <v-btn @click="submit" :loading="btn_load" dark>Update</v-btn>  
                </form>
            </div>
            <!--  -->
            <ChangePassword v-show="chg_pass" :idUser="this.datas.data.id"/>
        </v-flex>
    </v-layout>
</template>

<script>
    import ChangePassword from "./ChangePassword"
    import axios from 'axios'
    
    export default {
        props: ['datas'],
        data: () => ({
            chg_pass:false,
            edit_prof:true,
            btn_load: false,
            dialog: false,
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
            option3: ''
        }),
        components:{
            ChangePassword
        },
        methods:{
            changePass() {
                this.edit_prof = false
                this.chg_pass  = true
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            },
            submitPhoto (event) {
                console.log(this.file)
                this.dialog = false
                this.btn_load = true
                
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
                axios.post('http://api.ceredinas.id/api/auth/changePhotoProfile/'+this.$store.state.dataUser,{
                  photo: this.file
                })
                .then(response => {
                  console.log(response.data)
                })
                .catch(error => {
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
                  // this.$router.push({path: '/'})
                })
                .catch(error => {
                  this.btn_load = false
                  // this.$swal('Oopps', 'Your email or password is invalid', 'warning')
                })
            }
        }
    }
</script>