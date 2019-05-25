<template>
    <div class="pusat_bantuan">
            <v-card style="background:#B71C1C">
            <v-container>
                <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <h3 class="display-2" style="color:white">Apa yang bisa kami bantu?</h3>
                    <div style="margin-top:10px">
                        <v-text-field
                            v-model="first"
                            label="Cari topik bantuan"
                            solo
                        ></v-text-field>
                    </div>
                </v-flex>
                </v-layout>
            </v-container>
        </v-card>

        <v-container>
            <v-layout>
                <v-flex xs12 sm6 offset-sm3>

                </v-flex>
            </v-layout>

            <v-layout style="margin: 0px 100px">
                <v-flex md4>
                    <h4 class="display-1">Kategori</h4>
                    <ul class="kategori">
                        <li><a href="">lorem ipsum dolor sit amet</a></li>
                        <li><a href="">lorem ipsum dolor sit amet</a></li>
                        <li><a href="">lorem ipsum dolor sit amet</a></li>
                        <li><a href="">lorem ipsum dolor sit amet</a></li>
                        <li><a href="">lorem ipsum dolor sit amet</a></li>
                        <li><a href="">lorem ipsum dolor sit amet</a></li>
                        <li><a href="">lorem ipsum dolor sit amet</a></li>
                    </ul>
                </v-flex>
                <v-flex md8>
                    <h4 class="display-1">FAQ</h4>
                    <ul class="faq">
                        <li><a href="">lorem ipsum dolor sit amet?</a><hr></li>
                        <li><a href="">lorem ipsum dolor sit amet?</a><hr></li>
                        <li><a href="">lorem ipsum dolor sit amet?</a><hr></li>
                        <li><a href="">lorem ipsum dolor sit amet?</a><hr></li>
                        <li><a href="">lorem ipsum dolor sit amet?</a><hr></li>
                        <li><a href="">lorem ipsum dolor sit amet?</a><hr></li>
                        <li><a href="">lorem ipsum dolor sit amet?</a><hr></li>
                        <li><a href="">lorem ipsum dolor sit amet?</a><hr></li>
                        <li><a href="">lorem ipsum dolor sit amet?</a><hr></li>
                    </ul>
                </v-flex>
            </v-layout>

        </v-container>
    </div>
</template>


<style>
    .kategori li{
        list-style: none;
        margin: 10px 0px 10px -22px
    }

    .kategori li a{
        text-decoration: none;
        color: black
    }

    .faq li{
        list-style: none;
        margin: 10px 0px 10px -22px
    }

    .faq li a{
        text-decoration: none;
        font-size: 18px;
        color: black;
    }

    .faq hr{
        margin: 10px 0px
    }
</style>

