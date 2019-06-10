<template>
	<v-card color="#353b48">
		<v-layout
	        align-center
	        pa-5
    >
    	<div class="headline white--text">
      	Pelajaran Saya
				<div class="subheading mx-3">{{ datas.length }} Pelajaran </div>
      </div>
    </v-layout>
	</v-card>
</template>

<script>
	export default {
		props: ['datas'],
		data: () => ({

		}),
		created() {
		}
	}
</script>