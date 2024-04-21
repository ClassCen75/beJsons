<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.unicode_chineseTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="Excel_box">
      <CodeEditor v-model="userData" />
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="handleUnicode2Ch">{{ $t(`message.UnicodetoChinese`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" @click="handleCh2Unicode">{{ $t(`message.ChinesetoUnicode`) }}</el-button>
      </div>

      <div class="btn_item">
        <el-button type="danger" @click="handleDete">{{ $t(`message.empty`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
const userData = ref('');

const handleDete = () => {
  userData.value = '';
};

const route = useRoute();

onMounted(() => {
  console.log(route);
});

function encodeToUnicode(str) {
  return str
    .split('')
    .map(function (value, index, array) {
      var temp = value.charCodeAt(0).toString(16).padStart(4, '0');
      return '\\u' + temp;
    })
    .join('');
}

//中文转unicode
const handleCh2Unicode = () => {
  if (userData.value == '') {
    ElMessage.error('Please enter data');
    return;
  }

  const data = encodeToUnicode(userData.value);
  userData.value = data;
};

function decodeUnicode(unicodeStr) {
  // 使用正则表达式和String.fromCharCode来解析并转换Unicode码点
  return unicodeStr.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

//unicode转中文
const handleUnicode2Ch = () => {
  if (userData.value == '') {
    ElMessage.error('Please enter the data to decrypt');
    return;
  }

  const data = decodeUnicode(userData.value);
  userData.value = data;
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
