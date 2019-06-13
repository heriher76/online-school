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
			<LoadingScreen :loading="is_load"></LoadingScreen>
			<featured :datas="dataClass" />
	  </v-container>
	  <v-container>
		<p class="display-1 text-uppercase font-weight-light">
		    <v-layout row wrap>
		        <v-flex xs8 sm8 md8>
		        	Daftar Pelajaran
		        </v-flex>
		    </v-layout>
		</p>
		<LoadingScreen :loading="is_load"></LoadingScreen>
	  	<daftarPelajaran :datas="dataDaftarPelajaran" />
	  </v-container>

	  <!-- End content -->
	</div>
</template>
<script>
  import banner from '../../components/cerevid-component/Banner'
  import featured from '../../components/cerevid-component/featured'
  import daftarPelajaran from '../../components/cerevid-component/DaftarPelajaran'
  import LoadingScreen from'../../components/loading-screen/LoadingCerevid'

  export default {
  	name:"cerevid_home",
  	components: {
  		banner,
  		featured,
  		daftarPelajaran,
  		LoadingScreen
  	},
  	data: () => ({
  		is_load :false,
  	}),
  	computed: {
    dataClass(){
    	return this.$store.state.dataClass || {}
  	},
		dataDaftarPelajaran(){
			if(!this.$store.state.dataPelajaran.length){
				this.is_load = !this.is_load
			}
			return this.$store.state.dataPelajaran || {}
		},
	},
	methods: {
			async getDataClass(){
					this.$store.dispatch('getDataClass')
					.then(response => {
					})
			},
      async getDataPelajaran(){
        this.$store.dispatch('getDataPelajaran')
        .then(response => {
        })
      },
	},
	created(){
		this.getDataClass()
		this.getDataPelajaran()
	},

  }
</script>
