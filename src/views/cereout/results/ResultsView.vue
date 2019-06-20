<template>
    <div class="leader_board">
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
                
                <!-- results -->
                <v-flex md9 sm12 xs12>
                    <v-card color="#B71C1C">
                        <div style="float:left; margin-top:9px">
                            <v-btn color="white" @click="$router.go(-1)" icon small >
                                <v-icon color="#B71C1C">keyboard_arrow_left</v-icon>
                            </v-btn>
                        </div>
                        <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px;color:white">Hasil Tryout {{name}}</h6></v-card-text>
                    </v-card>
                    <br>
                    <v-card>
                        <div v-show="load_data" style="margin:0px auto; padding:40px; width:5%;">
                            <v-progress-circular
                            :size="40"
                            color="primary"
                            indeterminate
                            ></v-progress-circular>
                        </div>

                        <v-data-table
                            v-show="tabl"
                            :headers="headers"
                            :items="results"
                        >

                        <template v-slot:items="props">
                            <td>{{moment(props.item.created_at).format('DD/MM/YYYY hh:mm')}}</td>
                            <td>{{ props.item.score }}</td>
                            <td>{{ props.item.result_status }}</td>
                            <td> 
                                <router-link :to="{name: 'result_detail', params:{idTryout: props.item.id, data: props.item}}">Detail</router-link>
                                <!-- <router-link :to="{name: 'result_detail', params:{id: props.item.id, data: props.item, act:1}}">Lihat Pembahasan</router-link> -->
                            </td>
                        </template>
 
                        </v-data-table>
                    </v-card>
                </v-flex>
                <!-- /results -->

                <!-- {{results}} -->
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../../components/cereout-component/SideBar'
    import Navbar from '../../../components/cereout-component/Navbar'
    import axios from 'axios';
    import moment from 'moment'

    export default {
    name: 'results',
    props:['id', "name"],
    components: {
        SideBar,
        Navbar
    },
    data () {
        return { 
            cek: new Date().toISOString(), //.toISOString().slice(0,10),
                
            load_data:true,
            tabl: false,

            headers: [
                { text: 'Tanggal Percobaan', value: 'attempt_data'},
                { text: 'Nilai', value: 'score'},
                { text: 'Status', value: 'result_status'},
                { text: 'Aksi', value: 'action'}
            ],

            results : []
      }
    },

    methods: {
	  moment
    },

    mounted(){
        axios.get('/cereouts/tryout/'+this.id+'/result')
        .then(response => {
            this.load_data = false
            this.tabl      = true
            this.results   = response.data.data
            // console.log(response.data)
        })
        .catch(error => {
            console.log(error.response)
        })
    }

  }
</script>