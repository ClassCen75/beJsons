<template>
  <div class="xml2json">
    <div class="title">{{ $t(`message.xml2jsonTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="container_box">
      <div class="code_box">
        <CodeEditor v-model="JSONcode" />
      </div>
      <div class="center_box">
        <div class="inner_btn">
          <div class="JSON2XML">
            <Buttons :name="$t(`message.json2xml`)" @click="handleJSON2XML" />
          </div>
          <div class="XML2JSON">
            <Buttons :name="$t(`message.xml2json`)" @click="handleXML2JSON" />
          </div>
        </div>
      </div>
      <div class="code_box">
        <CodeEditor v-model="xmlCode" />
      </div>
    </div>
    <div class="bottom_btn">
      <div class="btn_item">
        <Buttons :name="$t(`message.empty`)" type="Danger" @click="handleDelete" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t(`message.DownloadJSON`)" @click="handleDownloadJSON" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t(`message.DownloadXML`)" @click="handleDownloadXML" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import Buttons from '../../../components/button/index.vue';
import { ElMessage } from 'element-plus';

// import { Builder, Parser } from 'xml2js';

const JSONcode = ref('');
const xmlCode = ref('');

const handleDelete = () => {
  JSONcode.value = '';
  xmlCode.value = '';
};

//JSON转XML
function objectToXml(obj, indent) {
  let xml = '';
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      xml += `${indent}<${prop}>${String(obj[prop])
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')}</${prop}>\n`;
    }
  }
  return xml;
}

function jsonToXml(jsonArray, rootElementName, childElementName) {
  if (jsonArray.a) {
    jsonArray = jsonArray.a.e;
  }
  const indent = '  '; // 2 spaces for indentation
  let xml = jsonArray
    .map(item => {
      return `${indent}<${childElementName}>\n${objectToXml(item, indent + indent)}${indent}</${childElementName}>\n`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>\n<${rootElementName}>\n${xml}</${rootElementName}>`;
}

const handleJSON2XML = () => {
  if (JSONcode.value == '') {
    ElMessage.warning('Please enter valid JSON format data');
    return;
  }
  //   const xmlOutput = `<?xml version="1.0" encoding="UTF-8" ?>\n<a>\n${jsonToXml(JSONcode.value, 'e')}\n</a>`;
  const xmlOutput = jsonToXml(JSON.parse(JSONcode.value), 'a', 'e');

  xmlCode.value = xmlOutput;
};
//JSON转XML 结束

//XML转JSON
function xmlToJson(xmlString) {
  // 将XML字符串解析为DOM对象
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'text/xml');

  // 定义将DOM节点转换为JSON对象的函数
  const nodeToObject = node => {
    // 对象将收集节点属性和子节点作为对象属性
    const obj = {};

    // 如果存在子节点，则添加它们
    if (node.hasChildNodes()) {
      const children = Array.from(node.childNodes);
      if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
        // 如果有一个子节点，而且它是文本，直接设置值
        return children[0].nodeValue;
      } else {
        // 否则对每个子节点进行递归
        children.forEach(child => {
          // 跳过空白文本节点
          if (child.nodeType === Node.TEXT_NODE && !child.nodeValue.trim()) {
            return;
          }

          // 如果该对象已经有这个属性，则创建一个数组
          const childObject = nodeToObject(child);
          if (obj.hasOwnProperty(child.nodeName)) {
            if (!Array.isArray(obj[child.nodeName])) {
              obj[child.nodeName] = [obj[child.nodeName]];
            }
            obj[child.nodeName].push(childObject);
          } else {
            obj[child.nodeName] = childObject;
          }
        });
      }
    }

    return obj;
  };

  // 从根节点开始转换
  const rootNodeName = xml.documentElement.nodeName;
  const result = nodeToObject(xml.documentElement);

  // 创建最终的JSON对象
  const json = {};
  json[rootNodeName] = result;

  return json;
}
const handleXML2JSON = () => {
  if (xmlCode.value == '') {
    ElMessage.warning('Please input data in XML format');
    return;
  }
  const jsonOutput = xmlToJson(xmlCode.value);
  const jsonOutput2 = JSON.stringify(jsonOutput);
  JSONcode.value = jsonOutput2.replace(/\[{/g, '[\n  {').replace(/\},{/g, '},\n  {').replace(/\}]/g, '}\n]');
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

//点击下载JSON
const handleDownloadJSON = () => {
  downloadJson(JSONcode.value, 'data.json');
};

//xml文件
function downloadXml(xmlData, filename) {
  // 创建一个Blob对象，类型为application/xml
  const blob = new Blob([xmlData], { type: 'application/xml' });
  // 创建一个指向该Blob的URL
  const url = URL.createObjectURL(blob);

  // 创建一个临时的a标签用于触发下载
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download.xml';

  // 将a标签插入到文档中并模拟点击
  document.body.appendChild(a);
  a.click();

  // 清理并移除创建的URL和a标签
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

//点击下载XML
const handleDownloadXML = () => {
  downloadXml(xmlCode.value, 'xmlData.xml');
};
</script>

<style scoped lang="scss">
@import '../../../assets/style/flex.scss';
.xml2json {
  width: 100%;
  height: auto;
  margin-top: 0.8rem;
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
  .container_box {
    width: 100%;
    height: 26rem;
    display: flex;
    margin-top: 0.8rem;
    .center_box {
      width: 15%;
      height: 100%;
      @include flex-center;
      .inner_btn {
        width: 100%;
        height: 10rem;
        .XML2JSON {
          width: 100%;
          height: 50%;
          @include flex-center;
        }
        .JSON2XML {
          width: 100%;
          height: 50%;
          @include flex-center;
        }
      }
      @media (max-width: 1000px) {
        .inner_btn {
          display: flex;
          height: auto;
        }
      }
    }
    .code_box {
      width: 42.5%;
      height: 100%;
      background: var(--primary-Headers);
    }
  }
  @media (max-width: 1000px) {
    .container_box {
      display: block;
      height: auto;
      .center_box {
        width: 100%;
        height: 4rem;
      }
      .code_box {
        width: 100%;
        height: 20rem;
      }
    }
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
