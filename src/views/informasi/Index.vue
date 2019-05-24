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
                                
                                <div v-for="item in 3" :key="item">
                                    <v-layout row wrap="" style="border-bottom:1px solid grey; padding:10px 0px">
                                        <v-flex md4>
                                            <div class="image_info">
                                                <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" width="100%" height="100%" alt="">
                                            </div>
                                        </v-flex>

                                        <v-flex md8>
                                            <div style="margin: 0px 25px">
                                                <h5 style="color:black" class="headline">Lorem Ipsum Dolor Sit Amet</h5>
                                                <p>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptatem minus, nobis nam reiciendis labore veritatis ipsa iste, dicta maxime, exercitationem repellendus. Iure praesentium eveniet harum natus perspiciatis tenetur accusamus! <br>
                                                    <router-link to="/informasi/detail">Read more >></router-link>
                                                </p>
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

    export default {
        components: {
            SideBar
        },
        data: () => ({
            items: [
                {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'},
                {src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'},
                {src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'},
            ]
        })
    }
</script>
