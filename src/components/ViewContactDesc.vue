<template>
<div class="view-contact  padding-bot">
  <v-header class="bot-border" title="深圳法大大网络科技有限公司" />
  <div class="view-main div-wrap">
    <ul class="form-wrap">
      <li class="form-box-first">
        <h3>基本信息</h3>
        <p class="edit-btn display-none" ref="editBtn" @click="toEdit('edit')">修改</p>
      </li>
      <li v-for="(v, k) in data1" :key="k" class="form-box">
        <label class="display-inline-block">{{k}}:</label>
        <p :title="v" class="display-inline-block display-inline-block-width">{{v}}</p>
      </li>
      <li style="transform: translateY(29px);" class="bot-border"></li>
    </ul>
    <ul class="ohter-info form-wrap">
      <li class="form-box-first top-border-no">
        <h3>跟进信息</h3>
        <!-- <p class="edit-btn" ref="give" @click="toEdit('give')">指派</p>
        <p class="edit-btn display-none" ref="refer" @click="toEdit('refer')">转介</p> -->
      </li>
      <li class="form-box" v-for="(v, k) in data2" :key="k">
        <label class="display-inline-block">{{k}}:</label>
        <p class="display-inline-block display-inline-block-width">{{v}}</p>
      </li>
    </ul>
  </div>
  <div class="footer div-wrap footer-fixed">
    <p class="footer-main">
      <span v-if="!show" style="opacity:0;"></span>
      <span @click="toContact">跟进</span>
      <span @click="toAssign" v-if="show">指派</span>
    </p>
  </div>
</div>
</template>
<script>
import { contact } from '../utils/api'
export default {
  name: "ViewContactDesc",
  data () {
    return {
      show: false,
      data1: {
        '所属活动': '',
        '公司名称': '',
        '公司城市': '',
        '联系人': '',
        '职务': '',
        '联系电话': '',
        '微信帐号': '',
        '联系邮箱': '',
        '创建人': '',
        '创建时间': ''
      },
      data2: {
        '名片等级': '-',
        '跟进人': '',
        '备注': '-'
      }
    }
  },
  methods: {
    // 跟进
    toContact () {
      this.$router.push({
        path: '/contactRefer'
      })
    },
    toEdit (type) {
      const oPath = {
        edit: `/addContact?type=edit&contactId=${this.contactId}`,
        give: '/sellManSelect?find=contact',
        refer: '/contactRefer'
      }
      this.$router.push({
        path: oPath[type]
      })
    },
    // 指派
    toAssign () {
      this.$router.push({
        path: '/sellManSelect',
        query: {
          type: 'contact',
          contactId: this.contactId
        }
      })
    }
  },
  created () {
    // 获取详情
    let contact_id = this.$getStore('contactId')
    this.contactId = contact_id
    let params = {
      contact_id
    }
    this.$axios.get(contact.viewContact, {params}).then(res => {
      if(res.data.code !=200){
        this.$notice(res.data.message)
        return
      }
      let detailData = res.data.data
      this.data1 = {
        '所属活动': detailData.tMarketingActiveContact.marketActiveName || '-',
        '公司名称': detailData.tMarketingActiveContact.companyName || '-',
        '公司城市': detailData.tMarketingActiveContact.companyAddress || '-',
        '联系人': detailData.tMarketingActiveContact.contacter || '-',
        '职务': detailData.tMarketingActiveContact.post || '-',
        '联系电话': detailData.tMarketingActiveContact.phone || '-',
        '微信帐号': detailData.tMarketingActiveContact.weichat || '-',
        '联系邮箱': detailData.tMarketingActiveContact.email || '-',
        '创建人': detailData.tMarketingActiveContact.createrName || '-',
        '创建时间': detailData.tMarketingActiveContact.createTime.replace(/-/g,'.') || '-'
      }
      this.data2 = {
        '名片等级': detailData.tMarketingActiveContact.infoGrade ? detailData.tMarketingActiveContact.infoGrade+'级' : '-',
        '跟进人': detailData.processor || '-',
        '备注': detailData.tMarketingActiveContact.remark || '-'
      }
    })
  },
  mounted () {
    const type = this.$getStore('userType')
    if (type === 'manager') {
      this.$refs.editBtn.style.display = 'block'
    }
    if (type === 'sell') {
      // this.$refs.give.style = `display: none`
      // this.$refs.refer.style = `display: block`
      this.$refs.editBtn.style.display = 'block'
    }
    if (type === 'telSell') {
      // this.$refs.give.style = `display: none`
      this.$refs.editBtn.style.display = 'block'
    }
    if (type === 'telManager' || type === 'manager' || type === 'market') {
      this.show = true
      this.$refs.editBtn.style.display = 'block'
    }
  }
}
</script>
<style lang="scss" scoped>
.form-box{
  border: none;
  height: 50px;
  line-height: 50px;
}
.ohter-info{
  label{
    width: 240px;
  }
}
.display-inline-block {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.display-inline-block-width{
  width: 59%;
}
</style>