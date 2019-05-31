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
                            <input id="foto" type="file">
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
                            @click="dialog = false"
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
                <v-text-field style="height:60px" label="Name" placeholder="nama lengkap" :value="dataUser.name"></v-text-field>
                <v-text-field style="height:60px" label="Email" placeholder="email" :value="dataUser.email"></v-text-field>
                <v-text-field style="height:60px" label="Phone Number" placeholder="nomor telepon" :value="dataUser.phone"></v-text-field>
                <v-text-field style="height:60px" readonly label="Admission Date" value="23-02-2019" ></v-text-field>
                <v-text-field style="height:60px" readonly label="Group" value="" ></v-text-field>
                <v-divider></v-divider>
                <v-btn block color="red" dark>Update</v-btn>
            </div>
            <!-- {{dataUser}} -->
            <!--  -->
            <ChangePassword v-show="chg_pass"/>
        </v-flex>
    </v-layout>
</template>

<script>
    import ChangePassword from "../siswa/ChangePassword"
    export default {
        props:["dataUser"],

        data () {
            return {
                dialog: false,
                chg_pass:false,
                edit_prof:true
            }
        },
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

