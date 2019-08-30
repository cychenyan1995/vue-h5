<template>
  <div class="target-info padding-bot add-market-color">
    <v-header class="bot-border" :title="title" />
    <ul class="form-wrap">
      <!-- <li class="form-box-first div-wrap bot-border"><h3>指标信息</h3></li> -->
      <li v-for="(item, index) in data" :key="index" :data-index="index" @touchstart="touchStart" @touchend="touchEnd" class="info-item info-add">
        <div class="item-left">
          <p>{{avatarName(item.username)}}</p>
        </div>
        <div class="item-center">
          <p>{{item.username}}</p>
          <p>可分配人员：{{item.indicatorNumber}}名</p>
        </div>
         <!--  @click="deleteItem(index)" -->
        <div class="item-right border-left">
          删除
        </div>
      </li>
      <li @click="selectMan('addManager')" class="form-box li-add div-wrap select-icon">
        <p>+</p>
        <p>添加指标信息</p>
      </li>
    </ul>
    <div class="footer footer-fixed back-color">
      <p class="div-wrap footer-main">
        <span @click="backStep" class="border-right">返回</span>
        <span @click="finish">{{query.type==='edit'?'保存':'完成创建'}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import axios from '../utils/interceptor.js'
import { marketActive, appoint } from '../utils/api.js'

export default {
  name: "TargetInfo",
  data () {
    return {
      startX: null,
      startY: null,
      formData: {
        // marketingActiveId: ''
      },
      data:[],
      addTarget: false
    }
  },
  created () {
    if (this.query.type === 'edit' || this.query.type === 'addEdit') {
      if(this.query.flag === 'editTargetMan'){
        this.data = this.$root.$data.targetInfo
        return 
      }
      let params = {
        marketingActiveId : this.$getStore('marketId')
      }
      this.$axios.get(marketActive.targetList, {params}).then(res => {
        if (res.data.code !== 200) {
          this.$notice('查询失败')
          return
        }
        this.data = res.data.data
        // ,,,,,,,,,,,,,
        this.$root.$data.targetInfo = this.data
        // this.addTarget = this.$route.query.addTarget
      })
    }else {
      if(this.$root.$data.targetInfo.length > 0 ){
        this.data = this.$root.$data.targetInfo
        if(this.$root.$data.addEdit !== 'add'){
          this.$root.$data.addEditTmp = 'targetEditTmp'
        }
      }else{
        if(this.$root.$data.addEdit !== 'add'){
          this.$root.$data.addEditTmp = 'tEditTmp'
        }
      }
      // this.addTarget ? this.$root.$data.addEdit = 'targetEdit' : ''
    }
    this.formData.marketingActiveBasic = {...this.$root.$data.costData}
    // assistanceUser这个字段不用传
    let activeData = this.$root.$data.activeData
    Object.keys(activeData).forEach((index) => {
      if(index != 'assistanceUser'){
        this.formData.marketingActiveBasic[index] = activeData[index]
      }
    })
  },
  methods: {
    touchStart (e) {
      // console.log(e)
      e.preventDefault()
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
    },
    touchEnd (e) {
      e.preventDefault()
      let endX = e.changedTouches[0].pageX - this.startX
      let endY = e.changedTouches[0].pageY - this.startY
      const $dom = e.tagret || e.srcElement
      const $item = $dom.nodeName === 'P' ? $dom.parentNode.parentNode : $dom
      if (endX >= 0 && endX <= 8) { // 删除
      }
      if (endX >= 0 && endX <= 8) { 
        // 删除
        if ($dom.className.includes('item-right')) {
          // console.log($dom.parentNode.dataset)
          // 如果该指标已经分配了销售人员  则不可删除
          const { index } = $dom.parentNode.dataset
          const detail = this.data[index]
          let params = {
            userIdAssign: detail.userId,
            marketingActiveId: this.$getStore('marketId')
          }
          this.$axios.post(appoint.getList, params).then(res => {
            if(res.data.code != 200){
              this.$notice(res.data.message)
              return
            }
            if(res.data.data.length > 0){
              this.$notice('已经分配了销售人员，不能删除！')
            }else{
              this.del(index)
            }
          })
          return
        }
        // 编辑操作
        this.$router.push({
          path: '/addTargetMan',
          // query: {type: this.query.type || 'addEdit'}
          query: {type: 'addEdit'}
        })
        this.$root.$data.addEdit = 'edit'
        this.$setStore('managerEdit', JSON.stringify(this.data[$item.dataset.index]))
        this.$setStore('targetIndex', $item.dataset.index)
        return
      }
      if (Math.abs(endX) > Math.abs(endY)) {
        if (endX < -20) {
          // 左滑删除时，先将其他左滑的恢复原状态
          let allTargetDom = document.querySelectorAll('.info-add')
          allTargetDom.forEach((v, k) => {
            v.className = 'info-item info-add'
          })
          $item.className = 'left-move info-item info-add'
        }
        if (endX > 20) {
          $item.className = 'info-item info-add'
        }
      }
    },
    backStep () {
      let path = ''
      if (this.query.type === 'edit' || this.query.type === 'addManager') {
        path = '/viewActiveDesc'
      }
      this.$messageBox.confirm('现在退出，将丢失已编辑的内容<br>确认退出？').then(val => {
        if (val) {
          this.$router.push({
            path: path || '/addCostDesc',
            qeury: {}
          })
        }
      })
      // 指标信息清空
      this.$root.$data.targetInfo = []
    },
    finish () {
      // ...........
      // if(this.$root.$data.addEdit === 'targetEdit'){
      //   // 单单新增指标接口
      //   let tMarketingActiveUsers	= this.data
      //   this.$axios.post(marketActive.targetInfo, tMarketingActiveUsers).then(res => {
      //     if(res.data.code !== 200) {
      //       this.$notice(res.data.message)
      //       return 
      //     }
      //     this.$root.$data.addEdit = ''
      //     this.$router.push({
      //       path: '/viewActiveDesc'
      //     })
      //   })
      // }else 
      //  ||this.$root.$data.addEdit === 'targetEditTmp'
      if(this.$root.$data.addEdit === 'targetEdit' || this.$root.$data.addEdit === 'targetEditTmp'){
        // 编辑指标信息
        let tMarketingActiveUsers	= this.data
        let params = {
          marketingActiveId : this.$getStore('marketId'),
          tMarketingActiveUsers
        }
        this.$axios.post(marketActive.targetEdit, params).then(res => {
          if(res.data.code !== 200) {
            this.$notice(res.data.message)
            return 
          }
          this.$root.$data.addEdit = ''
          this.$root.$data.targetInfo = []
          this.$router.push({
            path: '/viewActiveDesc'
          })
        })
      }else{
        // 新增市场活动的接口
        this.formData.marketingActiveBasic.createrId = JSON.parse(this.$getStore('userInfo')).id  
        let marketingActiveBasicTemmp = {}
        let marketingActiveInfoDto = {
          marketingActiveBasic: this.formData.marketingActiveBasic,
          marketingActiveTargets: this.data,
        }
        // this.formData.marketingActiveTargets = this.data//{params: {}}
        this.$axios.post(marketActive.add, marketingActiveInfoDto).then(res => {
          if (res.data.code === 200) {
            this.$notice(res.data.message)
            this.$router.push({
              path: '/'
            })
            // this.$setStore('marketId', res.data.data.marketingActiveId)
            this.$root.$data.targetInfo = []
          } else {
            this.$notice(res.data.message)
          }
        })
        this.$root.activeData = {}
        this.$root.costData = {}
      }
    },
    selectMan (user = null) {
      // this.$root.$data.addEdit = 'add'
      this.$router.push({
        path: '/sellManUpdate',
        query: {user, type: this.query.type}
      })
    },
    edit () {
    },
    // 删除
    del (index) {
      MessageBox.confirm('确定执行此操作?').then(action => {
        if(action){
          this.data.splice(index, 1)
        }
      })
    },
    avatarName (name) {
      if(typeof name === 'string'){
        if(name.length > 2){
          return name.substring(1)
        }
        return name
      }
    },
    // // 删除
    // deleteItem (index) {
    //   this.data.splice(index, 1)
    // }
  },
  computed: {
    query () {
      return this.$route.query
    },
    title () {
      // this.query.type === 'edit' || this.query.type === 'addEdit' || this.query.type === 'addManager'
      return  this.$root.$data.addEdit === 'targetEdit' || this.$root.$data.addEdit === 'targetEditTmp' ? '编辑指标信息' : '新增指标信息'
    }
  }
}
</script>
<style lang="scss">
  .target-info{
    height: 100%;
    overflow-x: hidden;
    li{
      position: relative;
      background: #fff;
      transition: all .2s;
    }
    .li-add{
      margin: 40px 0 24px ;
      p{
        display: inline-block;
        font-size: 60px;
        color: #9DA0A7;
        vertical-align: top;
        &:nth-child(2){
          margin-left: 16px;
          padding-top: 6px;
          font-size: 28px;
        }
      }
    }
    .info-add{
      width: calc(100% + 140px);
      height: 140px;
      border: none;
      // margin-bottom: 40px;
    }
    .item-right{
      width: 140px;
      height: 100%;
      background: #FF5846;
      color: #fff;
      font-size: 32px;
      line-height: 2;
      padding-left: 36px;
    }
  }
</style>