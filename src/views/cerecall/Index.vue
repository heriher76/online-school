<template>
    <v-container grid-list-md>
      <v-layout>
        <v-flex xs12 sm8 offset-sm2>
          <div class="nav-result">
              <ul>
                  <li><router-link class="active" :to="{name: 'cerecall'}">CARI GURU</router-link></li>
                  <li><router-link :to="{name: 'cerecall_history'}">RIWAYAT</router-link></li>
              </ul>
          </div>

          <v-select
            v-if="chatRunning==0"
            :items="lessons"
            label="Pilih Mata Pelajaran"
            item-text="name"
            item-value="id"
            @change="showTeacher"
          ></v-select>

          <v-card v-else class="elevation-10" color="#B71C1C" dark style="border-radius:10px;margin:20px 80px;padding:10px">
            <h6 class="title" style="float:left;margin:13px">Anda memiliki chat aktif. Lanjutkan sekarang!</h6>
            <v-btn style="float:right;border-radius:10px;" :to="{name: 'cerecall_chat'}" light>Masuk</v-btn>
            <div class="clear"></div>
          </v-card>
          
          <div v-show="load_data" style="margin:150px auto; width:5%;">
            <v-layout column justify-center align-center>
                <hollow-dots-spinner
                  :animation-duration="1000"
                  :dot-size="15"
                  :dots-num="3"
                  color="#ff1d5e"
                />
            </v-layout>
          </div>

          <div v-show="showCard">
            <v-card class="elevation-20">
              <h3 style="padding:10px 20px">Pilih Guru</h3>
            </v-card>
            <v-layout row wrap>
              <div v-if="teachers == 0" style="font-size:20px; margin-top:30px" class="mx-auto">
                Data tidak ditemukan !
              </div>

              <v-flex md3 v-for="teacher in teachers" :key="teacher.id">
                <v-card style="padding-top:10px;">
                  <v-img
                    style="border-radius:100%; border:1px solid #E0E0E0; width:130px; margin:0px auto; height:130px"
                    :src="teacher.photo"
                  >
                  </v-img>
                  <v-card-title>
                    <div class="mx-auto">
                      <h6 class="title" style="text-align:center;color:black">{{teacher.name}}</h6>
                      <v-card-actions style="height:25px">
                        <v-rating
                          v-model="teacher.rating"
                          background-color="yellow accent-4"
                          color="yellow accent-4"
                          dense
                          half-increments
                          :readonly="true"
                          size="15"
                        ></v-rating>
                        <span class="grey--text text--lighten-2 caption mr-2">
                          ({{ teacher.rating }})
                        </span>
                      </v-card-actions>    
                    </div>
                  </v-card-title>

                  <v-card-actions style="margin-top:-10px">
                    <v-btn block dark color="orange" @click="postHistory(teacher)">Pilih</v-btn> 
                    <!-- <v-btn block dark color="orange" :to="{ name:'cerecall_chat', params: { guruId: '1'}}">Pilih</v-btn>  -->
                  </v-card-actions>

                </v-card>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
      <!-- {{chatRunning}}hello -->
    </v-container>
</template>

<script>
  import axios from 'axios'
  import { HollowDotsSpinner } from 'epic-spinners'

  export default {
    
    components:{
      HollowDotsSpinner
    },

    data (){
      return {
        chatRunning:[],
        lessons: [],
        teachers: [],

        lessonId: '',

        load_data: false,
        showCard: false,
      }
    },
    
    methods: {
      showTeacher(lessId){
        this.showCard  = false
        this.load_data = true
        this.lessonId  = lessId
        axios.get('/cerecall/available/teacher/'+lessId)
        .then(response => {
          this.load_data = false
          this.showCard  = true
          this.teachers  = response.data.data
          // console.log(response.data)
        })
        .catch(error => {console.log(error.response)})
      },

      postHistory(val){
        this.$swal({
            title: 'Apakah anda yakin?',
            text: 'Anda akan memulai konsultasi dengan '+val.name,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya Lanjutkan!',
            cancelButtonText: 'Tidak, Batalkan!',
            showCloseButton: true,
            showLoaderOnConfirm: true
        }).then((result) => {
            if(result.value) { 
              axios.post('/cerecall/history',{
                student_id: this.$store.state.dataUser,
                teacher_id: val.teacher_id,
                lesson_id: this.lessonId
              })
              .then(response => {
                console.log(response.data)
                return this.$swal(
                  'Berhasil!',
                  'Pengajuan anda sedang diproses mohon menunggu sebentar!',
                  'success'
                )
              })
              .catch(error => {
                console.log(error.response)
                // return this.$swal(
                //   'Gagal!',
                //   'Pengajuan anda gagal diproses silahkan ulangi kembali!',
                //   'error'
                // )
                return this.$swal(
                  'Berhasil!',
                  'Pengajuan anda sedang diproses mohon menunggu sebentar!',
                  'success'
                )
              })
              
            }
        })
      },

      linkUlasan(){
        return this.$router.push({name:'cerecall_ulasan', params: { guruId: '1'}})
      }

    },
    updated(){
      axios.get('/cerecall/student/history/running')
      .then(response => {
        this.chatRunning = response.data.data
        if(this.chatRunning!=0){
          this.load_data = false
          this.showCard  = false
        }
        // console.log(this.chatRunning)
      })
      .catch(error => {
          console.log(error.response)
      })  
    },

    mounted(){
      axios.get('/master/lesson')//get lesson
      .then(response => {
        this.lessons = response.data.data
      })
      .catch(error => {console.log(error.response)})

      axios.get('/cerecall/student/history/running')
      .then(response => {
        this.chatRunning = response.data.data
        // console.log(this.chatRunning)
      })
      .catch(error => {
          console.log(error.response)
      })  
    }
  }
</script>

<style>
  .nav-result{
      background: #B71C1C;
      padding:10px;
  }
  .nav-result ul li{
      display: inline;
  }
  .nav-result ul li a{
      background:#D32F2F;
      color: white;
      padding: 12px 30px;
      margin: 0px 2px;
      text-decoration: none;
  }
  .nav-result ul li a.active{
      background:#E53935;
  }
  .nav-result ul li a:hover{
      background:#E53935;
  }
</style>