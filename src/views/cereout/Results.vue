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
                    <v-card color="#B71C1C" dark>
                        <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px">My Results</h6></v-card-text>
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
                            <td>{{ props.item.tryout.name }}</td>
                            <td>{{moment(props.item.created_at).format('DD/MM/YYYY hh:mm')}}</td>
                            <td>{{ props.item.score }}</td>
                            <td>{{ props.item.result_status }}</td>
                            <td> 
                                <router-link :to="{name: 'result_detail', params:{id: props.item.id, data: props.item, act:0}}">Detail</router-link> | 
                                <router-link :to="{name: 'result_detail', params:{id: props.item.id, data: props.item, act:1}}">Lihat Pembahasan</router-link>
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
    import SideBar from '../../components/cereout-component/SideBar'
    import Navbar from '../../components/cereout-component/Navbar'
    import axios from 'axios';
    import moment from 'moment'

    export default {
    name: 'dashboard',
        components: {
            SideBar,
            Navbar
    },
    data () {
        return {
            load_data:true,
            tabl: false,

            headers: [
                { text: 'Exam Name', value:'name'},
                { text: 'Attempt Date', value: 'attempt_data'},
                { text: 'Score', value: 'score'},
                { text: 'Result', value: 'result_status'},
                { text: 'Action', value: 'action'}
            ],
            
            results : []
      }
    },

    methods: {
	  moment
    },

    mounted(){
        axios.get('/cereouts/result/'+this.$store.state.dataUser)
        .then(response => {
            this.load_data = false
            this.tabl      = true
            this.results   = response.data.data
        })
        .catch(error => {
            console.log(error.response)
        })
    }

  }
</script>