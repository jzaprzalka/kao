<template>
  <q-page class="flex-center">
    <q-img class="product-img" :src="barcode.image_front_small_url" style="width: 100%; position: fixed; top: 0; left: 0;" :fit="'cover'"
      :ratio="16/9" @click="showImage = true">
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          Cannot load image
        </div>
      </template>
    </q-img>
    <div class="q-pa-md cards" style="padding-top: 40%;">
      <q-card bordered style="border-radius: 30px;">
        <q-card-section>
          <div class="text-h5"> {{barcode.product_name}} </div>
          <div class="text-h6"> {{barcode.brands}} </div>
          <div> {{barcode.generic_name}} </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-md cards" >
      <q-card bordered style="border-radius: 30px;">
        <q-card-section>
          <div>
            <span class="text-h6">Categories</span>
            <div v-for="n in categories.length" :key="n">
              <span>{{categories[n-1]}}</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-md cards" >
      <q-card bordered style="border-radius: 30px;">
        <q-card-section>
          <div class="text-h6">Health</div>
        </q-card-section>
        <q-card-section class="my-card"  style="border-radius: 30px; margin: 0.4em;">
          <div class="text-h6">
            <span class="left">Nutri-Score</span>
            <span v-if="['a', 'b', 'c', 'd', 'e'].includes(barcode.nutrition_grades)" :class="['right', 'shadow']">
              <div>
                <span :class="[barcode.nutrition_grades=='a'? 'ecoscore' : '', 'A']">A</span>
                <span :class="[barcode.nutrition_grades=='b'? 'ecoscore' : '', 'B']">B</span>
                <span :class="[barcode.nutrition_grades=='c'? 'ecoscore' : '', 'C']">C</span>
                <span :class="[barcode.nutrition_grades=='d'? 'ecoscore' : '', 'D']">D</span>
                <span :class="[barcode.nutrition_grades=='e'? 'ecoscore' : '', 'E']">E</span>
              </div>
            </span>
            <span v-else class="right">{{barcode.nutrition_grades}}</span>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-h6">Ingredients</div>
          <div>{{ingredients}}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-h6">Nutriments (100g)</div>
          <div>
            <span class="left">carbohydrates</span>
            <span class="right">{{nutriments.carbohydrates_100g}} {{nutriments.carbohydrates_unit}}</span>
          </div>
          <div>
            <span class="left">energy</span>
            <span class="right">{{nutriments['energy-kcal_100g']}} {{nutriments['energy-kcal_unit']}}</span>
          </div>
          <div>
            <span class="left">fat</span>
            <span class="right">{{nutriments.fat_100g}} {{nutriments.fat_unit}}</span>
          </div>
          <div>
            <span class="left">fiber</span>
            <span class="right">{{nutriments.fiber_100g}} {{nutriments.fiber_unit}}</span>
          </div>
          <div>
            <span class="left">proteins</span>
            <span class="right">{{nutriments.proteins_100g}} {{nutriments.proteins_unit}}</span>
          </div>
          <div>
            <span class="left">salt</span>
            <span class="right">{{nutriments.salt_100g}} {{nutriments.salt_unit}}</span>
          </div>
          <div>
            <span class="left">saturated fat</span>
            <span class="right">{{nutriments['saturated-fat_100g']}} {{nutriments['saturated-fat_unit']}}</span>
          </div>
          <div>
            <span class="left">sodium</span>
            <span class="right">{{nutriments.sodium_100g}} {{nutriments.sodium_unit}}</span>
          </div>
          <div>
            <span class="left">sugars</span>
            <span class="right">{{nutriments.sugars_100g}} {{nutriments.sugars_unit}}</span>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <span class="text-h6">Vitamins</span>
          <div>{{vitamins}}</div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-md cards" >
      <q-card bordered style="border-radius: 30px;">
        <q-card-section >
          <div>
            <span class="left">🌿 Palm Oil?</span>
            <span class="right">{{analysis[0]}}</span>
          </div>
          <div>
            <span class="left">🌿 Vegan?</span>
            <span class="right">{{analysis[1]}}</span>
          </div>
          <div>
            <span class="left">🌿 Vegetarian?</span>
            <span class="right">{{analysis[2]}}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-md cards" >
      <q-card bordered style="border-radius: 30px;">
        <q-card-section>
          <div class="text-h6">Environment impact</div>
        </q-card-section>

        <q-card-section class="my-card" style="border-radius: 30px; margin: 0.4em;">
          <div class="text-h6">
            <span class="left">Eco-Score</span>
            <span v-if="['a', 'b', 'c', 'd', 'e'].includes(barcode.ecoscore_grade)" :class="['right', 'shadow']">
              <div>
                <span :class="[barcode.ecoscore_grade=='a'? 'ecoscore' : '', 'A']">A</span>
                <span :class="[barcode.ecoscore_grade=='b'? 'ecoscore' : '', 'B']">B</span>
                <span :class="[barcode.ecoscore_grade=='c'? 'ecoscore' : '', 'C']">C</span>
                <span :class="[barcode.ecoscore_grade=='d'? 'ecoscore' : '', 'D']">D</span>
                <span :class="[barcode.ecoscore_grade=='e'? 'ecoscore' : '', 'E']">E</span>
              </div>
            </span>
            <span v-else class="right">{{barcode.ecoscore_grade}}</span>
          </div>
        </q-card-section>

        <q-card-section>
          <div>
            <span class="text-h6">Packaging</span>
            <div v-for="n in packaging.length" :key="n">
              <span>📦 {{packaging[n-1]}}</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-md cards" >
      <q-card bordered style="border-radius: 30px;">
        <q-card-section>
          <div>
            <span class="text-h6">Keywords</span>
            <div>{{barcode._keywords.join(', ')}}</div>
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

        <q-card-actions align="right">
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
    let categories = barcode.hasOwnProperty('categories_hierarchy') ?
      barcode.categories_hierarchy.map(x => x.split(":")[1].replaceAll("-", " ")) :
      ""
    let ingredients = barcode.hasOwnProperty('ingredients_text') ?
      barcode.ingredients_text :
      ""
    let nutriments = barcode.hasOwnProperty('nutriments') ?
      barcode.nutriments :
      ""
    let analysis = barcode.hasOwnProperty('ingredients_analysis_tags') ?
      barcode.ingredients_analysis_tags.map(x => x.split(":")[1].replaceAll("-", " ")) :
      ["???", "???", "???"]
    let vitamins = barcode.hasOwnProperty('vitamins_tags') ?
      barcode.vitamins_tags.join(', ') :
      ""
    let packaging = barcode.hasOwnProperty('packaging_hierarchy') ?
      barcode.packaging_hierarchy.map(x => x.split(":")[1].replaceAll("-", " ")) :
      ""

    return {
      barcode,
      categories,
      ingredients,
      nutriments,
      analysis,
      vitamins,
      packaging,
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


.A
  background-color: #01852fff
  padding: 4px

.B
  background-color: #2ecc71ff
  padding: 4px

.C
  background-color: #ffc900ff
  padding: 4px

.D
  background-color: #ef7e1aff
  padding: 4px

.E
  background-color: #e62d19ff
  padding: 4px

.ecoscore
  padding: 10px
  border-radius: 10px
  -webkit-box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 1)
  -moz-box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 1)
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 1)

.shadow
  -webkit-box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 1)
  -moz-box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 1)
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 1)

.cards
  z-index: 100

.product-img
  z-index: 0

</style>
