<template>
  <div class="layout_box">
    <headers />
    <div class="container_item">
      <template v-if="store.state.loaderShow">
        <Loader />
      </template>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import headers from './header/index.vue';
import Loader from '../../components/loader/index.vue';
import { useStore } from 'vuex';
const store = useStore();
</script>

<style scoped lang="scss">
.layout_box {
  width: 100%;
  height: auto;
  padding: 0.8rem 0;
  .container_item {
    width: 100%;
    height: auto;
    margin-top: 0.8rem;
  }
}
</style>
