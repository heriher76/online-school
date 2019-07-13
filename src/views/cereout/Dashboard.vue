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
                            <v-card style="height:336px">
                                <h4 class="headline" style="background:#B71C1C;padding:15px;color:white;">Profil Saya</h4>
                                <hr>
                                <div style="text-align:center;height:198px;">
                                    <div style="width:120px;height:120px;margin:8px auto;border:1px solid #E0E0E0;border-radius:100%">
                                        <v-img
                                            v-if="user.photo_url!=null"
                                            style="border-radius:100%;" width="100%" height="100%"
                                            :src="user.photo_url"
                                        ></v-img>
                                    </div>
                                    <div style="color:red;">
                                        <h6 class="subheading"><b>{{user.name}}</b></h6>
                                        <p v-if="userClass != null" style="font-size:12px;text-transform: uppercase;">{{userClass.name_class}}</p>
                                        <p v-else style="font-size:12px;">belum ada kelas</p>
                                    </div>
                                </div>
                                <div style="border-top:0.5px solid #E0E0E0;height:70px; color:red; border-bottom:0.5px solid #E0E0E0; padding:6px">
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

                        <!-- papan peringkat kelas -->
                        <v-flex md8 sm12 xs12>
                            <v-card color="#546E7A" style="padding:15px;">
                                <h4 class="headline" style="color:white;text-transform:capitalize">Grafik Nilai Kelas <label v-if="userClass != null">{{userClass.name_class}}</label></h4>
                                <div style="background:white;height:264px;margin-top:14px">
                                    <!-- <GChart
                                        v-if="graf!=0"
                                        style="padding:30px 10px"
                                        :settings="{packages: ['bar']}"    
                                        :data="graf"
                                        :options="chartOptClass"
                                        :createChart="(el, google) => new google.charts.Bar(el)"
                                        @ready="onChartCReady"
                                    /> -->
                                    <GChart
                                        v-if="graf!=0"
                                        style="padding:30px 10px"
                                        :data="graf"
                                    />
                                    <GChart
                                        v-else
                                        style="padding:30px 10px"
                                        :settings="{packages: ['bar']}"    
                                        :data="chartNull"
                                        :options="chartOptClass"
                                        :createChart="(el, google) => new google.charts.Bar(el)"
                                        @ready="onChartCReady"
                                    />
                                </div>
                            </v-card>
                        </v-flex>
                        <!-- papan peringkat kelas -->

                        <!-- My Exam Stats -->
                        <v-flex md4 sm12 xs12 class="hidden-sm-and-down">
                            <v-card style="height:336px">
                                <h4 class="headline" style="background:#B71C1C;padding:15px;color:white;">Profil Saya</h4>
                                <hr>
                                <div style="text-align:center;height:198px;">
                                    <div style="width:120px;height:120px;margin:8px auto;border:1px solid #E0E0E0;border-radius:100%">
                                        <v-img
                                            v-if="user.photo_url!=null"
                                            style="border-radius:100%;" width="100%" height="100%"
                                            :src="user.photo_url"
                                        ></v-img>
                                    </div>
                                    <div style="color:red;">
                                        <h6 class="subheading"><b>{{user.name}}</b></h6>
                                        <p v-if="userClass != null" style="font-size:12px;text-transform: uppercase;">{{userClass.name_class}}</p>
                                        <p v-else style="font-size:12px;">belum ada kelas</p>
                                    </div>
                                </div>
                                <div style="border-top:0.5px solid #E0E0E0;height:70px; color:red; border-bottom:0.5px solid #E0E0E0; padding:6px">
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
                            <v-card color="#546E7A" style="padding:15px;">
                                <!-- <h4 class="headline" style="color:white;text-transform:capitalize">Grafik Nilai Pelajaran</h4> -->
                                <v-layout row wrap>
                                    <v-flex md5>
                                        <h4 class="headline" style="margin:9px 0px;color:white;text-transform:capitalize">Grafik Nilai Pelajaran</h4>
                                    </v-flex>
                                    <v-flex md7>
                                        <v-select
                                            solo
                                            :items="lessons"
                                            label="Lihat Pelajaran"
                                            v-model="pelajaran"
                                            item-text="name"
                                            item-value="id"
                                            @change="getChartLesson"
                                        ></v-select>
                                    </v-flex>
                                </v-layout>
                                
                                <div style="background:white;margin-top:-15px">
                                    <!-- loading -->
                                    <div v-show="load_CL" style="border:1px solid white;">
                                        <fingerprint-spinner
                                            style="margin:160px auto" 
                                            :animation-duration="1500"
                                            :size="64"
                                            color="#ff1d5e"
                                        />
                                        <span>Memuat data...</span>
                                    </div>
                                    <!-- /loading -->

                                    <div v-show="show_CL">
                                        <GChart
                                            v-if="chartLess!=0"
                                            style="padding:30px 10px"
                                            :settings="{packages: ['bar']}"    
                                            :data="chartLesson"
                                            :options="chartOptions"
                                            :createChart="(el, google) => new google.charts.Bar(el)"
                                            @ready="onChartReady"
                                        />
                                        <GChart
                                            v-else
                                            style="padding:30px 10px"
                                            :settings="{packages: ['bar']}"    
                                            :data="chartNull"
                                            :options="chartOptions"
                                            :createChart="(el, google) => new google.charts.Bar(el)"
                                            @ready="onChartReady"
                                        /> 
                                    </div>
                                </div>
                            </v-card>
                        </v-flex>

                        <v-flex md3 sm12 xs12>
                            <v-card color="#B71C1C">
                                <h4 class="headline" style="padding:15px;color:white;margin-bottom:-18px;">Top 5 Tryout</h4>
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
                                                v-for="(n,index) in topTryout" :key="n.id"
                                                elevation="15"    
                                            >
                                                <p style="text-transform:capitalize;padding:2px;color:#424242"><b>{{n.name}}</b></p>
                                                
                                                    <span style="float:left;margin:3px 0px 0px 3px">{{index+1}}</span>
                                                    <v-icon color="red">start</v-icon>
                                                    
                                                    <span style="float:right;border-left:1px solid #BDBDBD; padding:2px 0px 0px 10px"><b style="color:blue">{{n.attempt}}</b>&nbsp;<b style="color:#757575">Percobaan</b></span>
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
    import { FingerprintSpinner } from 'epic-spinners'
    import { GChart } from 'vue-google-charts'
    import SideBar from '../../components/cereout-component/SideBar'
    import Navbar from '../../components/cereout-component/Navbar'
    import axios from 'axios';
    import moment from 'moment'

    export default {
        name: 'dashboard',
        components: {
            SideBar,
            FingerprintSpinner,
            Navbar,
            GChart
        },

        data () {
            return {   
                // chartData: [
                //     ["", "Sales", "Profit"],
                //     ["2014", 4.00, 0.00]
                // ],

                chartNull: [
                    ["Bulan", ""],
                    ["", 0]
                ],
                //graf Class
                graf: [],
                month: [""],
                nilai: [],
                chart: [],
                chartCLib:null,

                //graf lesson
                load_CL: false,
                show_CL: true,
                pelajaran: '',
                lessons: [],
                chartLess: [],
                monthLess: [""],
                nilaiLess: [],
                chartLesson: [],
                chartsLib: null, 
                
                monthNow: new Date().toISOString(),
                
                load_data: true,
                data_topTryout: false,
                topTryout:[],

                user: [], 
                userClass: [],
                ranking: '',  
               
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'Nilai', value: 'score' }
                ],
            }
        },

        computed:{
            chartOptions () {
                if (!this.chartsLib) return null
                return this.chartsLib.charts.Bar.convertOptions({
                    bars: 'horizontal', // Required for Material Bar Charts.
                    hAxis: { format: 'decimal' },
                    height: 345,
                    colors: ['#1b9e77', '#d95f02', '#7570b3']
                })
            },
            chartOptClass () {
                if (!this.chartCLib) return null
                return this.chartCLib.charts.Bar.convertOptions({
                    bars: 'vertikal', // Required for Material Bar Charts.
                    hAxis: { format: 'decimal' },
                    height: 250,
                    // colors: ['#1b9e77', '#d95f02', '#7570b3']
                })
            },
        },
        methods: {
            moment,
            onChartReady (chart, google) {
                this.chartsLib = google
            },
            onChartCReady (chart, google) {
                this.chartsLibC = google
            },

            //get chart lesson
            getChartLesson(){
                this.load_CL = true
                this.show_CL = false
                var n;
                this.monthLess   = [""]
                this.nilaiLess   = []
                this.chartLesson = []

                axios.get('/cereouts/chart/lesson/'+this.pelajaran)//get by lesson id
                .then(response => {
                    this.load_CL = false
                    this.show_CL = true
                    this.chartLess = response.data.data
                    
                    this.chartLess.forEach(element => {
                        this.monthLess.push(element.name)
                        if(element.month == this.nilaiLess[0]){
                            if(element.score_student == null){
                                n = 0
                            }else{
                                n = parseInt(element.score_student)
                            }
                            this.nilaiLess.push(n)
                        }
                        else{
                            if(element.score_student == null){
                                n = 0
                            }else{
                                n = parseInt(element.score_student)
                            }
                            this.nilaiLess.push(element.month, n)
                        }
                    });
                    this.chartLesson.push(this.monthLess, this.nilaiLess)
                })
                .catch(error => {
                    console.log(error.response)
                })
            },
        },

        mounted(){
            // get user
            axios.get('/auth/user')
            .then(response => {
                this.user      = response.data.data
                this.userClass = response.data.data.class
            })
            .catch(error => {console.log(error)})
          
          // get ranking
            axios.get('/cereouts/leaderboard/ranking/'+this.$store.state.classId)
            .then(response => {
                this.load_data = false
                this.tabl      = true
                this.ranking   = response.data
                // console.log(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })

            if(this.$store.state.classId!=null) {
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

                //get lessons
                axios.get('/lessons/'+this.$store.state.classId)
                .then(response => {
                    this.lessons = response.data.data
                })
                .catch(error => {console.log(error.response)})

                //chart class
                var n
                axios.get('/cereouts/chart/class/'+this.$store.state.classId)
                .then(response => {
                    this.chart = response.data.data
                    this.chart.forEach(element => {
                        this.month.push(element.name)
                        if(element.month != this.nilai[0]){
                            if(element.score_student == null){
                                n = 0
                            }else{
                                n = parseInt(element.score_student)
                            }
                            this.nilai.push(element.month, n)
                        }
                        else{
                            if(element.score_student == null){
                                n = 0
                            }else{
                                n = parseInt(element.score_student)
                            }
                            this.nilai.push(n)
                        }
                    });
                    this.graf.push(this.month, this.nilai)
                })
                .catch(error => {console.log(error)})
            }
            
        }
    }
</script>
