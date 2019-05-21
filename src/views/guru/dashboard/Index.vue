<template>
    <div class="dashboard">
        
        <!-- sub content -->
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <!-- sidebar -->
                <v-flex md3 sm12 xs12>
                    <v-card>
                        <SideBar class="hidden-sm-and-down" style="float:left;"/>
                    </v-card>
                </v-flex>
                <!-- /sidebar -->
                         
                <v-flex md9 sm12 xs12>
                    <v-layout row wrap>

                        <!-- Month Wise Performance -->   
                        <v-flex md8 sm12 xs12>
                            <v-card dark color="#78909C">
                                <h4 style="padding:15px;margin-bottom:-18px;">Month Wise Performance</h4>

                                <v-card-text>
                                    <v-sheet color="rgba(0, 0, 0, .12)">
                                        <v-sparkline
                                        :value="value"
                                        color="#fff"
                                        height="100"
                                        padding="20"
                                        stroke-linecap="round"
                                        smooth
                                        >
                                        <template v-slot:label="item">
                                            ${{ item.value }}
                                        </template>
                                        
                                        </v-sparkline>
                                    </v-sheet>
                                </v-card-text>
                            </v-card>           
                        </v-flex>
                        <!-- /Month Wise Performance -->

                        <!-- My Exam Stats -->
                        <v-flex md4 sm12 xs12>
                            <v-card dark color="#42A5F5">
                                <v-card-text color="#fffff" style="font-size:18px">My Exam Stats</v-card-text>
                                <div style="border-top:0.5px solid #F5F5F5; border-bottom:0.5px solid #F5F5F5; padding-top:10px">
                                    <div style="text-align:center;width:50%;float:right">
                                        <h6>Total Exam Given</h6>
                                        <h4>50</h4>
                                    </div>
                                    <div style="text-align:center;width:50%;float:right">
                                        <h6>Rank</h6>
                                        <h4>3</h4>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div style="margin: 10px 18px;">
                                    <h6>Best Score In : SAINTEK 2 (BIO) TO Mei</h6>
                                </div>
                                <div style="border-top:0.5px solid #F5F5F5;padding: 8px 18px 0px 18px;">
                                    <div style="float:left;width:65%;">
                                        <b>Absent Exams</b><br>
                                        <b>Failed In</b><br>
                                        <b>Average Percentage</b><br>
                                    </div>
                                    <div style="float:left;text-align:center;width:35%">
                                        <b>0</b><br>
                                        <b>9 Exam</b><br>
                                        <b>33 %</b><br>
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
                                <v-toolbar flat color="white">
                                    <v-toolbar-title>Exam Wise Performance (Top 10)</v-toolbar-title>
                                </v-toolbar>
                                <v-data-table
                                    :headers="headers"
                                    :items="desserts"
                                    class="elevation-1"
                                >
                                    <template v-slot:items="props">
                                    <td>{{ props.item.name }}</td>
                                    <td>{{ props.item.calories }}</td>
                                    <td>{{ props.item.name }}</td>
                                    <td>{{ props.item.calories }}</td>
                                    <td>{{ props.item.fat }}</td>
                                    <td>{{ props.item.carbs }}</td>
                                    <td>{{ props.item.protein }}</td>
                                    <td>{{ props.item.iron }}</td>
                                    </template>
                                </v-data-table>
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
    import SideBar from '../../../components/SideBar_Guru'

    export default {
        name: 'dashboard',
            components: {
            SideBar,
        },
    

        data () {
            return {          
                value: [
                    423,
                    446,
                    20,
                    510,
                    590,
                    610,
                    760
                ],
            
                headers: [
                    { text: 'No', value: 'calories' },
                    { text: 'Name', value: 'fat' },
                    { text: 'Type', value: 'carbs' },
                    { text: 'End Date', value: 'protein' },
                    { text: 'Expiry', value: 'iron' },
                    { text: 'Attempts Remaining', value: 'iron' },
                    { text: 'Amount', value: 'iron' },
                    { text: 'Actions', value: 'iron' }
                ],
                
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%'
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: '1%'
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7%'
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: '8%'
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: '16%'
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0%'
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: '2%'
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: '45%'
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: '22%'
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6%'
                    }
                ]
            }
        }
    }
</script>
