<template>
<div class="contact-refer">
  <v-header title="跟进名片"/>
  <ul>
    <li @click="popShow" class="form-box li-1 select-icon">
      <label class="display-inline-block">名片等级</label>
      <input readonly class="display-inline-block" v-model="formData.infoGrade" type="text" placeholder="请选择"/>
    </li>
    <li style="height:auto;" class="form-box li-final-box">
      <!-- <label class="display-inline-block">活动地址</label> -->
      <textarea rows="3" class="display-inline-block"  v-model="formData.remark" maxlength="50" placeholder="请输入备注（200字内）"></textarea>
    </li>
  </ul>
  <div class="footer back-color footer-fixed">
    <p class="div-wrap footer-main">
      <span @click="cancel" class="border-right">取消</span>
      <span @click="save">保存</span>
    </p>
  </div>
  <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
    <p @click="okPop" class="pop-cel div-wrap">取消</p>
    <p class="pop-title div-wrap">选择名片等级</p>
    <p @click="okPop" class="pop-ok div-wrap">确定</p>
    <mt-picker :slots="gradeSlots" @change="onGradeChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
    <!-- <pop-header @cancel="okPop" @ok="okPop" title="选择名片等级" /> -->
    <!-- <li v-for="(v, k) in grade" :key="k" class="form-box bot-line">
      <p>{{v}}</p>
    </li> -->
  </mt-popup>
</div>
</template>
<script>
const grade = ['A', 'B', 'C', 'D']
import { contact } from '../../utils/api'
import { notCanScroll, canScroll } from '../../utils/util'
export default {
  name: "ContactRefer",
  data () {
    return {
      formData: {
        infoGrade: '',
        remark: ''
      },
      popupVisible: false,
      gradeSlots:[{
          values: grade,
          className: 'slot1',
          textAlign: 'center'
        }],
      grade: ''
    }
  },
  components: {
    popHeader: () => import('../pop-header.vue'),
  },
  methods: {
    // 名片级别选择
    okPop () {
      this.popupVisible = false
      canScroll()
    },
    popShow () {
      // 下层页面不可滑动
      notCanScroll()
      this.popupVisible = true
    },
    onGradeChange (picker, values) {
      // console.log(picker, values)
      picker.setSlotValues(1, values[0]+'级')
      this.formData.infoGrade = values[0]+'级'
      this.grade = values[0]
    },
    save () {
      let params = {
        id: this.$getStore('contactId'),
        infoGrade: this.grade,
        remark: this.formData.remark
      }
      this.$axios.post(contact.update, params).then(res => {
        if(res.data.code != 200) {
          this.$notice(res.data.message)
          return
        }
        this.$router.push({
          path: '/viewContactDesc'
        })
      })
    },
    cancel () {
      this.$messageBox.confirm('现在退出，将丢失已编辑的内容<br>确认退出?').then(val => {
        this.$router.push({
          path: '/viewContactDesc'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.contact-refer{
  height: 100%;
  background: #F4F7F9;
  .li-1{
    margin: 25px 0;
  }
  textarea{
    height: 240px;
  }
}
.pop-cel,.pop-ok,.pop-title{
  width:30% !important;
  top: 10px !important;
}
// .slot1{
//   width: 100% !important;
// }
</style>