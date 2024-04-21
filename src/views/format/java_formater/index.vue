<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.java_formaterTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="Excel_box">
      <CodeEditor v-model="userData" />
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="handleformatCode">{{ $t(`message.format`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" @click="handleCompressCode">{{ $t(`message.compress`) }}</el-button>
      </div>

      <div class="btn_item">
        <el-button type="danger" @click="handleDete">{{ $t(`message.empty`) }}</el-button>
      </div>
    </div>

    <div class="Excel_box">
      <CodeEditor v-model="code" />
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="copy">{{ $t(`message.copy`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ElMessage } from 'element-plus';
import { js_beautify } from 'js-beautify';
import copyTextUsingClipboardAPI from '../../../utils/copy/index.js';
import { text } from '@fortawesome/fontawesome-svg-core';
const userData = ref('');
const code = ref('');
const handleDete = () => {
  (userData.value = ''), (code.value = '');
};

// onMounted(() => {
//   let text = ``;

//   // 去掉所有的 '+1'
//   text = text.replace(/\+1/g, '');

//   // 将所有的 '----' 替换成 '|'
//   text = text.replace(/----/g, '|');
//   console.log(text);
// });

//格式化
const handleformatCode = () => {
  // 这里假设 `code.value` 是你的压缩的HTML或JavaScript代码
  const rawCode = userData.value;

  const options = {
    indent_size: 4,
    space_in_empty_paren: true
    // 更多选项...
  };
  code.value = js_beautify(rawCode, options);
};

//压缩
//压缩代码
function compressCode(input) {
  // 压缩，这个只是一个简化的版本，实际情况下，应使用专业工具压缩
  const compressJS = js => js.replace(/\/\/.*$|\/\*[\s\S]*?\*\/|^\s+|\s+$|\s+(?=\s)/gm, '').trim();

  // 检测是否是HTML（简单检查，如果有`<`和`>`，我们假定它是HTML）
  return compressJS(input);
}
const handleCompressCode = () => {
  code.value = compressCode(userData.value);
};

const copy = () => {
  if (code.value == '') {
    ElMessage.error("There's no data yet");
    return;
  }
  copyTextUsingClipboardAPI(code.value);
};
</script>

<style scoped lang="scss">
.col2json {
  width: 100%;
  height: auto;
  margin-top: 0.8rem;
  .selet_box {
    width: 100%;
    height: 2.5rem;
  }
  .bottom_btn {
    width: 100%;
    height: auto;
    min-height: 2.5rem;
    padding: 0.8rem 0;
    display: flex;
    flex-wrap: wrap;
    .btn_item {
      margin-right: 0.8rem;
      margin-top: 0.8rem;
    }
  }
  .title {
    width: 100%;
    height: 2rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--paimary-color);
  }

  .Excel_box {
    width: 100%;
    height: 20rem;
    margin-top: 0.8rem;
    background: var(--primary-Headers);
  }
}
</style>
