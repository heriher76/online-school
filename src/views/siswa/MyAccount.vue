<template>
    <v-container>
        <div class="my_account">
            <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title style="float:left">
                        <h6 class="title">My Profile</h6>
                    </v-card-title>                
                    <v-card-title style="float:right">
                        <a @click="pg_edit" v-show="my_profile"> <v-icon small>create</v-icon> Edit Profile</a>
                        <a @click="" v-show="back"> <v-icon small>create</v-icon> Back</a>
                    </v-card-title>
                    <div class="clear"></div>
                </v-card>

                <v-card>
                    <v-card-title>
                        <!-- detail -->
                        <MyProfile v-show="my_profile" :datas="this.dataProfileUser" :photo="this.photo"/>
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
    import axios from 'axios'
    import MyProfile from "../../components/siswa/MyProfile"
    import EditProfile from "../../components/siswa/EditProfile"

    export default {
        data () {
            return {
                user: [],
                my_profile: true,
                edit_profile: false,
                photo: '',
                dataProfileUser: null
            }
        },

        components:{
            MyProfile,
            EditProfile
        },

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
        }
    }
</script>
