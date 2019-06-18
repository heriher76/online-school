<template>
    <div class="change_passw">
    	<form @submit.prevent="login">
            <v-text-field v-model="email" style="height:60px" label="Email"></v-text-field>
	        <v-text-field v-model="password" style="height:60px" label="Old Password"></v-text-field>
	        <v-text-field v-model="newPassword" style="height:60px" label="New Password"></v-text-field>
	        <v-divider></v-divider>
	        <v-btn block color="red" :loading="btn_load" @click="submit" dark>Update</v-btn>
            <v-btn block @click="cancel" dark>Cancel</v-btn>
	    </form>
    </div>
</template>

<script>
	import axios from 'axios';

    export default {
        props: ['idUser'],
        data: () => ({
            email: '',
            password: '',
            newPassword: '',
            btn_load: false
        }),
        methods:{
            cancel() {
                this.$emit('canceled', 'true')
            },
            submit (event) {
                this.btn_load = true
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
                axios.post('http://api.ceredinas.id/api/auth/user/changePassword/'+this.idUser,{
                  currentPassword: this.currentPassword,
                  newPassword: this.newPassword
                })
                .then(response => {
                  console.log(response.data)
                })
                .catch(error => {
                  console.log(error)
                })
            }
        }
    }
</script>

