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

export default defineComponent({
  name: "SearchPage",

  setup () {
    return {
      barcode: ref('')
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
    submit() {
      let stream =  this.$refs.video.srcObject
      let tracks = stream.getTracks()
      tracks.forEach(function(track) {
        track.stop()
      })
      this.$refs.video.srcObject = null;

      console.log(this.barcode)
      let _this = this
      _this.$router.push({path: '/product/details',  query: { barcode: this.barcode }})
    }
  },
  mounted() {
    this.initCamera()
  }
})
</script>

<style scoped>
</style>
