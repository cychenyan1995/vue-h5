import vHeader from './components/v-header.vue'
import Search from './components/Search.vue'

const comTemp = {
  install: function (Vue) {
    Vue.component('v-header', vHeader)
    Vue.component('Search', Search)
  }
}

export default comTemp