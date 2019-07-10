<template>
    <div class="sidebar">
        <v-navigation-drawer permanent fixed style="margin-left:30px; top:113px; z-index:0;" height="280" width="250">
            <v-toolbar dark color="#B71C1C" height="50">
            <h5 class="headline" style="margin:0px 20px;">Menu Cereout</h5>
            </v-toolbar>
            <v-list dense class="pt-0">
                <v-list-tile to="/cereout/dashboard" style="margin-top:10px">
                    <v-list-tile-action>
                    <v-icon>dashboard</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                    <v-list-tile-title>Beranda</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile to="/cereout/leader board">
                    <v-list-tile-action>
                    <v-icon>trending_up</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                    <v-list-tile-title>Papan Peringkat</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile to="/cereout/exams">
                    <v-list-tile-action>
                    <v-icon>border_color</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                    <v-list-tile-title>Tryout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile to="/cereout/results">
                    <v-list-tile-action>
                    <v-icon>assessment</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                    <v-list-tile-title>Hasil Tryout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile to="/cereout/hubungi kami">
                    <v-list-tile-action>
                    <v-icon>phone</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                    <v-list-tile-title>Hubungi Kami</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>