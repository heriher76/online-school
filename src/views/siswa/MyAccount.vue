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
                    </v-card-title>
                    <div class="clear"></div>
                </v-card>

                <v-card>
                    <v-card-title>
                        <!-- detail -->
                        <MyProfile v-show="my_profile" :datas="dataProfileUser"/>
                        <EditProfile v-show="edit_profile" :datas="dataProfileUser"/>
                        <!-- /detail -->
                    </v-card-title>   
                </v-card>
                </v-flex>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
    import MyProfile from "../../components/siswa/MyProfile"
    import EditProfile from "../../components/siswa/EditProfile"

    export default {
        data: () => ({
            my_profile: true,
            edit_profile: false
        }),

        components:{
            MyProfile,
            EditProfile
        },

        methods: {
            pg_edit() {
                this.edit_profile = true
                this.my_profile   = false
            },
            async getProfileUser(){
              this.$store.dispatch('getProfileUser')
              .then(response => {
                console.log("telah load data..")
              })
            }
        },
        created(){
         this.getProfileUser()
        },
        computed: {
          dataProfileUser(){
            return this.$store.state.dataProfileUser || {}
          },
          userId(){
            return this.$store.state.dataUser || {}
          },
        }
    }
</script>
