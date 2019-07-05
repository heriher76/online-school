<template>
    <div class="informasi">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md8 sm12 xs12>
                        <v-layout row wrap>
                            <v-flex md12 sm12 xs12>
                                <v-card style="padding:10px 20px;" color="#B71C1C" dark>
                                    <h6 class="title">DETAIL UNIVERSITAS</h6>
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

                                <div>
                                    <v-layout row wrap="" style="border-bottom:1px solid grey; padding:10px 0px">
                                        <v-flex md5 sm12 xs12>
                                            <div class="image_info">
                                                <v-img
                                                    v-bind:src="this.link_image"
                                                    height="180"
                                                    class="grey darken-4"
                                                ></v-img>
                                            </div>
                                        </v-flex>

                                        <v-flex md7 sm12 xs12>
                                            <div style="margin: 0px 25px">
                                                <h5 style="color:black;text-transform:capitalize" class="headline">{{this.name}}</h5>
                                                <p>{{this.description}}</p>
												
	                                            <v-icon style="float: left;">home</v-icon><p style="float: left;">{{this.address}}</p>
                                                <br><br>
                                                <v-icon style="float: left;">phone</v-icon><p>{{this.phone}}</p>
                                            </div>
                                        </v-flex>                      
                                    </v-layout>
                                </div>
                            </v-flex>
                        </v-layout>
                </v-flex>
                
                <v-flex md4 sm12 xs12>
                    <div>
                        <div style="margin:0px 15px">
                            <div style="margin:10px 22px">
                                <h6 class="title">FAKULTAS</h6>
                            </div>
                            <ol class="side_bar">
                                <v-divider></v-divider>
                                <div v-show="load_data" style="margin:10px auto; width:5%;">
                                    <v-progress-circular
                                    :size="30"
                                    color="primary"
                                    indeterminate
                                    ></v-progress-circular>
                                </div>
                                <li v-for="(faculty, index) in faculties" :key="faculty.id" style="margin-left: 15px; margin-top: 10px;">
                                    <b>{{faculty.name}}</b>
                                    <ol class="side_bar">
                                        <li v-for="(department, i) in faculty.department" :key="department.id">
                                            <router-link :to="{ name: 'cerejur_detail_jurusan', params: { name: department.name, capacity: department.capacity, description: department.description, video_url: department.video_url, interrested_num: department.interrested_num, passing_grade: department.passing_grade, id: department.id } }" style="cursor: pointer;">{{department.name}}</router-link>
                                        </li>
                                        <br>
                                    </ol>
                                </li>
                                
                            </ol>
                        </div>

                    </div>
                </v-flex>
            </v-layout>
        </v-container>
        
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
    	props: ['name', 'address', 'description', 'link_image', 'phone', 'id'],

        data() {
            return{
                load_data:true,    
                faculties:[],
            }
        },

        mounted(){console.log(this.link_image)
            axios.get('/cerejur/faculty/'+this.id)
            .then(response => {console.log(response)
                this.load_data = false
                this.faculties = response.data.data
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
	    color: black;
	}
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
