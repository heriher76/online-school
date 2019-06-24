<template>
    <div class="my_exams">
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
                
                <!-- sub content -->
                <v-flex md9 sm12 xs12>
                    <v-card color="#B71C1C" dark style="margin-bottom:8px">
                        <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px">Tryout</h6></v-card-text>
                    </v-card>  

                    <v-card v-show="loadTryout"> 
                        <div style="margin:10px auto; padding:100px; width:5%;">
                            <v-progress-circular
                            :size="40"
                            color="primary"
                            indeterminate
                            ></v-progress-circular>
                        </div>
                    </v-card>

                    <div v-show="listCere">
                        <v-layout v-if="user.membership==1" row wrap>
                            <v-flex md2 sm12 xs12 class="hidden-sm-and-down">
                                <v-navigation-drawer class="grey lighten-5">          
                                    <v-list dense class="pt-0">
                                        <v-list-tile @click="changeList(1)" active-class="false">
                                            <v-list-tile-content>
                                            <v-list-tile-title>Daftar Tryout</v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile @click="changeList(2)" active-class="false">
                                            <v-list-tile-content>
                                            <v-list-tile-title>Tryout Diambil</v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile @click="changeList(3)" active-class="false">
                                            <v-list-tile-content>
                                            <v-list-tile-title>Tryout Kadaluarsa</v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-navigation-drawer>
                            </v-flex>
                
                            <v-flex md10 sm12 xs12>
                                <v-card>
                                    <v-card-text class="px-0"><h6 class="title" style="margin:4px 15px; text-transform: capitalize">{{ListName}}</h6></v-card-text>
                                </v-card>

                                <v-card v-show="load_data"> 
                                    <div style="margin:10px auto; padding:20px; width:5%;">
                                        <v-progress-circular
                                        :size="40"
                                        color="primary"
                                        indeterminate
                                        ></v-progress-circular>
                                    </div>
                                </v-card>
                                
                                <v-expansion-panel v-show="listPanel" v-if="items != 0">
                                    <v-expansion-panel-content
                                        v-for="(itemCL,i) in classs"
                                        :key="i"
                                    >
                                    <template v-slot:header>
                                        <div>{{itemCL.name}}</div>
                                    </template>
                                    <v-card>
                                        <v-list>
                                            <div
                                                v-for="item in items"
                                                :key="item.id"
                                            >
                                                <v-card v-if="item.class==itemCL.name">
                                                    <v-list-tile v-if="ListName == 'Tryout Kadaluarsa'" class="list">
                                                        <v-list-tile-content>
                                                            <div><span style="color:#039BE5;font-size:15px; text-transform:capitalize">{{item.name}} | {{item.lesson}}</span><br>
                                                            <span style="color:#616161;font-size:14px">Batas Percobaan: {{item.attempt_count}}</span></div>
                                                        </v-list-tile-content>
                                                    </v-list-tile>

                                                    <v-list-tile v-else @click="examDetail(item)" class="list">
                                                        <v-list-tile-content>
                                                            <div><span style="color:#039BE5;font-size:15px; text-transform:capitalize">{{item.name}} | {{item.lesson}}</span><br>
                                                            <span style="color:#616161;font-size:14px">Batas Percobaan: {{item.attempt_count}}</span></div>
                                                        </v-list-tile-content>
                                                    </v-list-tile>
                                                </v-card>
                                            </div>
                                            
                                            <div v-show="note" v-if="items == 0" style="text-align:center;color:#757575">
                                                <span>Tidak Ada Data</span>
                                            </div>

                                        </v-list>
                                    </v-card>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <div v-show="note" v-if="items == 0" style="text-align:center;color:#757575">
                                    <v-list>
                                        <span>Tidak Ada Data</span>
                                    </v-list>
                                </div>

                            </v-flex>  
                        </v-layout>     
                    
                        <div v-else-if="user.membership==0">
                            <router-link :to="{name:'membership'}" style="color:black;text-decoration:none">
                                <v-card dark class="elevation-10" color="#03A9F4" style="border-radius:10px;border:2px solid white;text-align:center;padding:20px">
                                    <b style="font-size:28px;">DAFTARKAN DIRIMU MEMBER DI<span style="color:#B71C1C;-webkit-text-stroke-width: 0.8px;-webkit-text-stroke-color: white;">CEREBRUM</span> SEKARANG JUGA !!</b>
                                    <p>Klik Disini Untuk Mendaftar</p>
                                </v-card>
                            </router-link>
                            <br>
                            <v-divider></v-divider> 
                            <v-layout>
                                <v-flex md5 sm12 xs12>
                                    <h6 class="title" style="margin:12px 0px;color:#616161">Spesial Khusus Member Baru</h6>
                                    
                                    <v-carousel
                                        style="border-radius:10px"
                                        hide-delimiters
                                        height=180
                                        interval=6000
                                        hide-controls
                                    >
                                        <div v-show="load_member" style="margin:50px auto; width:5%;">
                                            <v-layout column justify-center align-center>
                                                <hollow-dots-spinner
                                                :animation-duration="1000"
                                                :dot-size="15"
                                                :dots-num="3"
                                                color="#ff1d5e"
                                                />
                                            </v-layout>
                                        </div>

                                        <v-carousel-item
                                            v-for="(item,i) in member"
                                            :key="i"
                                            :src="item.url"
                                        >

                                        <v-jumbotron
                                            dark
                                            src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                                        >
                                
                                            <div style="margin:25px 25px 10px 25px; text-transform:capitalize;color:white">
                                                <span>Membership</span>
                                                <h4 class="display-1">
                                                    <b v-if="item.name.length<30">{{item.name}}</b>
                                                    <b v-else>{{item.name.substring(0,30)+"..."}}</b>
                                                </h4>
                                            </div>
                                            <div style="margin:0px 28px;border-top:1px solid white">
                                                <h6 class="title" v-if="item.coupon_name!=null" style="color:white;float:right;padding-top:10px">kode kupon: {{item.coupon_code}}</h6>
                                                <div class="clear"></div>
                                            </div>
                                        
                                        </v-jumbotron>
                                        </v-carousel-item>
                                    </v-carousel> 
                                    </v-flex>
                            </v-layout>
                        </div>      
                    </div>
                    
                </v-flex>  
                <!-- /sub content -->   
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import SideBar from '../../../components/cereout-component/SideBar'
    import Navbar from '../../../components/cereout-component/Navbar'
    import ExamDetail from '../exams/ExamDetails'
    import { HollowDotsSpinner } from 'epic-spinners'

    import axios from 'axios'

    export default {
        name: 'dashboard',
        components: {
            HollowDotsSpinner,
            SideBar,
            Navbar,
            ExamDetail
        },
        data () {
            return {
                load_member:true, 
                member: [],
                loadTryout:true,
                load_data:true,
                note:false,
                listPanel:false,
                listCere:false,
                
                user: [],
                classs: [],
                items: [],
                detail: '',
                ListName: 'Daftar Tryout',
            }
        },
        
        methods:{
            changeList(list){
                this.items = null
                this.load_data = true
                this.listPanel = false
                
                if(list==1){
                    this.ListName = "Daftar Tryout"
                    axios.get('/cereouts')
                    .then(response => {
                        this.load_data = false
                        this.listPanel = true
                        this.items = response.data.data
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }else if(list==2){
                    this.ListName = "Tryout Diambil"
                    axios.get('/cereouts/attempttryout/'+this.$store.state.dataUser)
                    .then(response => {
                        this.load_data = false
                        this.listPanel = true
                        this.items = response.data.data
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }else if(list==3){
                    this.ListName = "Tryout Kadaluarsa"
                    axios.get('/cereouts/attempttryout/'+this.$store.state.dataUser+'/expire')
                    .then(response => {
                        this.load_data = false
                        this.listPanel = true
                        this.items = response.data.data
                        // console.log(response.data)
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }
            },

            examDetail(data) {
                this.$router.push({name: 'details_exams', params: {detail:data} })
            },
        },

        mounted(){
            axios.get('/auth/user')
            .then(response => {this.user = response.data.data})
            .catch(error => {console.log(error)})

            axios.get('/cereouts')
            .then(response => {
                this.loadTryout= false
                this.load_data = false
                this.listPanel = true
                this.note      = true
                this.items     = response.data.data
                this.listCere  = true
            })
            .catch(error =>{
                console.log(error)
            })

            axios.get('/master/class')//get class
            .then(response => {
                this.classs = response.data.data
            })
            .catch(error => {console.log(error.response)})

            axios.get('/master/membership')
            .then(response => {
                this.load_member = false
                this.member = response.data.data
            })
            .catch(error => {
                console.log(error.response)
            })
        },
    }
</script>
