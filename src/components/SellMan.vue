<template>
  <div class="sell-man padding-bot" :class="{'add-market-color': title.indexOf('销售')<=-1}">
    <v-header :title="title">
      <i @click="back" v-if="$route.query.user == 'manager'" class="icon-arrow-left">
        <span>
          <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
            <title>guideback</title>
            <desc>Created with Sketch.</desc>
            <g id="guideback" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M10.3759354,49.9273655 L55.0790424,92.2776774 C56.5825397,93.7020432 56.6466884,96.0755452 55.2223226,97.5790424 C53.7979568,99.0825397 51.4244548,99.1466884 49.9209576,97.7223226 L2.42095757,52.7223226 C0.888652957,51.2706656 0.855823946,48.8408752 2.34834957,47.3483496 L47.3483496,2.34834957 C48.8128157,0.883883476 51.1871843,0.883883476 52.6516504,2.34834957 C54.1161165,3.81281566 54.1161165,6.18718434 52.6516504,7.65165043 L10.3759354,49.9273655 Z" id="Path" fill="#000000" fill-rule="nonzero"></path>
            </g>
          </svg>
        </span>
      </i>
    </v-header>
    <ul v-show="manData.length>0" class="div-wrap top-border form-wrap sell-man-main">
      <li :data-index="v.userName" :data-id="v.id" @click="toSelect" v-for="(v,i) in manData" :key="i" class="bot-border">
        <h4>{{(v.userName&&v.userName.length>2)?v.userName.slice(1):v.userName}}</h4>
        <div>
          <p>{{v.userName}}</p>
          <p>{{v.indicatorNumber ? '指标数: '+v.indicatorNumber : v.position}}</p>
        </div>
      </li>
    </ul>
    <no-data v-show="!manData.length>0" :tips="tip"/>
    <div v-show="null" class="footer footer-fixed back-color">
      <p class="div-wrap">保存</p>
    </div>
    <p v-show="title.indexOf('分配')>-1" class="top-edit-btn" @click="toAdd">
      {{manData.length>0?'修改':'添加'}}
    </p>
  </div>
</template>
<script>
import { appoint, manager } from '../utils/api'

export default {
  name: "SellMan",
  data () {
    return {
      manData: [],
      startX: null,
      startY: null,
      tip: '还未分配销售人员'
    }
  },
  created () {
    const type = this.$route.query.user
    // 选择区域总
    if(type === 'addManager'){
      this.tip = '没有数据'
      this.$axios.post(manager).then(res => {
        if(res.data.code != 200){
          this.$notice(res.data.message)
          return
        }
        // 已经选择的预取总不能再选择
        let manDataRes = res.data.data
        let targetInfoList = this.$root.$data.targetInfo
        let userIds = []
        targetInfoList.forEach((v, k) => {
          userIds.push(v.userId)
        })
        // this.manData = res.data.data
        // userName  username
        manDataRes.forEach((item, index) => {
          if(! userIds.includes(item.id)) {
            item.username = item.userName
              this.manData.push(item)
          }
        })
        // console.log(this.manData)
      })
    }else {
      // 选择分配的销售人员
      const detail = JSON.parse(this.$getStore('targetDetail'))
      let params = {
        userIdAssign: detail.userId,
        marketingActiveId: this.$getStore('marketId')
      }
      this.$axios.post(appoint.getList, params).then(res => {
        if(res.data.code != 200){
          this.$notice(res.data.message)
          return
        }
        this.manData = res.data.data
        sessionStorage.setItem('manDataSavedLength',this.manData.length)
        this.manData.forEach((item, index) => {
          this.manData[index].userName = item.username
        })
      })
      }
  },
  components: {
    noData: () => import('./NoData.vue')
  },
  computed: {
    title () {
      const type = this.$route.query.user || this.$route.query.type
      const detail = JSON.parse(this.$getStore('targetDetail'))
      if ((type === 'manager' || type === 'market') && detail) {
        return `${detail.username}（可分配${detail.indicatorNumber}人）`
      }
      return type === 'addManager' ? '选择区域负责人' : '销售人员变更'
    }
  },
  methods: {
    back () {
      this.$router.push({
        path: '/viewActiveDesc'
      })
    },
    toAdd (e) {
      // console.log(e)
      const target = e.target || e.srcElement
      if (target.innerHTML.trim() === '修改') {
        // 将this.manData保存到session中
        sessionStorage.setItem('manData',JSON.stringify(this.manData))
        this.$router.push({
          path: '/editCanMan',
          query:{
            manData: this.manData
          }
        })
        return
      }
      this.$router.push({
        path: '/sellManSelect'
      })
    },
    toSelect (e) {
      if(this.$route.query.user === 'market'){
        return 
      }
      const $dom = e.target || e.srcElement
      // $dom.parentNode || 
      const $li = $dom.nodeName === 'P' ? $dom.parentNode.parentNode : $dom
      this.$setStore('managerName', $li.dataset.index)
      this.$setStore('manId', $li.dataset.id)
      if (this.$route.query.user === 'manager') {return}
      let type = this.$route.query.type || 'addEdit'
      // 新增指标返回
      if (this.$route.query.user === 'addManager') {type=this.$route.query.user}
      this.$router.push({
        path: '/addTargetMan',
        query: {type}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sell-man{
  height: 100%;
}
</style>