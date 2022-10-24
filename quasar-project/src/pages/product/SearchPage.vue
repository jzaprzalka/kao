<template>
  <q-page class="flex-center q-pa-md">
    <div class="q-pa-md" >
      <h5 class="text-weight-light text-center">
        Scan the barcode...
      </h5>
      <video
        ref="video"
        class="full-width"
        autoplay
        playsinline/>
    </div>

    <div class="row justify-center q-pa-md">
      <h5 class="text-weight-light text-center" style="margin-bottom: 0.05em !important; padding-bottom: 0.05em !important;">
       ...or enter numbers below
      </h5>
    </div>

    <div class="row justify-center q-pa-md" style="margin-top: 0 !important; padding-top: 0 !important;">
      <q-input
        rounded
        outlined
        v-model="barcode"
        style="min-width: 20em !important;"
        @keydown.enter.prevent="submit()"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
import {useQuasar} from "quasar";

export default defineComponent({
  name: "SearchPage",

  setup () {
    const $q = useQuasar()

    function  submit() {
      let stream =  this.$refs.video.srcObject
      let tracks = stream.getTracks()
      let _this = this
      let data;

      api.get(`api/v2/product/${this.barcode}`)
        .then((response) => {
          data = Object.values(response.data)
          console.log(data)
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })

      $q.notify({
        spinner: true,
        message: 'Please wait...',
        timeout: 1600
      })

      setTimeout(() => {
        console.log(this.barcode)

        console.log(data[0])

        if(data[0] == null)
          $q.notify({
            message: 'Product not found',
            icon: 'error'
          })
        else
        {
          tracks.forEach(function(track) {
            track.stop()
          })
          this.$refs.video.srcObject = null;
          _this.$router.push({path: '/product/details',  query: { barcode: this.barcode }})
        }
      }, 1950)

    }
    return {
      barcode: ref(''),
      submit
    }
  },

  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      })
    },
  },
  mounted() {
    this.initCamera()
  }
})
</script>

<style scoped>
</style>
