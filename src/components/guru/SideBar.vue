<template>
    <v-navigation-drawer permanent fixed style="margin-left:30px; top:113px; z-index:0;" height="260" width="250">
        <v-toolbar height="50">
          <h5 style="margin:0px 20px">Dashboard Guru</h5>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense class="pt-0">
            <v-list-tile to="/guru">
                <v-list-tile-action>
                <v-icon>dashboard</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>Dashboard</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
			
			<v-list-tile to="/guru/cerecall">
                <v-list-tile-action>
                <v-icon>assessment</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>Cerecall</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile to="/guru/account/edit">
                <v-list-tile-action>
                <v-icon>trending_up</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>Edit Akun</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile to="/guru/profile/edit">
                <v-list-tile-action>
                <v-icon>assessment</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>Edit Profile</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile to="/guru/pusat-bantuan">
                <v-list-tile-action>
                <v-icon>assessment</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>Pusat Bantuan</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {

}
</script>