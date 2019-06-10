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
                    <td width="120"><b>Name</b></td><td>{{ datas.data.name }}</td>
                </tr>
                <tr height="30">
                    <td><b>E-mail</b></td><td>{{ datas.data.email }}</td>
                </tr>
                <tr height="30">
                    <td><b>Phone Number</b></td><td>{{ datas.data.phone }}</td>
                </tr>
                <tr height="30">
                    <td><b>Address</b></td><td>{{ datas.data.address }}</td>
                </tr>
                <tr height="30">
                    <td><b>Birth Place</b></td><td>{{ datas.data.birth_place }}</td>
                </tr>
                <tr height="30">
                    <td><b>Birth Date</b></td><td>{{ datas.data.birth_date }}</td>
                </tr>
                <tr height="30">
                    <td><b>Gender</b></td><td>{{ datas.data.gender }}</td>
                </tr>
                <tr height="30">
                    <td><b>Parrent Name</b></td><td>{{ datas.data.parrent_name }}</td>
                </tr>
                <tr height="30">
                    <td><b>Parrent Phone</b></td><td>{{ datas.data.parrent_phone }}</td>
                </tr>
                <tr height="30">
                    <td><b>Membership</b></td><td>{{ datas.data.membership }}</td>
                </tr>
                <!-- <tr height="30">
                    <td><b>Class</b></td><td>{{ datas.data.class.name_class }}</td>
                </tr> -->
                <!-- <tr height="30">
                    <td><b>Pilihan Pertama</b></td><td>{{ datas.data.option1.department_name }} - {{ datas.data.option1.university_name }}</td>
                </tr>
                <tr height="30">
                    <td><b>Pilihan Kedua</b></td><td>{{ datas.data.option2.department_name }} - {{ datas.data.option2.university_name }}</td>
                </tr> -->
                <!-- <tr height="30">
                    <td><b>Pilihan Ketiga</b></td><td>{{ datas.data.option3.department_name }} - {{ datas.data.option3.university_name }}</td>
                </tr> -->
            </table>
        </v-flex>
    </v-layout>
</template>
<script>
  export default {
    props: ['datas'],
    data: () => ({
    }),
    mounted() {
        console.log(this.datas)
    }
  }
</script>