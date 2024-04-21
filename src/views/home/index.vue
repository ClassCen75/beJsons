<template>
  <div>
    <Headers />
    <div class="container">
      <div class="inner_container">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer_box">Copyright © 2023 All rights reserved.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Headers from '../../components/headers/index.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useStore();
// import layout from '../../components/layout/index.vue';

onMounted(() => {
  store.commit('SET_LABEL_ACTIVE', router.options.history.location);
});

const count = ref(0);
</script>

<style scoped lang="scss">
@import '../../assets/style/flex.scss';

.footer_box {
  width: 100%;
  height: auto;
  min-height: 4rem;

  text-align: center;
  line-height: 1.2rem;
  font-size: 0.7rem;
  color: var(--paratext-color);
}
.container {
  width: 100vw;
  height: auto;
  padding: 0 0 2rem 0;
  @include flex-center;
  .inner_container {
    width: 80%;
    height: 100%;
  }

  @media (max-width: 960px) {
    .inner_container {
      width: 100%;
    }
  }
}
@media (max-width: 960px) {
  .container {
    padding: 0 0.8rem 2rem 0.8rem;
  }
}
</style>
