<template>
    <v-flex md2 sm12 xs12>
        <v-navigation-drawer class="grey lighten-5">          
            <v-list dense class="pt-0">
                <v-list-tile @click="changeList(1)" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Daftar Tryout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="changeList(2)" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Tryout Dibeli</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="changeList(3)" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Tryout Kadaluarsa</v-list-tile-title>
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
            ListName: 'Daftar Tryout'
        }
    },
    methods:{
        changeList(list){
            var n=''
            if(list==1){
                n = "Daftar Tryout"
            }else if(list==2){
                n = "Tryout Dibeli"
            }else if(list==3){
                n = "Tryout Kadaluarsa"
            }
            return n
        }
    }
}
</script>
