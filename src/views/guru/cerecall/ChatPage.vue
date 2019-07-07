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
                                    <div class="head_info" v-for="data in dataHistoryChatRunningGuru.data">
                                        <div class="img_usr">
                                            <img :src="data.student.student_photo" height="100%" width="100%" alt="">
                                        </div>

                                        <span style="font-size:18px; margin:10px">
                                            <b>{{data.student.student_name}}</b>
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
														<div style="overflow:auto; height:600px" class="my-2">
															<div>
	                            <v-layout class="live_chat mx-4" v-for="data in dataChatGuru.data">
																<v-card-text style="overflow:auto">
																	<div v-if="data!=null">
																		<v-layout justify-end v-if="data.sender==2">
																			<v-card color="green lighten-2" class="pr-5 pl-3 py-2">
																				<div class="caption">
																					{{data.updated_at.split(' ')[1].substr(0, 5)}}
																				</div>
																				<div v-if="!data.is_image">
																					{{data.content}}
																				</div>
																				<div v-else>
																					<a
		      																	@click.stop="dialog = true"
																					>
																						<img :src="data.content" style="max-height:300px">
																					</a>
																					<v-dialog
																			      v-model="dialog"
																			    >
																			      <v-layout class="text-md-center">
																			        <v-card-text>
																									<img :src="data.content" style="max-height:550px">
																			        </v-card-text>
																			      </v-layout>
																			    </v-dialog>
																				</div>
																			</v-card>
																		</v-layout>
																		<v-layout v-else>
																			<v-card color="grey lighten-3" class="pr-5 pl-3 py-2">
																				<div class="caption">
																					{{data.updated_at.split(' ')[1].substr(0, 5)}}
																				</div>
																				<div v-if="!data.is_image">
																					{{data.content}}
																				</div>
																				<div v-else>
																					<a
		      																	@click.stop="dialog = true"
																					>
																						<img :src="data.content" style="max-height:300px">
																					</a>
																					<v-dialog
																			      v-model="dialog"
																			    >
																			      <v-layout class="text-md-center">
																			        <v-card-text>
																									<img :src="data.content" style="max-height:550px">
																			        </v-card-text>
																			      </v-layout>
																			    </v-dialog>
																				</div>
																			</v-card>
																		</v-layout>
																	</div>
																	<div v-else>
																		<v-layout>
																			<v-card color="green lighten-2" class="pr-5 pl-3 py-2">
																				<div class="caption">
																					Chat ini masih kosong...
																				</div>
																			</v-card>
																		</v-layout>
																	</div>
																</v-card-text>
	                            </v-layout>
														</div>
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
        data: () => ({
        	dialog: false
        }),
        components: {
            SideBar,
        },
    		methods: {
	        getHistoryChatRunningGuru(){
	        	this.$store.dispatch('getHistoryChatRunningGuru')
	          .then(response => {
	          })
	        },
	        getChatGuru(){
	        	this.$store.dispatch('getChatGuru',{id:this.$route.params.id})
	        	.then(response => {
	        	})
	      	},
					realtime(){
						if(this.getChatGuru)
						console.log('cikk ahhhhh')
						this.getChatGuru()
						return true
					}
        },
				created(){
					this.getChatGuru()
					this.getHistoryChatRunningGuru()
				},
				computed:{
		        dataChatGuru(){
		          return this.$store.state.dataChatGuru || {}
		        },
				    dataHistoryChatRunningGuru(){
				      return this.$store.state.dataHistoryChatRunningGuru || {}
				    },
			      userId(){
			        return this.$store.state.dataUser || {}
			      },
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
