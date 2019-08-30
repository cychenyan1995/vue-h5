<template>
  <div class="market-active common-class">
    <!-- <v-header title="法大大市场营销" /> -->
    <s-page @data-s="dataS" v-show="!sShow" ref="sPage"></s-page>
    <header v-show="sShow">
      <div class="search-box">
        <input @focus="searchPage" placeholder="输入公司名称搜索" type="text" />
      </div>
      <span class="s-icon ignore">
        <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M76.0871908,70.7838899 L98.6516504,93.3483496 C100.116117,94.8128157 100.116117,97.1871843 98.6516504,98.6516504 C97.1871843,100.116117 94.8128157,100.116117 93.3483496,98.6516504 L70.7838899,76.0871908 C63.4016421,82.2745965 53.8858783,86 43.5,86 C20.0278981,86 1,66.9721019 1,43.5 C1,20.0278981 20.0278981,1 43.5,1 C66.9721019,1 86,20.0278981 86,43.5 C86,53.8858783 82.2745965,63.4016421 76.0871908,70.7838899 Z M43.5,78.5 C62.8299662,78.5 78.5,62.8299662 78.5,43.5 C78.5,24.1700338 62.8299662,8.5 43.5,8.5 C24.1700338,8.5 8.5,24.1700338 8.5,43.5 C8.5,62.8299662 24.1700338,78.5 43.5,78.5 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"></path>
          </g>
        </svg>
      </span>
    </header>
    <ul v-show="sShow" class="select-box">
      <li>{{count}}个名片</li>
      <li @click="selectBox($refs.scene, $event)">{{text}}<i class="fa-icon-arrow-down">
        <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="fatdown" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M35.0592232,41.6666667 L64.9407768,41.6666667 C67.2419633,41.6666667 69.1074435,43.5321469 69.1074435,45.8333333 C69.1074435,46.938402 68.6684567,47.99821 67.8870551,48.7796116 L52.9462783,63.7203884 C51.3190937,65.347573 48.6809063,65.347573 47.0537217,63.7203884 L32.1129449,48.7796116 C30.4857604,47.152427 30.4857604,44.5142396 32.1129449,42.8870551 C32.8943465,42.1056535 33.9541545,41.6666667 35.0592232,41.6666667 Z" id="Rectangle" fill="#000000"></path>
          </g>
        </svg>
      </i>
      </li>
      <li @click="selectBox($refs.rank, $event)">{{rText}}<i class="fa-icon-arrow-down">
        <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="fatdown" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M35.0592232,41.6666667 L64.9407768,41.6666667 C67.2419633,41.6666667 69.1074435,43.5321469 69.1074435,45.8333333 C69.1074435,46.938402 68.6684567,47.99821 67.8870551,48.7796116 L52.9462783,63.7203884 C51.3190937,65.347573 48.6809063,65.347573 47.0537217,63.7203884 L32.1129449,48.7796116 C30.4857604,47.152427 30.4857604,44.5142396 32.1129449,42.8870551 C32.8943465,42.1056535 33.9541545,41.6666667 35.0592232,41.6666667 Z" id="Rectangle" fill="#000000"></path>
          </g>
        </svg>
      </i>
      </li>
    </ul>
    <div class="c-tab-box div-wrap">
      <div ref="scene" class="select-box-item">
        <p @click.stop="getVal(item, $event)" v-for="(item, index) in senseSelect" :key="index"><span>{{item.value}}</span>
          <span class="s-icon">
            <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="choose" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M41.3909142,59.1140648 L67.3237923,31.4028594 C68.9627873,29.6514718 71.7529896,29.5224008 73.5558838,31.1145714 C75.3587782,32.7067419 75.4916449,35.4172313 73.8526501,37.168619 L44.4409994,68.597151 C42.6154586,70.5478767 39.42691,70.4501597 37.7315742,68.3915324 L25.966914,54.1058359 C24.4448189,52.2575729 24.7532944,49.5606088 26.6559132,48.0819984 C28.558532,46.6033879 31.3348112,46.9030505 32.8569062,48.7513137 L41.3909142,59.1140648 Z" id="Path-3" fill="#fff"></path>
              </g>
            </svg>
          </span>
        </p>
        <!-- <p @click.stop="getVal"><span>我负责活动的</span>
          <span class="s-icon">
            <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="choose" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M41.3909142,59.1140648 L67.3237923,31.4028594 C68.9627873,29.6514718 71.7529896,29.5224008 73.5558838,31.1145714 C75.3587782,32.7067419 75.4916449,35.4172313 73.8526501,37.168619 L44.4409994,68.597151 C42.6154586,70.5478767 39.42691,70.4501597 37.7315742,68.3915324 L25.966914,54.1058359 C24.4448189,52.2575729 24.7532944,49.5606088 26.6559132,48.0819984 C28.558532,46.6033879 31.3348112,46.9030505 32.8569062,48.7513137 L41.3909142,59.1140648 Z" id="Path-3" fill="#fff"></path>
              </g>
            </svg>
          </span>
        </p>
        <p @click.stop="getVal"><span>指派给我的</span>
          <span class="s-icon">
            <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="choose" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M41.3909142,59.1140648 L67.3237923,31.4028594 C68.9627873,29.6514718 71.7529896,29.5224008 73.5558838,31.1145714 C75.3587782,32.7067419 75.4916449,35.4172313 73.8526501,37.168619 L44.4409994,68.597151 C42.6154586,70.5478767 39.42691,70.4501597 37.7315742,68.3915324 L25.966914,54.1058359 C24.4448189,52.2575729 24.7532944,49.5606088 26.6559132,48.0819984 C28.558532,46.6033879 31.3348112,46.9030505 32.8569062,48.7513137 L41.3909142,59.1140648 Z" id="Path-3" fill="#fff"></path>
              </g>
            </svg>
          </span>
        </p> -->
      </div>
      <div ref="rank" class="select-box-item">
        <p data-index="1" @click.stop="getVal('', $event)" v-for="v in rank" :key="v">
          <span>{{v}}</span>
          <span class="s-icon">
            <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="choose" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M41.3909142,59.1140648 L67.3237923,31.4028594 C68.9627873,29.6514718 71.7529896,29.5224008 73.5558838,31.1145714 C75.3587782,32.7067419 75.4916449,35.4172313 73.8526501,37.168619 L44.4409994,68.597151 C42.6154586,70.5478767 39.42691,70.4501597 37.7315742,68.3915324 L25.966914,54.1058359 C24.4448189,52.2575729 24.7532944,49.5606088 26.6559132,48.0819984 C28.558532,46.6033879 31.3348112,46.9030505 32.8569062,48.7513137 L41.3909142,59.1140648 Z" id="Path-3" fill="#fff"></path>
              </g>
            </svg>
          </span>
        </p>
      </div>
    </div>
    <div class="contact-main padding-bot common-class-main" v-show="!noData">
      <ul>
        <li v-for="(item, index) in aData" :key="index" @click="toView(item)" class="-item">
          <h3>{{item.companyName}}</h3>
          <p>
            <span class="active-rank" :class="contactLevel(item.infoGrade)">{{item.infoGrade !== '' ? item.infoGrade+"级" : '—'}}</span>
            <span class="contact-man">{{item.contacter}}</span>
            <span class="people-num">{{item.phone}}</span>
          </p>
          <p class="over-flow">所属活动：{{item.marketActiveName}}</p>
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
    <div @click="close" v-show="show" class="shade-box"></div>
  </div>
