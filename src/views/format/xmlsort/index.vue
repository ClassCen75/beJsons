<template>
  <div class="FormatVerification_box">
    <div class="title">{{ $t(`message.xmlsortTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="code_box">
      <CodeEditor v-model="code" />
    </div>
    <div class="btn_box">
      <div class="btn_item">
        <el-button type="primary" @click="formatXML">{{ $t(`message.format`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" @click="compressXML">{{ $t(`message.compress`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" @click="demo">{{ $t(`message.demo`) }}</el-button>
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
import vkBeautify from 'vkbeautify';
const code = ref(``);

const compressXML = () => {
  // 压缩 XML
  code.value = code.value.replace(/>\s{0,}</g, '><').trim();
};
const detele = () => {
  code.value = '';
};

//格式化
const formatXML = () => {
  code.value = vkBeautify.xml(code.value);
};

//来个demo
const demo = () => {
  code.value = `<?xml version="1.0" encoding="UTF-8"?><PARAM><DBID>35</DBID><SEQUENCE>atgtca</SEQUENCE><MAXNS>10</MAXNS><MINIDENTITIES>90</MINIDENTITIES><MAXEVALUE>10</MAXEVALUE><USERNAME>admin</USERNAME><PASSWORD>111111</PASSWORD><TYPE>P</TYPE><RETURN_TYPE>2</RETURN_TYPE></PARAM>`;
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
