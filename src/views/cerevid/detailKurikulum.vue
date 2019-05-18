<template>
	<div class="kurikulum">
		<headerDetail />
		<v-container>
		    <v-toolbar
		      height="40"
		    >
		      <v-toolbar-items>
		        <v-btn to="/cerevid/detail-pelajaran/ikhtisar" flat color="#2c3e50"  style="text-decoration: none">Ikhtisar</v-btn>
		        <v-btn to="/cerevid/detail-pelajaran/kurikulum" flat color="#2c3e50"  style="text-decoration: none">Kurikulum</v-btn>
		        <v-btn to="/cerevid/detail-pelajaran/ulasan" flat color="#2c3e50"  style="text-decoration: none">Ulasan</v-btn>
		        <v-btn to="/cerevid/detail-pelajaran/profil-pengajar" flat color="#2c3e50"  style="text-decoration: none">Profil Pengajar</v-btn>
		      </v-toolbar-items>
		    </v-toolbar>

		    <v-card offset-md1>
		      <v-container fluid>
		      	<v-flex style="margin:0px 20px;">
				      <v-expansion-panel expand="true">
					    <v-expansion-panel-content
					      v-for="(item,i) in 5"
					      :key="i"
					    >
					      <template v-slot:header>
					        <div>Looping - 7 Materi</div>
					      </template>
					      <v-card>
					      	<v-list-tile>
					            <v-list-tile-content>
					              <v-list-tile-sub-title>Materi 1 | For</v-list-tile-sub-title>
					            </v-list-tile-content>
					            <v-list-tile-action>
					              <v-btn  color="green">
					                <v-icon color="white--text">visibility</v-icon>
					                <span class="pa-1 white--text">Lihat</span>
					              </v-btn>
					            </v-list-tile-action>
					          </v-list-tile>
					      		<v-divider class="grey" style="margin:0"></v-divider>
					      	<v-list-tile>
					            <v-list-tile-content>
					              <v-list-tile-sub-title>Materi 2 | While</v-list-tile-sub-title>
					            </v-list-tile-content>
					            <v-list-tile-action>
					              <v-btn disabled>
					                <v-icon>lock</v-icon>
					                <span class="pa-1">Lihat</span>
					              </v-btn>
					            </v-list-tile-action>
					          </v-list-tile>
					      </v-card>
					    </v-expansion-panel-content>
					  </v-expansion-panel>
		    	</v-flex>
		      </v-container>
		    </v-card>
		</v-container>
	</div>
</template>
<script>
	import headerDetail from '../../components/cerevid-component/headerDetail'
	export default {
		name:"kurikulum",
		components:{
			headerDetail,
		}
	}
</script>
<style>
.theme--light.v-expansion-panel .v-expansion-panel__container{
	background-color: #2c3e50;
	color: #fff;
}
.theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon{
	color:#fff;
}
.v-btn:not(.v-btn--disabled):not(.v-btn--floating):not(.v-btn--icon) .v-btn__content .v-icon{
	color:#fff;
}
</style>
