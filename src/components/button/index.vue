<template>
  <div :class="['Buttons_box', type]">{{ name }}</div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  name: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'Primary'
  }
});
</script>

<style scoped lang="scss">
.Buttons_box {
  width: auto;
  height: 2rem;
  border-radius: var(--border-radius);
  background-color: #409eff;
  display: inline-block;
  padding: 0.2rem 0.5rem;
  line-height: 1.6rem;
  color: #fff;
  cursor: pointer;
}
.Warning {
  background-color: #e6a23c;
}
.Danger {
  background-color: #f56c6c;
}
.Success {
  background-color: #67c23a;
}
.Primary {
  background-color: #409eff;
}
</style>
