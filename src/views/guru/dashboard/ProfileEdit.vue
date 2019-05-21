<template>
    <div class="dashboard">
        
        <!-- sub content -->
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <!-- sidebar -->
                <v-flex md3 sm12 xs12>
                    <v-card>
                        <SideBar class="hidden-sm-and-down" style="float:left;"/>
                    </v-card>
                </v-flex>
                <!-- /sidebar -->
                         
                <v-flex md9 sm12 xs12>
                    <v-layout row wrap>
                        <b-form @submit="onSubmit" class="container">
                        	<h1>Edit Profile</h1>
                        	<b-form-group>
                        	  <b-form-input v-model="name" type="text" placeholder="Nama :" required/>
                        	</b-form-group>

                        	<b-form-group>
                        	  <b-form-input v-model="address" type="text" placeholder="Alamat :" required/>
                        	</b-form-group>

                        	<b-form-group>
                        	  <b>Photo Profile :</b>
                        	  <b-form-input v-model="photo" type="file" required/>
                        	</b-form-group>

                        	<div class="text-center">
                        	  <b-button type="submit" variant="primary">Update</b-button>
                        	</div>
                        </b-form>
                    </v-layout>
                </v-flex>
                
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../../components/SideBar_Guru'

    export default {
        name: 'dashboard',
            components: {
            SideBar,
        },
    

        data () {
            return {          
                value: [
                    423,
                    446,
                    20,
                    510,
                    590,
                    610,
                    760
                ],
            
                headers: [
                    { text: 'No', value: 'calories' },
                    { text: 'Name', value: 'fat' },
                    { text: 'Type', value: 'carbs' },
                    { text: 'End Date', value: 'protein' },
                    { text: 'Expiry', value: 'iron' },
                    { text: 'Attempts Remaining', value: 'iron' },
                    { text: 'Amount', value: 'iron' },
                    { text: 'Actions', value: 'iron' }
                ],
                
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%'
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: '1%'
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7%'
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: '8%'
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: '16%'
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0%'
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: '2%'
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: '45%'
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: '22%'
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6%'
                    }
                ]
            }
        }
    }
</script>
