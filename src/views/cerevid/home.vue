<template>
	<div class="cerevid_home">
	  <!-- Featured -->
	  <banner />
	  <!-- End Featured -->
	  <!-- Featured -->
	  <featured />
	  <!-- End Featured -->
	  <!-- Featured -->
	  <daftarPelajaran />
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
    data: () => ({
      show: false
    })
  }
</script>