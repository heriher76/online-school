<template>
    <v-layout row wrap="">
        <v-flex md3>
            <div style="height:100px;width:85px;">
                <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" width="100%" height="100%" alt="">
            </div>
            <div v-show="edit_prof">
                <v-btn style="margin-left:-1px" small>Change</v-btn>
                <hr style="width:85%">
                <a @click="changePass">Change Password </a>
            </div>
        </v-flex>
        <v-flex md9 style="font-size:14px;">
            <!--  -->
            <div v-show="edit_prof" class="edit_profile">
                <v-text-field style="height:60px" label="Name" placeholder="nama lengkap" value="Febri Ardi Saputra" ></v-text-field>
                <v-text-field style="height:60px" label="Email" placeholder="email" value="ardisaputrafebri@gmail.com" ></v-text-field>
                <v-text-field style="height:60px" label="Phone Number" placeholder="nomor telepon" value="081392382192" ></v-text-field>
                <v-text-field style="height:60px" readonly label="Admission Date" value="23-02-2019" ></v-text-field>
                <v-text-field style="height:60px" readonly label="Group" value="" ></v-text-field>
                <v-divider></v-divider>
                <v-btn block color="red" dark>Update</v-btn>
            </div>
            <!--  -->
            <ChangePassword v-show="chg_pass"/>
        </v-flex>
    </v-layout>
</template>

<script>
    import ChangePassword from "../siswa/ChangePassword"
    export default {
        data: () => ({
            chg_pass:false,
            edit_prof:true
        }),
        components:{
            ChangePassword
        },
        methods:{
            changePass() {
                this.edit_prof = false
                this.chg_pass  = true
            }
        }
    }
</script>

