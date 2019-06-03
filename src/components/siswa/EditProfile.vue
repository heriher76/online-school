<template>
    <v-layout row wrap="">
        <v-flex md3>
            <div style="height:100px;width:85px;">
                <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" width="100%" height="100%" alt="">
            </div>
            <div v-show="edit_prof">
                <input type="file" ref="file" style="display: none" v-on:change="handleFileUpload()">
                <v-btn style="margin-left:-1px" @click="$refs.file.click()" small>Change</v-btn>
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
    import ChangePassword from "../siswa/ChangePassword"
    export default {
        props: ['datas'],
        data: () => ({
            chg_pass:false,
            edit_prof:true,
            btn_load: false,
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