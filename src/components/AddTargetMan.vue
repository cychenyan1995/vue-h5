<template>
  <div class="add-target-man add-market-color">
    <v-header class="bot-border" :title="title"/>
    <ul class="div-wrap form-wrap">
      <li class="form-box select-icon bot-line" :class="{'man-select': formData.username}">
        <label class="display-inline-block">区域负责人</label>
        <input v-model="formData.username" @click="toSelect" readonly class="display-inline-block" type="text" placeholder="0"/>
        <span v-show="formData.username" class="ignore">{{txt}}</span>
      </li>
      <li class="form-box end-unit">
        <label class="display-inline-block">可分配人员</label>
        <input v-model.number="formData.indicatorNumber" pattern="\d*" onkeyup="if(this.value.length===1){this.value=this.value.replace(/[^1-9]/g,'')}"  oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
        <span>人</span>
      </li>
    </ul>
    <div class="footer back-color footer-fixed">
      <p class="div-wrap footer-main">
        <span @click="cancel" class="border-right">取消</span>
        <span @click="save">确定</span>
      </p>
      <!-- <p @click="save" class="div-wrap">保存</p> -->
    </div>
    <div v-show="type === 'edit' || type === 'addEdit'" @click="del" class="del-btn">
      <span class="s-icon">
      </span>
    </div>
    <mt-popup position="bottom" v-model="show">
      <ul class="del-main">
        <li @click="deleteTarget">
          删除指标信息
        </li>
        <li @click="show=false">取消</li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import axios from 'axios'
import { marketActive } from '../utils/api.js'

export default {
  name: "AddTargetMan",
  data () {
    return {
      manage: '某某某',
      show: false,
      formData: {
        username: '',
        userId: '', //id
        indicatorNumber: null,
        userIdAssign: ''
      },
      // 选择的指标序号
      targetIndex: null,
    }
  },
  mounted () {
    this.formData.userId = this.$getStore('manId')
    this.formData.username = this.$getStore('managerName')
    if (this.type === 'edit' || this.type === 'addEdit') {
      const editData = JSON.parse(this.$getStore('managerEdit'))
      this.formData.username = editData.username
      this.formData.indicatorNumber = editData.indicatorNumber
      this.targetIndex = this.$getStore('targetIndex')
    }
    if( this.type === 'addManager'){
      // .............
      this.$root.$data.backTosellman = true
    }else if(this.$root.$data.addEdit !== 'add'){
      this.$root.$data.addEdit = 'targetEditTmp'
    }
  },
  methods: {
    del () {
      this.show = true

    },
    toSelect () {
      this.$router.push({
        path: '/sellManUpdate',
        query: {user: 'addManager', type: this.type}// 选择区域总
      })
    },
    cancel () {
      // this.$root.$data.addEdit === 'targetAdd' 新建添加指标取消
      if(this.$root.$data.addEdit === 'add' || this.$root.$data.addEdit === 'targetAdd'){
        this.$router.push({
          path: '/targetInfo'
        })
        return 
      }
      // if(this.$route.query.type === 'addEdit'){
      //   this.$router.push({
      //     path: '/sellManUpdate?user=market'
      //   })
      //   return 
      // }
      // .................................................
      // this.$root.$data.targetInfo = []
      this.$router.push({
        path: '/targetInfo',
        query: {type: 'edit', flag: 'editTargetMan'}
      })
    },
    save () {
      // 分配人数不能超过100
      if(this.formData.indicatorNumber > 100) {
        this.$notice('分配人数不能超过100')
        return
      }
      this.formData.marketingActiveId = this.$getStore('marketId') || '1'
      this.formData.userIdAssign = JSON.parse(this.$getStore('userInfo')).id
      this.formData.indicatorNumber ? '' : this.formData.indicatorNumber = 0
      let targetInfoList = this.$root.$data.targetInfo
      // 编辑的情况下  不push 直接修改指标数
      if(this.type === 'edit' || this.type === 'addEdit'){
        targetInfoList.forEach(item => {
          if(item.username === this.formData.username){
            item.indicatorNumber = this.formData.indicatorNumber
          }
        })
      }else{
        targetInfoList.push(this.formData)
      }
      this.$router.push({
        path: '/targetInfo',
        query: {
          type: this.type,
          flag: 'editTargetMan'
        }
      })
      // axios.post(marketActive.targetInfo, [this.formData]).then(res => {
      //   if (res.data.code === 200) {
      //     this.$notice(res.data.message)
      //     this.$router.push({
      //       path: '/targetInfo',
      //       query: {}
      //     })
      //   } else {
      //     this.$notice(res.data.message)
      //   }
      // })
    },
    deleteTarget () {
      if(this.targetIndex){
        this.$root.$data.targetInfo.splice(this.targetIndex, 1)
      }
      this.$router.push({
        path: '/targetInfo',
        query: {
          type: 'addEdit',
          flag: 'editTargetMan'
        }
      })
    },
    // 校验指标数  正整数
    numberControl (e) {
      let value = e.target.value
      // console.log(e)
      if(value.length === 1) {
        this.formData.indicatorNumber = value.replace(/[^1-9]/g,'')
        // this.$set(this.formData, 'indicatorNumber',value)
        // this.formData.indicatorNumber = value
        // this.$nextTick(() => {
        //   this.formData.indicatorNumber = null
        // })
      }else{
        if( value.length > 10 ) {
          this.formData.indicatorNumber = value.slice(0,10)
        }
        this.formData.indicatorNumber=value.replace(/\D/g,'')
      }
      
    }
  },
  computed: {
    txt () {
      const txt = this.formData.username
      if (txt) {
        if (txt.length > 2) {
          return txt.substring(1)
        } else {
          return txt
        }
      }
      return ''
    },
    type () {
      return this.$route.query.type
    },
    title () {
      if (this.$root.$data.addEdit === 'add') {
        return '分配指标人数'
      }
      return (this.type === 'edit' || this.type === 'addEdit') ? '修改指标信息' : '添加指标信息'
    }
  }
}
</script>
<style lang="scss" scoped>
.add-target-man{
  height: 100%;
  .del-main{
    background: rgba(0,0,0,.5);
    li{
      font-size: 32px;
      line-height: 102px;
      height: 102px;
      background: #fff;
      color: #FF5846;
      &:last-child{
        margin-top: 16px;
        color: #555555;
      }
    }
  }
  .del-btn{
    position: absolute;
    top: 41px;
    right: 27px;
    z-index: 2;
    span{
      display: inline-block;
      transform: translateY(-16px);
      background: url('../assets/img/guidebackcopy.svg') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>