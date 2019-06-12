<template>
    <div class="dashboard">
        
        <!-- sub content -->
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <!-- sidebar -->
                <v-flex md3 sm12 xs12>
                    <v-card>
                        <SideBar class="hidden-sm-and-down" style="float:left;"/>
                    </v-card>
                </v-flex>
                <!-- /sidebar -->
                         
                <v-flex md9 sm12 xs12>
                    <v-layout row wrap>
                        <form class="container">
                            <h1>Edit Akun</h1>
                            <template>
                                <div class="change_passw">
                                    <!-- <v-text-field style="height:60px" label="Email" placeholder="email" value="herhermawan007@gmail.com" ></v-text-field> -->
                                    <v-text-field style="height:60px" label="Password Lama"></v-text-field>
                                    <v-text-field style="height:60px" label="Password Baru"></v-text-field>
                                    <v-divider></v-divider>
                                    <v-btn block color="red" dark>Update</v-btn>
                                </div>
                            </template>
                        </form>
                    </v-layout>
                </v-flex>
                
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../../components/guru/SideBar'

    export default {
        name: 'dashboard',
            components: {
            SideBar
        }
    }
</script>
