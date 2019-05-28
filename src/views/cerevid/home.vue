<template>
	<div class="cerevid_home">
	  <!-- Featured -->
	  <banner />
	  <!-- End Featured -->
	  <!-- Featured -->
	  <featured :datas="dataDaftarPelajaranbyLesson" />
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

  export default {
  	name:"cerevid_home",
  	components: {
  		banner,
  		featured,
  		daftarPelajaran
  	},
		methods: {
      async getDataPelajaran(){
        this.$store.dispatch('getDataPelajaran')
        .then(response => {
          console.log("telah load data..")
        })
      },
			async getDataPelajaranbyLesson(){
        this.$store.dispatch('getDataPelajaranbyLesson')
        .then(response => {
          console.log("telah load data..")
        })
      },
		},
		created(){
			this.getDataPelajaran()
			this.getDataPelajaranbyLesson()
		},
		computed: {
			dataDaftarPelajaran(){
				return this.$store.state.dataPelajaran
			},
			dataDaftarPelajaranbyLesson(){
				return this.$store.state.dataPelajaranbyLesson
			}
		},
  }
</script>
