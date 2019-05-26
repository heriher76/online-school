<template>
    <div class="informasi">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md8 sm12 xs12>
                        <v-layout row wrap>
                            <v-flex md12 sm12 xs12>
                                <v-carousel style="height:400px;">
                                    <v-carousel-item
                                    v-for="(item,i) in items"
                                    :key="i"
                                    :src="item.src"
                                    ></v-carousel-item>
                                </v-carousel>
                            </v-flex>
                            <v-flex md12 sm12 xs12>
                                <v-card style="padding:10px 20px">
                                    <h6 class="title">INFO CEREBRUM</h6>
                                </v-card>
                            </v-flex>
                            <v-flex md12 sm12 xs12>
                                
                                <div v-for="info in 3" :key="info">
                                    <v-layout row wrap="" style="border-bottom:1px solid grey; padding:10px 0px">
                                        <v-flex md4>
                                            <div class="image_info">
                                                <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" width="100%" height="100%" alt="">
                                            </div>
                                        </v-flex>

                                        <v-flex md8>
                                            <div style="margin: 0px 25px">
                                                <h5 style="color:black" class="headline">coba</h5>
                                                <p>
                                                    coba
                                                    <router-link to="/informasi/detail">Read more >></router-link>
                                                </p>
                                            </div>
                                        </v-flex>                      
                                    </v-layout>
                                </div>
                                
                            </v-flex>
                        </v-layout>
                </v-flex>


        cobalah

        <div v-for="coin in coins" :key="coin.id">
          <p>id : {{ coin.id }}</p>
          <p>title : {{ coin.title }}</p>
          <p>caption : {{ coin.caption }} </p>
        </div>

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

    import { mapState } from 'vuex'

    export default {
        components: {
            SideBar
        },
        data: () => ({
            items: [
                {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'},
                {src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'},
                {src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'},
            ],

            infos: [
                {
                    'id': 1,
                    'title': 'lorem',
                    'caption': 'lorem ipsum dolor sit amet'
                }
            ],
        }),

        mounted () {
            this.$store.dispatch('loadInformation')
        },
        computed: mapState([
            'coins'
        ])

        // computed:{
        //     getInformation() {
        //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token

        //         axios.get('/master/information')
        //         .then(response => {
        //             console.log(response.data)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        //     }
        // }
    }
</script>
