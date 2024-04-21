<template>
  <div class="Headers_box">
    <div class="inner_header">
      <div class="left_Logo" @click="hanldeGoHome">Developer Tools</div>

      <div class="right_theme">
        <div class="language_box">
          <dropdown
            :title="dropdownHide"
            :data="languageData"
            :trigger="trigger"
            @dropdownShow="dropdownShow"
            @dropdownItem="dropdownItem"
          />
        </div>

        <div class="theme_box">
          <theme />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
import theme from '../../components/theme/index.vue';
import { useRouter } from 'vue-router';

const { proxy } = getCurrentInstance();

const router = useRouter();

const dropdownHide = ref('en');

const trigger = ref(false);

const languageData = reactive([
  {
    title: 'zh',
    id: 1,
    icon: 'language',
    active: true,
    type: 'zh',
    router: 'zh'
  },
  {
    title: 'en',
    id: 2,
    icon: 'fa-a',
    active: true,
    type: 'en',
    router: 'en'
  }
]);

const dropdownShow = () => {
  trigger.value = !trigger.value;
};

const dropdownItem = item => {
  dropdownHide.value = item.title;
  proxy.$i18n.locale = item.type;
};

const hanldeGoHome = () => {
  router.replace('/');
};
</script>

<style scoped lang="scss">
@import '../../assets/style/flex.scss';
.Headers_box {
  width: 100%;
  height: 6rem;
  background-color: var(--primary-Headers);
  @include flex-center;
  .inner_header {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .right_theme {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .language_box {
        width: 60%;
        max-width: 10rem;
        margin-right: 0.5rem;
      }
    }
    .left_Logo {
      width: auto;
      height: 100%;
      line-height: 6rem;
      font-size: 1.6rem;
      font-weight: 800;
      cursor: pointer;
    }
    @media (max-width: 960px) {
      .left_Logo {
        font-size: 1.1rem;
      }
    }
  }

  @media (max-width: 960px) {
    .inner_header {
      width: 100%;
      padding: 0 0.8rem;
    }
  }
}
</style>
