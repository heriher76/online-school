	<template>
		<div>
			<v-container grid-list-md>
				<v-layout row wrap>
				    <v-flex xs12 sm12 md12>
					    <v-select
					        :items="datas.data"
					        label="Kelas"
							name="kelas"
							v-model="kelas"
							item-text="name"
							item-value="id"
					        outline
					    ></v-select>
					</v-flex>
				    <v-flex xs12 sm12 md12>
					    <v-select
					        :items="dataLesson"
					        label="Pelajaran"
					  		name="pelajaran"
							v-model="pelajaran"
							item-text="name"
							item-value="id"
							@change="getDataPelajaranbyLesson"
					        outline
					    ></v-select>
					</v-flex>
				</v-layout>
			</v-container>
		    <v-container
		      fluid
		      grid-list-md
		    >
				<v-data-iterator
					:items="dataDaftarPelajaranbyLesson.data"
					:rows-per-page-items="rowsPerPageItems"
					content-class="layout row wrap"
					:expand="expand"
					:hide-actions="true"
					no-data-text="Pelajaran tidak tersedia"
					no-results-text="Pelajaran tidak ditemukan"
					>
					<template v-slot:item="props">
						<v-flex xs12 sm6 md3>
								<v-card>
									<v-img
										v-bind:src="'http://admin.ceredinas.id/public/cover/'+ props.item.cover"
										height="200px"
									>
	                  <v-flex offset-xs9 align-end flexbox>
			                <div v-if="props.item">
			                  <div v-if="cekFavorit(props.item.id)">
			                  	<div v-for="fav in dataFavoritbyUser.data">
			                  	  <div v-if="fav.course.course_id==props.item.id">
				                   	<v-btn fab dark small color="pink" style="opacity:0.85;" @click="hapusFavorit(fav.id)">
				                  		<v-icon dark >favorite</v-icon>
				                   	</v-btn>
				                  </div>
				                </div>
			                  </div>
			                	<div v-else>
				                   	<v-btn fab dark small style="opacity:0.85;" @click="simpanFavorit(props.item.id)">
				                   		<v-icon dark>favorite</v-icon>
				                  	</v-btn>
			                	</div>
			                </div>
	                  </v-flex>
									</v-img>
									<v-card-title primary-title>
										<div>
											<div class="headline">
												<router-link v-bind:to="'/cerevid/detail-pelajaran/'+props.item.id" style="text-decoration: none;">{{props.item.title}}</router-link>
											</div>
											<span class="grey--text">{{props.item.teacher.name}}</span>
										</div>
									</v-card-title>
									<div class="text-xs-center mt-1">
											<v-rating
												v-model="props.item.rating"
													color="yellow darken-3"
													background-color="grey darken-1"
													half-increments
													readonly
										>
										</v-rating>
										<span class="subheading mr-2">

										</span>
									</div>
									<v-spacer></v-spacer>
									<v-card-actions>
										<v-spacer></v-spacer>
										<span class="text-uppercase">Deskripsi</span>
										<v-btn
											v-model="props.expanded"
											icon
											@click="props.expanded = !props.expanded"
											>
											<v-icon>{{ props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
										</v-btn>
									</v-card-actions>
									<v-divider></v-divider>
									<v-slide-y-transition>
										<v-card-text v-if="props.expanded">
											{{props.item.description}}
											<div class="subheading my-3">Kurikulum<v-divider></v-divider></div>
											{{props.item.curriculum}}
										</v-card-text>
									</v-slide-y-transition>
								</v-card>
						</v-flex>
					</template>
				</v-data-iterator>
		    </v-container>
		</div>
	</template>
<script>
import LoadingScreen from '../../components/loading-screen/LoadingCerevid'
export default {
  props: ['datas'],
  data() {
    return {
      expand: true,
      rowsPerPageItems: [4],
      kelas: '',
      pelajaran: '',
      dataPelajaran: [],
      is_load: false
    }
  },
  components: {
    LoadingScreen
  },
  methods: {
    async getDataPelajaranbyLesson() {
      this.$store.dispatch('getDataPelajaranbyLesson', {
          id: this.pelajaran
        })
        .then(response => {})
        .catch(error => {
          console.log(error)
        })
    },
    async getDataFavoritbyUser() {
      this.$store.dispatch('getDataFavoritbyUser')
        .then(response => {})
    },
    loadData() {
      this.getDataPelajaranbyLesson();
    },
    simpanFavorit(id) {
      this.$store.dispatch('pushDataFavorit', {
          user_id: this.userId,
          course_id: id,
        })
        .then(response => {})
        .catch(error => {
          this.$swal('Oopps', 'Gagal Menyimpan ke Favorit...', 'warning')
        })
    },
    hapusFavorit(favorit_id) {
      this.$store.dispatch('delDataFavorit', {
          user_id: this.userId,
          favorit_id: favorit_id,
        })
        .then(response => {})
        .catch(error => {
          this.$swal('Oopps', 'Gagal Menghapus Favorit...', 'warning')
        })
    },
	cekFavorit(id) {
	  if(this.dataFavoritbyUser.data){
		for(var i=0;i<this.dataFavoritbyUser.data.length;i++){
          if(this.dataFavoritbyUser.data[i].course.course_id==id){
		    return true
	        break;
		  }
        }
	  }
	},
  },
  created() {
    this.getDataFavoritbyUser()
  },
  computed: {
    dataDaftarPelajaranbyLesson() {
      return this.$store.state.dataPelajaranbyLesson || {}
    },
    dataFavoritbyUser() {
      return this.$store.state.dataFavoritbyUser || {}
    },
    dataLesson() {
      var data = []
      if (this.datas.data) {
        for (var i = 0; i < this.datas.data.length; i++) {
          if (this.datas.data[i].id == this.kelas) {
            data = this.datas.data[i].lessons
          }
        }
      }
      return data
    },
  }
}
</script>
<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
