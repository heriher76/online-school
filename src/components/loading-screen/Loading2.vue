<template>
    <div class="loading">
        <v-dialog v-model="loading" persistent content content-class="centered-dialog">
            <v-container fill-height>
                <v-layout column justify-center align-center>
                    <swapping-squares-spinner
                    :animation-duration="1000"
                    :size="65"
                    color="white"
                    />
                </v-layout>
            </v-container>
        </v-dialog>
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

