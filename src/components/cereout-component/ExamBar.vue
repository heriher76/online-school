<template>
    <v-flex md2 sm12 xs12>
        <v-navigation-drawer class="grey lighten-5">          
            <v-list dense class="pt-0">
                <v-list-tile @click="changeList(1)" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Todays Exam</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="changeList(2)" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Purchased Exam</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="changeList(3)" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Upcoming Exam</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="changeList(4)" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Expired Exam</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-flex>
</template>

<script>
export default {
    data() {
        return {
            ListName: 'Todays'
        }
    },
    methods:{
        changeList(list){
            var n=''
            if(list==1){
                n = "Todays"
            }else if(list==2){
                n = "Purchased"
            }else if(list==3){
                n = "Upcoming"
            }else if(list==4){
                n = "Expired"
            }
            return n
        }
    }
}
</script>
