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
                <v-flex md9 sm12 xs12 style="min-height:300px">
                    <v-card color="#B71C1C" dark style="margin-bottom:8px">
                        <div v-if="user.membership==1" class="hidden-md-and-up" style="float:left; margin:18px 10px 0px 20px">
                            <v-menu
                                v-model="menuList"
                                :close-on-content-click="false"
                                :nudge-width="200"
                                offset-x
                            >
                            <template v-slot:activator="{ on }">
                                <a v-on="on">
                                <v-icon>list</v-icon><v-icon>arrow_drop_down</v-icon>
                                </a>
                            </template>
                                <v-card>
                                    <v-list>
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
                                </v-card>
                            </v-menu>
                        </div>
                        <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px">Tryout</h6></v-card-text>

                        <div v-if="user.membership==1" class="hidden-md-and-up">
                            <v-autocomplete
                                v-model="model"
                                :items="searchItem"
                                :loading="isLoading"
                                :search-input.sync="search"
                                chips
                                clearable
                                hide-details
                                hide-selected
                                append-icon="search"
                                item-text="name"
                                item-value="name"
                                label="Tryout apa yang anda cari?"
                                solo
                                no-data-text="Tryout tidak ditemukan"
                            >
                                <template v-slot:item="data">
                                    <template>
                                        <v-list-tile @click="examDetail(data.item)">
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                                <!-- <v-list-tile-sub-title v-html="data.item.class"></v-list-tile-sub-title> -->
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </template>
                                </template>
                            </v-autocomplete>
                        </div>
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
                            <v-flex md2 sm12 xs12 class="hidden-md-and-down">
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
                                <v-card height="57px">
                                    <v-layout row wrap>
                                        <v-flex md4>
                                            <h6 class="title" style="margin:15px 0px 0px 16px; text-transform: capitalize">{{ListName}}</h6>
                                        </v-flex>
                                        <v-flex md3>
                                            <v-select
                                                v-if="ListName == 'Daftar Tryout'"
                                                :items="classs"
                                                item-value="id"
                                                item-text="name"
                                                label="Kelas"
                                                solo
                                                @change="showClassLT"
                                            ></v-select>
                                            <v-select
                                                v-else-if="ListName == 'Tryout Diambil'"
                                                :items="classs"
                                                item-value="id"
                                                item-text="name"
                                                label="Kelas"
                                                solo
                                                @change="showClassLTU"
                                            ></v-select>
                                            <v-select
                                                v-else-if="ListName == 'Tryout Kadaluarsa'"
                                                :items="classs"
                                                item-value="id"
                                                item-text="name"
                                                label="Kelas"
                                                solo
                                                @change="showClassLTK"
                                            ></v-select>
                                        </v-flex>


                                        <v-flex md5 sm12 xs12>
                                            <v-autocomplete
                                                class="hidden-md-and-down"
                                                v-model="model"
                                                :items="searchItem"
                                                :loading="isLoading"
                                                :search-input.sync="search"
                                                chips
                                                clearable
                                                hide-details
                                                hide-selected
                                                append-icon="search"
                                                item-text="name"
                                                item-value="name"
                                                label="Tryout apa yang anda cari?"
                                                solo
                                                no-data-text="Tryout tidak ditemukan"
                                            >
                                                <template v-slot:item="data">
                                                    <template>
                                                        <v-list-tile @click="examDetail(data.item)">
                                                            <v-list-tile-content>
                                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                                                <!-- <v-list-tile-sub-title v-html="data.item.class"></v-list-tile-sub-title> -->
                                                            </v-list-tile-content>
                                                        </v-list-tile>
                                                    </template>
                                                </template>
                                            </v-autocomplete>
                                        </v-flex>
                                    </v-layout>

                                </v-card>

                                <v-card v-show="load_data"> 
                                    <div style="text-align:center; padding:20px;">
                                        <v-progress-circular
                                            :size="40"
                                            color="primary"
                                            indeterminate
                                        ></v-progress-circular>
                                    </div>
                                </v-card>
                                
                                
                                <v-card v-show="listPanel" v-if="items != 0">
                                    <v-list>
                                        <div
                                            v-for="item in items"
                                            :key="item.id"
                                        >
                                            <v-card>
                                                <v-list-tile v-if="ListName == 'Tryout Kadaluarsa'" class="list">
                                                    <v-list-tile-content>
                                                        <div><span style="color:#039BE5;font-size:15px; text-transform:capitalize">{{item.name}} | {{item.lesson}}</span><br>
                                                        <span style="color:#616161;font-size:14px">Batas Percobaan: <span v-if="item.left_attempt!=null">{{item.left_attempt.left_attempt}}</span> <span v-else>{{item.attempt_count}}</span></span></div>
                                                    </v-list-tile-content>
                                                </v-list-tile>

                                                <v-list-tile v-else @click="examDetail(item)" class="list">
                                                    <v-list-tile-content>
                                                        <div><span style="color:#039BE5;font-size:15px; text-transform:capitalize">{{item.name}} | {{item.lesson}}</span><br>
                                                        <span style="color:#616161;font-size:14px">Batas Percobaan: <span v-if="item.left_attempt!=null && ListName=='Daftar Tryout'">{{item.left_attempt.left_attempt}}</span> <span v-else-if="ListName=='Tryout Diambil'">{{item.left_attempt}}</span> <span v-else>{{item.attempt_count}}</span></span></div>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </v-card>
                                        </div>
                                        
                                        <div v-show="note" v-if="items == 0" style="text-align:center;color:#757575">
                                            <span>Tidak Ada Data</span>
                                        </div>

                                    </v-list>
                                </v-card>

                                <div v-show="note" v-if="items == 0" style="text-align:center;color:#757575">
                                    <v-list>
                                        <span>Tidak Ada Data</span>
                                    </v-list>
                                </div>

                            </v-flex>  
                            
                        </v-layout>     
            
                        <div v-else-if="user.membership==0">
                            <router-link v-if="user.class==null" :to="{name: 'my_account', params:{snackb: 'true'}}" style="color:black;text-decoration:none">
                                <v-card dark class="elevation-10" color="#03A9F4" style="border-radius:10px;border:2px solid white;text-align:center;padding:20px">
                                    <b style="font-size:28px;">DAFTARKAN DIRIMU MEMBER DI<span style="color:#B71C1C;-webkit-text-stroke-width: 0.8px;-webkit-text-stroke-color: white;">CEREBRUM</span> SEKARANG JUGA !!</b>
                                    <p>Klik Disini Untuk Mendaftar</p>
                                </v-card>
                            </router-link>
                            <router-link v-else :to="{name:'membership'}" style="color:black;text-decoration:none">
                                <v-card dark class="elevation-10" color="#03A9F4" style="border-radius:10px;border:2px solid white;text-align:center;padding:20px">
                                    <b style="font-size:28px;">DAFTARKAN DIRIMU MEMBER DI<span style="color:#B71C1C;-webkit-text-stroke-width: 0.8px;-webkit-text-stroke-color: white;">CEREBRUM</span> SEKARANG JUGA !!</b>
                                    <p>Klik Disini Untuk Mendaftar</p>
                                </v-card>
                            </router-link>
                            <br>
                            <v-divider></v-divider> 

                            <v-container grid-list-lg>
                                <v-layout row wrap>
                                    <v-flex md5 sm12 xs12>
                                        <h6 class="title" style="margin-bottom:12px;color:#616161">Spesial Khusus Member Baru</h6>
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

                                    <!-- hubungi kami -->
                                    <v-flex md7 sm12 xs12 style="min-height:300px">
                                        <h6 class="title" style="margin-bottom:12px;color:#616161">Hubungi Admin</h6>

                                        <div v-show="load_data" style="margin:150px auto; width:5%;">
                                            <v-layout column justify-center align-center>
                                                <hollow-dots-spinner
                                                :animation-duration="1000"
                                                :dot-size="15"
                                                :dots-num="3"
                                                color="#ff1d5e"
                                                />
                                            </v-layout>
                                        </div>

                                        <div v-show="listData" v-for="contact in contacts" :key="contact.id">
                                            <v-card style="padding:10px">
                                                <div style="float:left">
                                                    <label style="font-size:12px;color:#757575">Telepon Admin</label><br>
                                                    <span style="font-size:16px">{{contact.phone}}</span>
                                                </div>
                                                <div style="float:right;margin:10px 10px 0px 0px">
                                                    <v-icon>phone</v-icon>
                                                </div>
                                                <div class="clear"></div>
                                            </v-card>
                                            
                                            <a href="https://mauorder.online/diproses" style="cursor:pointer" target="_blank">
                                                <v-card style="padding:10px">
                                                    <div style="float:left">
                                                        <label style="font-size:12px;color:#757575">Whatsapp Admin</label><br>
                                                        <span style="font-size:16px">{{contact.whatsapp}}</span>
                                                    </div>
                                                    <div style="float:right;margin:11px 10px 0px 0px">
                                                        <v-img :src="require('../../../assets/images/whatsapp.png')" width="22px"></v-img>
                                                        <!-- <v-icon>phone</v-icon> -->
                                                    </div>
                                                    <div class="clear"></div>
                                                </v-card>
                                            </a>

                                            <v-card style="padding:10px">
                                                <div style="float:left">
                                                    <label style="font-size:12px;color:#757575">Email Admin</label><br>
                                                    <span style="font-size:16px">{{contact.email}}</span>
                                                </div>
                                                <div style="float:right;margin:10px 10px 0px 0px">
                                                    <v-icon>email</v-icon>
                                                </div>
                                                <div class="clear"></div>
                                            </v-card>
                                        </div>
                                    </v-flex>
                                    <!-- /hubungi kami -->
                                </v-layout>
                            </v-container>
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
                load_data:true,
                listData:false,
                contacts: [],

                menuList:false,
                searchItem: [],

                isLoading: false,
                model: null,
                search: null,
                
                load_member:true, 
                member: [],
                loadTryout:true,
                load_data:true,
                note:false,
                listPanel:false,
                listCere:false,
                
                user: [],
            
                classs: [
                    {id:0, name:'Lihat Semua'}
                ],
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

            // get list tryout by class
            showClassLT(val){
                this.load_data = true
                this.listPanel = false
                this.note      = false

                if(val == 0){
                    axios.get('/cereouts')
                    .then(response => {
                        this.load_data = false
                        this.listPanel = true
                        this.note      = true
                        this.items = response.data.data
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }
                else{
                    axios.get('/cereouts/class/'+val)
                    .then(response => {
                        this.load_data = false
                        this.listPanel = true
                        this.note      = true
                        this.items     = response.data.data
                        // console.log(response.data)
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }
            },

            // get tryout user by class
            showClassLTU(val){
                this.load_data = true
                this.listPanel = false
                this.note      = false
                
                if(val == 0){
                    axios.get('/cereouts/attempttryout/'+this.$store.state.dataUser)
                    .then(response => {
                        this.load_data = false
                        this.listPanel = true
                        this.items     = response.data.data
                        this.note      = true
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }else{
                    axios.get('/cereouts/attempttryout/class/'+val)
                    .then(response => {
                        this.load_data = false
                        this.listPanel = true
                        this.note      = true
                        this.items     = response.data.data
                        // console.log(response.data)
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }
            },

            // get tryout kadaluarsa by class
            showClassLTK(val){
                this.load_data = true
                this.listPanel = false
                this.note      = false

                if(val == 0){
                    axios.get('/cereouts/attempttryout/'+this.$store.state.dataUser+'/expire')
                    .then(response => {
                        this.load_data = false
                        this.listPanel = true
                        this.items     = response.data.data
                        this.note      = true
                        // console.log(response.data)
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }
                else{
                    axios.get('/cereouts/attempttryout/class/'+val+'/expire')
                    .then(response => {
                        this.load_data = false
                        this.listPanel = true
                        this.note      = true
                        this.items     = response.data.data
                        // console.log(response.data)
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }
            },

            examDetail(data) {
                this.$router.push({name: 'details_exams', params: {detail:data, ListName: this.ListName} })
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
                this.searchItem= response.data.data
                this.listCere  = true
            })
            .catch(error =>{
                console.log(error)
            })

            var dtClass = []
            axios.get('/master/class')//get class
            .then(response => {
                this.dtClass = response.data.data
                
                this.dtClass.forEach(element => {
                    this.classs.push(element)
                });
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

            axios.get('/master/generalInformation')
            .then(response => {
                this.load_data = false
                this.listData  = true
                this.contacts  = response.data.data
                // console.log(response.data.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        },
    }
</script>
