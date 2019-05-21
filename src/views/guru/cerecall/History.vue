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
				
				<v-flex md9 sm12 xs12>
					<h1>CereCall Guru</h1>

			    	<v-flex md12>
			            <v-card>
			                <v-toolbar flat color="white">
			                    <v-toolbar-title>Riwayat Chat</v-toolbar-title>
			                </v-toolbar>
			                <v-data-table
			                    :headers="headers"
			                    :items="desserts"
			                    class="elevation-1"
			                >
			                    <template v-slot:items="props">
			                    <td>{{ props.item.name }}</td>
			                    <td>{{ props.item.calories }}</td>
			                    <td>{{ props.item.name }}</td>
			                    <td>{{ props.item.calories }}</td>
			                    <td>{{ props.item.fat }}</td>
			                    <td>{{ props.item.carbs }}</td>
			                    <td>{{ props.item.protein }}</td>
			                    <td>{{ props.item.iron }}</td>
			                    </template>
			                </v-data-table>
			            </v-card>
			        </v-flex>
			    </v-flex>
			</v-layout>
    </v-container>
    <!-- /sub content -->
	</div>
</template>

<script>
	import SideBar from '../../../components/guru/SideBar'

	export default {
        name: 'dashboard',
            components: {
            SideBar,
        }
    }
</script>