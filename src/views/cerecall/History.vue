<template>
    <div class="history_call">
        <v-container grid-list-md>
            <div class="nav-result">
                <ul>
                    <li><router-link :to="{name: 'cerecall'}">CARI GURU</router-link></li>
                    <li><router-link class="active" :to="{name: 'cerecall_history'}">RIWAYAT</router-link></li>
                </ul>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    
}
</script>


<style>
    .nav-result{
        background: #B71C1C;
        padding:10px;
    }
    .nav-result ul li{
        display: inline;
    }
    .nav-result ul li a{
        background:#D32F2F;
        color: white;
        padding: 12px 30px;
        margin: 0px 2px;
        text-decoration: none;
    }
    .nav-result ul li a.active{
        background:#E53935;
    }
    .nav-result ul li a:hover{
        background:#E53935;
    }
</style>
