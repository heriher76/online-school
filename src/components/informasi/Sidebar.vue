<template>
    <div>
        <div style="margin:0px 15px">
            <div style="margin:10px 22px">
                <h6 class="title">RECENT POSTS</h6>
            </div>
            <ul class="side_bar">
                <v-divider></v-divider>
                <li v-for="recent in recents" :key="recent.id">
                    <a href="">{{recent.title}}&nbsp;</a> <br>
                    <span style="color:#757575; font-size:12px">Posted: {{recent.date}}</span>
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
                <li v-for="info in infos" :key="info.id">
                    <a href="">{{info.title}}&nbsp;</a> <br>
                    <span style="color:#757575; font-size:12px">Posted: {{info.date}}</span>
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
  export default {
      data(){
            return {
                recents: [
                    {id: 1,title: 'lorem ipsum dolor sit amet post 1', date: '23 Juni 2019'},
                    {id: 2,title: 'lorem ipsum dolor sit amet post 2', date: '2 Juni 2019'},
                    {id: 3,title: 'lorem ipsum dolor sit amet post 3', date: '3 Juni 2019'},
                    {id: 4,title: 'lorem ipsum dolor sit amet post 4', date: '20 Juni 2019'},
                    {id: 5,title: 'lorem ipsum dolor sit amet post 5', date: '21 Juni 2019'},
                    {id: 6,title: 'lorem ipsum dolor sit amet post 6', date: '2 Juni 2019'},
                ],   
                infos: [
                    {id: 1,title: 'lorem ipsum dolor sit amet post 1', date: '23 Juni 2019'},
                    {id: 2,title: 'lorem ipsum dolor sit amet post 2', date: '2 Juni 2019'},
                    {id: 3,title: 'lorem ipsum dolor sit amet post 3', date: '3 Juni 2019'},
                    {id: 4,title: 'lorem ipsum dolor sit amet post 4', date: '20 Juni 2019'},
                    {id: 5,title: 'lorem ipsum dolor sit amet post 5', date: '21 Juni 2019'},
                    {id: 6,title: 'lorem ipsum dolor sit amet post 6', date: '2 Juni 2019'},
                ],       
        }
    }

  }
</script>