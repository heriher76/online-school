<template>
<div class="detailPelajaran">
  <headerDetail :datas="dataDetailPelajaran" />
  <v-container>
    <v-tabs color="#f5f5f5" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
      <v-tabs-slider color="#34495e"></v-tabs-slider>
      <v-tab :href="'#ikhtisar'" style="text-decoration:none;">
        Ikhtisar
      </v-tab>
      <v-tab :href="'#kurikulum'" style="text-decoration:none;">
        Kurikulum
      </v-tab>
      <v-tab :href="'#ulasan'" style="text-decoration:none;">
        Ulasan
      </v-tab>
      <v-tabs-items>
        <v-tab-item :value="'ikhtisar'">
          <v-card>
            <v-container fluid>
              <v-flex class="mx-4">
                <v-container grid-list-md>
                  <detailIkhtisar :datas="dataDetailPelajaran" />
                </v-container>
              </v-flex>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="'kurikulum'">
          <v-card>
            <v-container fluid>
              <v-flex class="mx-4">
                <detailKurikulum />
              </v-flex>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="'ulasan'">
          <v-card>
            <v-container fluid>
              <v-flex>
                <v-container grid-list-md>
                  <detailUlasan :datas="dataDetailPelajaran" />
                  </v-layout>
                </v-container>
              </v-flex>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</div>
</template>
<script>
import headerDetail from '../../components/cerevid-component/headerDetail'
import menuPelajaran from '../../components/cerevid-component/menuPelajaran'
import detailIkhtisar from '../../components/cerevid-component/detailIkhtisar'
import detailKurikulum from '../../components/cerevid-component/detailKurikulum'
import detailUlasan from '../../components/cerevid-component/detailUlasan'
import detailProfilPengajar from '../../components/cerevid-component/detailProfilPengajar'

export default {
  name: "detailPelajaran",
  components: {
    headerDetail,
    menuPelajaran,
    detailIkhtisar,
    detailKurikulum,
    detailUlasan,
    detailProfilPengajar,
  },
  data: () => ({
	}),
  methods: {
  async getDataDetailPelajaran() {
      this.$store.dispatch('getDataDetailPelajaran')
        .then(response => {
        })
    },
  },
  created() {
    this.getDataDetailPelajaran()
  },
  computed: {
    dataDetailPelajaran() {
      return this.$store.state.dataDetailPelajaran || {}
    },
		userId(){
			return this.$store.state.dataUser || {}
		},
  },
}
</script>
