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
                                        <v-list-tile-title>Todays Exam</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>

                                    <v-list-tile @click="changeList(2)" active-class="false">
                                        <v-list-tile-content>
                                        <v-list-tile-title>Purchased Exam</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>

                                    <v-list-tile @click="changeList(3)" active-class="false">
                                        <v-list-tile-content>
                                        <v-list-tile-title>Upcoming Exam</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>

                                    <v-list-tile @click="changeList(4)" active-class="false">
                                        <v-list-tile-content>
                                        <v-list-tile-title>Expired Exam</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-navigation-drawer>
                        </v-flex>
            
                        <v-flex md10 sm12 xs12>
                            <v-card>
                                <v-card-text class="px-0"><h6 class="title" style="margin:4px 15px; text-transform: capitalize">{{ListName}} Exams</h6></v-card-text>
                            </v-card>
                            <v-list>
                                <v-card 
                                    v-for="item in items"
                                    :key="item"
                                    >
                                    <v-list-tile @click="examDetail" class="list">
                                        <v-list-tile-content>
                                            <div><span style="color:#039BE5;font-size:15px">{{item.examName}}</span><br>
                                            <span style="color:#616161;font-size:14px">{{item.questions}} Questions</span></div>
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

    export default {
        name: 'dashboard',
        components: {
            SideBar
        },
        data: () => ({
            items: [
                { examName: 'Exam 1 | Lesson', questions: 20},
                { examName: 'Exam 2 | Lesson', questions: 21},
                { examName: 'Exam 3 | Lesson', questions: 22},
                { examName: 'Exam 4 | Lesson', questions: 23},
                { examName: 'Exam 5 | Lesson', questions: 20},
                { examName: 'Exam 6 | Lesson', questions: 28},
                { examName: 'Exam 7 | Lesson', questions: 30},
                { examName: 'Exam 8 | Lesson', questions: 50}
            ],
            ListName: 'Todays'
        }),
        
        methods:{
            changeList(list){
                var n=''
                if(list==1){
                    n = "Todays"
                }else if(list==2){
                    n = "Purchased"
                }else if(list==3){
                    n = "Upcoming"
                }else if(list==4){
                    n = "Expired"
                }
                this.ListName = n
            },
            examDetail() {
                this.$router.push({path: '/cereout/exams/detail' })
            }
        }
    }
</script>
