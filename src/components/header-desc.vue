<template>
<div class="header-desc" v-if="headerInfo.marketingActiveBasic">
  <p>活动时间：{{headerInfo.marketingActiveBasic.activeStartTime.replace(/-/g,'.')}}—{{headerInfo.marketingActiveBasic.activeEndTime.replace(/-/g,'.')}}</p>
  <h4>{{headerInfo.marketingActiveBasic.activeName}}</h4>
  <ul class="activi-detail">
    <li>{{activeStatus}}</li>
    <li>{{headerInfo.marketingActiveBasic.number}}人</li>
    <li>{{headerInfo.marketingCreater}}</li>
  </ul>
  <section class="address">
    <h4>
      <i>

      </i>
      {{headerInfo.marketingActiveBasic.activeCity}}
    </h4>
    <p>{{headerInfo.marketingActiveBasic.activeAddress}}</p>
  </section>
</div>
</template>
<script>
import { formatTime } from '../utils/util'
export default {
  name: "header-desc",
  props: {
    headerInfo: {
      type:Object,
      default:{marketingActiveBasic:null}
    }
  },
  data () {
    return {
    }
  },
  computed: {
    activeStatus () {
      let status = this.headerInfo.marketingActiveBasic.activeEffective
      return status === 0 ? '未开始' : status === 1 ? '进行中' : '已完成'
    }
  },
  created () {
    this.$formatTime = formatTime
  }
}
</script>
<style lang="scss" scoped>
.header-desc{
  width: 702px;
  height: 490px; // 453
  margin: 0 auto 32px;
  box-shadow:0px 4px 24px 0px rgba(50,112,184,0.12);
  border-radius:16px;
  padding: 48px 40px;
  text-align: left;
  ul{
    border-bottom: 1px solid #D8DCE0;
    padding-bottom: 41px;
  }
  .address{
    margin-top: 41px;
    h4{
      font-size: 28px;
      color: #555;
      margin-left: 17px;
    }
    i{
      display: inline-block;
      height: 30px;
      width: 26px;
      background: url('../assets/img/local.svg') no-repeat;
      background-size: 100% 100%;
      background-position: 3px 4px;
    }
    p{
      margin-top: 17px;
      margin-left: 39px;
      font-size: 24px;
      color: #C5C9D1;
    }
  }
  &>p{
    font-size:22px;
    color:rgba(197,201,209,1);
    margin-bottom: 24px;
  }
  &>h4{
    font-size:34px;
    color: #222;
    margin-bottom: 40px;
  }
  .activi-detail{
    li{
      display: inline-block;
      vertical-align: top;
      font-size: 24px;
      color: #555555;
      &:nth-child(1){
        color: #FFB600;
        padding-right: 16px;
      }
      &:nth-child(2){
        border-left: 1px solid #555555;
        border-right: 1px solid #555555;
        padding: 0 16px;
      }
      &:nth-child(3){
        padding-left: 16px;
      }
    }
  }
}
</style>