<template>
    <v-layout row wrap="">
        <v-flex md3>
            <div style="height:100px;width:85px;">
                <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" width="100%" height="100%" alt="">
            </div>
        </v-flex>
        <v-flex md9 style="font-size:14px">
            <table>
                <tr height="30">
                    <td width="120"><b>Name</b></td><td>{{dataUser.name}}</td>
                </tr>
                <tr height="30">
                    <td><b>E-mail</b></td><td>{{dataUser.email}}</td>
                </tr>
                <tr height="30">
                    <td><b>Phone Number</b></td><td>{{dataUser.phone}}</td>
                </tr>
                <tr height="30">
                    <td><b>Admission Date</b></td><td>04 May 2019</td>
                </tr>
                <tr height="30">
                    <td><b>Groups</b></td><td></td>
                </tr>
            </table>
            <!-- {{dataUser}} -->
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props:["dataUser"]
}
</script>
