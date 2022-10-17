<template>
  <q-page class="flex flex-center">
    <img
      alt="KAO logo"
      src="~assets/logoKAO.png"
      style="width: 200px; height: 200px; margin-top: 10em;"
    >

    <hr
      style="flex-basis: 100%; height: 0; margin: 0; border: 0;"
    />

    <q-select
        rounded
        outlined
        bottom-slots
        v-model="model"
        :options="options"
        label="Choose language"
        style="width: 250px;">
      <template v-slot:prepend>
        <q-icon name="language" />
      </template>
    </q-select>

    <hr
      style="flex-basis: 100%; height: 0; margin: 0; border: 0;"
    />

    <q-btn rounded color="primary" size="lg" label="GET STARTED" to="product/search"/>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    return {
      model: ref(null),
      options: [
        'Polish', 'English', '<3', 'Apple', 'Oracle', '🤮🤮🤮🤮🤮🤮'
      ]
    }
  }
})
</script>
