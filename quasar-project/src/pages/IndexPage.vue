<template>
  <q-page class="flex flex-center">

    <img
      alt="KAO logo"
      :src="$q.dark.isActive ? 'logos/tu_logo_kao_dark.svg' : 'logos/tu_logo_kao.svg'"
      style="width: 200px; height: 200px; margin-top: 10em;"
    >

    <hr
      style="flex-basis: 100%; height: 0; margin: 0; border: 0;"
    />

    <q-select
        rounded
        outlined
        v-model="model"
        :options="options"
        label="Choose language"
        transition-show="jump-up"
        transition-hide="jump-up"
        style="width: 250px;"
        behavior="menu"
        option-value="id"
        option-label="name"
        emit-value
        map-options
        @filter="filterFn"
        @filter-abort="abortFilterFn"
        @update:model-value="val => changeURL(val)"
    >
      <template v-slot:prepend>
        <q-icon name="language" />
      </template>
    </q-select>

    <hr
      style="flex-basis: 100%; height: 0; margin: 0; border: 0;"
    />

    <q-btn
      rounded color="primary"
      size="lg"
      to="product/search">{{$t("GET STARTED")}}</q-btn>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $q = useQuasar()
    const language = []
    let data;
    const options = ref(null)

    api.get('data/taxonomies/languages.json')
      .then((response) => {
        data = Object.values(response.data)
        data.forEach((item => {
          let lang = {
            id: item.language_code_2.en,
            name: item.name.en
          }
          language.push(lang);
        }))
        language.sort((a, b) => a.name > b.name ? 1 : -1);
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })

    return {
      model: ref(null),
      options,
      filterFn (val, update) {
        if (options.value !== null) {
          update()
          return
        }

        setTimeout(() => {
          update(() => {
            options.value = language
          })
        }, 2000)
      },

      abortFilterFn () {
        console.log('delayed filter aborted')
        }
      }
    },
    methods: {
      changeURL(val) {
        api.defaults.baseURL = `https://${val}.openfoodfacts.org/`
        this.$i18n.locale = val
        console.log(api.defaults.baseURL)
        console.log(this.$i18n.locale)
      }
    }
  })
</script>
