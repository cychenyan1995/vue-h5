<template>
<div class="industry-wrap pop-padding-top">
  <div v-for="(v, k) in aData" :key="k" class="class-box">
    <h3>{{k}}</h3>
    <ul @click="select" class="industry-box">
      <li :data-index="k" v-for="(val, j) in v" :key="j+'c'">{{val}}</li>
    </ul>
  </div>
</div>
</template>
<script>
import axios from '../../utils/interceptor.js'
import { industry } from '../../utils/api.js'

export default {
  name: "Industry",
  data () {
    return {
      aData: {}
    }
  },
  created () {
    axios.post(industry).then(res => {
      this.aData = res.data.data
    })
  },
  methods: {
    select (e) {
      const target = e.target || e.srcElement
      if (target.nodeName !== 'LI') {
        return
      }
      if (document.querySelector('.on')) {
        document.querySelector('.on').className = ''
      }
      target.className = 'on'
      const obj = {key: 'industry'}
      const { index } = target.dataset
      // console.log(e)
      obj.val = index + '/' + target.innerHTML.trim()
      this.$emit('industry', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
  .industry-box{
    overflow: hidden;
    padding: 24px;
    li{
      float: left;
      padding: 8px 16px;
      border: 1px solid #ccc;
      margin-right: 30px;
      margin-bottom: 24px;
    }
  }
  .on{
    background: #4298f9;
    color: #fff;
  }
</style>