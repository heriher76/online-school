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
                        <!-- papan peringkat kelas -->
                        <v-flex md8 sm12 xs12>
                            <v-card color="#B71C1C">
                                <h4 class="headline" style="padding:15px;color:white;margin-bottom:-18px;text-transform:capitalize">papan peringkat kelas <span v-if="userClass!=null">{{userClass.name_class}}</span></h4>
                                <v-card-text>
                                    <div style="background:white;height:264px">
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
                                            rows-per-page-items = '3'
                                        >
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
                        <!-- papan peringkat kelas -->

                        <!-- My Exam Stats -->
                        <v-flex md4 sm12 xs12 class="hidden-sm-and-down">
                            <v-card style="height:333px">
                                <v-card-text style="background:#B71C1C;color:white;font-size:20px">Profil Saya</v-card-text>
                                <hr>
                                <div style="text-align:center;height:193px;">
                                    <div style="width:120px;height:120px;margin:8px auto;border:1px solid #E0E0E0;border-radius:100%">
                                        <!-- <div v-if="cekPhoto=='[object Blob]'" style="padding-top:40px;">Tidak ada foto</div>
                                        <span v-else> -->
                                            <img :src="userPhoto" style="border-radius:100%;" alt="not found" width="100%" height="100%">
                                        <!-- </span> -->
                                    </div>
                                    <div style="color:red;">
                                        <h6 class="subheading"><b>{{user.name}}</b></h6>
                                        <p v-if="userClass != null" style="font-size:12px;text-transform: uppercase;">{{userClass.name_class}}</p>
                                        <p v-else style="font-size:12px;">belum ada kelas</p>
                                    </div>
                                </div>
                                <div style="border-top:0.5px solid #E0E0E0; color:red; border-bottom:0.5px solid #E0E0E0; padding:6px">
                                    <div style="text-align:center">
                                        <h6 class="title" style="color:red;"><b>Peringkat</b></h6>
                                        <h4 class="display-1" style="color:red;"><b>{{ranking.rank}}</b></h4>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <hr>
                                <v-divider></v-divider>
                            </v-card>
                        </v-flex>
                        <!-- /My Exam Stats -->

                        <v-flex md9 sm12 xs12>
                            <v-card color="#546E7A" style="height:333px">
                                <div>
                                    <h4 class="headline" style="padding:15px;float:left;color:white;">Grafik Kelas</h4>
                                    <div class="clear"></div>
                                </div>
                                <GChart
                                    type="ColumnChart"
                                    :data="chartData"
                                    :options="chartOptions"
                                /> 
                                graf:{{graf}}<br>
                                <!-- {{cek}} -->
                                chart:{{chartData}}
                            </v-card>
                        </v-flex>

                        <v-flex md3 sm12 xs12>
                            <v-card color="#B71C1C">
                                <h4 class="headline" style="padding:15px;color:white;margin-bottom:-18px;">Top Tryout</h4>
                                <v-card-text>
                                    <div style="background:white;padding:5px;">
                                        <!-- loading -->
                                        <div v-show="load_data" style="margin:0px auto; padding:20px;text-align:center">
                                            <v-progress-circular
                                            :size="40"
                                            color="primary"
                                            indeterminate
                                            ></v-progress-circular>
                                        </div>
                                        <!-- /loading -->
                                        <div v-show="data_topTryout">
                                            <v-card
                                                style="padding:6px"
                                                v-for="n in topTryout" :key="n.id"
                                                elevation="12"    
                                            >
                                                <p style="text-transform:uppercase;padding:2px;color:red"><b>{{n.name}}</b></p>
                                                <span style="float:right;border-left:1px solid #607D8B; padding:2px 0px 0px 10px"><b style="color:red">{{n.attempt}}</b>&nbsp;<b style="color:green">Percobaan</b></span>
                                                <div class="clear"></div>
                                            </v-card>
                                            <div v-if="topTryout==0" style="text-align:center">Data tidak ditemukan</div>
                                        </div>
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
    import { GChart } from "vue-google-charts";
    import SideBar from '../../components/cereout-component/SideBar'
    import Navbar from '../../components/cereout-component/Navbar'
    import axios from 'axios';
    import moment from 'moment'

    export default {
        name: 'dashboard',
        
        components: {
            SideBar,
            Navbar,
            GChart
        },

        data () {
            return {   
                graf: [
                    ["Bulan"],
                    []
                ],
                chart: [],
                // Array will be automatically processed with visualization.arrayToDataTable function
                chartData: [
                    // this.push
                    ["Bulan", "Soshum", "Saintek", "Profit", "SMA 12"],
                    ["Januari", 100, 400, 200, 12],
                    ["Februari", 170, 460, 250, 200],
                    ["Maret", 660, 120, 300, 320],
                    ["April", 130, 540, 350, 390]
                ],
                chartOptions: {
                    chart: {
                    title: "Company Performance",
                    subtitle: "Sales, Expenses, and Profit: 2014-2017"
                    }
                },

                monthNow: new Date().toISOString(),

                topTryout:[],
                
                load_data: true,
                tabl: false,

                data_topTryout: false,

                user: [], 
                userClass: [],
                userPhoto: '',

                ranking: '',  
               
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'Nilai', value: 'score' }
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
            axios.get('/cereouts/chart/class/7')
            .then(response => {
                this.chart = response.data.data
                // this.graf.push(response.data.data)
                // this.graf[0].push(response.data.data)
                // console.log(response.data)
                this.chart.forEach(element => {
                    this.graf[0].push(element.name)
                    // if(this.graf[1] = )
                    this.graf[1].push(element.month)
                    this.graf[1].push(element.score_student)
                });
            })
            .catch(error => {console.log(error)})

            // get user
            axios.get('/auth/user')
            .then(response => {
                this.user      = response.data.data
                this.userClass = response.data.data.class
            })
            .catch(error => {console.log(error)})
            
            //get photo user
            axios.get('http://api.ceredinas.id/api/auth/photoProfile/'+this.$store.state.dataUser, {responseType: 'blob'})
            .then(response => {
                let imgUrl     = URL.createObjectURL(response.data)
                this.userPhoto = imgUrl
            })
            .catch(error => {console.log(error)})

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
                this.data_topTryout = true
                this.topTryout      = response.data.data
                // console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })

        }
    }
</script>
