<template>
  <div class="cost-desc padding-bot add-market-color">
    <v-header class="bot-border" :title="title">
     <i @click="back" class="icon-arrow-left">
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
    <ul class="form-wrap">
      <!-- <li class="form-box-first"><h3>成本信息</h3></li> -->
      <li class="form-box bot-line">
        <label class="display-inline-block">赞助费用</label>
        <input v-model="formData.sponsorFee" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box bot-line">
        <label class="display-inline-block">场地费用</label>
        <input v-model="formData.fieldFee" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box bot-line">
        <label class="display-inline-block">搭建费用</label>
        <input v-model="formData.buildFee" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box bot-line">
        <label class="display-inline-block">物美音响</label>
        <input v-model="formData.danceMusicFee" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box bot-line">
        <label class="display-inline-block">物料制作费</label>
        <input v-model="formData.materialFee" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box bot-line">
        <label class="display-inline-block">礼品费用</label>
        <input v-model="formData.giftFee" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box bot-line">
        <label class="display-inline-block">嘉宾费用</label>
        <input v-model="formData.guestFee" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box li-8">
        <label class="display-inline-block">门票费用</label>
        <input v-model="formData.admissionTicket" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box bot-line">
        <label class="display-inline-block">运输交通费</label>
        <input v-model="formData.transportFee" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box bot-line">
        <label class="display-inline-block">差旅费用</label>
        <input v-model="formData.travelExpenses" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li class="form-box bot-line">
        <label class="display-inline-block">其他费用</label>
        <input v-model="formData.otherFee" pattern="\d*" oninput="if(this.value.length>10) this.value = this.value.slice(0,10)" class="display-inline-block" type="number" placeholder="0"/>
      </li>
      <li style="border-bottom:none;" class="form-box li-final-box">
        <!-- <label class="display-inline-block">其他费用说明</label> -->
        <textarea rows="3" v-model="formData.otherfeeRemark" maxlength="50" class="display-inline-block" placeholder="输入其他费用说明（50字）"></textarea>
      </li>
      <li class="form-box li-final-box">
        <!-- <label class="display-inline-block">备注</label> -->
        <textarea v-model="formData.remark" maxlength="200" rows="3" class="display-inline-block" placeholder="输入备注（200字）"></textarea>
      </li>
    </ul>
    <div class="footer back-color footer-fixed">
      <p class="div-wrap footer-main">
        <span @click="backStep" class="border-right">返回</span>
        <span @click="nextStep">{{$route.query.type === 'edit'?'保存':'下一步'}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import { marketActive } from '../utils/api.js'
import axios from '../utils/interceptor.js'

export default {
  name: "AddCostDesc",
  data () {
    return {
      formData: {
        sponsorFee: null,
        materialFee: null,
        admissionTicket: null,
        travelExpenses: null,
        fieldFee: null,
        buildFee: null,
        danceMusicFee: null,
        guestFee: null,
        transportFee: null,
        giftFee: null,
        otherFee: null,
        otherfeeRemark: '',
        remark: ''
      }
    }
  },
  mounted () {
    // this.formData.sup = Number(this.formData.sup).toLocaleString()
    Object.keys(this.formData).forEach(k => {
      this.formData[k] = this.$root.costData[k]
    })
    if(this.$route.query.type === 'edit') {
      this.formData = {...this.$route.query.detailData.marketingActiveBasic}
    }

  },
  methods: {
    back () {
      if (this.$route.query.type === 'edit') {
        this.$router.push({
          path: '/viewActiveDesc'
      })
      return 
      }
      this.$router.push({
        path: '/addMarketActive'
      })
      this.$root.costData = {...this.formData}
    },
    save () {
    },
    nextStep () {
      if (this.$route.query.type === 'edit') {
        // 保存修改的成本信息
        this.$axios.post(marketActive.marketbasicEdit, this.formData).then(res => {
          if(res.data.code != 200) {
            this.$notice(res.data.message)
            return
          }
          // 跳转到详情页面
          this.$notice('修改成功')
          this.$router.push({
            path: '/viewActiveDesc'
          })
        })
        return
      }
      Object.keys(this.formData).forEach(k => {
        if (k !== 'otherfeeRemark' || k !== 'remark') {
          if (!this.formData[k]) {
            this.formData[k] = 0
          }
        }
      })
      this.$root.$data.costData = this.formData
      // const params = {...this.formData, ...this.$root.$data.activeData}
      this.$router.push({
        path: '/targetInfo',
        query: {
          // basicCostInfo: params
        }
      })
      // params.createrName = JSON.parse(this.$getStore('userInfo')).id
      // axios.post(marketActive.add, params).then(res => {
      //   if (res.data.code === 200) {
      //     this.$notice(res.data.message)
      //     this.$router.push({
      //       path: '/targetInfo',
      //       query: {marketingActiveId: res.data.data.marketingActiveId}
      //     })
      //     this.$setStore('marketId', res.data.data.marketingActiveId)
      //   } else {
      //     this.$notice(res.data.message)
      //   }
      // })
    },
    backStep () {
      let path = ''
      if (this.$route.query.type === 'edit') {
        path = '/viewActiveDesc'
      }
      this.$messageBox.confirm('现在退出，将丢失已编辑的内容<br>确认退出').then(val => {
        if (val) {
          this.$root.costData = {}
          this.$router.push({
            path: path || this.meta.pre
          })
        }
      })
      // 清空成本信息
      this.$root.costData = {}
    }
  },
  computed: {
    meta () {
      return this.$route.meta
    },
    title () {
      return this.$route.query.type ? '编辑成本信息' : '新增成本信息'
    }
  }
}
</script>
<style lang="scss" scoped>
  textarea::-webkit-input-placeholder{
    color:#C5C9D1;
  }
  .form-wrap{
    label{
      &::before{
        content: "元";
        position: absolute;
        top: 0;
        right: 5.2%;
        color: #222;
      }
    }
    li:last-child{
      height: 240px;
    }
    .li-8{
      margin-bottom: 24px;
    }
    .li-final-box{
      @extend .li-8;
    }
  }
</style>