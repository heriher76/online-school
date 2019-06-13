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
                        <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px">My Exams</h6></v-card-text>
                    </v-card>                   
                    <v-layout row wrap>
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
                            <v-list>
                                <div v-show="load_data" style="margin:10px auto; width:5%;">
                                    <v-progress-circular
                                    :size="40"
                                    color="primary"
                                    indeterminate
                                    ></v-progress-circular>
                                </div>
                                
                                <v-card 
                                    v-for="item in items"
                                    :key="item.id"
                                >
                                    <v-list-tile v-if="ListName == 'Tryout Kadaluarsa'" class="list">
                                        <v-list-tile-content>
                                            <div><span style="color:#039BE5;font-size:15px; text-transform:capitalize">{{item.name}} | {{item.lesson}}</span><br>
                                            <span style="color:#616161;font-size:14px">Attempt Count: {{item.attempt_count}}</span></div>
                                        </v-list-tile-content>
                                    </v-list-tile>

                                    <v-list-tile v-else @click="examDetail(item)" class="list">
                                        <v-list-tile-content>
                                            <div><span style="color:#039BE5;font-size:15px; text-transform:capitalize">{{item.name}} | {{item.lesson}}</span><br>
                                            <span style="color:#616161;font-size:14px">Attempt Count: {{item.attempt_count}}</span></div>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-card>
                                
                                <div v-show="note" v-if="items == 0" style="text-align:center;color:#757575">
                                    <span>Tidak Ada Data</span>
                                </div>

                            </v-list>
                        </v-flex>  
                    </v-layout>           
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

    import axios from 'axios'

    export default {
        name: 'dashboard',
        components: {
            SideBar,
            Navbar,
            ExamDetail
        },
        data: () => ({
            load_data:true,
            note:false,

            items: [],
            detail: '',
            ListName: 'Daftar Tryout',
            idTryout:'',
        }),
        
        methods:{
            changeList(list){
                this.items = null
                this.load_data = true
                axios.get('/auth/user').then(response => {this.idTryout = response.data.data.id})
                if(list==1){
                    this.ListName = "Daftar Tryout"
                    axios.get('/cereouts')
                    .then(response => {
                        this.load_data = false
                        this.items = response.data.data
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }else if(list==2){
                    this.ListName = "Tryout Diambil"
                    axios.get('/cereouts/attempttryout/'+this.idTryout)
                    .then(response => {
                        this.load_data = false
                        this.items = response.data.data
                    })
                    .catch(error =>{
                        this.load_data = false
                        console.log(error)
                    })
                }else if(list==3){
                    this.ListName = "Tryout Kadaluarsa"
                    axios.get('/cereouts/attempttryout/'+this.idTryout+'/expire')
                    .then(response => {
                        this.load_data = false
                        this.items = response.data.data
                        console.log(response.data)
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
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
            axios.get('/cereouts')
            .then(response => {
                this.load_data = false
                this.note      = true
                this.items     = response.data.data
            })
            .catch(error =>{
                console.log(error)
            })

        },
    }
</script>
