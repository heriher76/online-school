<template>
    <v-container>
        <div class="my_account">
            <v-layout>
                <!-- sidebar -->
                <v-flex md3 sm12 xs12>
                    <v-card>
                        <SideBar class="hidden-sm-and-down" style="float:left;"/>
                    </v-card>
                </v-flex>
                <!-- /sidebar -->

                <v-flex md9 sm12 xs12>
                <v-card>
                    <v-card-title style="float:left">
                        <h6 class="title">My Profile</h6>
                    </v-card-title>                
                    <v-card-title style="float:right">
                        <a @click="pg_edit" v-show="my_profile"> <v-icon small>create</v-icon> Edit Profile</a>
                    </v-card-title>
                    <div class="clear"></div>
                </v-card>

                <v-card>
                    <v-card-title>
                        <!-- detail myprofile -->
                        <MyProfile v-show="my_profile" :datas="this.dataProfileUser" :photo="this.photo"/>
                        <!-- end of myprofile -->

                        <EditProfile v-show="edit_profile" @canceled="showMyProfile" :datas="this.dataProfileUser" :photo="this.photo"/>
                        <!-- /detail -->
                    </v-card-title>   
                </v-card>
                </v-flex>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
    import MyProfile from "../../../components/guru/MyProfile"
    import EditProfile from "../../../components/guru/EditProfile"
    import SideBar from '../../../components/guru/SideBar'

    import axios from 'axios'

    export default {
        data: () => ({
            my_profile: true,
            edit_profile: false,
            name: '',
            email: '',
            phone: '',
            address: '',
            birth_date: '',
            birth_place: '',
            gender: '',
            parrent_name: '',
            parrent_phone: '',
            membership: '',
            name_class: '',
            photo: '',
            dataProfileUser: null
        }),

        methods: {
            showMyProfile() {
                this.edit_profile = false
                this.my_profile   = true
            },
            pg_edit() {
                this.edit_profile = true
                this.my_profile   = false
            }
        },
        created(){
            //get profile
            axios.defaults.headers = {  
              'Authorization': 'Bearer ' + this.$store.state.token
            }
            axios.get('/auth/user')
            .then(response => {
                this.dataProfileUser= response.data
            })
            .catch(error => {
                console.log(error)
            })

            // get photoprofile
            axios.defaults.headers = {  
              'Authorization': 'Bearer ' + this.$store.state.token
            }
            axios.get('http://api.ceredinas.id/api/auth/photoProfile/'+this.$store.state.dataUser, {responseType: 'blob'})
            .then(response => {
                let imageNode = document.getElementById('myprofile');
                let imgUrl = URL.createObjectURL(response.data)
                this.photo = imgUrl
            })
            .catch(error => {
                console.log(error)
            })
        },
        components:{
            MyProfile,
            EditProfile,
            SideBar
        },
    }
</script>
