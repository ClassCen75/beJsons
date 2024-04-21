<template>
  <div class="FormatVerification_box">
    <div class="title">{{ $t(`message.jshtml_formatTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="code_box">
      <CodeEditor v-model="code" />
    </div>
    <div class="btn_box">
      <div class="btn_item">
        <el-button type="primary" @click="handleformatCode">{{ $t(`message.format`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" @click="handleCompressCode">{{ $t(`message.compress`) }}</el-button>
      </div>

      <div class="btn_item">
        <el-button type="danger" @click="code = ''">{{ $t(`message.empty`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button @click="copy">{{ $t(`message.downloadFile`) }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Buttons from '../../../components/button/index.vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import { html_beautify, js_beautify } from 'js-beautify';
import { minify } from 'terser';
import downloadJson from '../../../utils/download/index.js';

const store = useStore();

const code = ref(``);
const type = ref('javascript');

// //压缩代码
function compressCode(input) {
  // 压缩HTML，通过移除不必要的空白字符
  const compressHTML = html => html.replace(/\s+/g, ' ').trim();

  // 压缩JS，这个只是一个简化的版本，实际情况下，应使用专业工具压缩
  // const compressJS = js => js.replace(/\/\/.*$|\/\*[\s\S]*?\*\/|^\s+|\s+$|\s+(?=\s)/gm, '').trim();

  // 检测是否是HTML（简单检查，如果有`<`和`>`，我们假定它是HTML）
  return compressHTML(input);
}

const handleCompressCode = () => {
  type.value = determineCodeType(code.value); //unknown
  console.log(type.value);
  if (type.value === 'html') {
    code.value = compressCode(code.value);
  } else if (type.value === 'javascript') {
    if (code.value.trim()) {
      minify(code.value)
        .then(result => {
          if (result.error) {
            console.error('Compression process error:', result.error);
            outputCode.value = 'Compression process error:' + result.error.message;
          } else {
            code.value = result.code;
          }
        })
        .catch(error => {
          console.error('Compression process error:', error);
          code.value = 'Compression process error:' + error.message;
        });
    } else {
      code.value = '';
      ElMessage.error('Please enter the code!');
    }
  } else if (type.value === 'unknown') {
    ElMessage.error('Code type cannot be unknown');
  }
};

//判断用户输入的代码是什么类型
function determineCodeType(codeString) {
  // 简单的正则表达式检查是否为HTML
  if (
    /^\s*<(!doctype|html|body|head|title|h[1-6]|div|p|a|span|img|ul|ol|li|table|tr|td|th|thead|tbody|tfoot|input|script)[\s>]/i.test(
      codeString
    )
  ) {
    return 'html';
  }
  // 简单的正则表达式检查是否为JavaScript
  if (/^\s*(var|let|const|function|=>|class|import|export|default|if|while|for|switch|return)\s/.test(codeString)) {
    return 'javascript';
  }
  // 默认为未知
  return 'unknown';
}

//点击格式化
const handleformatCode = () => {
  type.value = determineCodeType(code.value);

  // 这里假设 `code.value` 是你的压缩的HTML或JavaScript代码
  const rawCode = code.value;

  const options = {
    indent_size: 4,
    space_in_empty_paren: true
    // 更多选项...
  };

  let formattedCode;
  if (type.value === 'html') {
    formattedCode = html_beautify(rawCode, options);
  } else if (type.value === 'javascript') {
    formattedCode = js_beautify(rawCode, options);
  } else {
    formattedCode = js_beautify(rawCode, options);
  }

  // 输出格式化后的代码
  code.value = formattedCode;
};

const copy = () => {
  if (code.value == '') {
    ElMessage.error("There's no data yet");
    return;
  }
  downloadJson(code.value, 'code.text');
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
