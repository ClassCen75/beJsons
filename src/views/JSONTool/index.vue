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
// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore();
const data = reactive([
  {
    title: 'jsonFormatTitle',
    introduce: 'jsonFormatIntroduce',
    icon: 'code',
    id: 0,
    router: 'jsonFormat'
  },
  {
    title: 'xml2jsonTitle',
    introduce: 'xml2jsonIntroduce',
    icon: 'code-compare',
    id: 0,
    router: 'xml2json'
  },
  {
    title: 'col2jsonTitle',
    introduce: 'col2jsonIntroduce',
    icon: 'table',
    id: 0,
    router: 'col2json'
  },
  {
    title: 'json2excelTitle',
    introduce: 'json2excelIntroduce',
    icon: 'file-csv',
    id: 0,
    router: 'json2excel'
  },
  {
    title: 'websocket_io',
    introduce: 'websocket_io',
    icon: 'fa-wand-magic-sparkles',
    id: 0,
    router: 'websocket'
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
