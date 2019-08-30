<template>
  <div id="app">
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
html{
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body, html{
  height: 100%;
  font-size: 28px;
}
body{
  margin: 0;
}
div, h1, h2, h3, h4, p, span, ul, li{
  margin: 0;
  padding: 0;
  border: 0;
}
img{
  content: normal !important;
}
i{
  font-style:normal
}
a{
  text-decoration: none;
}
ul {
  list-style: none;
}
button,
input,
select,
textarea {
  margin: 0;
  padding: 0;
  outline: none;
  width: 100%;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
  text-align: left;
}
#app {
  position: relative;
  height: 100%;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family:PingFangSC-Regular;
  font-weight:400;
  letter-spacing:1px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  -webkit-overflow-scrolling: touch; /* ios5+ */
  &>div{
    // height: 100%;
    padding-top: 88px;
    position: relative;
  }
  .view-active-desc{
    padding-top: 112px;
  }
}
</style>

