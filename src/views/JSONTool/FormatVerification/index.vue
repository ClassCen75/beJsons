<template>
  <div class="FormatVerification_box">
    <div class="title">{{ $t('message.jsonFormatTitle') }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="code_box">
      <CodeEditor v-model="code" />
    </div>
    <div class="btn_box">
      <div class="btn_item">
        <Buttons :name="$t('message.check')" type="Success" @click="handleCheck" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t('message.compress')" type="Success" @click="handleCompress" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t('message.Escape')" type="Success" @click="escapeJsonString(code)" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t('message.RemoveEscape')" type="Warning" @click="unescapeJsonString(code)" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t('message.copy')" type="Primary" @click="copyTextUsingClipboardAPI(code)" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t('message.UnicodeToChinese')" type="Success" @click="unicodeToChinese(code)" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t('message.ChineseToUnicode')" type="Success" @click="convertToUnicode(code)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Buttons from '../../../components/button/index.vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import CodeEditor from '../../../components/CodeEditor/index.vue';

const code = ref(``);

//压缩
const handleCompress = () => {
  let compactStrings = code.value.replace(/(\r\n|\n|\r|\s+)/gm, '');
  code.value = compactStrings;
};

function validateJSON(jsonString) {
  let lines = jsonString.split('\n');

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // 检查单引号
    if (/[^\\]'/g.test(line)) {
      let errorPos = line.search(/[^\\]'/g) + 1;
      return `Parsing error on line${
        i + 1
      }，position${errorPos}: ${line.trim()} ---^ Expected attribute name to have double quotes`;
    }

    // 检查缺失的双引号在属性名称上
    if (/[,{]\s*\w+\s*:/g.test(line)) {
      let errorPos = line.search(/[,{]\s*\w+\s*:/g) + 1;
      return `Parsing error on line${
        i + 1
      }，position${errorPos}: ${line.trim()} ---^ Expected attribute name to have double quotes`;
    }

    // // 检查非标准的双引号
    // if (line.includes('”') || line.includes('“')) {
    //   let errorPos = Math.max(line.indexOf('“'), line.indexOf('”'));
    //   return `第${i + 1}行解析错误，位置${errorPos}: ${line.trim()} ---^ 使用了非标准的双引号`;
    // }

    // // 检查中文逗号
    // if (line.includes('，')) {
    //   let errorPos = Math.max(line.indexOf(','));
    //   return `第${i + 1}行解析错误，位置${errorPos}: ${line.trim()} ---^ 使用了非标准的符号`;
    // }
  }

  try {
    JSON.parse(jsonString);
  } catch (e) {
    return 'JSON format is invalid';
  }

  return 'JSON format is valid';
}

//校验
const handleCheck = () => {
  code.value = code.value.replace(/\[{/g, '[\n  {').replace(/\},{/g, '},\n  {').replace(/\}]/g, '}\n]');
  const msg = validateJSON(code.value);
  if (msg !== 'JSON format is valid') {
    // alertMsg.value = validateJSON(code.value);
    // alertShow.value = true;
    // alertType.value = 'danger';
    ElMessage.error(msg);
    return;
  }

  ElMessage.success(msg);
};

//转义
const escapeJsonString = jsonString => {
  code.value = JSON.stringify(jsonString).slice(1, -1);
};

//去除转义
const unescapeJsonString = escapedString => {
  try {
    // 尝试直接解析，如果成功，则表示它已经是一个正常的 JSON 字符串
    JSON.parse(escapedString);
    code.value = escapedString;
  } catch (e) {
    // 如果直接解析失败，尝试去除转义
    try {
      code.value = JSON.parse(`"${escapedString}"`);
    } catch (err) {
      ElMessage.error('Unable to parse or remove escaped strings');
      return null;
    }
  }
};

//复制
const copyTextUsingClipboardAPI = async text => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied successfully');
    ElMessage.success('Text copied successfully');
  } catch (err) {
    console.error('Failed to copy text', err);
    ElMessage.error('Failed to copy text');
  }
};

//中文转code
const convertToUnicode = input => {
  const data = input.replace(/[\u4e00-\u9fa5]/g, function (match) {
    return '\\u' + match.charCodeAt(0).toString(16);
  });

  code.value = data;
};

//code转中文
const unicodeToChinese = input => {
  // const data = "'" + input + "'";

  let parsedData = JSON.parse(input);
  let data = JSON.stringify(parsedData);
  code.value = data.replace(/\[{/g, '[\n  {').replace(/\},{/g, '},\n  {').replace(/\}]/g, '}\n]');
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
