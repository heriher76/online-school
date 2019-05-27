<template>
    <div class="my_exams">
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <!-- sidebar -->
                <v-flex md3 sm12 xs12>
                    <v-card>
                        <SideBar class="hidden-sm-and-down" style="float:left;"/>
                    </v-card>
                </v-flex>
                <!-- /sidebar -->
                
                <!-- sub content -->
                <v-flex md9 sm12 xs12>
                    <v-card style="margin-bottom:8px">
                        <v-card-text class="px-0"><h6 class="title" style="color:black;margin:4px 20px">My Exams</h6></v-card-text>
                    </v-card>                   
                    <v-layout row wrap>
                        <v-flex md2 sm12 xs12>
                            <v-navigation-drawer class="grey lighten-5">          
                                <v-list dense class="pt-0">
                                    <v-list-tile @click="changeList(1)" active-class="false">
                                        <v-list-tile-content>
                                        <v-list-tile-title>Daftar Tryout</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>

                                    <v-list-tile @click="changeList(2)" active-class="false">
                                        <v-list-tile-content>
                                        <v-list-tile-title>Tryout Dibeli</v-list-tile-title>
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
    import ExamDetail from '../exams/ExamDetails'

    import axios from 'axios'

    export default {
        name: 'dashboard',
        components: {
            SideBar,
            ExamDetail
        },
        data: () => ({
            load_data:true,
            items: [],
            detail: '',
            ListName: 'Daftar Tryout',
            idTryout:'',
        }),
        
        methods:{
            changeList(list){
                
                axios.get('/auth/user').then(response => {this.idTryout = response.data.data.id})

                if(list==1){
                    this.ListName = "Daftar Tryout"
                    axios.get('/cereouts')
                    .then(response => {
                        this.items = response.data.data
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                }else if(list==2){
                    this.ListName = "Tryout Dibeli"
                    axios.get('/cereouts/attempttryout/'+this.idTryout)
                    .then(response => {
                        this.items = response.data.data
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                }else if(list==3){
                    this.ListName = "Tryout Kadaluarsa"
                    axios.get('/cereouts/attempttryout/'+this.idTryout+'/expire')
                    .then(response => {
                        this.items = response.data.data
                    })
                    .catch(error =>{
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
                this.items = response.data.data
            })
            .catch(error =>{
                console.log(error)
            })

        },
    }
</script>
