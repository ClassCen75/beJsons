<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.bese64Title`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="Excel_box">
      <CodeEditor v-model="userData" />
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="handleChange">{{ $t(`message.Base64Encryption`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" @click="handleDecrypting">{{ $t(`message.Base64Decryption`) }}</el-button>
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
        <el-button type="primary" @click="copy">{{ $t(`message.Downloadencryptionanddecryptioncode`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ElMessage } from 'element-plus';
import downloadJson from '../../../utils/download/index.js';
const userData = ref('');
const DecryptingData = ref('');
const handleDete = () => {
  (userData.value = ''), (DecryptingData.value = '');
};

function base64Encode(input) {
  if (input instanceof ArrayBuffer) {
    // 输入是ArrayBuffer，处理二进制数据
    let binaryString = String.fromCharCode.apply(null, new Uint8Array(input));
    return btoa(binaryString);
  } else if (typeof input === 'object' && input !== null) {
    // 输入是对象或数组，将其转换为JSON字符串
    let jsonString = JSON.stringify(input);
    return btoa(unescape(encodeURIComponent(jsonString)));
  } else if (typeof input === 'string') {
    // 输入是字符串，检查是否有字符不在Latin1范围内
    try {
      return btoa(input);
    } catch (e) {
      // 字符串包含非Latin1字符，先转换为UTF-8再编码
      return btoa(unescape(encodeURIComponent(input)));
    }
  } else {
    throw new Error('Invalid input: Input type must be ArrayBuffer, Object, or String.');
  }
}

//点击加密
const handleChange = () => {
  if (userData.value == '') {
    ElMessage.error('Please enter the data to be encrypted');
    return;
  }
  const data = base64Encode(userData.value);
  DecryptingData.value = data;
};

function base64Decode(encoded) {
  // 对Base64字符串进行解码，得到原始的二进制字符串
  let binaryString = atob(encoded);

  // 将二进制字符串转为字符数组
  let charCodes = binaryString.split('').map(function (char) {
    return char.charCodeAt(0);
  });

  // 将字符数组中的每个字符代码转换为二进制字节
  let binaryArray = new Uint8Array(charCodes);

  // 使用TextDecoder API来处理UTF-8解码
  let decoder = new TextDecoder('utf-8');
  let decodedText = decoder.decode(binaryArray);

  return decodedText;
}
//点击解密
const handleDecrypting = () => {
  if (userData.value == '') {
    ElMessage.error('Please enter the data to be encrypted');
    return;
  }
  const data = base64Decode(userData.value);
  DecryptingData.value = data;
};

const copy = () => {
  if (DecryptingData.value == '') {
    ElMessage.error("There's no data yet");
    return;
  }
  downloadJson(DecryptingData.value, 'bese64.text');
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
