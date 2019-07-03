<template>
    <div>
        <div style="margin:0px 15px">
            <div style="margin:10px 22px">
                <h6 class="title">INFO TERBARU</h6>
            </div>
            <ul class="side_bar">
                <v-divider></v-divider>
                <div v-show="load_data" style="margin:10px auto; width:5%;">
                    <v-progress-circular
                    :size="30"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
                </div>
                <li v-for="(recent, index) in posts" :key="recent.id">
                    <div v-if="index<10">
                        <a @click="detail(recent)" style="text-transform:capitalize">{{recent.title}}&nbsp;</a> <br>
                        <span style="color:#757575; font-size:12px">dimuat: {{recent.created_at}}</span>
                        <v-divider></v-divider>
                    </div>
                </li>
                
            </ul>
        </div>

    </div>
</template>

<style>
    .side_bar li{
        list-style: circle;
    }

    .side_bar li a{
        text-decoration: none;
        color: black;
    }
</style>


<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                posts: [], 
                load_data:true,
            }
        },

        methods:{
            detail(val){
                return this.$router.push({name: 'detail_informasi', params:{data: val}})
            }
        },

        mounted(){
            axios.get('/master/information')
            .then(response => {
                this.load_data = false
                this.posts = response.data.data
                // console.log(response.data)
            })
            .catch(error =>{
                console.log(error)
            })
        }
        
    }
</script>