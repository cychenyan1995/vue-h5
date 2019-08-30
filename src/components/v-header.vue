<template>
  <div v-show="isFalse" class="v-header">
    <slot><i @click="back" v-show="show" class="icon-arrow-left">
      <span>
        <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
            <title>guideback</title>
            <desc>Created with Sketch.</desc>
            <g id="guideback" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M10.3759354,49.9273655 L55.0790424,92.2776774 C56.5825397,93.7020432 56.6466884,96.0755452 55.2223226,97.5790424 C53.7979568,99.0825397 51.4244548,99.1466884 49.9209576,97.7223226 L2.42095757,52.7223226 C0.888652957,51.2706656 0.855823946,48.8408752 2.34834957,47.3483496 L47.3483496,2.34834957 C48.8128157,0.883883476 51.1871843,0.883883476 52.6516504,2.34834957 C54.1161165,3.81281566 54.1161165,6.18718434 52.6516504,7.65165043 L10.3759354,49.9273655 Z" id="Path" fill="#000000" fill-rule="nonzero"></path>
            </g>
        </svg>
      </span></i></slot>
    <p>{{title}}</p>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'

export default {
  name: "v-header",
  props: {
    title: String
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    back () {
      const { meta, query } = this.$route
      // let confirm = null
      // if (meta.in) {
      //   confirm = await MessageBox.confirm('现在退出，将丢失已编辑的内容<br>确认退出?')
      // }
      // console.log(confirm)
      if (!meta.pre) {
        this.$router.go(-1)
        return
      }
      if(this.$root.$data.backTosellman){
        this.$router.push({
          path: '/sellManUpdate',
          query: {user: 'addManager', type: 'edit'}// 选择区域总
        })
        this.$root.$data.backTosellman = false
        return 
      }
      if (query.type === 'edit' || query.type === 'addEdit' || query.find === 'contact') {
        this.$router.push({
          path: meta.editPath || meta.pre,
          query: {
            flag: 'editTargetMan'
          }
        })
        return
      }
      // if (query.find === 'contact') {
      //   this.$router.push({
      //     path: meta.editPath
      //   })
      //   return
      // }
      // 新增  选择区域负责人 回退  this.$root.$data.addEdit === 'add'
      if (query.user === 'market' || this.$root.$data.addEdit === 'targetEdit' || this.$root.$data.addEdit === 'targetEditTmp') {
        this.$router.push({
          path: '/viewActiveDesc'
        })
        return
      }
      //  || this.$root.$data.addEdit === 'add' 新增  选择区域负责人 回退
      if (query.type === 'addManager') {
        this.$router.push({
          path: '/targetInfo'
        })
        return
      }
      //  || this.$root.$data.addEditTmp === 'targetEditTmp'  市场活动详情回退
      if(this.$root.$data.addEdit === 'targetEdit'){
        this.$router.push({
          path: '/targetInfo',
          query: {
            type: 'edit'
          }
        })
        return
      }
      if(query.type === 'addEdit'){
        this.$router.push({
          path: '/sellManUpdate?user=market'
        })
        return
      }
      this.$router.push({
        path: meta.pre
      })
    }
  },
  computed: {
    // show () {
    //   const name = this.$route.name
    //   if (name === 'city' || name === 'assistMan' || name === 'industry') {
    //     return false
    //   }
    //   return true
    // },
    isFalse () {
      const name = this.$route.name
      if (name === 'home' || name === 'index' || name === 'contact' || name === 'me') {
        return false
      }
      return true
    }
  },
  mounted () {
    // console.log(this)
  }
}
</script>
<style lang="scss" scoped>
  .v-header{
    position: fixed;
    top:0;
    left: 0;
    display: flex;
    width: 100%;
    height: 88px;
    text-align: left;
    line-height: 88px;
    font-weight: bold;
    margin-bottom: 24px;
    background: #fff;
    color: #555555;
    font-size: 32px;
    z-index: 2;
    text-align: center;
    p{
      flex: 1;
    }
  }
  .icon-arrow-left{
    position: absolute;
    width: 65px;
    height: 73%;
    text-align: center;
    font-weight: bold;
    transform: scale(1.5);
    // transform: scaleY(1.5) translateY(-1px);
    // background: url('../assets/img/guideback.svg') no-repeat;
    svg {
        height: 32px;
        width: 20px;
    }
    // &::after {
    //   content: '';
    //   height: 32px;
    //   width: 20px;
    //   background: url('../assets/img/guideback.svg') no-repeat;
    // }
  }

</style>