<template>
	<div class="ikhtisar">
		<headerDetail />
		<v-container>

		    <menuPelajaran/>

							<v-tabs-items>
								<v-tab-item
									:value="'ikhtisar'"
									>
									<v-card>
										<v-container fluid>
											<v-flex  class="mx-4">
												<v-container grid-list-md>
													<detailIkhtisar/>
												</v-container>
											</v-flex>
										</v-container>
									</v-card>
								</v-tab-item>
								<v-tab-item
									:value="'kurikulum'"
									>
									<v-card>
										<v-container fluid>
											<v-flex  class="mx-4">
												<v-container grid-list-md>
													<detailIkhtisar/>
												</v-container>
											</v-flex>
										</v-container>
									</v-card>
								</v-tab-item>
								<v-tab-item
									:value="'ulasan'"
									>
									<v-card>
										<v-container fluid>
											<v-flex  class="mx-4">
												<v-container grid-list-md>
													<detailIkhtisar/>
												</v-container>
											</v-flex>
										</v-container>
									</v-card>
								</v-tab-item>
								<v-tab-item
									:value="'ProfilPengajar'"
									>
									<v-card>
										<v-container fluid>
											<v-flex  class="mx-4">
												<v-container grid-list-md>
													<detailIkhtisar/>
												</v-container>
											</v-flex>
										</v-container>
									</v-card>
								</v-tab-item>
							</v-tabs-items>
		</v-container>
	</div>
</template>
<script>
	import headerDetail from '../../components/cerevid-component/headerDetail'
	import menuPelajaran from '../../components/cerevid-component/menuPelajaran'
	import detailIkhtisar from '../../components/cerevid-component/detailIkhtisar'
	export default {
		name:"ikhtisar",
		components:{
			headerDetail,
			menuPelajaran,
			detailIkhtisar
		}
	}
</script>
