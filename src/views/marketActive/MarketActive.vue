<template>
  <div class="market-active common-class">
    <!-- <v-header title="法大大市场营销" /> -->
    <s-page @data-s="dataS" v-show="!sShow" ref="sPage"></s-page>
    <header v-show="sShow">
      <div class="search-box">
        <input @focus="searchPage" placeholder="输入活动名称搜索" type="text" />
      </div>
      <span class="s-icon ignore">
        <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M76.0871908,70.7838899 L98.6516504,93.3483496 C100.116117,94.8128157 100.116117,97.1871843 98.6516504,98.6516504 C97.1871843,100.116117 94.8128157,100.116117 93.3483496,98.6516504 L70.7838899,76.0871908 C63.4016421,82.2745965 53.8858783,86 43.5,86 C20.0278981,86 1,66.9721019 1,43.5 C1,20.0278981 20.0278981,1 43.5,1 C66.9721019,1 86,20.0278981 86,43.5 C86,53.8858783 82.2745965,63.4016421 76.0871908,70.7838899 Z M43.5,78.5 C62.8299662,78.5 78.5,62.8299662 78.5,43.5 C78.5,24.1700338 62.8299662,8.5 43.5,8.5 C24.1700338,8.5 8.5,24.1700338 8.5,43.5 C8.5,62.8299662 24.1700338,78.5 43.5,78.5 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"></path>
          </g>
        </svg>
      </span>
    </header>
    <ul v-show="sShow" class="search-type-bar div-wrap">
      <li :ref="'item'+i" :class="{'on-type': i==0?true: ''}" @click="typeFilter(i)" v-for="(v, i) in searchType" :key="v">
        <i class="under-line"></i>
        {{v}}
      </li>
    </ul>
    <div @scroll="onScroll" v-show="sShow" class="market-active-main padding-bot common-class-main">
      <ul>
        <li v-for="(v, i) in aData" :key="i" class="-item" @click="viewDesc(v)">
          <h4>
            <svg-label :isShow="v.owner === 1" :class="activeStatus(v,'svgClass')"/>
            {{v.activeName}}
          </h4>
          <span :class="activeStatus(v,'statusClass')">{{activeStatus(v, 'status')}}
            <i class="left-arrow">
              <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
                  <title>guideback</title>
                  <desc>Created with Sketch.</desc>
                  <g id="guideback" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path d="M10.3759354,49.9273655 L55.0790424,92.2776774 C56.5825397,93.7020432 56.6466884,96.0755452 55.2223226,97.5790424 C53.7979568,99.0825397 51.4244548,99.1466884 49.9209576,97.7223226 L2.42095757,52.7223226 C0.888652957,51.2706656 0.855823946,48.8408752 2.34834957,47.3483496 L47.3483496,2.34834957 C48.8128157,0.883883476 51.1871843,0.883883476 52.6516504,2.34834957 C54.1161165,3.81281566 54.1161165,6.18718434 52.6516504,7.65165043 L10.3759354,49.9273655 Z" id="Path" fill="#000000" fill-rule="nonzero"></path>
                  </g>
              </svg>
            </i></span>
          <p>
            <span>{{userText}}：{{v.recoveryIndex}}</span>
          </p>
          <p>
            <span >主办方：{{v.activeHost}}</span>
          </p>
          <p>活动时间：{{v.activeStartTime.replace(/-/g,'.')}}-{{v.activeEndTime.replace(/-/g,'.')}}</p>
          <!-- <p>活动时间：{{$formatTime(v.activeStartTime,2)}}——{{$formatTime(v.activeEndTime,2)}}</p> -->
        </li>
      </ul>
    </div>
    <div v-show="!done" class="loading-box">
      <p>
        <span class="s-icon">
          <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="loading" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M50,0 C52.6723456,0 54.8387097,2.16636411 54.8387097,4.83870968 C54.8387097,7.51105524 52.6723456,9.67741935 50,9.67741935 C27.7304536,9.67741935 9.67741935,27.7304536 9.67741935,50 C9.67741935,72.2695464 27.7304536,90.3225806 50,90.3225806 C72.2695464,90.3225806 90.3225806,72.2695464 90.3225806,50 C90.3225806,47.3276544 92.4889448,45.1612903 95.1612903,45.1612903 C97.8336359,45.1612903 100,47.3276544 100,50 C100,77.6142375 77.6142375,100 50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,0 50,0 Z" id="Path" fill="#4298F9" fill-rule="nonzero"></path>
            </g>
          </svg>
        </span>
        正在加载中···
      </p>
    </div>
    <div v-show="noData" class="no-data-box">
      <section></section>
      <p>{{tips}}</p>
    </div>
    <div v-show="$getStore('userType')=='market'" @click="add" class="add-activi">
      <i></i>
    </div>
  </div>
