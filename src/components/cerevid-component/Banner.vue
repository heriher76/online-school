<template>
  <div>
    <v-card style="
background: rgb(97,94,94);
background: linear-gradient(90deg, rgba(97,94,94,1) 0%, rgba(29,65,106,1) 73%);
  ">
      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          white--text
          xs6
          md6
          offset-md1
        >
        <v-container>
          <h1 class="display-3 text-uppercase font-weight-light">
            Cerevid
          </h1>
          <div class="subheading text-uppercase pl-2 mb-4">
            Bimbel online gratis no 1 di Indonesia
          </div>
            <v-layout
              row
              wrap
            >
              <v-flex md10 sm12 xs12 class="hidden-sm-and-down">
                <v-text-field
                    box
                    label="Cari Pelajaran..."
                    append-icon="search"
                    background-color="#fff"
                  >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-img
          xs5
          md5
          :src="require('@/assets/banner/cerevid.png')"
        />
      </v-layout>
        <v-container class="hidden-md-and-up">
          <v-text-field
            box
            label="Cari Pelajaran..."
            append-icon="search"
            background-color="#fff"
          >
          </v-text-field>
        </v-container>
    </v-card>
    <v-card color="pink" hidden-sm-and-down>
      <v-container
        align-center
        grid-list-md
      >
        <v-layout
          pa-4
        > 
            <v-flex
              md4
            >
              <v-card flat color="pink" class="subheading text-xs-center white--text">
                <v-icon x-large color="white">account_box</v-icon>
              </v-card>
              <v-card flat color="pink" class="subheading text-xs-center white--text">
                <span>Diakses siapa saja</span>
              </v-card>
            </v-flex>
            <v-flex
              md4
            >
              <v-card flat color="pink" class="subheading text-xs-center white--text">
                <v-icon x-large color="white">alarm</v-icon>
              </v-card>
              <v-card flat color="pink" class="subheading text-xs-center white--text">
                <span>Akses kapan saja</span>
              </v-card>
            </v-flex>
            <v-flex
              md4
            >
              <v-card flat color="pink" class="subheading text-xs-center white--text">
                <v-icon x-large color="white">place</v-icon>
              </v-card>
              <v-card flat color="pink" class="subheading text-xs-center white--text">
                <span>Akses dimana saja</span>
              </v-card>
            </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
