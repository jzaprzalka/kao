<template>
  <q-page class="flex-center">
    <q-img
      :src="barcode.image_front_small_url"
      style="width: 100%;
      position: fixed;
      top: 0;
      left: 0;"
      :fit="'cover'"
      :ratio="16/9"
      @click="showImage = true"
    >
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          Cannot load image
        </div>
      </template>
    </q-img>
    <div class="q-pa-md" style="padding-top: 40%;">
      <q-card bordered style="border-radius: 30px;">
        <q-card-section>
          <div class="text-h5"> {{barcode.product_name}}  </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md" >
      <q-card bordered style="border-radius: 30px;">
        <q-card-section>
          <div class="text-h6">Health</div>
        </q-card-section>

        <q-card-section class="my-card"  style="border-radius: 30px; margin: 0.4em;">
          <div class="text-h6">Nutrition Score</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-h6">Ingredients</div>
          <div v-for="n in 5" :key="n">
            <span class="left">bla bla</span>
            <span class="right">x%</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-md" >
      <q-card bordered style="border-radius: 30px;">
        <q-card-section >
          <div>
            <span class="left">Vegan</span>
            <span class="right">yes &lt;3</span>
          </div>
          <div>
            <span class="left">Vegetarian</span>
            <span class="right">yes &lt;3</span>
          </div>
          <div>
            <span class="left">Palm Oil</span>
            <span class="right">no 😤</span>
          </div>

        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-md" >
      <q-card bordered style="border-radius: 30px;">
        <q-card-section>
          <div class="text-h6">Environment impact</div>
        </q-card-section>

        <q-card-section class="my-card" style="border-radius: 30px; margin: 0.4em;">
          <div class="text-h6">Ecoscore Material Score</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            <span class="left">Packaging qwerty</span>
            <span class="right">yes &lt;3</span>
          </div>
          <div>
            <span class="left">Transport qwerty</span>
            <span class="right">yes &lt;3</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog
      v-model="showImage"
    >
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Full product image</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-img
            :src="barcode.image_front_small_url"
            style="width: 100%;"
            :fit="'cover'"
            @click="showImage = true"
          />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>

import {useRouter} from "vue-router";
import {ref} from "vue";

export default {
  name: "DetailsPage",

  setup() {
    const router = useRouter()
    let barcode = JSON.parse(router.currentRoute.value.query.barcode)
    console.log(barcode)

    return {
      barcode,
      showImage: ref(false)
    }
  },
  mounted() {
  }
}
</script>

<style lang="sass" scoped>
.right
  float: right


.left
  text-align: left
  display: inline-block

</style>
