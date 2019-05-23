<template>
						<v-card-text style="padding-top:0">
							<v-toolbar flat dark>
								<v-list  style="background-color:#353b48">
									<v-list-tile>
										<v-list-tile-title class="title">
											Kelola Pelajaran
										</v-list-tile-title>
									</v-list-tile>
								</v-list>
							</v-toolbar>
							<v-list dense class="pt-0">
								<v-list-tile
									to="/cerevid/guru/daftar-pelajaran"
								>
									<v-list-tile-action>
										<v-icon>dashboard</v-icon>
									</v-list-tile-action>

									<v-list-tile-content>
										<v-list-tile-title>Daftar Pelajaran</v-list-tile-title>
									</v-list-tile-content>
								</v-list-tile>
								<v-list-tile
									to="/cerevid/guru/tambah-pelajaran"
								>
									<v-list-tile-action>
										<v-icon>dashboard</v-icon>
									</v-list-tile-action>

									<v-list-tile-content>
										<v-list-tile-title>Tambah Pelajaran</v-list-tile-title>
									</v-list-tile-content>
								</v-list-tile>
							</v-list>
						</v-card-text>
</template>						