<template>
    <div class="dashboard">
        
        <!-- sub content -->
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <!-- sidebar -->
                <v-flex md3 sm12 xs12>
                    <v-card>
                        <SideBar class="hidden-sm-and-down" style="float:left;"/>
                        <Navbar class="hidden-md-and-up" />
                    </v-card>
                </v-flex>
                <!-- /sidebar -->
                         
                <v-flex md9 sm12 xs12>
                    <v-layout row wrap>
                        <!-- Month Wise Performance -->   
                        <v-flex md8 sm12 xs12>
                            <v-card color="#546E7A" style="height:333px">
                                <h4 class="headline" style="padding:15px;color:white;margin-bottom:-18px;">Papan Peringkat Kelas</h4>

                                <v-card-text>
                                    <v-data-table
                                        :headers="headers"
                                        :items="leader"
                                        disable-initial-sort
                                        rows-per-page-items = 3
                                    >
                                        <template v-slot:items="props">
                                            <td v-if="props.item.name == user.name" style="background:#F5F5F5;color:red"><b>{{props.item.name}}</b></td>
                                            <td v-else>{{props.item.name}}</td>
                                            <td v-if="props.item.name == user.name" style="background:#F5F5F5;color:red"><b>{{props.item.score}}</b></td>
                                            <td v-else>{{props.item.score}}</td>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>           
                        </v-flex>
                        <!-- /Month Wise Performance -->

                        <!-- My Exam Stats -->
                        <v-flex md4 sm12 xs12>
                            <v-card>
                                <v-card-text style="background:#B71C1C;color:white;font-size:20px">Profile Saya</v-card-text>
                                <hr>
                                <div style="text-align:center;color:red">
                                    <div style="width:120px;height:120px;margin:8px auto">
                                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" style="border-radius:100%" alt="user profile" width="100%" height="100%">
                                    </div>

                                    <h6 class="subheading"><b>{{user.name}}</b></h6>
                                    <p style="font-size:12px">SAINTEK</p>
                                </div>
                                <div style="border-top:0.5px solid #E0E0E0; color:red; border-bottom:0.5px solid #E0E0E0; padding:10px">
                                    <div style="text-align:center;width:50%;float:right">
                                        <h6 class="title"><b>Total Tryout</b></h6>
                                        <h5 class="headline" style="color:red">{{attempt.length}}</h5>
                                    </div>
                                    <div style="text-align:center;width:50%;float:right">
                                        <h6 class="title"><b>Ranking</b></h6>
                                        <h5 class="headline" style="color:red">{{ranking.rank}}</h5>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <hr>
                                <v-divider></v-divider>
                            </v-card>
                        </v-flex>
                        <!-- /My Exam Stats -->

                        <v-flex md12>
                            <v-card>
                                
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../components/cereout-component/SideBar'
    import Navbar from '../../components/cereout-component/Navbar'
    import axios from 'axios'

    export default {
        name: 'dashboard',
            components: {
            SideBar,
            Navbar
        },

        data () {
            return {   
                user: [], 
                attempt: [],    
                ranking: '',  
               
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'Score', value: 'score' }
                ],
                leader: []
            }
        },

         mounted(){
            // get user
            axios.get('/auth/user')
            .then(response => {
                this.user = response.data.data
            })
            .catch(error => {
                console.log(error)
            })

            // get trayout attempt
            axios.get('/cereouts/result/'+this.$store.state.dataUser)
            .then(response => {
                this.attempt = response.data.data
            })
            .catch(error => {console.log(error.response)})

            // get ranking
            axios.get('/cereouts/leaderboard/ranking/'+this.$store.state.dataUser)
            .then(response => {
                this.ranking = response.data
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })

            // get leader
            axios.get('/cereouts/leaderboard/'+this.$store.state.classId)//get by class_id user
            .then(response => {
                // this.load_data = false
                // this.tabl      = true
                this.leader    = response.data.data
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        },

    }
</script>
