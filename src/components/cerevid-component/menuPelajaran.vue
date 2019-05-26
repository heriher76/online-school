<template>

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
		</v-tabs>
</template>
