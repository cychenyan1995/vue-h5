<template>
<div class="sell-select">
  <Search class="search" @get-list="getList" tip="输入姓名搜索"/>
  <div class="a-class class-box padding-bot-bottom" v-for="(item, index) in saleManList" :key="index">
    <h3>{{index}}</h3>
    <ul class="div-wrap form-wrap">
      <li @click="selected(v, $event)" :data-index='k' v-for="(v, k) in item" :key="k" class="info-item bot-line">
        <div class="item-left">
          <p>{{avatarName(v.userName)}}</p>
          <!-- <p>XXX</p> -->
        </div>
        <div class="item-center">
          <p id="userName">{{v.userName}}</p>
          <p>{{v.position}}</p>
        </div>
        <p class="check-wrap">
          <span class="check-icon" :class="[{'unable-selected': v.targetSelected}]"></span>
        </p>
      </li>
    </ul>
  </div>
  <div class="footer footer-fixed div-wrap">
    <p class="selected-num" v-show="!fromContact">
      已选择{{manData && manData.length}}/{{totalNum}}名
    </p>
    <p class="footer-main">
      <span @click="back">取消</span>
      <span @click="save">确定</span>
    </p>
  </div>
</div>
</template>
<script>
import { targetDispatch, appoint, contact, saleSearch, contactAssign } from '../utils/api'
export default {
  name: "SellSelect",
  data () {
    return {
      arr: [],
      saleManList: [],
      totalNum: 0,
      selectedNum: 0,
      manData: [],
      manDataSavedLength: JSON.parse(sessionStorage.getItem('manData')) ? JSON.parse(sessionStorage.getItem('manData')).length : 0
    }
  },
  created () {
    const detail = JSON.parse(this.$getStore('targetDetail'))
    this.totalNum = detail && detail.indicatorNumber
    this.userInfo = JSON.parse(this.$getStore('userInfo'))
    let params = {
      
    }
    let url = targetDispatch
    // 名片的指派
    if(this.$route.query.type === 'contact') {
      sessionStorage.removeItem('manData')
      sessionStorage.removeItem('arr')
      params.roleCode = this.userInfo.roleCode
      params.userId = this.userInfo.id
      url = contactAssign
      this.totalNum = 1
      this.$axios.post(url, params).then(res => {
        if(res.data.code != 200){
          this.$notice(res.data.message)
          return
        }
        this.saleManList = res.data.data
        this.opsRes()
      })
    }else{
      params.userId = detail.userId
      this.$axios.get(url, {params}).then(res => {
        if(res.data.code != 200){
          this.$notice(res.data.message)
          return
        }
        this.saleManList = res.data.data
        this.opsRes()
      })
    }
    
    // 已经选择了几个销售 继续添加
    this.selectedNum = this.$route.query.selectedNum
    // this.arr = this.$route.query.manData
  },
  computed: {
      // 是否从名片指派跳转过来
      fromContact () {
        return this.$route.query.type === 'contact'
      }
  },
  methods: {
    // 得到结果后处理
    opsRes () {
      // 当是市场活动的分派时 
      // if(this.manData.length === 0){
        this.manData = JSON.parse(sessionStorage.getItem('manData')) || this.manData
      // }
      let saleManUserIdList = []
      // 在名片指派情况下  只能选择一个
      this.$nextTick(() => {
        let allCheck = document.querySelectorAll('.check-icon')
        if(this.manData.length>=this.totalNum){
          allCheck.forEach((v,k) => {
            // 将其他选项全部置灰
            if(!v.className.includes('unable-selected')){
              v.className = 'check-icon unable-select'
            }
            // 将arr中的
            this.arr = JSON.parse(sessionStorage.getItem('arr')) || this.arr
            this.arr.forEach((item, index) => {
              if(item.username === v.parentNode.parentNode.getElementsByTagName('p')[1].innerHTML){
                v.className = 'check-icon selected'
              }
            })
          })
        }
      })
      this.manData && this.saleManList && this.manData.forEach((item, index) => {
        Object.keys(this.saleManList).forEach((v, k) => {
          this.saleManList[v].forEach((el, i) => {
            if(item.userName === el.userName){
              this.saleManList[v][i].targetSelected = true
            }
          })
        })
      })
    },
    back () {
      let path = ''
      if(this.$route.query.type === 'contact'){
        path = '/viewContactDesc'
      }else{
        path ='/sellManUpdate?user=manager'
      }
      this.$messageBox.confirm('现在退出，将丢失已编辑的内容<br>确认退出?').then(val => {
        if (val) {
          this.$router.push({
            path
          })
        }
      })
    },
    // 搜索销售人员
    getList (val) {
      // console.log(val)
      const detail = JSON.parse(this.$getStore('targetDetail'))
      let params = {
        userNameCondition: val,
        userId: detail ? detail.userId : this.userInfo.id
      }
      if(this.$route.query.type === 'contact'){
        params.roleCode = this.userInfo.roleCode
      }
      // if(val !== ''){
      this.$axios.get(saleSearch, {params}).then(res => {
        if(res.data.code !== 200){
          this.$notice(res.data.message)
          return
        }
        this.saleManList = res.data.data
        // 得到所有的选择框
        // let allCheck = document.querySelectorAll('.check-icon')
        // allCheck.forEach((v,k) => {
        //   if(!v.className.includes('unable-selected')){
        //     v.className = 'check-icon'
        //   }
        // })
        // if(this.$route.query.type !== 'contact'){
        this.opsRes()
        // }
      })  
      // }
    },
    selected (item, e) {
      const type = this.$route.query.type
      const target = e.target || e.srcElement
      // 点击不可选时
      if(target.className.includes('unable-select') || target.className.includes('unable-selected')){
        return
      }
      // 得到所有的选择框
      let allCheck = document.querySelectorAll('.check-icon')
      const detail = JSON.parse(this.$getStore('targetDetail'))
      // 选择的信息
      let dispatchInfo = {
        username: item.userName,
        userId: item.id,
        userIdAssign: detail ? detail.userId : '',                    
        //  userIdAssign: this.userInfo.id 
        marketingActiveId: this.$getStore('marketId'),
        postion: item.position
      }
      if(type === 'contact'){
        dispatchInfo.userIdAssign = this.userInfo.id
      }
      if (target.className.includes('selected')) {
        target.className = 'check-icon'
        let i = this.arr.indexOf(dispatchInfo)
        this.arr.splice(i, 1)
        this.manData && this.manData.splice(i, 1)
        // 在名片指派情况下  只能选择一个
        // if(type === 'contact'){
          allCheck.forEach((v,k) => {
            if(!v.className.includes('selected')){
              v.className = 'check-icon'
            }
          })
        // }
        return
      }
      // 市场活动指标分派 选择人数不能大于总人数
      if(type !== 'contact'){
        if (this.manData && this.manData.length>=this.totalNum) {
          return
        }
      }
      if (target.nodeName === 'SPAN') {
        this.arr.push(dispatchInfo)
        this.manData && this.manData.push(dispatchInfo)
        target.className = 'check-icon selected'
        // 在名片指派情况下  只能选择一个
        if(type === 'contact' || this.manData.length>=this.totalNum){
          allCheck.forEach((v,k) => {
            // 将其他选项全部置灰
            if(!v.className.includes('selected')){
              v.className = 'check-icon unable-select'
            }
          })
        }
        
      }
      this.$root.$data.sellName = target.innerHTML
      // console.log(this.arr)
    },
    save () {
      if(this.$route.query.type !== 'contact' && this.manDataSavedLength + this.arr.length > this.totalNum){
        this.$notice('已经达到最大分配人数')
        return
      }
      const {type, contactId} = this.$route.query
      const totalIndexNum = this.$getStore('totalIndexNum')
      let params = {
        tMarketingActiveUserList: this.arr,
        totalNumner: totalIndexNum
      }
      let url = ''
      // 跳转路径
      let path = '/sellManUpdate?user=manager'
      if(type === 'edit') {
        url = appoint.update
      }else if(type === 'contact'){
        // 名片的指派
        url = contact.assign
        params = this.arr[0]
        params.contactId = contactId
        path = '/viewContactDesc'
      }else {
        url = appoint.add
      }
      this.$axios.post(url, params).then(res => {
        if(res.data.code != 200) {
          this.$notice(res.data.message)
          return
        }
        sessionStorage.setItem('manData', JSON.stringify(this.manData))
        sessionStorage.setItem('arr', JSON.stringify(this.arr))
        this.$router.push({
          path
        })
      })
    },
    avatarName (name) {
      if(typeof name === 'string'){
        if(name.length > 2){
          return name.substring(1)
        }
        return name
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .selected-num{
    position: absolute;
    left: 40px;
    top: 35px;
    color: #222222;
    font-size: 28px;
  }
  .sell-select{
    padding-top: 12px !important;
    .class-box{
      ul{
        padding-bottom: 10px;
      }
    }
    .search{
      height: 68px;
    }
    .info-item{
      position: relative;
      border: none;
      height: 140px;
    }
  }
 
 .check-icon{
  &::before {
    position: absolute;
    content: "";
    width: 135px;
    height: 135px;
    opacity: 0;
    top: -52px;
    right: -52px;
  }
 }
 .padding-bot-bottom{
   padding-bottom: 0px;
  //  overflow-y: scroll;
 }
</style>