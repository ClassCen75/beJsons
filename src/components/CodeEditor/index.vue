<template>
  <codemirror
    :value="code"
    @input="onInput"
    placeholder="Please fill in the data"
    :style="{ height: '100%' }"
    :autofocus="true"
    :tabSize="2"
    :extensions="extensions"
  />
</template>

<script setup>
import { defineProps } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
// import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
// 编辑器代码格式
let myTheme = EditorView.theme(
  {
    // 输入的字体颜色
    // '&': {
    //   color: '#0052D9',
    //   backgroundColor: store.state.theme === 'dark' ? '#1c1c24' : '#f8f8f8' //'#FFFFFF' //控制的背景色
    // },
    // '.cm-content': {
    //   caretColor: '#0052D9'
    // },
    // // 激活背景色
    // '.cm-activeLine': {
    //   backgroundColor: '#f1f1f1'
    // },
    // 激活序列的背景色
    // '.cm-activeLineGutter': {
    //   backgroundColor: '#FAFAFA'
    // },
    //光标的颜色
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0052D9'
    }
    // 选中的状态
    // '&.cm-focused .cm-selectionBackground, ::selection': {
    //   backgroundColor: '#0052D9',
    //   color: '#FFFFFF'
    // },
    // 左侧侧边栏的颜色
    // '.cm-gutters': {
    //   backgroundColor: '#FFFFFF',
    //   color: '#ddd', //侧边栏文字颜色
    //   border: 'none'
    // }
  },
  { dark: true }
);

// 使用 defineProps 定义 prop
const props = defineProps({
  code: {
    type: String,
    default: ''
  }
});

// 使用 defineEmits 定义 emit
const emit = defineEmits(['update:code']);

// 创建 onInput 方法来触发 update:modelValue 事件
const onInput = value => {
  emit('update:code', value);
};

// const code = ref(``);
const extensions = [javascript(), myTheme];
</script>

<style scoped lang="scss"></style>
