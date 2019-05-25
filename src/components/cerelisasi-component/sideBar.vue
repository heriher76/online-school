<template>
    <v-card-text style="padding-top:0">
      <v-toolbar flat dark>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Cerelisasi Menu
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense class="pt-0">
        <v-list-tile
          to="/cerelisasi/form-input-siswa"
        >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Form Input Nilai Siswa</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          to="/cerelisasi/riwayat"
        >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Riwayat Analisis</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
</template>

<script>
export default {

}
</script>
