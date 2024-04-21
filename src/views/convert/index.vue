<template>
  <div>
    <card :data="data" @handleRouterItem="handleRouterItem" />
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import card from '../../components/card/index.vue';
import { useStore } from 'vuex';
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore();
const data = reactive([
  {
    title: 'uplowercaseTitle',
    introduce: 'uplowercaseintroduce',
    icon: 'fa-i',
    id: 0,
    router: 'uplowercase'
  }
  // {
  //   title: '视频秒转音频',
  //   introduce: '将视频转成 mp3,m4a 格式的音频文件',
  //   icon: 'fa-play',
  //   id: 0,
  //   router: 'json_gen'
  // }
]);

const handleRouterItem = item => {
  let pathData = [];
  for (let i = 0; i < route.matched.length; i++) {
    pathData.push(route.matched[i].meta);

    pathData[i].path = route.matched[i].path;
  }

  pathData.push({
    title: item.title,
    path: '/' + item.router
  });

  store.commit('SET_V_data', pathData);
  router.push(item.router);
};
</script>

<style scoped lang="scss"></style>
