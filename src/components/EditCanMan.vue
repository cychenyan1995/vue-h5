<template>
  <div class="sell-man padding-bot" :class="{'add-market-color': title.indexOf('销售')<=-1}">
    <v-header :title="title">
    </v-header>
    <ul v-show="manData.length>0" class="div-wrap top-border form-wrap sell-man-main">
      <li :ref="'item'+i" @touchstart="touchStart" @touchend="touchEnd(v, $event)" v-for="(v,i) in manData" :key="i" :data-index="i" :class="{'bot-border': v!=3}">
        <h4>{{(v.username&&v.username.length>2)?v.username.slice(1):v.username}}</h4>
        <div>
          <p>{{v.username}}</p>
          <p>{{v.postion}}</p>
        </div>
        <p class="item-right border-left">
          删除
        </p>
      </li>
    </ul>
    <!-- 已分配满员 隐藏添加 -->
    <div v-show="isAddSale" @click="addMan" class="form-box div-add div-wrap select-icon"> 
      <p>+</p>
      <p>添加销售人员</p>
    </div>
    <no-data v-show="!manData.length>0" tips="还未分配销售人员"/>
    <!-- <p class="top-edit-btn" @click="save">
      保存
    </p> -->
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { marketActive } from '../utils/api.js'
export default {
  name: "CanSetMan",
  data () {
    return {
      manData: [],
      startX: null,
      startY: null
    }
  },
  mounted () {
    this.manData = JSON.parse(sessionStorage.getItem('manData'))
    // this.$set(this, "manData", this.manData)
  },
  // beforeUpdate () {
  //   this.$set(this, "manData", this.manData)
  // },
  // updated () {
  //   this.$set(this, "manData", this.manData)
  // },

  components: {
    noData: () => import('./NoData.vue')
  },
  computed: {
    title () {
      const type = this.$route.query.user || this.$route.query.type
      this.detail = JSON.parse(this.$getStore('targetDetail'))
      return type === 'addManager' && this.detail ? '选择区域负责人' : `${this.detail.username}（可分配${this.detail.indicatorNumber}人）`
    },
    // 是否满员
    isAddSale () {
      return this.manData && this.manData.length < this.detail.indicatorNumber
    }
  },
  methods: {
    touchStart (e) {
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
    },
    touchEnd (i, e) {
      e.preventDefault()
      let endX = e.changedTouches[0].pageX - this.startX
      let endY = e.changedTouches[0].pageY - this.startY
      const $dom = e.tagret || e.srcElement
      const $item = $dom.nodeName === 'P' ? $dom.parentNode.parentNode : $dom
      if (endX >= 0 && endX <= 8) { 
        // 删除
        if ($dom.className.includes('item-right')) {
          // console.log($dom.parentNode.dataset)
          this.del($dom.parentNode.dataset.index)
          return
        }
        return
      }
      // if (Math.abs(endX) > Math.abs(endY)) {
      //   if (endX < -20) {
      //     this.$refs[`item${i}`][0].className = 'left-move bot-border'
      //   }
      //   if (endX > 20) {
      //     this.$refs[`item${i}`][0].className = 'bot-border'
      //   }
      // }
      if (Math.abs(endX) > Math.abs(endY)) {
        if (endX < -20) {
          $item.className = 'left-move info-item info-add'
        }
        if (endX > 20) {
          $item.className = 'info-item info-add'
        }
      }
    },
    save () {
      // console.log(e)
    },
    // 删除
    del (index) {
      MessageBox.confirm('确定执行此操作?').then(action => {
        if(action){
          // 删除指标接口
          // 编辑 删除指标接口
          let params = {
            marketingActiveId: this.$getStore('marketId'),
            userId: this.manData[index].userId
          }
          this.$axios.post(marketActive.targetDelete, params).then(res => {
            if(res.data.code !== 200) {
              this.$notice(this.data.message)
              return 
            }
            // 刷新列表
            this.manData.splice(index, 1)
            sessionStorage.setItem('manData',JSON.stringify(this.manData))
            // console.log(this.manData)
            // this.$set(this, "manData", this.manData)
          })
        }
      })
    },
    addMan () {
      this.$router.push({
        path: '/sellManSelect',
        query: {
          selectedNum: this.manData.length,
          type: 'edit',
          manData: this.manData
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sell-man{
  height: 100%;
  .div-add{
    height: 96px;
    margin-top: 24px;
    border: none;
    p{
      display: inline-block;
      margin-right: 16px;
    }
  }
}
.item-right{
  width: 140px;
  height: 100%;
  background: #FF5846;
  color: #fff;
  font-size: 32px;
  // line-height: 140px;
  padding-left: 36px;
  line-height: 65px;
}
.sell-man-main{
  &>li{
    width: calc(100% + 140px);
  }
}
</style>