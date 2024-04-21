<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.uplowercaseTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="Excel_box">
      <CodeEditor v-model="userData" />
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="handleChange">{{ $t(`message.Converttolowercase`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" @click="handleDecrypting">{{ $t(`message.Converttouppercaseletters`) }}</el-button>
      </div>

      <div class="btn_item">
        <el-button type="danger" @click="handleDete">{{ $t(`message.empty`) }}</el-button>
      </div>
    </div>

    <div class="Excel_box">
      <CodeEditor v-model="DecryptingData" />
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="copy">{{ $t(`message.copy`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ElMessage } from 'element-plus';
import copyTextUsingClipboardAPI from '../../../utils/copy/index.js';
const userData = ref('');
const DecryptingData = ref('');

const handleDete = () => {
  (userData.value = ''), (DecryptingData.value = '');
};

//转小写
const handleChange = () => {
  DecryptingData.value = userData.value.toLowerCase();
};

//转大写
const handleDecrypting = () => {
  DecryptingData.value = userData.value.toUpperCase();
};

const copy = () => {
  if (DecryptingData.value == '') {
    ElMessage.error("There's no data yet");
    return;
  }
  copyTextUsingClipboardAPI(DecryptingData.value);
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
