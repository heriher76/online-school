<template>
    <v-flex md2 sm12 xs12>
        <v-navigation-drawer class="grey lighten-5">          
            <v-list dense class="pt-0">
                <v-list-tile @click="" to="/cereout/exams" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Todays Exams</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" to="/cereout/exams/purchased exams" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Purchased Exams</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" to="/cereout/exams/upcoming exams" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Upcoming Exams</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" to="/cereout/exams/expired exams" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Expired Exams</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-flex> 
</template>
