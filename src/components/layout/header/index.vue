<template>
  <div>
    <div class="radio-inputs">
      <label class="radio" v-for="(item, index) in store.state.label" :key="item.id">
        <input type="radio" name="radio" :checked="item.active" @input="handleHeader(item)" />
        <span class="name">{{ $t(`message.${item.router}`) }}</span>
      </label>
    </div>
    <div class="dropdown_boxs">
      <dropdown
        :title="store.state.labelTitle"
        :data="store.state.label"
        :trigger="trigger"
        @dropdownShow="dropdownShow"
        @dropdownItem="handleHeader"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import dropdown from '../../dropdown/index.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const trigger = ref(false);

const dropdownShow = () => {
  trigger.value = !trigger.value;
};

const handleHeader = e => {
  store.commit('SET_LABEL_ACTIVE', '/' + e.router);
  router.push('/' + e.router);
};
</script>

<style scoped lang="scss">
.dropdown_boxs {
  display: none;
}
@media (max-width: 960px) {
  .dropdown_boxs {
    display: block;
  }
}
.radio-inputs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: var(--check-head);
  box-sizing: border-box;
  //   box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: auto;
  font-size: 0.9rem;
}
@media (max-width: 960px) {
  .radio-inputs {
    display: none;
  }
}

.radio-inputs .radio {
  flex: 1 1 auto;
  text-align: center;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 0;
  //   color: rgba(51, 65, 85, 1);
  transition: all 0.15s ease-in-out;
}

.radio-inputs .radio input:checked + .name {
  background-color: var(--check-box-bg);
  color: #409eff;
  font-weight: 600;
}
</style>
