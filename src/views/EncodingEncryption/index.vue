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
    title: 'bese64Title',
    introduce: 'bese64introduce',
    icon: 'fa-key',
    id: 0,
    router: 'bese64'
  },
  {
    title: 'urlCodeTitle',
    introduce: 'urlCodeintroduce',
    icon: 'fa-link',
    id: 0,
    router: 'urlCode'
  },
  {
    title: 'unicode_chineseTitle',
    introduce: 'unicode_chineseintroduce',
    icon: 'fa-language',
    id: 0,
    router: 'unicode_chinese'
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
