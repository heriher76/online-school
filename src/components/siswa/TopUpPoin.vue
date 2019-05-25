<template>
    <v-card>
        <v-card-title>
            <h6 class="title">Top Up Poin</h6>
        </v-card-title>
        
        <v-expansion-panel>
            <v-expansion-panel-content
                v-for="(item,i) in 3"
                :key="i"
            >
                <template v-slot:header>
                    <div>Metode Pembayaran {{item}} </div>
                </template>
                <v-card>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-card>
</template>
