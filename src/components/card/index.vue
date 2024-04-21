<template>
  <template v-for="(item, index) in data" :key="index">
    <div class="card_box" @click="handleRouterItems(item)" v-if="defer(index)">
      <div class="top_title_icon">
        <div class="left_icon">
          <fa-icon :icon="['fas', item.icon]" size="xl"></fa-icon>
        </div>
        <div class="right_title">{{ $t(`message.${item.title}`) }}</div>
      </div>
      <div class="bottom_introduce">{{ $t(`message.${item.introduce}`) }}</div>
    </div>
  </template>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useDefer } from '../../utils/useDefer/index.js';

const defer = useDefer();

const props = defineProps({
  data: {
    type: Array,
    default: []
  }
});

const emit = defineEmits(['handleRouterItem']);

const handleRouterItems = item => {
  emit('handleRouterItem', item);
};
</script>

<style scoped lang="scss">
@import '../../assets/style/flex.scss';
.card_box {
  width: 100%;
  height: 8rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--card-border-color);
  padding: 0.8rem;
  box-sizing: border-box;
  background-color: var(--primary-Headers);
  cursor: pointer;
  margin-top: 0.8rem;
  .bottom_introduce {
    width: 100%;
    height: 50%;
    line-height: 2.8rem;
    font-size: 0.9rem;
    color: var(--paratext-color);
  }
  .top_title_icon {
    width: 100%;
    height: 50%;
    display: flex;
    .right_title {
      width: auto;
      height: 100%;
      line-height: 3.2rem;
      font-weight: 600;
      font-size: 1.1rem;
    }
    .left_icon {
      width: auto;
      padding: 0 1.2rem 0 0;
      height: 100%;
      color: #009ef7;
      display: flex;
      align-items: center;
    }
  }
}
@media (max-width: 960px) {
  .card_box {
    height: auto;
    .bottom_introduce {
      height: auto;
      line-height: 1.5rem;
      font-size: 0.7rem;
    }

    .top_title_icon {
      width: 100%;
      height: auto;
      display: flex;
      .right_title {
        line-height: 1.5rem;
        font-size: 0.8rem;
      }
    }
  }
}
.card_box:hover {
  background-color: var(--box-hover);
}
</style>
