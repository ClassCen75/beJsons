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
    title: 'regexTitle',
    introduce: 'regexIntroduce',
    icon: 'code',
    id: 0,
    router: 'regex'
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
