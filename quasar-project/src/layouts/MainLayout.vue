<template>
  <q-layout view="lHh lpr lFf">
    <q-header style="background-color: transparent;">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/tu_mini_logo_kao.svg" alt="KAO logo">
          </q-avatar>
        </q-toolbar-title>
        <q-space />
        <q-toggle
          v-model="themes"
          checked-icon="dark_mode"
          color="black"
          dark
          keep-color
          unchecked-icon="light_mode"
          @update:model-value="onUpdate"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Dark } from "quasar";

export default defineComponent({
  name: 'MainLayout',
  components: {
  },

  setup () {
    return {
      themes: ref(false),
    }
  },
  methods: {
    onUpdate(val) {
      Dark.set(val)
    }
  }
})
</script>
