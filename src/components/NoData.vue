<template>
<div class="no-data-box">
  <section></section>
  <p>{{tips}}</p>
</div>
</template>
<script>
export default {
  name: "NoData",
  props: {
    tips: String
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
</style>