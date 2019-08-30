<template>
<div v-show="wShow" class="search-page">
  <span class="search-icon" @click="search">
    <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M76.0871908,70.7838899 L98.6516504,93.3483496 C100.116117,94.8128157 100.116117,97.1871843 98.6516504,98.6516504 C97.1871843,100.116117 94.8128157,100.116117 93.3483496,98.6516504 L70.7838899,76.0871908 C63.4016421,82.2745965 53.8858783,86 43.5,86 C20.0278981,86 1,66.9721019 1,43.5 C1,20.0278981 20.0278981,1 43.5,1 C66.9721019,1 86,20.0278981 86,43.5 C86,53.8858783 82.2745965,63.4016421 76.0871908,70.7838899 Z M43.5,78.5 C62.8299662,78.5 78.5,62.8299662 78.5,43.5 C78.5,24.1700338 62.8299662,8.5 43.5,8.5 C24.1700338,8.5 8.5,24.1700338 8.5,43.5 C8.5,62.8299662 24.1700338,78.5 43.5,78.5 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"></path>
      </g>
    </svg>
  </span>
  <span @click="clear" v-show="show" class="close-icon">
    <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="clear" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M50,0 C22.5,0 0,22.5 0,50 C0,77.5 22.5,100 50,100 C77.5,100 100,77.5 100,50 C100,22.5 77.5,0 50,0 Z M70.5,65.5 C72,67 72,69 70.5,70.5 C70,71 69,71.5 68,71.5 C67,71.5 66,71 65.5,70.5 L50,55 L34.5,70.5 C34,71 33,71.5 32,71.5 C31,71.5 30,71 29.5,70.5 C28,69 28,67 29.5,65.5 L45,50 L29.5,34.5 C28,33 28,31 29.5,29.5 C31,28 33,28 34.5,29.5 L50,45 L65.5,29.5 C67,28 69,28 70.5,29.5 C72,31 72,33 70.5,34.5 L55,50 L70.5,65.5 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path>
      </g>
    </svg>
  </span>
  <Search ref="search" :tip="tip" @get-list="getVal"></Search>
  <p @click="cancel">取消</p>
</div>
</template>
<script>
export default {
  name: "search-page",
  data () {
    return {
      // ×图标
      show: false,
      // 整个页面
      wShow: false,
      aData: [],
      tip: '请输入公司名称搜索'
    }
  },
  methods: {
    getVal (val) {
      if (val) {
        this.show = true
      } else {
        this.show = false
      }
      this.$emit('data-s', val)
    },
    cancel () {
      this.wShow = false
      this.$emit('data-s', true)
    },
    clear () {
      this.$refs.search.name = ''
      this.show = false
    },
    search () {
      // console.log('okkkk')
    }
  },
  watch: {
  }
}
</script>
<style>
.search-page .search-box{
  text-align: left !important;
}
.search-page .search-box input{
  font-size: 28px;
  color: #222;
  width: calc(100% - 108px) !important;
  padding-left: 44px;
  text-align: left;
}
</style>

<style lang="scss" scoped>
path{
  fill: #C5C9D1;
}
.search-page{
  padding: 0 !important;
  padding-top: 16px !important;
  position: relative;
  .close-icon{
    position: absolute;
    right: 136px;
    top:28px;
    width: 40px;
    height: 40px;
    z-index: 20;
  }
  .search-icon{
    @extend .close-icon;
    left: 24px;
    right: auto;
    svg{
      height: 110%;
      width: 85%;
    }
  }
  p{
    position: absolute;
    right: 0;
    top: 16px;
    height: 64px;
    line-height: 64px;
    padding: 0 24px;
    color: #555555;
  }
}
</style>