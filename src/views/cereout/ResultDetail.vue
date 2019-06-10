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
                        <div style="float:left; margin-top:9px">
                            <v-btn color="primary" @click="$router.go(-1)" icon small dark>
                                <v-icon>keyboard_arrow_left</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text class="px-0"><h6 class="title" style="color:black;margin:4px 20px; text-transform:capitalize">Result Detail For {{data.tryout.name}}</h6></v-card-text>
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
                                {{data}}
                                </v-card>
                            </v-tab-item>

                            <v-tab-item>
                                <v-card flat>
                                <v-card-text>Tab 2</v-card-text>
                                {{detail}}
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
import Axios from 'axios';

export default {
    name: 'result-detail',
    props:['data', 'act'],
    components: {
        SideBar
    },
    data () {
        return {
            detail :[],
            active: this.act,
            name_tab : [
                'Detail', 
                'Pembahasan'        
            ]
        }
    },
    methods: {
        next () {
            const active = parseInt(this.active)
            this.active = (active < 2 ? active + 1 : 0)
        }
    },

    mounted(){
        
        Axios.get('/cereouts/result/detail/'+this.data.id)
        .then(response => {
            this.detail = response.data.data
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

}
</script>
