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
                    <td><b>E-mail</b></td><td v-if="datas.data.email !== null">{{ datas.data.email }}</td>
                </tr>
                <tr height="30">
                    <td><b>Phone Number</b></td><td v-if="datas.data.phone !== null">{{ datas.data.phone }}</td>
                </tr>
                <tr height="30">
                    <td><b>Address</b></td><td v-if="datas.data.address !== null">{{ datas.data.address }}</td>
                </tr>
                <tr height="30">
                    <td><b>Birth Place</b></td><td v-if="datas.data.birth_place !== null">{{ datas.data.birth_place }}</td>
                </tr>
                <tr height="30">
                    <td><b>Birth Date</b></td><td v-if="datas.data.birth_date !== null">{{ datas.data.birth_date }}</td>
                </tr>
                <tr height="30">
                    <td><b>Gender</b></td><td v-if="datas.data.gender !== null">{{ datas.data.gender }}</td>
                </tr>
                <tr height="30">
                    <td><b>Parrent Name</b></td><td v-if="datas.data.parrent_name !== null">{{ datas.data.parrent_name }}</td>
                </tr>
                <tr height="30">
                    <td><b>Parrent Phone</b></td><td v-if="datas.data.parrent_phone !== null">{{ datas.data.parrent_phone }}</td>
                </tr>
                <tr height="30">
                    <td><b>Membership</b></td><td v-if="datas.data.membership !== null">{{ datas.data.membership }}</td>
                </tr>
                <tr height="30">
                    <td><b>Class</b></td><td v-if="datas.data.class !== null">{{ datas.data.class.name_class }}</td>
                </tr>
                <tr height="30">
                    <td><b>Pilihan Pertama</b></td><td v-if="datas.data.option1 !== null">{{ datas.data.option1.department_name }} - {{ datas.data.option1.university_name }}</td>
                </tr>
                <tr height="30">
                    <td><b>Pilihan Kedua</b></td><td v-if="datas.data.option2 !== null">{{ datas.data.option2.department_name }} - {{ datas.data.option2.university_name }}</td>
                </tr>
                <tr height="30">
                    <td><b>Pilihan Ketiga</b></td><td v-if="datas.data.option3 !== null">{{ datas.data.option3.department_name }} - {{ datas.data.option3.university_name }}</td>
                </tr>
            </table>
        </v-flex>
    </v-layout>
</template>
<script>
  export default {
    props: ['datas', 'photo'],
    data: () => ({
        name: this.datas.data.name,
        email: this.datas.data.email,
        phone: this.datas.data.phone,
        address: this.datas.data.address,
        birth_date: this.datas.data.birth_date,
        birth_place: this.datas.data.birth_place,
        gender: this.datas.data.gender,
        parrent_name: this.datas.data.parrent_name,
        parrent_phone: this.datas.data.parrent_phone,
        membership: this.datas.data.membership,
        class: this.datas.data.class.name_class,
        option1_department: this.datas.data.option1.department_name,
        option1_university: this.datas.data.option1.university_name,
        option2_department: this.datas.data.option2.department_name,
        option2_university: this.datas.data.option2.university_name,
        option3_department: this.datas.data.option3.department_name,
        option3_university: this.datas.data.option3.university_name,
        image: ''
    }),
    created() {
        console.log(props)
    }
  }
</script>