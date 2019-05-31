<template>
    <div>
        <div style="margin:0px 15px">
            <div style="margin:10px 22px">
                <h6 class="title">RECENT POSTS</h6>
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
                <li v-for="recent in posts" :key="recent.id">
                    <router-link :to="{name: 'detail_informasi', params: {data: recent} }">{{recent.title}}&nbsp;</router-link> <br>
                    <span style="color:#757575; font-size:12px">Posted: {{recent.created_at}}</span>
                    <v-divider></v-divider>
                </li>
            </ul>
        </div>

        <div style="margin:50px 15px">
            <div style="margin:10px 22px">
                <h6 class="title">PENGUMUMAN</h6>
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
                <li v-for="info in posts" :key="info.id">
                    <router-link :to="{name: 'detail_informasi', params: {data: info} }">{{info.title}}&nbsp;</router-link> <br>
                    <span style="color:#757575; font-size:12px">Posted: {{info.created_at}}</span>
                    <v-divider></v-divider>
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