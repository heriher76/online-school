<template>
    <div class="hubungi_kami">
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

                <!-- hubungi kami -->
                <v-flex md6 sm12 xs12 style="min-height:300px">
                    <h5 class="headline" style="color:#424242;margin-bottom:10px">Hubungi Kami</h5>
                    <div v-for="item in items" :key="item.id">
                        <v-card style="padding:10px">
                            <div style="float:left">
                                <label style="font-size:12px;color:#757575">Telepon Admin</label><br>
                                <span style="font-size:16px">{{item.phone}}</span>
                            </div>
                            <div style="float:right;margin:10px 10px 0px 0px">
                                <v-icon>phone</v-icon>
                            </div>
                            <div class="clear"></div>
                        </v-card>

                        <v-card style="padding:10px">
                            <div style="float:left">
                                <label style="font-size:12px;color:#757575">Whatsapp Admin</label><br>
                                <span style="font-size:16px">{{item.whatsapp}}</span>
                            </div>
                            <div style="float:right;margin:11px 10px 0px 0px">
                                <v-img :src="require('../../assets/images/whatsapp.png')" width="22px"></v-img>
                                <!-- <v-icon>phone</v-icon> -->
                            </div>
                            <div class="clear"></div>
                        </v-card>

                        <v-card style="padding:10px">
                            <div style="float:left">
                                <label style="font-size:12px;color:#757575">Email Admin</label><br>
                                <span style="font-size:16px">{{item.email}}</span>
                            </div>
                            <div style="float:right;margin:10px 10px 0px 0px">
                                <v-icon>email</v-icon>
                            </div>
                            <div class="clear"></div>
                        </v-card>
                    </div>
                </v-flex>
                <!-- /hubungi kami -->
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../components/cereout-component/SideBar'
    import Navbar from '../../components/cereout-component/Navbar'
    import axios from 'axios';

    export default {
        components:{
            SideBar,
            Navbar
        },

        data(){
            return {
                items: []
            }
        },

        mounted(){
            axios.get('/master/generalInformation')
            .then(response => {
                this.items = response.data.data
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        }
    }
</script>
