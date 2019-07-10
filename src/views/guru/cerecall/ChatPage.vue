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
                        <v-card color="#fff0f1">
                            <div class="header_chat">
                                <v-card color="#F44336" dark style="padding:10px">
                                    <div class="head_info" v-for="data in dataHistoryChatRunningGuru.data">
                                        <div class="img_usr">
                                            <img :src="data.student.student_photo" height="100%" width="100%" alt="">
                                        </div>

		                                <div style=" margin:0px 0px 0px 10px; float:left">
		                                    <b style="font-size:18px;">		
		                                    	{{data.student.student_name}}
		                                    </b>
                                            <br>
                                    		<span class="pl-1">{{data.lesson}}</span>
		                                </div>
                                        <div style="float:right">
		                                    <v-tooltip bottom>
		                                        <template v-slot:activator="{ on }">  
		                                            <v-btn @click="dialog1=true" icon dark flat>
		                                                <v-icon v-on="on">done</v-icon>
		                                            </v-btn>
		                                        </template>
		                                        <span>Akhiri</span>
		                                    </v-tooltip>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                </v-card>
                            </div>
							<div id="box" style="overflow:auto; height:600px" class="my-2">
							<div v-if="realtime()">
	                            <v-layout class="live_chat mx-4" v-for="data in dataChatGuru.data">
									<v-card-text style="overflow:auto">
										<div v-if="data!=null">
											<v-layout justify-end v-if="data.sender==2">
												<v-card style="border-radius:0px 15px 15px 18px;background:#F44336;color:white" class="pr-5 pl-3 py-2">
													<div class="caption">
														{{data.updated_at.split(' ')[1].substr(0, 5)}}
													</div>
													<div v-if="!data.is_image">
														{{data.content}}
													</div>
													<div v-else>
														<a @click.stop="dialog = true">
															<img :src="data.content" style="max-height:300px">
														</a>
														<v-dialog v-model="dialog" >
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
												<v-card style="border-radius:0px 15px 15px 18px;background:white" class="pr-5 pl-3 py-2">
													<div class="caption">
														{{data.updated_at.split(' ')[1].substr(0, 5)}}
													</div>
													<div v-if="!data.is_image">
														{{data.content}}
													</div>
													<div v-else>
														<a @click.stop="dialog = true" >
															<img :src="data.content" style="max-height:300px">
														</a>
														<v-dialog v-model="dialog">
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
		                        <div style="position:absolute;bottom:60px;left:0px;">
		                            <v-btn v-show="btScroll" @click="scrollBottom" color="red" dark icon><v-icon>keyboard_arrow_down</v-icon></v-btn>
		                        </div>
							</div>
		                    <div class="action_chat">
			                        <input type="file" ref="file" style="display: none">
			                        <button class="file-img" @click="$refs.file.click()">
			                        	<v-icon large color="red">insert_photo</v-icon> 
			                        </button>
		                        <form @submit.prevent="" ref="form" @keyup.enter="sendMsg">
		                            <input class="msg" ref="pesan" type="text" v-model="pesan" placeholder="Ketik pesan">
		                        </form>
		                        <button class="send" @click="sendMsg"><v-icon color="red">send</v-icon></button>
		                        <div class="clear"></div> 
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
	import axios from 'axios'

	export default {
        name: 'dashboard',
        data: () => ({
        	dialog: false,
        	pesan:null,
        	img:null,
        	is_image:null,
            cekTop: '',
            btScroll:false,
            is_load:false
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
	        	if(this.dataHistoryChatRunningGuru.data){
	        		for(var i=0;i<this.dataHistoryChatRunningGuru.data.length;i++)
		        	this.$store.dispatch('getChatGuru',{id:this.dataHistoryChatRunningGuru.data[i].id})
		        	.then(response => {
		        		if(!this.is_load){
		        			this.scrollBottom()
		        			this.is_load = true
		        		}
		        	})
				    .catch(error => {
		        		if(!this.is_load){
		        			this.scrollBottom()
		        			this.is_load = true
		        		}
				    })
				}
	      	},
			realtime(){
				this.getChatGuru()
				return true
			},
            sendMsg(){
            	this.cekImg()
            	if(this.is_image==1){
            		this.pesan = this.$refs.file.value
            	}
	        	this.$store.dispatch('sendMsg',{
	        		id:this.$route.params.id,
	        		pesan:this.pesan,
	        		is_image:this.is_image
	        	})
		        .then(response => {
	        		this.pesan = ''
		        })
		        .catch(error => {
	        		this.pesan = ''
		        })

			    this.is_load = false
            },
            cekImg(){
	        	if(this.$refs.file.value == 0){
				    this.is_image = null
				}else{
				    this.is_image = 1
				}
            },
            scrollBottom(){
	            var container = this.$el.querySelector("#box");
	            container.scrollTop = container.scrollHeight;   
				this.cekTop = container.scrollTop;
            }
        },
		created(){
			this.getChatGuru()
			this.getHistoryChatRunningGuru()
		},
            
        updated() {  
            var container = this.$el.querySelector("#box");
            if(container.scrollTop < this.cekTop){
                this.btScroll = true
            }else if(container.scrollTop == this.cekTop){
                this.btScroll = false
                this.is_load = false
            }
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

    .file-img{
        margin-top: 1px;
        margin-right: 6px;
        outline: none;
        float: left
    }
    input.msg{
        background: white;
        padding: 10px 15px;
        border-radius: 18px;
        width:90%;
        float:left;
        outline:none;
        float:left;
    }
    .send{
        outline:none;
        margin: 8px 0px 0px 10px
    }
    @media only screen and (max-width: 650px) {
	    input.msg{
	        width:70%;
	    }
    }
    @media only screen and (max-width: 768px) {
	    input.msg{
	        width:87%;
	    }
    }
</style>
