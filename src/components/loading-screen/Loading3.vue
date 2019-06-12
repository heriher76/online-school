<template>
    <div class="loading">
        <div v-show="loading" style="z-index:0; position:absolute; top:0; height:100%; width:100%; background: rgba(0, 0, 0, 0.3);padding-top:130px">
            <v-container>
                <v-layout column justify-center align-center>
                    <swapping-squares-spinner
                    :animation-duration="1000"
                    :size="65"
                    color="white"
                    />
                    <label style="color:white">Loading . . .</label>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
import { SwappingSquaresSpinner  } from 'epic-spinners'

export default {
    name: 'loading',
    components: {
        SwappingSquaresSpinner  
    },

    props: ['loading'],
    
    data(){
        return{
            
        }
    }
    
}
</script>

