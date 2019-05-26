<template>
	<div>
		<div class="headline">
				<div>Profil Pengajar</div>
		</div>
		<v-container grid-list-md>
				<v-layout row wrap>
					<v-flex xs12 sm4 md3>
			<v-list-tile-avatar size="100" class="ml-2">
				<img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
							</v-list-tile-avatar>
							<v-layout row wrap class="my-3">
								<v-icon>book</v-icon>
								<div class="subheading pl-2">20 Pelajaran</div>
							</v-layout>
				</v-flex>
					<v-flex xs12 sm8 md9>
						<div class="headline">
							{{datas.data.teacher.name}}
						</div>
						<div class="subheading font-weight-normal pb-2 pl-2">
							Web Developer
						</div>
						<div>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</div>
						<div>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</div>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
	export default {
		props: ['datas'],
		name:"profilPengajar",
	}
</script>
