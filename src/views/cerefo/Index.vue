<template>
	<div class="informasi">
	    <v-container grid-list-md>
	        <v-layout row wrap>
	            <v-flex md4 sm12 xs12>
	                <div>
	                    <div>
	                        <v-flex md12 sm12 xs12 style="margin-top: -4px;">
	                            <v-card style="padding:10px 20px;" color="#B71C1C" dark>
	                                <h6 class="title">KATEGORI</h6>
	                            </v-card>
	                        </v-flex>
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
	                            <v-btn color="default" style="border-radius: 10%;">Pemrograman</v-btn>
	                        </ul>
	                    </div>

	                </div>
	            </v-flex>

	            <v-flex md8 sm12 xs12>
	                    <v-layout row wrap>
	                        <v-flex md12 sm12 xs12>
	                            <v-card style="padding:10px 20px;" color="#B71C1C" dark>
	                                <h6 class="title">CEREFO TODAY</h6>
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

	                            <div v-for="info in datas" :key="info.id">
	                                <v-layout row wrap="" style="border-bottom:1px solid grey; padding:10px 0px">
	                                    <v-flex md5 sm12 xs12>
	                                        <div class="image_info">
	                                            <v-img
	                                                v-bind:src="info.url"
	                                                height="180"
	                                                class="grey darken-4"
	                                            ></v-img>
	                                        </div>
	                                    </v-flex>

	                                    <v-flex md7 sm12 xs12>
	                                        <div style="margin: 0px 25px">
	                                            <h5 style="color:black;text-transform:capitalize" class="headline">{{info.title}}</h5>
	                                            <p v-if="info.caption.length<350">{{info.caption}}</p>
	                                            <p v-else>{{info.caption.substring(0,350)+"..."}}</p>
	                                            <router-link :to="{name: 'detail_informasi', params: {data: info} }">Read more >></router-link>
	                                        </div>
	                                    </v-flex>                      
	                                </v-layout>
	                            </div>
	                        </v-flex>
	                    </v-layout>
	            </v-flex>

	        </v-layout>
	    </v-container>
	    
	</div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return{
                load_data:true,    
                datas:[],
            }
        },

        created(){
            axios.get('/master/information')
            .then(response => {
                this.load_data = false
                this.datas = response.data.data
            })
            .catch(error =>{
                console.log(error)
            })

            axios.get('/cerepost')
            .then(response => {
            	console.log(response)
                this.load_data = false
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