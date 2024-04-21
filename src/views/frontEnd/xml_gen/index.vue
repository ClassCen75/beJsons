<template>
  <div class="FormatVerification_box">
    <div class="title">{{ $t(`message.xml_genTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="code_box">
      <CodeEditor v-model="code" />
    </div>
    <div class="btn_box">
      <div class="btn_item">
        <el-button type="primary" @click="randomJson">{{ $t(`message.GenerateXML`) }}</el-button>
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

function generateRandomString() {
  return Math.random().toString(36).substring(2, 10);
}

function generateRandomXML(maxLevels, maxElements, level = 1) {
  let xml = '';
  const indent = '  '.repeat(level - 1);

  if (level > maxLevels) {
    // 达到最大层级，返回一个简单的元素
    return `${indent}<element>${generateRandomString()}</element>\n`;
  }

  const elements = Math.floor(Math.random() * maxElements) + 1;
  for (let i = 0; i < elements; i++) {
    const tagName = `node_${generateRandomString()}`;
    const hasChildren = Math.random() > 0.5;
    xml += `${indent}<${tagName}>`;

    if (hasChildren) {
      // 递归生成子元素
      xml += `\n${generateRandomXML(maxLevels, maxElements, level + 1)}${indent}`;
    } else {
      // 或者添加文本内容
      xml += generateRandomString();
    }

    xml += `</${tagName}>\n`;
  }

  return xml;
}

// 例如：生成最大层级为3，每层最大元素为5的JSON
const randomJson = () => {
  const data = generateRandomXML(3, 5);
  code.value = `<root>
    ${data}
</root>`;
};

const detele = () => {
  code.value = '';
};

const copy = () => {
  if (code.value == '') {
    ElMessage.error("There's no data yet");
    return;
  }
  downloadJson(code.value, 'code.xml');
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
