<template>
  <span v-show="isShow" class="svg-label">
    <svg
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g id="lable" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d="M3.57142857,17.8571429 L92.4526875,17.8571429 C94.425133,17.8571429 96.0241161,19.4561259 96.0241161,21.4285714 C96.0241161,22.2543582 95.7379522,23.0546285 95.2143297,23.6931762 L75.4992033,47.7353952 C74.419488,49.0520873 74.419488,50.9479127 75.4992033,52.2646048 L95.2143297,76.3068238 C96.4650363,77.8320366 96.2425051,80.082364 94.7172923,81.3330707 C94.0787446,81.8566933 93.2784743,82.1428571 92.4526875,82.1428571 L3.57142857,82.1428571 C1.59898304,82.1428571 1.08078677e-15,80.5438741 -2.66453526e-15,78.5714286 L4.4408921e-16,21.4285714 C2.02534299e-16,19.4561259 1.59898304,17.8571429 3.57142857,17.8571429 Z"
          id="Rectangle"
          fill="#000000"
          transform="translate(50.000000, 50.000000) rotate(-270.000000) translate(-50.000000, -50.000000) "
        ></path>
      </g>
    </svg>
  </span>
</template>
<script>
export default {
  name: "svg-icon",
  props: {
    isShow: Boolean
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.a-ing {
  path {
    fill: #4298f9;
  }
}
.a-end {
  path {
    fill: #d8dce0;
  }
}
.a-not {
  path {
    fill: #ffb600;
  }
}
.svg-label {
  display: inline-block;
  width: 18px;
  height: 28px;
}
</style>