<template>
  <q-page class="flex-center q-pa-md">
    <div class="row justify-center q-pa-md">
      <h5 class="text-weight-light text-center" style="margin-top: 0.5em !important;">
        {{ $t('Scan the barcode...') }}
      </h5>
      <div class="full-width">
        <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" @init="onInit" v-if="$q.platform.is.desktop" />
      </div>

      <img
        alt="KAO logo"
        :src="$q.dark.isActive ? 'barcodes/barcode-dark.png' : 'barcodes/barcode-light.png'"
        style="margin-top: 0; width: 75%; margin-bottom: 4em"
        v-if="$q.platform.is.mobile"
      >
      <q-btn
        v-if="$q.platform.is.mobile"
        rounded color="primary"
        icon="qr_code_scanner"
        label="Mobile Barcode Scanner"
        @click="scanImage"
      />
    </div>

    <div class="row justify-center q-pa-md">
      <h5 class="text-weight-light text-center" style="margin-bottom: 0.05em !important; padding-bottom: 0.05em !important; margin-top: 0.5em !important;">
        {{ $t('...or enter numbers below') }}
      </h5>
    </div>

    <div class="row justify-center q-pa-md" style="margin-top: 0 !important; padding-top: 0 !important;">
      <q-input
        type="number"
        min="0"
        rounded
        outlined
        v-model="barcode"
        style="min-width: 20em !important;"
        @keydown.enter.prevent="submit()"
        name="barcode_input"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { api } from 'boot/axios'
import {Notify} from "quasar";

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
    return {
      barcode: ref('')
    }
  },

  methods: {
    submit() {
      let _this = this
      let data;

      api.get(`api/v2/product/${this.barcode}`)
        .then((response) => {
          data = Object.values(response.data)
        })
        .catch(() => {
          Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })

      Notify.create({
        spinner: true,
        message: 'Please wait...',
        timeout: 1600
      })

      setTimeout(() => {
        if(data) {
          if(data[0] == null)
            Notify.create({
              color: 'negative',
              position: 'top',
              message: 'Product not found',
              icon: 'report_problem'
            })
          else
          {
            data = data[1]
            _this.$router.push({path: '/product/details',  query: { barcode: JSON.stringify(data) }})
          }
        } else {
          Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Product not found',
            icon: 'report_problem'
          })
        }

      }, 1950)

    },
    onDecode(a, b, c) {
      if(this.barcode !== a) {
        this.barcode = a;
        this.submit()
      }
      console.log(a + "" + b + "" + c);
    },
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
    scanImage() {
      cordova.plugins.barcodeScanner.scan(
        (result) => {
          this.barcode = result.text;
          this.submit()
        },
        (error) => {
          alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: false, // Android, save scan history (default false)
          prompt: "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: true, // iOS and Android
        }
      );
    },
  },


})
</script>

<style scoped>
</style>
