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


    <hr
      style="flex-basis: 100%; height: 0; margin: 0; border: 0;"
    />

    <q-btn outline rounded color="primary" size="lg" label="GET STARTED"/>
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

<style scoped>

</style>
