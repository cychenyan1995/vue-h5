<template>
<div class="qr-scan">
   <div id="video"></div>
    <div>
        <button id="open">打开</button>
        <button id="close">关闭</button>
    </div>
    <div id="result"></div>
</div>
</template>
<script>
import { qrScan } from '../utils/util.js'

export default {
  name: "QrScan",
  data () {
    return {
      timer: null
    }
  },
  methods: {
    onLoad () {
      let self = this
      let scan = qrScan('video')
      document.getElementById('open').onclick = function () {
        scan.openScan()
        self.timer = window.setInterval(function () {
          startScan()
        }, 1500)
      }
      // document.getElementById('close').onclick = function () {
      //   scan.closeScan()
      //   window.clearInterval(self.timer)
      // }
      let reDiv = document.getElementById('result')
      function startScan() {
        scan.getImgDecode(function (data) {
          // console.log(data)
          let p = document.createElement('p')
          if (data.success) {
              p.innerHTML = 'RESULT: ' + data.payload
          } else {
              p.innerHTML = 'ERROR: ' + data.msg
          }
          reDiv.appendChild(p)
        })
      }
    }
  },
  destroyed () {
    window.clearInterval(this.timer)
  },
  mounted () {
    this.$nextTick(function () {
      this.onLoad()
    })
  }
}
</script>
<style lang="scss" scoped>
video {
  display: block;
  margin: 0 auto;
  width: 240px;
  height: 240px;
  background: #000;
  border-radius: 5px;
}
</style>