</template>
<script>
import { scroll, formatTime } from '../../utils/util.js'
import { marketActive } from '../../utils/api'

export default {
  name: "MarketActive",
  data () {
    return {
      sShow: true,
      noData: false,
      searchType: ['全部活动', '未开始的', '进行中的', '已结束的'],
      aData: [],
      formData: {
        pageNum: 1,
        pageSize: 20,
        userId: '',
        roleCode: ''
      },
      done: true,
      // 当前对应的活动状态接口
      url: marketActive.getList,
      // 当前显示活动列表的状态
      status: '0'
    }
  },
  mounted () {
    this.$nextTick(function () {
    })
    this.$root.$data.addEdit = ''
  },
  components: {
    svgLabel: () => import('../marketActive/svg-icon'),
    sPage: () => import('../search-page.vue')
  },
  created () {
    this.$formatTime = formatTime
    // 电销人员没有市场活动选项
    const userType = this.$getStore('userType')
    if(userType === 'telSell' || userType === 'telManager'){
      this.$router.push({
        path: '/contact'
      })
      return 
    }
    this.getData()
  },
  computed: {
    userText () {
      const userType = this.$getStore('userType')
      if (userType === 'market' || userType === 'manager') {
        return '总指标数'
      }
      return '我的指标'
    },
    tips () {
      const userType = this.$getStore('userType')
      if (userType === 'market') {
        return '没有活动，点击右下角的按钮新建'
      } else {
        return '你还没有活动哦'
      }
    }
  },
  methods: {
    getData () {
      this.formData.roleCode = JSON.parse(this.$getStore('userInfo')).roleCode
      this.formData.userId = JSON.parse(this.$getStore('userInfo')).id
      this.$axios.post(this.url, this.formData).then(res => {
        if (res.data.code !== 200) {
          this.$notice(res.data.message)
          return
        }
        // 当返回值为空时 会报错
        if(res.data.data.marketingActiveBasic && res.data.data.marketingActiveBasic.length > 0){
          this.aData = [].concat(res.data.data.marketingActiveBasic)

          // 没有活动的图标
          this.noData = false
          this.formData.pageNum++
        }else{
          this.noData = true
          // this.sShow = false
        }
      })
    },
    searchPage () {
      this.sShow = false
      document.querySelector('.search-box input').blur()
      this.$refs.sPage.tip = '输入活动名称搜索'
      this.$nextTick(function () {
        document.querySelector('#searchInput').focus()
      })
      document.querySelector('.search-page .search-bar svg').style.display = 'none'
    },
    dataS (val) {
      // val为true时,表示取消
      if (typeof val === 'boolean') {
        this.sShow = val
        this.formData.pageNum = 1
        this.getData()
        return
      }
      // 搜索数据  实时
      // console.log('search keyword:'+val)
      if(val != ''){
        document.querySelector('.common-class-main').style.display='block'
        let params = {
          marketingActiveNameCondition: val,
          userId: JSON.parse(this.$getStore('userInfo')).id,
          roleCode: JSON.parse(this.$getStore('userInfo')).roleCode,
          state: this.status
        }
        this.$axios.post(marketActive.marketSearch, params).then(res => {
          if(res.data.code !== 200){
            this.$notice(res.data.message)
            return 
          }
          this.aData = res.data.data
          // console.log(this.aData)
        })
      }
    },
    // ['全部活动', '未开始的', '进行中的', '已结束的'] 活动状态的切换
    typeFilter (i) {
      const ref = this.$refs
      let index = 0
      let url = ''
      // 保存当前状态
      this.status = i
      while (index < 4) {
        ref[`item${index}`][0].className = ''
        index++
      }
      switch (i) {
        case 0 : this.aData = []; ref.item0[0].className = 'on-type'; this.url = marketActive.getList; break
        case 1 : this.aData = []; ref.item1[0].className = 'on-type';  this.url = marketActive.getNotStartList; break
        case 2 : this.aData = []; ref.item2[0].className = 'on-type';  this.url = marketActive.getonMarketList; break
        case 3 : this.aData = []; ref.item3[0].className = 'on-type';  this.url = marketActive.getendList; break
        default : this.noData = false
      }
      // 获取数据接口
      this.formData.pageNum = 1
      this.getData()
    },
    onScroll (e) {
      // 如果长度小于20条  就不需要加载
      if(this.aData.length < 20) {
        return
      }
      if (this.done) {
        scroll(e, () => {
          // 显示  正在加载...
          this.done = false
          // this.$axios.post(marketActive.getList, this.formData).then(res => {
          this.$axios.post(this.url, this.formData).then(res => {
            if (res.data.code === 200) {
              this.formData.pageNum++
              this.aData = this.aData.concat(res.data.data.marketingActiveBasic)
            }
          })
          //正在加载... 显示时间延长
          setTimeout(() => {
              this.done = true
          }, 1000)
        })
      }
    
      // const $div = e.target || e.srcElement
      // const distance = $div.scrollHeight - ($div.scrollTop + $div.clientHeight)
      // console.log(distance)
    },
    add () {
      this.$root.$data.addEdit = 'add'
      this.$root.$data.targetInfo = []
      this.$router.push({
        path: '/addMarketActive',
        query: {}
      })
    },
    viewDesc (activeDetail) {
      // // 保存marketingActiveId
      this.$setStore('marketId', activeDetail.marketingActiveId)
      this.$router.push({
        path: '/viewActiveDesc',
        query: {
        }
      })
    },
    // 活动状态的判断  0未开始  1进行中  2 已完成
    // 区域总活动的标识样式  活动状态的样式
    activeStatus (v, type) {
      let status = v.activeEffective
      switch (type) {
        case 'status' : status = status === 0 ? '未开始' : status === 1 ? '进行中' : '已完成'; break
        case 'statusClass' : status = status === 0 ? 'active-state' : status === 1 ? 'active-state active-state-ing' : 'active-state active-state-end'; break
        case 'svgClass' : status = status === 0 ? 'a-not' : status === 1 ? 'a-ing' : 'a-end'; break
      }
      return status
    }
  }
}
</script>
<style lang="scss" scoped>
  span.ignore{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    transform: translate(-64px, 2px);
    svg{
      height: 110%;
      width: 85%;
      path{
            fill: #D8DCE0;
          }
    }
    
  }
  .common-class-main{
    padding-bottom: 158px;
    li:last-child{
      border: none;
    }
  }
  .search-type-bar{
    height: 72px;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #D8DCE0;
    li{
      position: relative;
      flex: 1;
      font-size:28px;
      line-height: 32px;
      font-weight:500;
      padding: 10px 0;
      color: #9DA0A7;
    }
    .on-type{
      color: #4298F9;
      .under-line{
        position: absolute;
        bottom: -10px;
        left: 50%;
        margin-left: -20px;
        width:40px;
        height:4px;
        background:rgba(66,152,249,1);
        border-radius:2px;
      }
    }
  }
  .market-active{
    .add-activi{
      position: absolute;
      display: flex;
      right: 32px;
      bottom: 162px;
      width:102px;
      height:102px;
      background:linear-gradient(146deg,rgba(67,174,250,1) 0%,rgba(66,152,249,1) 100%);
      box-shadow:0px 6px 24px 0px rgba(66,152,249,0.4);
      border-radius: 100%;
      justify-content: center;
      align-items: center;
      i{
        flex: 1;
        background: url('../../assets/img/add.svg') no-repeat;
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
      }
    }
  }
  .common-class-main li h4{
    margin-right: 168px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>