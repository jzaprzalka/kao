<template>
  <q-page class="flex-center">
    <q-img
      src="~assets/logoKAO.png"
      style="width: 100%;
      position: fixed;
      top: 0;
      left: 0;"
      :fit="'cover'"
    />
    <div class="q-pa-md" style="padding-top: 45%;">
      <q-card bordered style="border-radius: 30px;">
        <q-card-section>
          <div class="text-h5">Product Name</div>
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

  </q-page>
</template>

<script>

export default {
  name: "DetailsPage",
  mounted() {
    let _this = this
    let barcode = _this.$router.currentRoute.value.query.barcode
    console.log(barcode)
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
