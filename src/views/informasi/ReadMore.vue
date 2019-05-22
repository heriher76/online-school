<template>
    <div class="detail_informasi">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md8 sm12 xs12>
                        <div style="width:90%; margin:0px auto">
                            <div style="width:100%;height:400px">
                                <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" width="100%" height="100%" alt="">
                            </div>
                            <div>
                                <h5 style="color:black; margin:10px 0px" class="headline">Lorem Ipsum Dolor Sit Amet</h5>
                                <p style="color:#757575;font-size:12px">posted: 24 Juni 2019</p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptatem minus, nobis nam reiciendis labore veritatis ipsa iste, dicta maxime, exercitationem repellendus. Iure praesentium eveniet harum natus perspiciatis tenetur accusamus! <br>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corrupti impedit earum quod, quo quidem autem ipsum quos repellendus iure, eos nulla facilis delectus aliquam voluptates officiis nam. Quia, error?
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque commodi animi possimus quo aspernatur voluptatum error totam earum aut rerum? Ullam laborum, facilis doloremque perspiciatis officia voluptatibus! Reiciendis, vero illo!
                                </p>
                            </div>
                        </div>              
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

    export default {
        components: {
            SideBar
        },
        data: () => ({
            
        })
    }
</script>