</template>
<script>
import { contact } from '../../utils/api'

export default {
  name: "Contact",
  data () {
    return {
      rank: ['名片级别','A', 'B', 'C', 'D'],
      text: '所有场景',
      rText: '名片级别',
      showBox: `height: auto;opacity: 1;`,
      hideBox: `height: 0;opacity: 0;`,
      hide: {},
      show: false,
      sShow: true,
      done: true,
      tips: '还没有名片哦',
      noData: null,
      aData: [],
      fromData: {}
    }
  },
  computed: {
    count () {
      return this.aData.length
    },
    // 1 所有场景 2 指派给我的  3 我负责市场活动的  4 指派给下属的  5 自己创建的
    senseSelect () {
      let roleId = JSON.parse(this.$getStore('userInfo')).roleCode
      // let role = this.$getStore('userType')
      let contactType = [
        {index: 1, value: '所有场景'},
        {index: 2, value: '指派给我的'}
      ]
      if(roleId === 1){ // 市场部人员 负责人
        contactType.push({index: 3, value: '我负责活动的'})
      }else if(roleId === 2){  // 市场普通人员

      }else if(roleId === 3 || roleId === 4){ // 区域总 销售组长
        contactType.push({index: 5, value: '我创建的'}, {index: 4, value: '指派给下属的'})
      }else if(roleId === 5){ // 销售普通人员
        contactType.push({index: 5, value: '我创建的'})
      }else if(roleId === 6){ // 电销总
        contactType.push({index: 4, value: '指派给下属的'})
      }
      return contactType
    }
  },
  created () {
    const uInfo = JSON.parse(this.$getStore('userInfo'))
    const marketId = this.$getStore('marketId')
    this.fromData = {
        condition: '',
        contactType: '',
        infoGrade: '',
        marketActiveId: marketId,
        roleCode: uInfo.roleCode,
        userId: uInfo.id
      }
    this.gerSearchData(this.fromData)
  },
  components: {
    sPage: () => import('../search-page.vue'),
    Choose: () => import('../contact/Choose')
  },
  methods: {
    gerSearchData (fromData) {
      this.$axios.post(contact.getList, fromData).then(res => {
        if(res.data.code != 200) {
          this.$notice(res.data.message)
          return
        }
        this.aData = [].concat(res.data.data)
        this.noData = fromData.condition==='' && !res.data.data.length > 0
        document.querySelector('.common-class-main').style.display='block'
      })
    },
    searchPage () {
      this.sShow = false
      // 聚焦焦点
      this.$nextTick(function () {
        document.querySelector('#searchInput').focus()
      })
      document.querySelector('.search-page .search-bar svg').style.display = 'none'
      document.querySelector('.common-class-main').style.display = 'none'
    },
    // 输入名称查询
    dataS (val) {
      if (typeof val === 'boolean') {
        this.sShow = val
        // 搜索关键字清空
        this.fromData.condition = ''
        this.gerSearchData(this.fromData)
        return
      }
      if(val !== ''){
        this.fromData.condition = val
        this.gerSearchData(this.fromData)
      }
    },
    close () {
      this.$refs.scene.style.cssText = this.hideBox
      this.$refs.rank.style.cssText = this.hideBox
      this.show = false
      const oLi = document.querySelectorAll('.select-box > li')
      let i = 1
      while (i < 3) {
        if (oLi[i].className.includes('on-col')) {
          oLi[i].className = 'on-col down'
        } else {
          oLi[i].className = 'down'
        }
        i++
      }
    },
    toView (contact) {
      // 保存contactId
      this.$setStore('contactId', contact.id)
      this.$router.push({
        path: '/viewContactDesc',
        // query: {
        //   contactId: contact.id
        // }
      })
    },
    selectBox ($dom, e) {
      let target = e.target || e.srcElement
      const oLi = document.querySelectorAll('.select-box > li')
      if (target.nodeName !== 'LI') {
        if(target.nodeName === 'svg'){
          target = target.parentNode.parentNode
        }else if(target.nodeName === 'path'){
          target = target.parentNode.parentNode.parentNode.parentNode
        }else{
          return
        }
      }
      // let i = 1
      // while (i < 3) {
      //   if (oLi[i].className.includes('on-col')) {
      //     oLi[i].className = 'on-col down'
      //   } else {
      //     oLi[i].className = 'down'
      //   }
      //   i++
      // }
      if (target.className.includes('on-col')) {
        if(target.className.includes('up')){
          target.className = 'on-col down'
        }else if(target.className.includes('down')){
          target.className = 'on-col up'
        }
      } else {
        if(target.className.includes('up')){
          target.className = 'down'
        }else if(target.className === '' || target.className.includes('down')){
          target.className = 'up'
        }
      }
      this.show = true
      if ($dom.style.opacity === '1') {
        $dom.style.cssText = this.hideBox
        this.show = false
        return
      }
      this.$refs.scene.style.cssText = this.hideBox
      this.$refs.rank.style.cssText = this.hideBox
      $dom.style.cssText = this.showBox
    },
    // 下拉框搜索
    getVal (item, e) {
      // console.log(item)
      this.show = false
      const target = e.target || e.srcElement
      const pNode = target.parentNode.parentNode
      const oLi = document.querySelectorAll('.select-box > li')
      if (target.nodeName !== 'SPAN') {
        return
      }
      const sibling = pNode.querySelector('.selected-path')
      if (sibling) {
        sibling.className = ''
      }
      target.parentNode.className = 'selected-path'
      pNode.style.cssText = this.hideBox
      if (target.parentNode.dataset.index) {
        oLi[2].className = 'on-col down'
      } else {
        oLi[1].className = 'on-col down'
      }
      // if (pNode.children.length === 3) {
      //   this.text = target.innerHTML
      // }else{
      //   this.rText = target.innerHTML
      // }
      // 调搜索的接口
      if(item){
        this.fromData.contactType = item.index
        this.text = target.innerHTML
      }else{
        if(target.innerHTML !== '名片级别'){
          this.fromData.infoGrade = target.innerHTML
        }else{
          this.fromData.infoGrade = ''
        }
        this.rText = target.innerHTML
      }
      this.gerSearchData(this.fromData)
    },
    // 卡片等级
    contactLevel (level) {
      return level && level.toLowerCase() ? 'r-'+level.toLowerCase() : ''
    }
  },
  mounted () {
    const self = this
    self.$nextTick(() => {
    })
  }
}
</script>
<style lang="scss" scoped>
  $color: #9DA0A7;
  $onCol: #4298F9;
  .selected-path{
    color: $onCol;
    svg{
      path{
        fill: $onCol;
      } 
    }
  }
  .on-col{
    color: $onCol !important;
    path{
      fill: $onCol !important;
    }
  }
  .up{
    svg{
      transform: rotate(180deg)
    }
  }
  .down{
    svg{
      transform: rotate(0deg)
    }
  }
  .r-a{
    color: #FF5846 !important;
  }
  .r-b{
    color: #FFB600 !important;
  }
  .r-c{
    color: $color;
  }
  .r-d{
    color: $color;
  }
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
  .shade-box{
    position: fixed;
    top: 150px;
    left: 0;
    height: calc(100% - 150px);
    width: 100%;
    background: #08111C;
    opacity: 0.64;
    z-index: 2;
  }
  .c-tab-box{
    position: absolute;
    left: 0;
    top: 144px;
    width: 100%;
    padding-left: 24px;
    text-align: left;
    font-size: 24px;
    line-height: 80px;
    color: #555555;
    z-index: 20;
    p{
      height: 80px;
      border-bottom: 1px solid #E8EAEC;
    }
  }
  .select-box{
    position: relative;
    z-index: 10;
    display: flex;
    background: #fff;
    height: 56px;
    line-height: 56px;
    margin-top: 12px;
    li:nth-child(1){
      color: #9DA0A7;
      text-align: left;
      padding-left: 24px;
    }
    &-item{
      position: relative;
      overflow: hidden;
      opacity: 0;
      height: 0;
      transition: all .2s;
      p{
        display: flex;
      }
      span{
        flex: 1;
        &:nth-child(2){
          flex: none;
          margin-right: 30px;
          transform: translateY(8px);
        }
      }
    }
    li{
      position: relative;
      color: #555555;
      font-size: 24px;
      flex: 1;
      i{
        display: inline-block;
        width: 40px;
        height: 40px;
        transform: translate(-6px, 10px)
        // transform:rotate(-90deg);
      }
    }
  }
  .contact-main{
    text-align: left;
    li:nth-child(1){
      margin-top: 16px;
    }
    .-item{
      h3{
        font-size: 30px;
        color: #222222;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      height: 188px;
      margin: 0 24px 26px;
      padding: 40px 0 0 40px;
      border: none;
      box-shadow:0px 4px 24px 0px rgba(50,112,184,0.12);
      border-radius:16px;
      p{
        font-size: 24px;
        color: $color;
        .active-rank{
          padding-right: 16px;
        }
        span{
          display: inline-block;
          height: 28px;
          line-height: 28px;
        }
        .contact-man{
          border-left: 1px solid $color;
          border-right: 1px solid $color;
          padding: 0 16px;
        }
        .people-num{
          padding-left: 16px;
        }
      }
    }
  }
</style>