<template>
    <v-footer dark height="auto">
        <v-card class="flex">
            <v-card-title class="blue-grey lighten-5 black--text">
                <v-container>
                    <v-layout row wrap>
                        <v-flex md4>
                            <v-img :src="require('../assets/images/dsc_logo.png')" width="280px"></v-img>
                            <div style="margin:10px 20px;color:#424242">
                                <p>DSC Solution Challenge</p>
                                <p>Developer Students Club chapter UIN Sunan Gunung Djati Bandung</p>
                            </div>
                        </v-flex>

                        <v-flex md2 style="margin:0px 20px">
                            <ul class="link-cere">
                                <li><a href="/kebijakan-privasi">Kebijakan Privasi</a></li>
                                <li><a href="/syarat-ketentuan">Syarat &amp; Ketentuan </a></li>
                                <li><a href="/about">Tentang Kami</a></li>
                            </ul>
                        </v-flex>

                        <v-flex md2 style="margin:0px 20px">
                            <ul class="link-cere">
                                <li><a href="/FAQ">Frequenly Asked Question</a></li>
                                <li><a href="/panduan-guru">Panduan Guru </a></li>
                                <li><a href="/panduan-siswa">Panduan Siswa</a></li>
                            </ul>
                        </v-flex>

                        <v-flex md2 style="margin:0px 20px">
                            <ul class="link-cere">
                                <li><a href="/pusat bantuan">Pusat Bantuan</a></li>
                            </ul>
                        </v-flex>

                        <!-- <v-flex md2 class="med">
                            <h5 class="title" style="color:black">Ikuti Kami</h5>

                            <ul class="link-cere">
                                 <v-btn
                                v-for="icon in icons"
                                :key="icon"
                                class="mx-3"
                                dark
                                icon
                                >
                                <v-icon size="24px">{{ icon }}</v-icon>
                                </v-btn>
                            </ul>
                        </v-flex> -->


                    </v-layout>
                </v-container>
            </v-card-title>

            <v-card-actions class="blue justify-center">
            &copy;&nbsp;<strong> DSC UIN Sunan Gunung Djati Bandung</strong>
            </v-card-actions>
      </v-card>
    </v-footer>
</template>

<style>
    .link-cere li{
        list-style: none;
        margin-left: -23px;
    }
    .link-cere li a{
        text-decoration: none;
        color: #039BE5;
    }

    .link-cere li a:hover{
        text-decoration: none
    }
    .med {
        margin:0px 20px
    }
    @media only screen and (max-width: 650px) {
        .med {
            margin:20px 20px 0px 20px
        }
    }
</style>

<script>
  export default {
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    })
  }
</script>
