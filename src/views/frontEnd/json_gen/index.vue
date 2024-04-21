<template>
  <div class="FormatVerification_box">
    <div class="title">{{ $t(`message.json_genTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="code_box">
      <CodeEditor v-model="code" />
    </div>
    <div class="btn_box">
      <div class="btn_item">
        <el-button type="primary" @click="randomJson">{{ $t(`message.GenerateJSON`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="danger" @click="detele">{{ $t(`message.empty`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button @click="copy">{{ $t(`message.downloadFile`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import downloadJson from '../../../utils/download/index.js';
const code = ref(``);

function getRandomDataType() {
  const types = ['number', 'string', 'boolean', 'null', 'object', 'array'];
  return types[Math.floor(Math.random() * types.length)];
}

function generateRandomData(type) {
  switch (type) {
    case 'number':
      return Math.floor(Math.random() * 100);
    case 'string':
      return Math.random().toString(36).substring(2, 15);
    case 'boolean':
      return Math.random() < 0.5;
    case 'null':
      return null;
    case 'object':
      return {}; // 将在下一个函数中填充
    case 'array':
      return []; // 将在下一个函数中填充
    default:
      return null;
  }
}

function generateRandomJson(maxLevels, maxElements, level = 1) {
  if (level > maxLevels) return generateRandomData('null');

  const elements = Math.floor(Math.random() * maxElements) + 1; // 确保每层至少有一个元素
  const isObject = Math.random() > 0.5;

  if (isObject) {
    let result = {};
    for (let i = 0; i < elements; i++) {
      const key = Math.random().toString(36).substring(2, 15);
      const type = getRandomDataType();
      if (type === 'object') {
        result[key] = generateRandomJson(maxLevels, maxElements, level + 1);
      } else if (type === 'array') {
        result[key] = generateRandomJson(maxLevels, maxElements, level + 1);
      } else {
        result[key] = generateRandomData(type);
      }
    }
    return result;
  } else {
    let result = [];
    for (let i = 0; i < elements; i++) {
      const type = getRandomDataType();
      if (type === 'object') {
        result.push(generateRandomJson(maxLevels, maxElements, level + 1));
      } else if (type === 'array') {
        result.push(generateRandomJson(maxLevels, maxElements, level + 1));
      } else {
        result.push(generateRandomData(type));
      }
    }
    return result;
  }
}

// 例如：生成最大层级为3，每层最大元素为5的JSON
const randomJson = () => {
  const data = generateRandomJson(3, 5);
  code.value = JSON.stringify(data, null, 2);
};

const detele = () => {
  code.value = '';
};

const copy = () => {
  if (code.value == '') {
    ElMessage.error("There's no data yet");
    return;
  }
  downloadJson(code.value, 'code.json');
};
</script>

<style scoped lang="scss">
.FormatVerification_box {
  width: 100%;
  height: auto;
  margin-top: 0.8rem;
  .btn_box {
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
  .code_box {
    width: 100%;
    height: 20rem;
    background: var(--primary-Headers);
    overflow: auto;
    margin-top: 0.8rem;
  }
  .title {
    width: 100%;
    height: 2rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--paimary-color);
  }
}
</style>
