<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.urlCodeTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="Excel_box">
      <CodeEditor v-model="userData" />
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="handleChangeURL">{{ $t(`message.urlCodeTitle`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" @click="handleDecrypting">{{ $t(`message.URLdecoding`) }}</el-button>
      </div>

      <div class="btn_item">
        <el-button type="danger" @click="handleDete">{{ $t(`message.empty`) }}</el-button>
      </div>
    </div>

    <div class="CodeEditor_box">
      <div class="left_encodeURI">
        <span style="width: 100%; height: 2rem; line-height: 2rem; font-size: 0.9rem">{{
          $t(`message.EncodeURI`)
        }}</span>
        <div style="height: 18rem; background: var(--primary-Headers)">
          <CodeEditor v-model="encodeURIData" />
        </div>
      </div>

      <div class="left_encodeURI" v-if="showData">
        <span style="width: 100%; height: 2rem; line-height: 2rem; font-size: 0.9rem">{{
          $t(`message.EncodeURIComponent`)
        }}</span>
        <div style="height: 18rem; background: var(--primary-Headers)">
          <CodeEditor v-model="encodeURIComponentData" />
        </div>
      </div>
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="copy">{{ $t(`message.Downloadencryptionanddecryptioncode`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ElMessage } from 'element-plus';
const userData = ref('');
const encodeURIData = ref('');
const encodeURIComponentData = ref('');

const showData = ref(true);

const handleDete = () => {
  (userData.value = ''), (encodeURIData.value = ''), (encodeURIComponentData.value = '');
};

//编码
function encodeStringForURL(str) {
  // 使用encodeURI进行编码
  const encodeURIResult = encodeURI(str);

  // 使用encodeURIComponent进行编码
  const encodeURIComponentResult = encodeURIComponent(str);

  // 返回一个对象，包含两种编码结果
  return {
    encodeURI: encodeURIResult,
    encodeURIComponent: encodeURIComponentResult
  };
}

//解码
function decodeURIComponentSafely(encodedStr) {
  try {
    // 尝试使用decodeURIComponent解码
    return decodeURIComponent(encodedStr);
  } catch (e) {
    // 如果解码过程中出现错误，可能是因为字符串使用了encodeURI
    // 因此，尝试使用decodeURI进行解码
    try {
      return decodeURI(encodedStr);
    } catch (e) {
      // 如果再次失败，则返回错误信息
      return 'Decoding error: ' + e.message;
    }
  }
}

//点击加密
const handleChangeURL = () => {
  if (userData.value == '') {
    ElMessage.error('Please enter the data to be encrypted');
    return;
  }

  if (!showData.value) {
    showData.value = true;
  }

  const { encodeURI, encodeURIComponent } = encodeStringForURL(userData.value);
  encodeURIData.value = encodeURI;
  encodeURIComponentData.value = encodeURIComponent;
};

//点击解密
const handleDecrypting = () => {
  if (userData.value == '') {
    ElMessage.error('Please enter the data to decrypt');
    return;
  }

  if (showData.value) {
    showData.value = false;
  }

  const data = decodeURIComponentSafely(userData.value);
  encodeURIData.value = data;
};

//文件生成
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
  if (encodeURIData.value == '') {
    ElMessage.error("There's no data yet");
    return;
  }
  downloadJson(encodeURIData.value, 'encodeURI.text');
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
    background: var(--primary-Headers);
    margin-top: 0.8rem;
  }

  .CodeEditor_box {
    width: 100%;
    height: 20rem;
    display: flex;
    justify-content: space-between;
    .left_encodeURI {
      width: 48%;
      height: 100%;
    }
  }

  @media (max-width: 960px) {
    .CodeEditor_box {
      display: block;
      height: auto;
      .left_encodeURI {
        width: 100%;
        margin-top: 0.8rem;
      }
    }
  }
}
</style>
