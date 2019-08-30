<template>
  <div class="login-wrap">
    <!-- <div class="login-main">
      <section class="company-logo">
        <img src="../assets/img/logo.png">
        <P>市场营销平台</P>
      </section>
      <ul class="accout-box">
        <li class="form-input">
          <input
            @click="showIcon('show1', userName)"
            id="login"
            v-model="userName"
            type="text"
            placeholder="请输入您的账号"
          >
          <i @click="clear('1')" v-show="show1">x</i>
        </li>
        <li class="form-input">
          <input
            @click="showIcon('show2', password)"
            v-model="password"
            type="password"
            placeholder="输入密码"
          >
          <i @click="clear('2')" v-show="show2">x</i>
        </li>
        <li>
          <p :class="{color: show}" v-show="show">登 录</p>
          <p v-show="!show" @click="toIndex">登 录</p>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import axios from "../utils/interceptor.js";
import { login, loginRemit } from "../utils/api.js";

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      show1: false,
      show2: false,
      userType: {
        "1": "market", // 市场部人员 负责人
        "2": "market",  // 市场普通人员
        "3": "manager", // 区域总
        "4": "sell", // 销售部人员 销售主管
        "5": "sell", // 普通销售人员
        "6": "telManager", // 电销总
        "7": "telSell" // 电销人员
      }
    };
  },
  beforeCreate () {
    // 免登陆
    axios.get(loginRemit, {}).then(res => {
        const { data } = res
        if (data.code === 200) {
          this.$notice({
            message: '登录成功',
            className: 'login-tip',
            duration: 1000
          })
          data.data.userInfo.roleCode = data.data.roleCode
          // 将对应的数据放到store中 this.$setStore
          this.$setStore('userType', this.userType[data.data.roleCode])
          this.$setStore('userInfo', JSON.stringify(data.data.userInfo))
          if (data.data.roleCode === 6 || data.data.roleCode === 7) {
            this.$router.push({
              path: '/contact'
            })
            return
          }
          this.$router.push({
            path: '/'
          })
        } else {
          this.$notice({
            message: data.message,
            className: 'err-info',
            duration: 5000
          })
        }
        // console.log(res)
      })
  },
  computed: {
    // 控制登录按钮
    show() {
      if (!this.userName || this.password.length <= 2) {
        return true;
      }
      return false;
    }
  },
  watch: {
    // 监听userName password
    // show1 show2控制清除小图标
    userName(newVal) {
      if (newVal) {
        this.show1 = true;
      }
    },
    password(newVal) {
      if (newVal) {
        this.show2 = true;
      }
    }
  },
  methods: {
    // 点击账号密码的输入框
    showIcon(self, text) {
      this.show1 = false;
      this.show2 = false;
      if (text) {
        this[self] = true;
      }
    },
    // 点击清除按钮
    clear(index) {
      if (index === "1") {
        this.userName = "";
        this.show1 = false;
      } else {
        this.password = "";
        this.show2 = false;
      }
    },
    // 登录
    toIndex() {
      this.show1 = false;
      this.show2 = false;
      // 登录判断网络状态
      if (! navigator.onLine) { 
        this.$notice('当前无网络')
        return  
      } 
      axios.post(login, {userName: this.userName, passWord: this.password}).then(res => {
        const { data } = res
        if (data.code === 200) {
          this.$notice({
            message: '登录成功',
            className: 'login-tip',
            duration: 1000
          })
          data.data.userInfo.roleCode = data.data.roleCode
          // 将对应的数据放到store中 this.$setStore
          this.$setStore('userType', this.userType[data.data.roleCode])
          this.$setStore('userInfo', JSON.stringify(data.data.userInfo))
          if (data.data.roleCode === 6 || data.data.roleCode === 7) {
            this.$router.push({
              path: '/contact'
            })
            return
          }
          this.$router.push({
            path: '/'
          })
        } else {
          this.$notice({
            message: data.message,
            className: 'err-info',
            duration: 5000
          })
        }
        // console.log(res)
      })
    }
  }
};
</script>
<style lang="scss">
.login-wrap {
  text-align: center;
  background: #f9f9f9;
  padding-top: 1px;
  .company-logo {
    margin: 64px auto 128px;
    img {
      width: 160px;
      height: 95px;
    }
    p {
      line-height: 28px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      color: rgba(0, 0, 0, 1);
      // -webkit-text-stroke:1px rgba(0,0,0,1);
      // text-stroke:1px rgba(0,0,0,1);
      font-weight: bold;
    }
  }
}
.accout-box {
  margin: 0 auto;
  text-align: left;
  li.form-input {
    position: relative;
    padding-left: 80px;
    i {
      position: absolute;
      top: 20px;
      right: 80px;
      height: 32px;
      width: 32px;
      background: #c5c9d1;
      border-radius: 50%;
      line-height: 32px;
      z-index: 2;
      color: #fff;
      text-align: center;
    }
  }
  input {
    padding: 20px 0 20px 20px;
    border: none;
    background: transparent;
    margin-bottom: 30px;
    line-height: 32px;
    // color:rgba(197,201,209,1);
    letter-spacing: 1px;
  }
  li:nth-child(3) {
    width: 590px;
    height: 88px;
    background: rgba(66, 152, 249, 1);
    border-radius: 4px;
    margin: 47px auto;
    text-align: center;
    line-height: 88px;
    p {
      color: rgba(255, 255, 255, 1);
      letter-spacing: 2px;
    }
    .color {
      color: rgba(111, 176, 250, 1);
    }
  }
}
.login-tip {
  // width:160px;
  height: 186px;
  background: rgba(8, 17, 28, 1);
  border-radius: 16px;
  opacity: 0.88;
  font-size: 28px;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
  letter-spacing: 1px;
  &::before {
    content: "";
    position: absolute;
    top: 12%;
    left: 27%;
    width: 48%;
    height: 38%;
    background: url("../assets/img/loading.svg") no-repeat;
    background-size: 100% 100%;
    animation: load 1s infinite;
    color: transparent;
  }
  span {
    transform: translateY(100px);
  }
}
.err-info {
  @extend .login-tip;
  height: 280px;
  padding: 0 50px !important;
  &::before {
    content: "";
    background: url("../assets/img/unone.svg") no-repeat;
    height: 40%;
    width: 40%;
    animation: none;
    background-size: 100% 100%;
    left: 30%;
    top: 12%;
  }
  span {
    transform: translateY(180px);
  }
}
.user-not-exist {
  width: 344px;
  height: 280px;
}
@keyframes load {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>