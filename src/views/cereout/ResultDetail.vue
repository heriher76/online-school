<template>
    <div class="result-detail">
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
                
                <!-- leader board -->
                <v-flex md9 sm12 xs12>
                    <v-card>
                        <v-card-text class="px-0"><h6 class="title" style="color:black;margin:4px 20px">Result Detail For SAINTEK 2 (BIO) TO Mei</h6></v-card-text>
                    </v-card>
                    <hr>
                    <v-card>
                        <v-tabs v-model="active" color="deep-orange" dark slider-color="blue">
                            <v-tab v-for="n in name_tab" :key="n" ripple>
                                {{ n }}
                            </v-tab>
                            
                            <v-tab-item>
                                <v-card flat>
                                <v-card-text>Tab 1</v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item>
                                <v-card flat>
                                <v-card-text>Tab 2</v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item>
                                <v-card flat>
                                <v-card-text>Tab 3</v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item>
                                <v-card flat>
                                <v-card-text>Tab 4</v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item>
                                <v-card flat>
                                <v-card-text>Tab 5</v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>
                </v-flex>
                <!-- /leader board -->
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>


<script>
import SideBar from "../../components/cereout-component/SideBar"

export default {
    name: 'result-detail',
    components: {
        SideBar
    },
    data () {
        return {
            active: 0,
            name_tab : [
                'Score Card' , 
                'Subject Report',
                'Time Management' ,
                'Question Report',
                'Solution' ,
                'Compare Report'          
            ]
        }
    },
    methods: {
        next () {
            const active = parseInt(this.active)
            this.active = (active < 2 ? active + 1 : 0)
        }
    }
}
</script>
