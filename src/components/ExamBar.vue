<template>
    <v-flex md2 sm12 xs12>
        <v-navigation-drawer class="grey lighten-5">          
            <v-list dense class="pt-0">
                <v-list-tile @click="" :to="{ name: 'my_exams', params: {examType: 'todays' } }" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Todays Exam</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" :to="{ name: 'my_exams', params: {examType: 'purchased' } }" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Purchased Exam</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" :to="{ name: 'my_exams', params: {examType: 'upcoming' } }" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Upcoming Exam</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click="" :to="{ name: 'my_exams', params: {examType: 'expired' } }" active-class="false">
                    <v-list-tile-content>
                    <v-list-tile-title>Expired Exam</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-flex>
</template>
