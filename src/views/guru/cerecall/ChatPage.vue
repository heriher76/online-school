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
    
            <div class="cerecall_chat">
                <v-container>
                    <div class="chat_box">
                        <v-card>
                            <div class="header_chat">
                                <v-card style="padding:10px">
                                    <div class="head_info">
                                        <div class="img_usr">
                                            <img src="https://picsum.photos/510/300?random" height="100%" width="100%" alt="">
                                        </div>
                                            
                                        <span style="font-size:18px; margin:10px">
                                            <b>Bean English {{$route.params.guruId}}</b>
                                        </span>
                                        <div style="float:right">
                                            <v-btn icon dark color="red">
                                                <v-icon>done</v-icon>
                                            </v-btn>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                </v-card>
                            </div>
                            <div class="live_chat">
                                ada yang bisa dibantu?
                            </div>
                            <div class="action_chat">
                                <input type="text" placeholder="ketik pesan">
                            </div>
                        </v-card>
                    </div>
                </v-container>
            </div>

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

<style>
    .chat_box{
        width:100%;
        margin:0px auto;
    }

    .header_chat{

    }

    .head_info{

    }

    .head_info .img_usr{
        height:40px;
        width:40px;
        float: left;
    }

    .head_info .img_usr img{
        border-radius: 100%;
    }

    .live_chat{
        margin: 20px;
    }

    .action_chat{
        background:rgb(243, 239, 239);
        padding: 10px
    }

    .action_chat input{
        background: white;
        padding: 5px 10px;
        width: 100%;
    }
</style>
