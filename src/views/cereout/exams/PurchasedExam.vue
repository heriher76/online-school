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
                        <v-card-text class="px-0"><h5 style="margin:4px 20px">My Exams</h5></v-card-text>
                    </v-card>                   
                    <v-layout row wrap>
                        <!-- sidebar -->
                        <ExamBar/> 
                        <!-- /sidebar -->
            
                        <v-flex md10 sm12 xs12>
                            <v-card>
                                <v-card-text class="px-0"><h5 style="margin:4px 15px">Purchased Exams</h5></v-card-text>
                            </v-card>
                            <v-list dense class="pt-0">
                                <v-card style="padding:5px" 
                                    v-for="item in items"
                                    :key="item"
                                    >
                                    <v-list-tile @click="">
                                        <v-list-tile-content>
                                            <div><span style="color:#039BE5;font-size:15px">{{item}}</span><br><span style="color:#616161;font-size:14px">20 Questions</span></div>
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
    import SideBar from '../../../components/SideBar'
    import ExamBar from '../../../components/ExamBar'

    export default {
        name: 'my_exams',
        components: {
            SideBar,
            ExamBar
        },
        data: () => ({
            items: [
                'Exam 1 | Lesson', 
                'Exam 2 | Lesson', 
                'Exam 3 | Lesson', 
                'Exam 4 | Lesson',
                'Exam 5 | Lesson', 
                'Exam 6 | Lesson', 
                'Exam 7 | Lesson',
                'Exam 8 | Lesson'
            ]
        })
    }
</script>
