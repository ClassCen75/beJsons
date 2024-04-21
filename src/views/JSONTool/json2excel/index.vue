<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.json2excelTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="Excel_box">
      <CodeEditor v-model="JSONcode" />
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="handleChange">{{ $t(`message.convert`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="info" @click="handleDemo">{{ $t(`message.demo`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="danger" @click="handleDete">{{ $t(`message.empty`) }}</el-button>
      </div>
    </div>

    <div class="Excel_box">
      <CodeEditor v-model="ExcelData" />
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="copy">{{ $t(`message.DownloadJSON`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import { ElMessage } from 'element-plus';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
const ExcelData = ref('');
const JSONcode = ref('');

const handleDemo = () => {
  JSONcode.value = `[
  {
    "姓名": "demo1",
    "年龄": "256",
    "地址": "NBAN",
    "电话": "180",
    "爱好": "2"
  },
  {
    "姓名": "demo2",
    "年龄": "256",
    "地址": "NBAN",
    "电话": "181",
    "爱好": "3"
  },
  {
    "姓名": "demo3",
    "年龄": "256",
    "地址": "NBAN",
    "电话": "182",
    "爱好": "4"
  }
]
  `;
};

const handleDete = () => {
  (ExcelData.value = ''), (JSONcode.value = '');
};

function jsonToExcelString(jsonData) {
  // 确保jsonData是一个对象数组
  if (!Array.isArray(jsonData) || !jsonData.length || typeof jsonData[0] !== 'object') {
    return '';
  }

  // 获取表头（对象的键）作为Excel的列名
  const headers = Object.keys(jsonData[0]);

  // 将表头数组转换为由制表符分隔的字符串
  const headerRow = headers.join('\t');

  // 将每个对象的值转换为由制表符分隔的字符串
  const dataRows = jsonData.map(obj =>
    // 对于每个对象，遍历其键，并按照表头的顺序获取其值
    headers.map(header => obj[header]).join('\t')
  );

  // 将所有行（包括表头）连接起来，每行用换行符分隔
  return [headerRow, ...dataRows].join('\n');
}

//点击转化
const handleChange = () => {
  try {
    const data = jsonToExcelString(JSON.parse(JSONcode.value));
    ExcelData.value = data;
  } catch (e) {
    ElMessage.error('Please enter valid JSON format data');
  }
};

//JSON文件生成
function downloadJson(data, filename) {
  // 将JSON对象转换成字符串
  const jsonString = JSON.stringify(data, null, 2);
  // 创建一个Blob对象，类型为application/json
  const blob = new Blob([jsonString], { type: 'application/json' });
  // 创建一个指向该Blob的URL
  const url = URL.createObjectURL(blob);

  // 创建一个临时的a标签用于触发下载
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download.json';

  // 将a标签插入到文档中并模拟点击
  document.body.appendChild(a);
  a.click();

  // 清理并移除创建的URL和a标签
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

const copy = () => {
  downloadJson(ExcelData.value, 'Excel.text');
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
