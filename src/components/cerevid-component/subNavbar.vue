<template>
	<v-card color="#34495e">
		<v-layout
	        fill-height
	        align-center
	        pa-5
      	>
      		<div class="headline white--text">
      			Pelajaran Saya
      		</div>
      	</v-layout>
      	<v-toolbar
      		height="40"
      	>
			<v-toolbar-items>
				<v-btn to="/cerevid/daftar-pelajaran" flat color="#34495e"  style="text-decoration: none">Semua Pelajaran</v-btn>
				<v-btn to="/cerevid/favorit" flat color="#34495e"  style="text-decoration: none">Favorit</v-btn>
			</v-toolbar-items>
		</v-toolbar>
	</v-card>
</template>
