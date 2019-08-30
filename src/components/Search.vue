<template>
<div class="common-class">
  <header class="search-bar">
    <span class="s-icon">
      <svg width="110px" height="85px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path d="M76.0871908,70.7838899 L98.6516504,93.3483496 C100.116117,94.8128157 100.116117,97.1871843 98.6516504,98.6516504 C97.1871843,100.116117 94.8128157,100.116117 93.3483496,98.6516504 L70.7838899,76.0871908 C63.4016421,82.2745965 53.8858783,86 43.5,86 C20.0278981,86 1,66.9721019 1,43.5 C1,20.0278981 20.0278981,1 43.5,1 C66.9721019,1 86,20.0278981 86,43.5 C86,53.8858783 82.2745965,63.4016421 76.0871908,70.7838899 Z M43.5,78.5 C62.8299662,78.5 78.5,62.8299662 78.5,43.5 C78.5,24.1700338 62.8299662,8.5 43.5,8.5 C24.1700338,8.5 8.5,24.1700338 8.5,43.5 C8.5,62.8299662 24.1700338,78.5 43.5,78.5 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"></path>
        </g>
      </svg>
    </span>
    <div class="search-box">
      <input id="searchInput" ref="input" v-model="name" :placeholder="tip" type="text" />
    </div>  
  </header>
</div>
</template>
<script>
export default {
  name: "Search",
  props: {
    tip: String,
    // type: {
    //   type: String,
    //   default: ''
    // }           :autofocus="this.tip === '输入姓名搜索' ? false : 'autofocus'" v-focus 
  },
  data () {
    return {
      name: '',
      show: false,
      // autofocus: false
    }
  },
  methods: {
  },
  mounted () 
  {
    // 定焦点  辅助人员选择时不用定焦点
    // if(! this.type){
    //   document.getElementById('searchInput').focus()
    // }
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.$refs['input'].focus()
    //   },500)
    // })
  },
  // computed: {
  //   autofocus () {
  //     this.$nextTick(() => {
  //     setTimeout(() => {
  //       this.$refs['input'].focus()
  //     },500)
  //   })
  //   return this.tip === '输入姓名搜索' ? false : 'autofocus'
  //   }
  // },
  watch: {
    name: {
      // 搜索功能是实时的 
      handler (val) {
        let timer = null
        timer = setTimeout(() => {
          this.$emit('get-list', val)
        }, 300)
      },
      // 立即先去执行handler
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.common-class{
  height: auto;
}
.fa-icon-search{
  display: inline-block;
  width: 64px;
  height: 64px;
  background: url('../assets/img/backArrow.png') no-repeat center;
  background-size: 100% 100%;
  transform: scale(0.8);
}
.search-bar{
  position: relative;
  margin-bottom: 12px;
  span{
    position: absolute;
    top: 12px;
    left: 50%;
    margin-left: -125px;
    path{
      fill: #d8dce0;
    }
  }
  &>div{
    height: 64px;
    padding: 0 !important;
    vertical-align: top;
  }
}
</style>