<template>
    <v-layout row wrap="">
        <v-flex md3>
            <div style="height:100px;width:85px;">
                <img :src="photo" width="100%" height="100%" alt="">
            </div>
        </v-flex>
        <v-flex md9 style="font-size:14px">
            <table>
                <tr height="30">
                    <td width="120"><b>Name</b></td><td v-if="datas.data.name">{{ datas.data.name }}</td>
                </tr>
                <tr height="30">
                    <td><b>E-mail</b></td><td v-if="datas.data.email">{{ datas.data.email }}</td>
                </tr>
                <tr height="30">
                    <td><b>Phone Number</b></td><td v-if="datas.data.phone">{{ datas.data.phone }}</td>
                </tr>
                <tr height="30">
                    <td><b>Address</b></td><td v-if="datas.data.address">{{ datas.data.address }}</td>
                </tr>
                <tr height="30">
                    <td><b>Birth Place</b></td><td v-if="datas.data.birth_place">{{ datas.data.birth_place }}</td>
                </tr>
                <tr height="30">
                    <td><b>Birth Date</b></td><td v-if="datas.data.birth_date">{{ datas.data.birth_date }}</td>
                </tr>
                <tr height="30">
                    <td><b>Gender</b></td><td v-if="datas.data.gender">{{ datas.data.gender }}</td>
                </tr>
                <tr height="30">
                    <td><b>Parrent Name</b></td><td v-if="datas.data.parrent_name">{{ datas.data.parrent_name }}</td>
                </tr>
                <tr height="30">
                    <td><b>Parrent Phone</b></td><td v-if="datas.data.parrent_phone">{{ datas.data.parrent_phone }}</td>
                </tr>
                <!-- <tr height="30">
                    <td><b>Membership</b></td><td v-if="datas.data.membership">{{ datas.data.membership }}</td>
                </tr> -->
                <!-- <tr height="30">
                    <td><b>Class</b></td><td v-if="datas.data.class">{{ datas.data.class.name_class }}</td>
                </tr> -->
            </table>
        </v-flex>
    </v-layout>
</template>
<script>
  export default {
    props: ['datas', 'photo']
  }
</script>