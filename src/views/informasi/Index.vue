<template>
    <div class="informasi">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md8 sm12 xs12>
                        <v-layout row wrap>
                            <v-flex md12 sm12 xs12>
                                <v-carousel style="height:400px;">
                                    <div v-show="load_data" style="margin:130px auto; width:5%;">
                                        <v-progress-circular
                                        :size="40"
                                        color="primary"
                                        indeterminate
                                        ></v-progress-circular>
                                    </div>
                                    <v-carousel-item
                                    v-for="(item,i) in sliders"
                                    :key="i"
                                    :src="item.url"
                                    ></v-carousel-item>
                                </v-carousel>
                            </v-flex>
                            <v-flex md12 sm12 xs12>
                                <v-card style="padding:10px 20px">
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
                                
                                <div v-for="info in infos" :key="info.id">
                                    <v-layout row wrap="" style="border-bottom:1px solid grey; padding:10px 0px">
                                        <v-flex md4>
                                            <div class="image_info">
                                                <img :src="info.url" width="100%" height="100%" alt="">
                                            </div>
                                        </v-flex>

                                        <v-flex md8>
                                            <div style="margin: 0px 25px">
                                                <h5 style="color:black" class="headline">{{info.title}}</h5>
                                                <span> 
                                                    {{info.caption}}
                                                </span> <br>
                                                <router-link :to="{name: 'detail_informasi', params: {data: info} }">Read more >></router-link>
                                            </div>
                                        </v-flex>                      
                                    </v-layout>
                                </div>
                                
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

                sliders:[],
                infos: []
            }
        },

        mounted(){
        //  axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token

            axios.get('/master/information')
            .then(response => {
                this.load_data = false
                // if(response.data.data.category = 'sliders'){
                this.sliders = response.data.data
                // }
                this.infos = response.data.data
            })
            .catch(error =>{
                console.log(error)
            })
        }
        
    }
</script>
