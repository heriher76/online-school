<template>
    <div class="leader_board">
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
                
                <!-- leader board -->
                <v-flex md9 sm12 xs12>
                    <v-card>
                        <v-card-text class="px-0"><h5 style="margin:4px 20px">My Results</h5></v-card-text>
                    </v-card>
                    <br>
                    <v-card>
                        <v-data-table
                        :headers="headers"
                        :items="desserts"
                        >
                        <template v-slot:items="props">
                            <td>{{ props.item.no }}</td>
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.fat }}</td>
                            <td>{{ props.item.carbs }}</td>
                            <td>{{ props.item.carbs }}</td>
                            <td></td>
                        </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
                <!-- /leader board -->
            </v-layout>
        </v-container>
        <!-- /sub content -->
    </div>
</template>

<script>
    import SideBar from '../../components/cereout-component/SideBar'

    export default {
    name: 'dashboard',
        components: {
            SideBar,
    },
    data () {
      return {
        headers: [
            { text: 'No',value: 'no'},
            { text: 'Exam Name', value: 'calories' },
            { text: 'Attempt Date', value: 'fat' },
            { text: 'Marks Scored/Max.Marks', value: 'carbs' },
            { text: 'Percentage', value: 'carbs' },
            { text: 'Result', value: 'carbs' },
            { text: 'Action', value: 'carbs' }
        ],
        desserts: [
            {
                no: 1,
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: '1%'
            },
            {
                no: 2,
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: '1%'
            },
            {
                no: 3,
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: '7%'
            }
        ]
      }
    }
  }
</script>