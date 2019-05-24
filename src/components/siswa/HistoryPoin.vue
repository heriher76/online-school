<template>
    <v-card>
        <v-card-title>
            <h6 class="title">History</h6>
        </v-card-title>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile :key="index" avatar ripple @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text><span style="color:green">{{ item.action }}</span></v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
    </v-card>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { action: 'Poin : 90', title: 'Ali Connors', subtitle: "Pembayaran" },
          { action: 'Poin : 34', title: 'me, Scrott, Jennifer', subtitle: "Pembayaran" },
          { action: 'Poin : 12', title: 'Sandra Adams', subtitle: "Pembayaran" },
        ]
      }
    }
  }
</script>
