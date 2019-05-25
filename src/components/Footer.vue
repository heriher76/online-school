<template>
    <v-footer dark height="auto">
        <v-card class="flex">
            <v-card-title class="blue-grey lighten-5 black--text">
                <v-container>
                    <v-layout row wrap>
                        <v-flex md4>         
                            <v-img :src="require('../assets/images/logo_final2.png')" width="280px"></v-img>
                            <div style="margin:10px 20px">
                                <p>Get connected with us on social networks</p>
                                <p>Jl. Raya Cipadung No.334 Cipadung Wetan, Panyileukan Bandung, Jawa Barat, 40614.</p>
                            </div>
                        </v-flex>
                        
                        <v-flex md2 style="margin:0px 20px">
                            <ul class="link-cere">
                                <li><a href="">Kebijakan Privasi</a></li>
                                <li><a href="">Syarat &amp; Ketentuan </a></li>
                                <li><a href="">Tentang Kami</a></li>
                            </ul>
                        </v-flex>

                        <v-flex md2 style="margin:0px 20px">
                            <ul class="link-cere">
                                <li><a href="/pusat bantuan">Pusat Bantuan</a></li>
                                <li><a href="">Panduan Guru </a></li>
                                <li><a href="">Panduan Siswa</a></li>
                            </ul>
                        </v-flex>

                        <v-flex md2 style="margin:0px 20px">
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
                        </v-flex>


                    </v-layout>
                </v-container>
            </v-card-title>

            <v-card-actions class="blue justify-center">
            &copy;2019 &nbsp; <strong>Tsamany Project</strong>
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