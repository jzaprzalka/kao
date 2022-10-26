<template>
  <q-page class="flex-center q-pa-md">
    <div class="q-pa-md" >
      <h5 class="text-weight-light text-center">
        Scan the barcode...
      </h5>
      <!-- <qrcode-stream @decode="onDecode" @init="onInit" /> -->
      <div class="full-width">
        <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" />
      </div>
      <!-- <video
        ref="video"
        class="full-width"
        autoplay
        playsinline /> -->
      <!-- <p class="error">{{ error }}</p> -->

      <!-- <p class="decode-result">
        Last result: <b>{{ result }}</b>
      </p> -->
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
import { QrcodeStream } from 'vue-qrcode-reader/src/index'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { api } from 'boot/axios'
import {useQuasar} from "quasar";

export default defineComponent({
  name: "SearchPage",
  components: { StreamBarcodeReader },

  data () {
    return {
      result: "",
      error: "",
    }
  },

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
          data = data[1]
          _this.$router.push({path: '/product/details',  query: { barcode: JSON.stringify(data) }})
        }
      }, 1950)

    }
    return {
      barcode: ref(''),
      submit
    }
  },

  methods: {
    // initCamera() {
    //   navigator.mediaDevices.getUserMedia({
    //     video: true
    //   }).then(stream => {
    //     this.$refs.video.srcObject = stream
    //   })
    // },
    submit() {
      // let stream =  this.$refs.video.srcObject
      // let tracks = stream.getTracks()
      // tracks.forEach(function(track) {
      //   track.stop()
      // })
      // this.$refs.video.srcObject = null;

      console.log(this.barcode)
      let _this = this
      _this.$router.push({path: '/product/details',  query: { barcode: this.barcode }})
    },
    onDecode(a, b, c) {
      this.barcode = a;
      console.log(a + "" + b + "" + c);
      submit();
    },
    // onDecode(result) {
    //   this.result = result;
    // },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    onLoaded() {
      console.log("load");

    },
  },
  // mounted() {
  //   this.initCamera()
  // },
  
})
</script>

<style scoped>
</style>
