<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.col2jsonTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="Excel_box">
      <CodeEditor v-model="ExcelData" />
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
    <div class="selet_box">
      <dropdown
        :title="dropdownHide"
        :data="data"
        :trigger="trigger"
        @dropdownShow="dropdownShow"
        @dropdownItem="dropdownItem"
      />
    </div>
    <div class="Excel_box">
      <CodeEditor v-model="JSONcode" />
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
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import dropdown from '../../../components/dropdown/index.vue';
import { ElMessage } from 'element-plus';
const ExcelData = ref('');
const JSONcode = ref('');
const data = reactive([
  {
    title: 'Converttoobjects',
    id: 1,
    icon: 'repeat',
    active: true,
    router: 'Converttoobjects'
  },
  {
    title: 'Converttoarrays',
    id: 2,
    icon: 'repeat',
    active: false,
    router: 'Converttoarrays'
  }
]);
const dropdownHide = ref(data[0].title);
const trigger = ref(false);

const dropdownShow = () => {
  trigger.value = !trigger.value;
};

const dropdownItem = i => {
  dropdownHide.value = i.title;
};

const handleDemo = () => {
  ExcelData.value = `姓名	年龄	地址	电话	爱好
demo1	256	NBAN	180	2
demo2	256	NBAN	181	3
demo3	256	NBAN	182	4
demo4	256	NBAN	183	5
demo5	256	NBAN	184	6
demo6	256	NBAN	185	7
demo7	256	NBAN	186	8
demo8	257	NBAN	187	9
demo9	258	NBAN	188	10
demo10	259	NBAN	189	11
demo11	260	NBAN	190	12
demo12	261	NBAN	191	13
demo13	262	NBAN	192	14
demo14	263	NBAN	193	15
demo15	264	NBAN	194	16
demo16	265	NBAN	195	17
demo17	266	NBAN	196	18
demo18	267	NBAN	197	19
demo19	268	NBAN	198	20
demo20	269	NBAN	199	21
demo21	270	NBAN	200	22
demo22	271	NBAN	201	23
demo23	272	NBAN	202	24
demo24	273	NBAN	203	25
demo25	274	NBAN	204	26

`;
};

const handleDete = () => {
  (ExcelData.value = ''), (JSONcode.value = '');
};

//转对象
function convertExcelDataToJson(excelData) {
  // 分割数据成行
  const rows = excelData.trim().split('\n');

  // 第一行包含列名
  const columnNames = rows[0].split('\t');

  // 跳过第一行的列名，处理每一行数据
  const jsonResult = rows.slice(1).map(row => {
    const values = row.split('\t');
    let obj = {};
    columnNames.forEach((columnName, index) => {
      obj[columnName] = values[index];
    });
    return obj;
  });

  return jsonResult;
}

//转数组
function convertExcelDataToArray(excelData) {
  // 分割数据成行
  const rows = excelData.trim().split('\n');

  // 将每行分割成数组
  const arrayResult = rows.map(row => row.split('\t'));

  return arrayResult;
}

//点击转化
const handleChange = () => {
  if (ExcelData.value == '') {
    ElMessage.error("There's no data yet");
    return;
  }
  if (dropdownHide.value === 'Converttoobjects') {
    let data = JSON.stringify(convertExcelDataToJson(ExcelData.value), null, 2);
    JSONcode.value = data;
  } else if (dropdownHide.value === 'Converttoarrays') {
    let data = convertExcelDataToArray(ExcelData.value);
    JSONcode.value = JSON.stringify(data, null, 2);
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
  downloadJson(JSONcode.value, 'data.json');
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
