<template>
  <div class="top_loader">
    <div class="loader" :style="{ width: `${store.state.widthValue}%` }"></div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore();
</script>

<style scoped lang="scss">
.top_loader {
  width: 100vw;
  height: 4.8px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.loader {
  width: 0;
  height: 4.8px;
  display: inline-block;
  position: relative;
  background: #218bee;
  box-shadow: 0 0 10px rgba(69, 156, 255, 0.5);
  box-sizing: border-box;
  //   animation: 8s linear infinite;
  transition: width 0.5s ease; /* 添加宽度的过渡效果 */
}

.loader::after,
.loader::before {
  content: '';
  width: 10px;
  height: 1px;
  background: #218bee;
  position: absolute;
  top: 9px;
  right: -2px;
  opacity: 0;
  transform: rotate(-45deg) translateX(0px);
  box-sizing: border-box;
  animation: coli1 0.3s linear infinite;
}

.loader::before {
  top: -4px;
  transform: rotate(45deg);
  animation: coli2 0.3s linear infinite;
}

// @keyframes animFw {
//   0% {
//     width: 0;
//   }
//   50% {
//     width: 50%;
//   }

//   100% {
//     width: 100%;
//   }
// }

@keyframes coli1 {
  0% {
    transform: rotate(-45deg) translateX(0px);
    opacity: 0.7;
  }

  100% {
    transform: rotate(-45deg) translateX(-45px);
    opacity: 0;
  }
}

@keyframes coli2 {
  0% {
    transform: rotate(45deg) translateX(0px);
    opacity: 1;
  }

  100% {
    transform: rotate(45deg) translateX(-45px);
    opacity: 0.7;
  }
}
</style>
