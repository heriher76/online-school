<template>
    <div class="detail_informasi">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md8 sm12 xs12>
                    <div v-show="detailProp" style="width:90%; margin:0px auto">
                        <h4 class="display-1" style="text-transform:capitalize"><b>{{data.title}}</b></h4>
                        <v-img
                            :src="data.url"
                            class="grey darken-4"
                        ></v-img>
                        <div style="margin:20px 0px">
                            <p>{{data.caption}}</p>
                            <p style="color:#757575;font-size:14px"> <v-icon size="17px">query_builder</v-icon> {{data.created_at}}</p>
                        </div>
                    </div>  

                    <div v-show="detailRec" style="width:90%; margin:0px auto">
                        <h4 class="display-1" style="text-transform:capitalize"><b>{{dataDet.title}}</b></h4>
                        <v-img
                            :src="dataDet.url"
                            class="grey darken-4"
                        ></v-img>
                        <div style="margin:20px 0px">
                            <p>{{dataDet.caption}}</p>
                            <p style="color:#757575;font-size:14px"> <v-icon size="17px">query_builder</v-icon> {{dataDet.created_at}}</p>
                        </div>
                    </div>              
                </v-flex>

                <v-flex md4 sm12 xs12>
                    <!-- <SideBar/> -->
                    <div style="margin:0px 15px">
                        <div style="margin:10px 22px">
                            <h6 class="title">INFO TERBARU</h6>
                        </div>
                        <ul class="side_bar">
                            <v-divider></v-divider>
                            <div v-show="load_data" style="margin:10px auto; width:5%;">
                                <v-progress-circular
                                :size="30"
                                color="primary"
                                indeterminate
                                ></v-progress-circular>
                            </div>
                            <li v-for="(recent, index) in posts" :key="recent.id">
                                <div v-if="index<10">
                                    <a @click="detail(recent)" style="text-transform:capitalize">{{recent.title}}&nbsp;</a> <br>
                                    <span style="color:#757575; font-size:12px">dimuat: {{recent.created_at}}</span>
                                    <v-divider></v-divider>
                                </div>
                            </li>
                        </ul>
                    </div>

                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>


<script>    
    import SideBar from "../../components/informasi/Sidebar"
    import axios from 'axios'

    export default {
        props:["data"],
        components: {
            SideBar
        },
        data () {
            return {
                detailProp: true,
                detailRec: false,
                dataDet: [],
                posts: [], 
                load_data:true,
            }
        },

        methods:{
            detail(val){
                this.detailProp = false
                this.detailRec  = true
                this.dataDet    = val
            }
        },

        mounted(){
            if(this.data == null || this.dataDet == null){
                return this.$router.push({name: 'informasi'})
            }
            axios.get('/master/information')
            .then(response => {
                this.load_data = false
                this.posts     = response.data.data
            })
            .catch(error =>{
                console.log(error)
            })
        }
    }
</script>

<style>
    .side_bar li{
        list-style: circle;
    }

    .side_bar li a{
        text-decoration: none;
        color: black;
    }
</style>
