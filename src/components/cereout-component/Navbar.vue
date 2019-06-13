<template>
    <div class="navbar-cereout" style="padding:10px;">
        <ul class="nav-cereout">
            <li><router-link to="/cereout/dashboard">Dashboard</router-link></li>
            <li><router-link to="/cereout/leader board">Leaderboard</router-link></li>
            <li><router-link to="/cereout/exams">My Exams</router-link></li>
            <li><router-link to="/cereout/results">My Result</router-link></li>
        </ul>
    </div>
</template>

<style>
    ul.nav-cereout li{
        display: inline;
        list-style: none;
    }

    ul.nav-cereout li a{
        text-decoration: none;
        border:1px solid #B71C1C;
        color:#B71C1C;
        padding: 8px 10px;
    }
    ul.nav-cereout li a:hover{
        color: white;
        border:1px solid #B71C1C;
        background: #E53935;
    }

</style>

