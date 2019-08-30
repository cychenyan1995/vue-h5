<template>
<div class="info-rank">
  <v-header title="信息等级"/>
  <ul class="info-rank-select div-wrap">
    <li class="form-box" v-for="v in aoTxt" :key="v">{{v}}</li>
  </ul>
  <p class="info-rank-btn">确定</p>
</div>
</template>
<script>
export default {
  name: "InfoRank",
  data () {
    return {
      aoTxt: ['请选择', 'A - 可约见转线索', 'B - 有兴趣了解转线索', 'C - 暂无明确需求']
    }
  }
}
</script>
<style lang="scss" scoped>
.info-rank-btn{
  height: 76px;
  width: 500px;
  background: rgba(17, 142, 233, 1);
  border-radius: 5px;
  margin: 100px auto 0;
  color: #ffffff;
  font-size: 36px;
  line-height: 76px;
}
.selected-icon
{	display:block;
	border-style:solid;
	border-width:1px;
	width:10px;
	border-right: none;
	border-bottom: none;
	height: 20px;
	transform: rotate(-140deg)
}
</style>