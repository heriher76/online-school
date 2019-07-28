<template>
    <div class="informasi">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md8 sm12 xs12>
                        <v-layout row wrap>
                            <v-flex md12 sm12 xs12>
                                <v-card style="padding:10px 20px;" color="#B71C1C" dark>
                                    <h6 class="title">INFO CEREBRUM</h6>
                                </v-card>
                            </v-flex>
                            <v-flex md12 sm12 xs12>
                                <div v-show="load_data" style="margin:10px auto; width:5%;">
                                    <v-progress-circular
                                    :size="40"
                                    color="primary"
                                    indeterminate
                                    ></v-progress-circular>
                                </div>

                                <v-data-iterator
                                    :items="this.datas"
                                    :rows-per-page-items="rowsPerPageItems"
                                    :pagination.sync="pagination"
                                    content-class="layout row wrap"
                                    :expand="expand"
                                    no-data-text="Universitas tidak tersedia"
                                    no-results-text="Universitas tidak ditemukan"
                                    :hide-actions="true"
                                >
                                
                                    <template v-slot:item="props">
                                        <v-layout row wrap="" style="border-bottom:1px solid grey; padding:10px 0px; width:100%">
                                            <v-flex md5 sm12 xs12>
                                                <div class="image_info">
                                                    <v-img
                                                        v-bind:src="props.item.url"
                                                        height="180"
                                                        class="grey darken-4"
                                                    ></v-img>
                                                </div>
                                            </v-flex>

                                            <v-flex md7 sm12 xs12>
                                                <div style="margin: 0px 25px">
                                                    <h5 style="color:black;text-transform:capitalize" class="headline">{{props.item.title}}</h5>
                                                    <p v-if="props.item.caption.length<350">{{props.item.caption}}</p>
                                                    <p v-else>{{props.item.caption.substring(0,350)+"..."}}</p>
                                                    <router-link :to="{name: 'detail_informasi', params: {data: props.item} }">Read more >></router-link>
                                                </div>
                                            </v-flex>                      
                                        </v-layout>
                   
                                    </template>
                                </v-data-iterator>
                                <br>
                                <!-- <v-layout row wrap>
                                    <v-flex class="mt-4" offset-md10 offset-sm8 md2 sm4 xs12 style="text-align:right">
                                        <v-select
                                        :items="rowsPerPageItems"
                                        label="Tampil Data per Halaman"
                                        v-model="pagination.rowsPerPage"
                                        outline
                                        ></v-select>
                                    </v-flex> -->
                                    <div class="text-xs-center">
                                        <v-pagination
                                        v-model="pagination.page"
                                        :length="parseInt(Math.ceil(pagination.totalItems/pagination.rowsPerPage)) || 1"
                                        :total-visible="5"
                                        ></v-pagination>
                                    </div>
                                <!-- </v-layout> -->
                            </v-flex>
                        </v-layout>
                </v-flex>
                
                <v-flex md4 sm12 xs12>
                    <SideBar/>
                </v-flex>
            </v-layout>
        </v-container>
        
    </div>
</template>

<script>
    import SideBar from "../../components/informasi/Sidebar"
    import axios from 'axios'

    export default {
        components: {
            SideBar
        },

        data() {
            return{
                load_data:true,    
                datas:[],
                expand: true,
                pagination: {
                    rowsPerPage: 4,
                    totalItems: 0,
                    page: 1
                },
                search: '',
                rowsPerPageItems: [4,8,12],
            }
        },

        methods: {
            // filterSearch(items, search, filter) {
            //     return items.filter(datas => {
            //         return datas.name.toLowerCase().includes(search.toLowerCase())
            //     })
            // }
        },

        mounted(){
            axios.get('/master/information')
            .then(response => {
                this.load_data = false
                this.datas = response.data.data
                this.pagination.totalItems = response.data.data.length
            })
            .catch(error =>{
                console.log(error)
            })
        }
        
    }
</script>

<style>
    /* .image-info{
        height:180px;
        width:260px;
    }
    
    @media only screen and (max-width: 1080px) {
        
        .image-info{
            display: none
        }
    
    } */

</style>
