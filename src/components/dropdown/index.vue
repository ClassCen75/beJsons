<template>
  <div class="dropdown_box" @click="handleRotate">
    <!-- <div class="left_icon"></div> -->
    <div class="center_text">
      {{ title === 'Encoding / Encryption' ? $t(`message.EncodingEncryption`) : $t(`message.${title}`) }}
    </div>
    <div :class="{ dropdown_bottom: true, trigger_rotate: trigger }">
      <fa-icon :icon="['fas', 'caret-up']"></fa-icon>
    </div>
    <div class="dropdown__trigger" v-if="trigger">
      <template v-for="(item, index) in data" :key="index">
        <div class="dropdown_item" @click="handleDropdownItem(item)" v-if="defer(index)">
          <span>
            <fa-icon :icon="['fas', item.icon]"></fa-icon>
          </span>
          <span>{{ $t(`message.${item.router}`) }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useDefer } from '../../utils/useDefer/index.js';

const defer = useDefer();
// 定义props
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  },
  trigger: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['dropdownShow', 'dropdownItem']);

// methods
const handleRotate = () => {
  emit('dropdownShow');
};

const handleDropdownItem = item => {
  emit('dropdownItem', item);
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/flex.scss';
.dropdown_box {
  width: auto;
  min-width: 50px;
  height: auto;
  background-color: var(--dropdown-bg);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px 0 16px;
  position: relative;
  cursor: pointer;
  .dropdown__trigger {
    width: 100%;
    min-height: 36px;
    height: auto;
    background-color: var(--dropdown-bg);
    position: absolute;
    left: 0;
    top: 42px;
    z-index: 999;
    border-radius: 8px;
    display: block;

    .dropdown_item {
      width: 100%;
      height: 36px;
      line-height: 36px;
      font-size: 12px;
      color: #5f6d86;
      font-weight: 500;
      text-indent: 0.8rem;
      overflow: hidden;
      > span {
        margin-right: 0.8rem;
      }
    }
    .dropdown_item:hover {
      font-weight: 600;
    }
  }
  // .left_icon{
  //     width:20px;
  //     height: 100%;
  // }
  .dropdown_bottom {
    width: 25px;
    height: 100%;
    transition: 0.3s;
    @include flex-center;
  }
  .trigger_rotate {
    transform: rotate(-180deg);
  }
  .center_text {
    width: auto;
    min-width: 40px;
    height: 100%;
    font-size: 12px;
    line-height: 36px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.dropdown_box:hover {
  background-color: var(--box-hover);
}
</style>
