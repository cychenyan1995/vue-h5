<template>
<div class="city-pop pop-padding-top">
  <div class="city-pop-main">
    <ul @click="tabLi" class="city-left">
      <li :data-index="k" v-for="(v, k) in addressPicker" :key="k">{{v.name}}
        <i class="b-r"></i>
      </li>
    </ul>
    <ul @click="select" class="city-right div-wrap show-ul">
      <li :id="k" v-for="(v, k) in cityArr" :key="k"  :data-index="k">{{v.name}}</li>  
      <!-- :class="{'show-ul': k=='直辖市'}" -->
    </ul>
  </div>
</div>
</template>
<script>
import cityPicker from '../../assets/cityPickerData'
export default {
  name: "City",
  data () {
    return {
      addressPicker: [{ "name": "直辖市", "city": [{ "name": "北京"},{ "name": "上海"},{ "name": "天津"},{ "name": "重庆"}]}],
      cityArr: [],
      provice: '',
      municipality: ["北京","上海","天津","重庆"]
    }
  },
  mounted () {
    // 排除直辖市
    cityPicker.forEach(item => {
      if(!this.municipality.includes(item.name)){
        this.addressPicker.push(item)
      }
    })
    // 默认选择直辖市
    this.cityArr = this.addressPicker[0].city
  },
  methods: {
    tabLi (e) {
      const target = e.target || e.srcElement
      // if (document.querySelector('.show-ul')) {
      //   document.querySelector('.show-ul').className = 'city-right div-wrap'
      // }
      if (document.querySelector('.c-on')) {
        document.querySelector('.c-on').className = ''
      }
      if (target.nodeName === 'LI') {
        const { index } = target.dataset
        // document.getElementById(index).className = 'city-right div-wrap show-ul'
        target.className = 'c-on'
        // 根据省份得到对应的城市
        this.cityArr = this.addressPicker[index].city
        this.provice = this.addressPicker[index].name
      }
    },
    select (e) {
      const target = e.target || e.srcElement
      if (target.nodeName !== 'LI') {
        return
      }
      const obj = {key: 'activeCity'}
      if (this.provice === '直辖市') {
        obj.val = target.innerHTML.trim()
      } else {
        obj.val = this.provice + target.innerHTML.trim()
      }
      this.$emit('city', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.city-pop{
  height: 100%;
}
.show-ul{
  display: block !important;
}
.city-pop-main{
  display: flex;
  height: inherit;
  .city-left{
    width: 196px;
    background: #F4F7F9;
    height: 100%;
    overflow-y: scroll;
    .c-on{
      position: relative;
      color: #222;
      font-weight: 600;
      // border-right: 4px solid #4298F9;
      .b-r{
        position: absolute;
        height: 40px;
        width: 5px;
        top: 40px;
        right: 0;
        background: #4298F9;
        z-index: 2;
      }
    }
    li{
      padding: 40px 0;
      font-size: 28px;
      color: #555;
      line-height: 40px;
    }
  }
  .city-right{
    display: none;
    flex: 1;
    li{
      float: left;
      border: 1px solid #D8DCE0;
      margin: 30px 24px 0;
      overflow: hidden;
      height: 56px;
      padding: 0 36px;
      line-height: 56px;
      text-align: center;
      color: #555;
    }
  }
}
</style>