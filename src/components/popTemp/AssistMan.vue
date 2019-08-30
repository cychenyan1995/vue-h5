<template>
<div style="padding:0;" class="assist-man pop-padding-top">
  <Search class="search-top" @get-list="getVal" tip="输入姓名搜索"></Search>
  <div class="a-class class-box">
    <!-- <h3>A</h3> -->
    <ul v-if="aData.length" @click.stop="select" class="div-wrap m-bot">
      <li :data-index="v.userName" :data-id="v.id" v-for="(v, i) in aData" :key="i" class="info-item bot-line">
        <div class="item-left">
          <p>{{(v.userName&&v.userName.length>2)?v.userName.slice(1):v.userName||""}}</p>
        </div>
        <div class="item-center">
          <p>{{v.userName}}</p>
          <p>{{v.position}}</p>
        </div>
        <span class="s-icon">
          <span class="shade-el"></span>
          <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="choose" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M41.3909142,59.1140648 L67.3237923,31.4028594 C68.9627873,29.6514718 71.7529896,29.5224008 73.5558838,31.1145714 C75.3587782,32.7067419 75.4916449,35.4172313 73.8526501,37.168619 L44.4409994,68.597151 C42.6154586,70.5478767 39.42691,70.4501597 37.7315742,68.3915324 L25.966914,54.1058359 C24.4448189,52.2575729 24.7532944,49.5606088 26.6559132,48.0819984 C28.558532,46.6033879 31.3348112,46.9030505 32.8569062,48.7513137 L41.3909142,59.1140648 Z" id="Path-3" fill="#000000"></path>
            </g>
          </svg>
        </span>
      </li>
    </ul>
  </div>
  
  <div class="footer back-color footer-fixed">
    <p class="div-wrap footer-main">
      <span @click="cancel" class="border-right">取消</span>
      <span @click="save">确定</span>
    </p>
  </div>
</div>
</template>
<script>
import { assistMan, saleSearch } from '../../utils/api.js'
import axios from '../../utils/interceptor.js'

export default {
  name: "AssistMan",
  data () {
    return {
      aData: [{
        userName: '测试',
        position: '测试'
      }],
      obj: {
      }
    }
  },
  created () {
    // axios.get(assistMan).then(res => {
    //   this.aData = res.data.data
    // })
  },
  methods: {
    // 搜索
    getVal (val) {
      let params = {
        userNameCondition: val
      }
      // if(val !== ''){
        this.$axios.get(assistMan, {params}).then(res => {
        if(res.data.code !== 200){
          this.$notice(res.data.message)
          return
        }
        this.aData = res.data.data
        // 根据首字母排序
        this.aData.forEach(element => {
          
        });
      })  
      // }
    },
    save () {
      this.$emit('assist', this.obj)
    },
    cancel () {
      this.$emit('assist', '')
    },
    select (e) {
      const target = e.target || e.srcElement
      const dom = target.parentNode.parentNode
      if (target.nodeName === 'P' || target.nodeName === 'SPAN') {
        if (document.querySelector('.selected')) {
          document.querySelector('.selected').className = 's-icon'
          // return
        }
        this.obj = {key: 'assistanceUser'}
        dom.querySelector('.s-icon').className = 'selected s-icon'
        this.obj.val = dom.dataset.index
        this.obj.id = dom.dataset.id
        // this.$emit('assist', this.obj)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.class-box{
  height: calc(100% - 196px);
  overflow-y: auto;
}
.footer-fixed{
  position: relative !important;
}
.info-item{
  position: relative;
  border: none;
  height: 140px;
  .s-icon{
    position: absolute;
    right: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid #E6E6E6;
    border-radius: 50%;
    path{
      fill: #fff;
    }
  }
}
.m-bot{
  margin-bottom: 98px;
}
</style>