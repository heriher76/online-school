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
                        <form class="container">
                        	<h1>Edit Profile</h1>
                        	<b-form-group>
                        	    <input type="text" v-model="name" class="form-control"  placeholder="Nama :" required>
                            </b-form-group>
                            
                            <br/>
                        	<b-form-group>
                        	    <input type="text" v-model="address" class="form-control"  placeholder="Alamat :" required>
                            </b-form-group>
                            
                            <br/>
                            <b-form-group>
                                <input type="number" v-model="phone" class="form-control"  placeholder="Telepon :" required>
                            </b-form-group>
                            
                            <br/>
                            <b-form-group>
                                <input type="text" v-model="status" class="form-control"  placeholder="Status :" required>
                            </b-form-group>
                            
                            <br/>
                            <b-form-group>
                                <select name="gender" class="form-control">
                                  <option value="volvo">Pria</option>
                                  <option value="saab">Wanita</option>
                                </select>
                            </b-form-group>
                            
                            <br/>
                        	<b-form-group>
                        	  <b>Photo Profile :</b>
                              <br/>
                        	  <input type="file" required/>
                        	</b-form-group>
                            
                            <br/>
                        	<div class="text-center">
                        	  <button type="submit" class="btn btn-primary">Update</button>
                        	</div>
                        </form>
                    </v-layout>
                </v-flex>
                
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../../components/guru/SideBar'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'dashboard',
            components: {
            SideBar,
        }
    }
</script>
