<template>
	<div class="detailPelajaran">
		<headerDetail :datas="dataDetailPelajaran"/>
		<v-container>
			<v-tabs
				color="#f5f5f5"
				next-icon="mdi-arrow-right-bold-box-outline"
				prev-icon="mdi-arrow-left-bold-box-outline"
				show-arrows
				>
				<v-tabs-slider color="#34495e"></v-tabs-slider>
				<v-tab
					:href="'#ikhtisar'"
					style="text-decoration:none;"
				>
					Ikhtisar
				</v-tab>
				<v-tab
					:href="'#kurikulum'"
					style="text-decoration:none;"
				>
					Kurikulum
				</v-tab>
				<v-tab
					:href="'#ulasan'"
					style="text-decoration:none;"
				>
					Ulasan
				</v-tab>
				<v-tab
					:href="'#profilPengajar'"
					style="text-decoration:none;"
				>
					Profil Guru
				</v-tab>
				<v-tabs-items>
					<v-tab-item
						:value="'ikhtisar'"
						>
						<v-card>
							<v-container fluid>
								<v-flex  class="mx-4">
									<v-container grid-list-md>
										<detailIkhtisar :datas="dataDetailPelajaran"/>
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
										<detailKurikulum :datas="dataDetailPelajaran"/>
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
										<detailUlasan :datas="dataDetailPelajaran"/>
									</v-container>
								</v-flex>
							</v-container>
						</v-card>
					</v-tab-item>
					<v-tab-item
						:value="'profilPengajar'"
						>
						<v-card>
							<v-container fluid>
								<v-flex  class="mx-4">
									<v-container grid-list-md>
										<detailProfilPengajar :datas="dataDetailPelajaran"/>
									</v-container>
								</v-flex>
							</v-container>
						</v-card>
					</v-tab-item>
				</v-tabs-items>
			</v-tabs>
		</v-container>
	</div>
</template>
<script>
	import headerDetail from '../../components/cerevid-component/headerDetail'
	import menuPelajaran from '../../components/cerevid-component/menuPelajaran'
	import detailIkhtisar from '../../components/cerevid-component/detailIkhtisar'
	import detailKurikulum from '../../components/cerevid-component/detailKurikulum'
	import detailUlasan from '../../components/cerevid-component/detailUlasan'
	import detailProfilPengajar from '../../components/cerevid-component/detailProfilPengajar'
	import axios from 'axios'
	export default {
		name:"detailPelajaran",
		components:{
			headerDetail,
			menuPelajaran,
			detailIkhtisar,
			detailKurikulum,
			detailUlasan,
			detailProfilPengajar
		},
		data: () => ({
			auth: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQxMTQwMzM4YjNjMzBiMzQ0M2FjMWEzYjBlZDYwMzQ4Y2I0M2QxZGVlNjZkMzBhMzJjM2YwZjI4YzEzMDFjMGUyMGMyMDg1MWM5MGQ0MmJkIn0.eyJhdWQiOiIxIiwianRpIjoiZDExNDAzMzhiM2MzMGIzNDQzYWMxYTNiMGVkNjAzNDhjYjQzZDFkZWU2NmQzMGEzMmMzZjBmMjhjMTMwMWMwZTIwYzIwODUxYzkwZDQyYmQiLCJpYXQiOjE1NTg4MTE1MzQsIm5iZiI6MTU1ODgxMTUzNCwiZXhwIjoxNTkwNDMzOTM0LCJzdWIiOiIzMiIsInNjb3BlcyI6W119.V7KZDWkUeqAgxhgiMgx6gcfhW4E1nmOorEhxxN0qM8zDzqnAlEJ1I7L63idl9EVFbCkUWKgm-vL9J0C3ndv4IsOV9H1cZ0c1u-KPmsWi_LpjQWP1ETtAmY6_RTc3ChZtETLc9Z5-dhfpKGEFp-dzg3izdrSr24iGFWz-2YrCXLwlf67po8Ln5n7INpHcDuOVjSnOebyeKkUbeB-kGR8ZzvCLPZ46LhP82_OH6T5vcKmF9rZy5mHumH4uHmfZTNS88OnuqDqlp0pzC1coLQAv7bMG25uZirjRaM0wfhv2-oswckPfVz9I28MB8OmuRLi6fWYOrrmJRm5o8m0NXEmiiDstCGC_eJM9cK_4MzoHaY4LQ0ulXvJCQv-sHgUjGXIYqyFhCMjlNBfxLs_U1dFjdDbnUV0r0jmlxILoQODnpLpiop2DXZbzvaq1bzMg3GEruVDD9L9qNv1jfCW0D8gKo6NMgkKFzQya9iFtdCVfqi3ez2iLz6hfGla8Vs19pPwuS2vSbWFiiWmXem4bPayu1yFBYkOWvXPB9qtAAqFG-dE20wjxl36gqCNBx02oGXZzGl9RHWayOf0GXkwr-imeTwrYfj63sQbZYT7wEuun-KozdaYbp_skcNbBnbxkCvjtmxcM7XB24p-UM4-kCnBoSNCcJVvPjSch00uoXnvetdM",
			dataDetailPelajaran: "loading..."
		}),
		methods: {
			async loadApi(){
				const response = await axios.get('http://api.ceredinas.id/api/courses/'+this.$route.params.id,{'headers': {'Authorization': this.auth}})
				this.dataDetailPelajaran = response.data
			},
		},
		created(){
			this.loadApi()
		}
	}
</script>
