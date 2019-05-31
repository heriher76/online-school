<template>
    <div class="detail_informasi">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md8 sm12 xs12>
                        <div style="width:90%; margin:0px auto">
                            <div style="width:100%;height:400px">
                                <img :src="data.url" width="100%" height="100%" alt="">
                            </div>
                            <div>
                                <h5 style="color:black; margin:10px 0px" class="headline">{{data.title}}</h5>
                                <p style="color:#757575;font-size:12px">posted: {{data.created_at}}</p>
                                <p>{{data.caption}}</p>
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
        props:["data"],
        components: {
            SideBar
        },
        data: () => ({
            
        })
    }
</script>
