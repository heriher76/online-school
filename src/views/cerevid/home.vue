<template>
	<div class="cerevid_home">
	  <!-- Featured -->
	  <banner />
	  <!-- End Featured -->
	  <!-- Featured -->
	  <featured :datas="dataFeatured" />
	  <!-- End Featured -->
	  <!-- Featured -->
	  <daftarPelajaran :datas="dataDaftarPelajaran" />
	  <!-- End Featured -->
	</div>
</template>
<script>
  import banner from '../../components/cerevid-component/Banner'
  import featured from '../../components/cerevid-component/featured'
  import daftarPelajaran from '../../components/cerevid-component/DaftarPelajaran'
	import axios from 'axios'

  export default {
  	name:"cerevid_home",
  	components: {
  		banner,
  		featured,
  		daftarPelajaran
  	},
    data: () => ({
      show: false,
			auth: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQxMTQwMzM4YjNjMzBiMzQ0M2FjMWEzYjBlZDYwMzQ4Y2I0M2QxZGVlNjZkMzBhMzJjM2YwZjI4YzEzMDFjMGUyMGMyMDg1MWM5MGQ0MmJkIn0.eyJhdWQiOiIxIiwianRpIjoiZDExNDAzMzhiM2MzMGIzNDQzYWMxYTNiMGVkNjAzNDhjYjQzZDFkZWU2NmQzMGEzMmMzZjBmMjhjMTMwMWMwZTIwYzIwODUxYzkwZDQyYmQiLCJpYXQiOjE1NTg4MTE1MzQsIm5iZiI6MTU1ODgxMTUzNCwiZXhwIjoxNTkwNDMzOTM0LCJzdWIiOiIzMiIsInNjb3BlcyI6W119.V7KZDWkUeqAgxhgiMgx6gcfhW4E1nmOorEhxxN0qM8zDzqnAlEJ1I7L63idl9EVFbCkUWKgm-vL9J0C3ndv4IsOV9H1cZ0c1u-KPmsWi_LpjQWP1ETtAmY6_RTc3ChZtETLc9Z5-dhfpKGEFp-dzg3izdrSr24iGFWz-2YrCXLwlf67po8Ln5n7INpHcDuOVjSnOebyeKkUbeB-kGR8ZzvCLPZ46LhP82_OH6T5vcKmF9rZy5mHumH4uHmfZTNS88OnuqDqlp0pzC1coLQAv7bMG25uZirjRaM0wfhv2-oswckPfVz9I28MB8OmuRLi6fWYOrrmJRm5o8m0NXEmiiDstCGC_eJM9cK_4MzoHaY4LQ0ulXvJCQv-sHgUjGXIYqyFhCMjlNBfxLs_U1dFjdDbnUV0r0jmlxILoQODnpLpiop2DXZbzvaq1bzMg3GEruVDD9L9qNv1jfCW0D8gKo6NMgkKFzQya9iFtdCVfqi3ez2iLz6hfGla8Vs19pPwuS2vSbWFiiWmXem4bPayu1yFBYkOWvXPB9qtAAqFG-dE20wjxl36gqCNBx02oGXZzGl9RHWayOf0GXkwr-imeTwrYfj63sQbZYT7wEuun-KozdaYbp_skcNbBnbxkCvjtmxcM7XB24p-UM4-kCnBoSNCcJVvPjSch00uoXnvetdM",
			dataFeatured: "loading...",
			dataDaftarPelajaran: "loading..."
		}),
		methods: {
			async loadApi(){
				const response = await axios.get('http://api.ceredinas.id/api/courses',{'headers': {'Authorization': this.auth}})
				this.dataDaftarPelajaran = response.data
			},
			async loadApiFeatured(){
				const responseFeatured = await axios.get('http://api.ceredinas.id/api/courses/lesson/1',{'headers': {'Authorization': this.auth}})
				this.dataFeatured = responseFeatured.data
			}
		},
		created(){
			this.loadApi()
			this.loadApiFeatured()
		}
  }
</script>
