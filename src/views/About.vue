<template>
  <div class="about">
    <v-header title="我的" />
    <ul class="div-wrap">
      <li class="a-u-info">
        <p>{{userInfo.userName}}</p>
        <p>{{userInfo.email}}</p>
      </li>
      <li class="form-box" @click="exit">退出</li>
    </ul>
    <div v-show="show" class="shade-wrap">
      <div class="exit-confirm">
        <p>退出账号将中断当前所有操作</p>
        <p @click="loginOut">退出</p>
        <p @click="show = false">取消</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    return {
      userInfo,
      show: false
    }
  },
  methods: {
    exit () {
      this.show = true
    },
    loginOut () {
      sessionStorage.clear()
      // this.$root.$data = {}
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shade-wrap{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(8,17,28,.64);
  text-align: center;
  display: flex;
  align-items: flex-end;
  z-index: 100000000;
  font-size: 32px;
  color: #555;
  .exit-confirm{
    width: 100%;
    p{
      height: 98px;
      line-height: 98px;
      width: 100%;
      background: #fff;
      &:first-child{
        font-size: 28px;
        color: #9DA0A7;
      }
      &:nth-child(2){
        margin-bottom: 16px;
        border-top: 1px solid #D8DCE0;
        color: #FF5846;
      }
    }
  }
}
.about{
  height: 100%;
  background: #F4F7F9;
  text-align: left;
  li{
    &:nth-child(2){
      color: #2A2A2A;
      text-align: center;
      font-size: 32px;
      cursor: pointer;
      height: 96px;
      line-height: 96px;
    }
  }
  .a-u-info{
    height: 192px;
    border-bottom: 40px solid #F4F7F9;
    padding-left: 40px;
    padding-top: 40px;
    p{
      color: #9DA0A7;
      font-size: 24px;
      line-height: 44px;
      &:nth-child(1){
        font-size: 30px;
        color: #222;
        font-weight: bold;
      }
    }
  }
}
</style>

