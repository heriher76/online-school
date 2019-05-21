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
                    <v-layout row wrap>

					    <div class="support-area">
				            <aside class="support-sidebar">
				              <h3>Siswa</h3>
				              <ul v-for="room in rooms" :key="room.id">
				                <li
				                  class="room"
				                  :class="[currentRoom && currentRoom.id === room.id ? 'active' : '']"
				                 @click="connectToRoom(room.id)"
				                >
				                {{ room.name }}
				                </li>
				              </ul>
				            </aside>
				            <section class="support-session">
				              <header class="current-chat">
				                <h3 v-if="currentRoom">{{ currentRoom.name }}</h3>
				                <h3 v-else>Chat</h3>
				              </header>
				              <div class="chat-session">
				                <div v-for="message in messages" :key="message.id">
				                  <span :class="[ message.senderId === currentUser.id ? 'support' :
				                  'user']" class="message">{{ message.text }}</span>
				                </div>
				              </div>
				              <form @submit.prevent="sendMessage" class="message-form form-control">
				                <input
				                  class="message-input"
				                  autofocus
				                  placeholder="Compose your message and hit ENTER to send"
				                  v-model="newMessage"
				                  name="newMessage"
				                  />
				              </form>
				            </section>
				        </div>
				        <br>
			        
			    	</v-layout>
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
	import SideBar from '../../../components/SideBar_Guru'

	export default {
        name: 'dashboard',
            components: {
            SideBar,
        }
    }
</script>

<style>
   .support-area {
     height: 50vh;
     width: 100vw;
     display: flex;
   }

   .support-sidebar {
     width: 20%;
     background-color: #300d4f;
     height: 100%;
   }

   .support-sidebar ul {
     list-style: none;
   }

   .support-sidebar h3 {
     color: white;
     margin-bottom: 0;
     text-align: left;
     padding: 10px 20px;
   }

   .room {
     font-size: 22px;
     color: white;
     cursor: pointer;
     text-align: left;
     padding: 10px 20px;
     margin-bottom: 10px;
   }

   .room:hover {
     color: yellowgreen;
   }

   .room.active {
     background-color: yellowgreen;
     color: white;
   }

   .support-session {
     width: 80%;
     height: 100%;
     display: flex;
     flex-direction: column;
   }

   .current-chat {
     border-bottom: 1px solid #ccc;
     text-align: left;
     padding: 10px 20px;
     display: flex;
   }

   .current-chat h3 {
     margin-bottom: 0;
   }

   .chat-session {
     flex-grow: 1;
     overflow-y: auto;
     padding: 10px;
   }
</style>