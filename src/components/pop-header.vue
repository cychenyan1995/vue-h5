<template>
<header class="pop-header bot-border">
  <p @click="cancel">取消</p>
  <h4>{{title}}</h4>
  <p @click="ok">确定</p>
</header>
</template>
<script>
export default {
  name: "pop-header",
  props: {
    title: String
  },
  data () {
    return {
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    ok () {
      this.$emit('ok')
    }
  }
}
</script>
<style lang="scss" scoped>
  .pop-header{
    display: flex;
    height: 88px;
    font-size: 32px;
    color: #4298F9;
    align-items: center;
    p{
      width: 200px;
      padding: 0 40px;
    }
    h4{
      flex: 1;
      color: #555555;
    }
  }
</style>