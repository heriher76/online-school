<template>
    <v-navigation-drawer permanent style="margin:20px;" width="250">
        <v-toolbar flat>
        <v-list>
            <v-list-tile>
            <v-list-tile-title class="title">
                Application
            </v-list-tile-title>
            </v-list-tile>
        </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list dense class="pt-0">
        
            <v-list-tile @click="" to="/cereout/dashboard">
                <v-list-tile-action>
                <v-icon>dashboard</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>Dashboard</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="" to="/cereout/leader board">
                <v-list-tile-action>
                <v-icon>trending_up</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>Leader Board</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="" to="/cereout/my exams">
                <v-list-tile-action>
                <v-icon>border_color</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                <v-list-tile-title>My Exams</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="" to="/cereout/my results">
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
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'dashboard' },
          { title: 'Leader Board', icon: 'trending_up' },
          { title: 'My Exams', icon: 'border_color' },
          { title: 'My Results', icon: 'assessment' }
        ],
        right: null
      }
    }
  }
</script>