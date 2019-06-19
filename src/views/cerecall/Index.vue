<template>
    <v-container grid-list-md>
      <v-card style="padding:10px 20px" color="#B71C1C" dark>
        <h6 class="title">Layanan Konsultasi</h6>
      </v-card>

        <v-select
          :items="items"
          label="Pilih Mata Pelajaran"
          item-text="name"
          item-value="id"
          @change="changeCard"
        ></v-select>
      
      <!-- {{output}} -->

      <div v-show="show">
        <v-card class="elevation-20">
          <h3 style="padding:10px 20px">Pilih Guru {{mapel}}</h3>
        </v-card>

        <v-layout row wrap>
          <v-flex md2 v-for="card in cards" :key="card">
            <v-card style="padding-top:10px;">
              <v-img
                style="border-radius:100%; width:150px; margin:0px auto; height:150px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
              </v-img>
              <v-card-title>
                <div class="mx-auto">
                  <h6 class="title" style="color:black">Johnny English</h6>
                  <div style="float:left;">                   
                    <b class="grey--text">Price : {{card}} point</b>
                  </div>  
                  <div style="float:right">
                    <v-tooltip bottom >
                      <template v-slot:activator="{ on }">      
                        <a @click="linkUlasan">
                          <v-icon v-on="on">comment</v-icon>
                        </a>        
                        
                      </template>
                      <span>ulasan &amp; rating</span>
                    </v-tooltip>
                  </div>
                </div>
              </v-card-title>

              <v-card-actions style="float:right">
                <span class="grey--text text--lighten-2 caption mr-2">
                  ({{ rating }})
                </span>
                <v-rating
                  v-model="rating"
                  background-color="yellow accent-4"
                  color="yellow accent-4"
                  dense
                  half-increments
                  :readonly="true"
                  size="15"
                ></v-rating>
              </v-card-actions>
              <div class="clear"></div>
              <v-card-actions>
                <v-btn block dark color="orange" :to="{ name:'cerecall_chat', params: { guruId: '1'}}">Pilih</v-btn> 
              </v-card-actions>
            </v-card>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {name:'Matematika', id: '1'},
        {name:'Bahasa Indonesia', id: '2'},
        {name:'IPS', id: '3'},
        {name:'IPA', id: '4'},
      ],
      show: false,
      cards: ['230','120','300','100','100','230','230','120','300','100','100','230'],  
      mapel: '',
      rating: 3.2
      // output: [],
    }),
    methods: {
      changeCard(value){
        var m=''
        console.log(value)
        // this.output.push(value)
        if(value==1){
          m = "Matematika"
        }else if(value==2){
          m = "Bahasa Indonesia"
        }else if(value==3){
          m = "IPS"
        }else if(value==4){
          m = "IPA"
        }
        this.mapel = m
        this.show = true
      },

      linkUlasan(){
        return this.$router.push({name:'cerecall_ulasan', params: { guruId: '1'}})
      }
    }
  }
</script>