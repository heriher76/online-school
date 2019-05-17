<template>
    <v-navigation-drawer permanent fixed style="margin-left:30px; top:113px; z-index:0;" height="260" width="250">
        <v-toolbar height="50">
          <h5 style="margin:0px 20px">Application</h5>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense class="pt-0">
            <v-list-tile to="/cereout/dashboard">
                <v-list-tile-action>
                <v-icon>dashboard</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>Dashboard</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile to="/cereout/leader board">
                <v-list-tile-action>
                <v-icon>trending_up</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>Leader Board</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'my_exams', params: { examType: 'todays' }}">
                <v-list-tile-action>
                <v-icon>border_color</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>My Exams</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile to="/cereout/results">
                <v-list-tile-action>
                <v-icon>assessment</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>My Results</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {

}
</script>