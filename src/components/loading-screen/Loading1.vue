<template>
    <div class="loading">
        <v-dialog v-model="loading" persistent content content-class="centered-dialog">
            <v-container fill-height>
                <v-layout column justify-center align-center>
                    <hollow-dots-spinner
                    :animation-duration="1000"
                    :dot-size="15"
                    :dots-num="3"
                    color="white"
                    />
                </v-layout>
            </v-container>
        </v-dialog>
    </div>
</template>

<script>
import { HollowDotsSpinner  } from 'epic-spinners'

export default {
    name: 'loading',
    components: {
        HollowDotsSpinner  
    },

    props: ['loading'],
    
    data(){
        return{
            
        }
    }
    
}
</script>

