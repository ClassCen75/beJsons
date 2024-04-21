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
    title: 'compress_imgTitle',
    introduce: 'compress_imgIntroduce',
    icon: 'image',
    id: 0,
    router: 'compress_img'
  },
  {
    title: 'SVGConversion',
    introduce: 'ConvertimageformattoSVGformat',
    icon: 'fa-images',
    id: 0,
    router: 'SVGConversion'
  },
  {
    title: 'json_genTitle',
    introduce: 'json_genIntroduce',
    icon: 'fa-shuffle',
    id: 0,
    router: 'json_gen'
  },
  {
    title: 'xml_genTitle',
    introduce: 'xml_genIntroduce',
    icon: 'fa-file-code',
    id: 0,
    router: 'xml_gen'
  }
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
