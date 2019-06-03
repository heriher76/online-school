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
                        <!-- detail -->
                        <MyProfile v-show="my_profile" :datas="dataProfileGuru"/>
                        <EditProfile v-show="edit_profile" :datas="dataProfileGuru"/>
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

    export default {
        data: () => ({
            my_profile: true,
            edit_profile: false
        }),

        components:{
            MyProfile,
            EditProfile,
            SideBar
        },

        methods: {
            pg_edit() {
                this.edit_profile = true
                this.my_profile   = false
            },
            async getProfileGuru(){
              this.$store.dispatch('getProfileGuru')
              .then(response => {
                console.log("telah load data..")
              })
            }
        },
        created(){
         this.getProfileGuru()
        },
        computed: {
          dataProfileGuru(){
            return this.$store.state.dataProfileGuru || {}
          },
          userId(){
            return this.$store.state.dataGuru || {}
          },
        }
    }
</script>
