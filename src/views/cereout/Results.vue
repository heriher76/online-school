<template>
    <div class="my_results">
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
                
                <!-- leader board -->
                <v-flex md9 sm12 xs12>
                    <v-card>
                        <v-card-text class="px-0"><h5 style="margin:4px 20px">My Results</h5></v-card-text>
                    </v-card>
                    <br>
                    <v-card>
                        table
                    </v-card>
                </v-flex>
                <!-- /leader board -->
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../components/SideBar'

    export default {
        name: 'dashboard',
        components: {
            SideBar
        }
    }
</script>
