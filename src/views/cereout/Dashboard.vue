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
                        <!-- My Exam Stats -->
                        <v-flex md4 sm12 xs12 class="hidden-md-and-up">
                            <v-card>
                                <v-card-text style="background:#B71C1C;color:white;font-size:20px">Profile Saya</v-card-text>
                                <hr>
                                <div style="text-align:center;color:red">
                                    <div style="width:120px;height:120px;margin:8px auto">
                                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" style="border-radius:100%" alt="user profile" width="100%" height="100%">
                                    </div>

                                    <h6 class="subheading"><b>{{user.name}}</b></h6>
                                    <p style="font-size:12px;text-transform: uppercase;">{{userClass.name_class}}</p>
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

                        <!-- Month Wise Performance -->   
                        <v-flex md8 sm12 xs12>
                            <v-card color="#546E7A" style="height:333px">
                                <div>
                                    <h4 class="headline" style="padding:15px;float:left;color:white;margin-bottom:-18px;">Grafik Skor Tryout</h4>
                                    <h6 class="subheading" style="float:right; margin:20px 20px 0px 0px;color:white">{{ moment(monthNow).format('MMMM - YYYY')}} </h6>
                                    <div class="clear"></div>
                                </div>

                                <v-card-text>
                                    <div style="background:white;height:250px;padding-top:10px">
                                        <!-- loading -->
                                        <div v-show="load_data" style="margin:0px auto; padding:60px;text-align:center">
                                            <v-progress-circular
                                            :size="40"
                                            color="primary"
                                            indeterminate
                                            ></v-progress-circular>
                                        </div>
                                        <!-- /loading -->
                                        
                                        <v-sheet 
                                            color="cyan"
                                            class="v-sheet--offset mx-auto"
                                            elevation="12"
                                            max-width="calc(100% - 32px)"
                                        >
                                            <v-sparkline
                                                :value="value"
                                                color="#fff"
                                                height="100"
                                                line-width="2"
                                                padding="20"
                                                stroke-linecap="round"
                                                smooth
                                            >
                                            <template v-slot:label="item">
                                                s:{{ item.value }}
                                            </template>
                                            </v-sparkline>
                                        </v-sheet>
                                        <v-container fluid="">
                                            <v-card style="padding:0px 10px">
                                                <span style="color:green">s = skor nilai</span>
                                            </v-card>
                                        </v-container>
                                    </div>
                                </v-card-text>
                            </v-card>  
                                    
                        </v-flex>
                        <!-- /Month Wise Performance -->

                        <!-- My Exam Stats -->
                        <v-flex md4 sm12 xs12 class="hidden-sm-and-down">
                            <v-card style="height:333px">
                                <v-card-text style="background:#B71C1C;color:white;font-size:20px">Profil Saya</v-card-text>
                                <hr>
                                <div style="text-align:center;color:red">
                                    <div style="width:120px;height:120px;margin:8px auto">
                                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" style="border-radius:100%" alt="user profile" width="100%" height="100%">
                                    </div>

                                    <h6 class="subheading"><b>{{user.name}}</b></h6>
                                    <p style="font-size:12px;text-transform: uppercase;">{{userClass.name_class}}</p>
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

                        <v-flex md9 sm12 xs12>
                             <v-card color="#B71C1C">
                                <h4 class="headline" style="padding:15px;color:white;margin-bottom:-18px;text-transform:capitalize">papan peringkat kelas {{userClass.name_class}}</h4>

                                <v-card-text>
                                    <div style="background:white;">
                                        <!-- loading -->
                                        <div v-show="load_data" style="margin:0px auto; padding:60px;text-align:center">
                                            <v-progress-circular
                                            :size="40"
                                            color="primary"
                                            indeterminate
                                            ></v-progress-circular>
                                        </div>
                                        <!-- /loading -->
                                        <v-data-table
                                            v-show="tabl"
                                            :headers="headers"
                                            :items="leader"
                                            disable-initial-sort
                                        >
                                            <!-- rows-per-page-items = '3' -->
                                            <template v-slot:items="props">
                                                <td v-if="props.item.name == user.name" style="background:#F5F5F5;color:red"><b>{{props.item.name}}</b></td>
                                                <td v-else>{{props.item.name}}</td>
                                                <td v-if="props.item.name == user.name" style="background:#F5F5F5;color:red"><b>{{props.item.score}}</b></td>
                                                <td v-else>{{props.item.score}}</td>
                                            </template>
                                        </v-data-table>
                                    </div>
                                </v-card-text>
                            </v-card>   
                        </v-flex>

                        <v-flex md3 sm12 xs12>
                            <v-card color="#B71C1C">
                                <h4 class="headline" style="padding:15px;color:white;margin-bottom:-18px;">Top Tryout</h4>
                                <v-card-text>
                                    <div style="background:white;padding:5px">
                                        <!-- loading -->
                                        <div v-show="load_data" style="margin:0px auto; padding:20px;text-align:center">
                                            <v-progress-circular
                                            :size="40"
                                            color="primary"
                                            indeterminate
                                            ></v-progress-circular>
                                        </div>
                                        <!-- /loading -->
                                        <v-card
                                            style="padding:6px"
                                            v-for="n in topTryout" :key="n"
                                            elevation="12"    
                                        >
                                            <span style="float:left;text-transform:uppercase;padding:2px"><b>{{n.name}}</b></span>
                                            <span style="float:right;border-left:1px solid black; padding:2px"><b>{{n.attempt}}</b> Percobaan</span>
                                            <div class="clear"></div>
                                        </v-card>
                                    </div>
                                </v-card-text>
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
    import axios from 'axios';
    import moment from 'moment'

    export default {
        name: 'dashboard',
        
        components: {
            SideBar,
            Navbar
        },

        data () {
            return {    
                monthNow: new Date().toISOString(),

                topTryout:[],
                
                load_data: true,
                tabl: false,

                user: [], 
                userClass: [],

                attempt: [],    
                ranking: '',  
               
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'Score', value: 'score' }
                ],
                leader: [],

                results: [],
                value: [],
            }
        },

        methods:{
            moment
        },

        mounted(){
            // get user
            axios.get('/auth/user')
            .then(response => {
                this.user      = response.data.data
                this.userClass = response.data.data.class
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
                this.load_data = false
                this.tabl      = true
                this.ranking   = response.data
                // console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })

            // get leader
            axios.get('/cereouts/leaderboard/'+this.$store.state.classId)//get by class_id user
            .then(response => {
                this.load_data = false
                this.tabl      = true
                this.leader    = response.data.data
                // console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })

            // get top tryout
            axios.get('/cereouts/leaderboard/toptryout/'+this.$store.state.classId)//get by class_id user
            .then(response => {
                this.topTryout = response.data.data
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })

            //get result tryout
            var n
            var bln
            var blnNow

            axios.get('/cereouts/result/'+this.$store.state.dataUser)
            .then(response => {
                this.load_data = false
                this.tabl      = true
                this.results   = response.data.data

                this.results.forEach(element => {
                    blnNow = new Date().getMonth()
                    bln    = moment(element.created_at).format('M')

                    // console.log(bln, blnNow+1)
                    if(bln == blnNow+1){
                        if(element.score == null){
                            n = 0
                        }else{
                            n = element.score
                        }
                        this.value.push(n)
                    }
                });
            })
            .catch(error => {
                console.log(error.response)
            }) 
        }
    }
</script>
