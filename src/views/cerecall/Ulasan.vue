<template>
    <v-card style="padding-top:50px;">
        <v-img
        style="border-radius:100%; width:150px; margin:0px auto; height:150px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        </v-img>
        <v-card-title>
        <div class="mx-auto">
            <h6 class="title" style="color:black">Johnny English</h6>
            <v-card-actions>
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
        </div>
        </v-card-title>

        <v-card color="orange" dark style="padding:10px 62px">
            <h6 class="title">Ulasan</h6>
        </v-card>

        <v-card>
            <v-container>
                ulasan <br>
                ulasan <br>
                ulasan <br>
                ulasan <br>
            </v-container>
        </v-card>
    </v-card>
</template>


<script>
export default {
    data(){
        return {        
            rating: 3.2
        }
    }
}
</script>
