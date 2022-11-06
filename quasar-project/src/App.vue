<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()

    if($q.platform.is.mobile) {
      let Permission = window.plugins.Permission

      let permission = 'android.permission.CAMERA'

      Permission.has(permission, function (result) {
        if (!result[permission]) {
          Permission.request(permission, function (results) {
            if (!result[permission]) {
              console.log("Permision isnt granted")
            }
          }, alert)
        }
      }, alert)
    }
  }
})
</script>
