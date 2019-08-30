import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import comTemp from './commonTemp';
import { Picker, DatetimePicker, Popup, Toast, messageBox } from 'mint-ui'
import axios from './utils/interceptor';
import 'babel-polyfill'
// import vConsole from 'vconsole'
// import './filter/filter.js';

Vue.config.productionTip = false
    // dev-tools方便调试
    // Vue.config.devtools = true

Vue.use(comTemp)
Vue.component(Picker.name, Picker)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Popup.name, Popup)
    // Vue.component(MessageBox.name, MessageBox)
    // Vue.component(Toast.name, Toast)

const getStore = (key) => {
    return sessionStorage.getItem(key)
}
const setStore = (key, val) => {
    return sessionStorage.setItem(key, val)
}

// new vConsole()

// 添加实例属性  在其他地方可以通过this.$getStore访问
Vue.prototype.$axios = axios
Vue.prototype.$getStore = getStore
Vue.prototype.$setStore = setStore
Vue.prototype.$notice = Toast
Vue.prototype.$messageBox = messageBox
    // Vue.prototype.$indicator = Indicator

router.beforeEach((to, from, next) => {
    if (!getStore('userType')) {
        if (to.path === '/login') {
            next()
        } else {
            // TODO Request Token
            next({ path: '/login' })
        }
    } else {
        next()
    }
})

//  事件监听网络状态的改变  当前网络状态的判断
var EventUtil = {　　　　 addHandler: function(element, type, handler) {　　　　　　 if (element.addEventListener) {　　　　　　　　 element.addEventListener(type, handler, false);　　　　　　 } else if (element.attachEvent) {　　　　　　　　 element.attachEvent("on" + type, handler);　　　　　　 } else {　　　　　　　　 element["on" + type] = handler;　　　　　　 }　　　　 }　　 };
EventUtil.addHandler(window, "offline", function() {
    Toast('当前无网络')
});

// window.addEventListener('offline', function(e) {alert('offline');}) 
new Vue({
    router,
    // store,

    data: {
        sellName: null,
        addEdit: null, // 编辑还是添加
        activeData: {}, // 添加活动数据
        costData: {}, //成本数据
        targetInfo: [] // 指标数据
            // marketingActiveId: '' //市场活动的id
    },
    render: h => h(App)
}).$mount('#app')