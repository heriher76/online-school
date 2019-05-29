<template>
	<div class="cerevid_home">
	  <!-- Featured -->
	  <banner />
	  <!-- End Featured -->
	  <!-- content -->
	  <v-container>
		    <p class="display-1 text-uppercase font-weight-light">
		      Featured
		    </p>		
			<LoadingScreen1 :loading="is_load1"></LoadingScreen1>
			<featured :datas="dataDaftarPelajaranbyLesson" />
	  </v-container>
	  <v-container>
		<p class="display-1 text-uppercase font-weight-light">
		    <v-layout row wrap>
		        <v-flex xs8 sm8 md8>
		        	Daftar Pelajaran
		        </v-flex>
		    </v-layout>
		</p>
		<LoadingScreen2 :loading="is_load2"></LoadingScreen2>
	  	<daftarPelajaran :datas="dataDaftarPelajaran" />
	  </v-container>

	  <!-- End content -->
	</div>
</template>
<script>
  import banner from '../../components/cerevid-component/Banner'
  import featured from '../../components/cerevid-component/featured'
  import daftarPelajaran from '../../components/cerevid-component/DaftarPelajaran'
  import LoadingScreen1 from'../../components/loading-screen/LoadingCerevid'
  import LoadingScreen2 from'../../components/loading-screen/LoadingCerevid'

  export default {
  	name:"cerevid_home",
  	components: {
  		banner,
  		featured,
  		daftarPelajaran,
  		LoadingScreen1,
  		LoadingScreen2
  	},
  	data: () => ({
  		is_load1 :false,
  		is_load2 :false,
  	}),
  	computed: {
		dataDaftarPelajaranbyLesson(){
			if(!this.$store.state.dataPelajaranbyLesson.length){
				this.is_load1 = !this.is_load1
			}
			return this.$store.state.dataPelajaranbyLesson || {}
		},
		dataDaftarPelajaran(){
			if(!this.$store.state.dataPelajaran.length){
				this.is_load2 = !this.is_load2
			}
			return this.$store.state.dataPelajaran || {}
		},
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
		this.getDataPelajaranbyLesson()
		this.getDataPelajaran()
	},
		
  }
</script>
