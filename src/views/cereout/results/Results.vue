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
                <v-flex md9 sm12 xs12 style="min-height:300px">
                    <v-card color="#B71C1C" dark>
                        <v-card-text class="px-0"><h6 class="title" style="margin:4px 20px">Hasil Tryout</h6></v-card-text>
                    </v-card>
                    <br>
                    <v-card>
                        <div v-show="load_data" style="margin:0px auto; padding:100px; width:5%;">
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
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.attempt }}</td>
                            <td> 
                                <router-link :to="{name: 'results_view', params:{id: props.item.tryout_id, name: props.item.name}}">Lihat</router-link>
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
    
    export default {
    name: 'results',
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
                { text: 'Nama Tryout', value:'name'},
                { text: 'Jumlah Percobaan', value: 'attempt'},
                { text: 'Aksi', value: 'actions'}
            ],
            
            results : []
      }
    },

    mounted(){
        axios.get('/cereouts/result/'+this.$store.state.dataUser)
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