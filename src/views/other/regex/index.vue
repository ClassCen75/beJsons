<template>
  <div class="col2json">
    <div class="title">{{ $t(`message.regexTitle`) }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="Excel_box">
      <CodeEditor v-model="userData" />
    </div>
    <div class="regex_box">
      <span>{{ $t(`message.regularexpression`) }} </span><span style="color: #409eff">{{ regex_data }}</span>
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
    <div class="bottom_btn">
      <div class="btn_item">
        <el-button type="primary" @click="handleData">{{ $t(`message.TestMatching`) }}</el-button>
      </div>
      <div class="btn_item">
        <el-button type="danger" @click="handleDete">{{ $t(`message.empty`) }}</el-button>
      </div>
    </div>

    <div class="Excel_box">
      <CodeEditor v-model="JSONcode" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import CodeEditor from '../../../components/CodeEditor/index.vue';
import dropdown from '../../../components/dropdown/index.vue';
import { ElMessage } from 'element-plus';
const userData = ref('');
const JSONcode = ref('');

const regex_data = ref('');
const data = reactive([
  {
    title: 'MatchChinesecharacters',
    router: 'MatchChinesecharacters',
    id: 1,
    icon: 'repeat',
    active: true,
    regex: /[\u4e00-\u9fa5]/g
  },
  {
    title: 'Matchdoublebyte',
    router: 'Matchdoublebyte',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /[^\x00-\xff]/g
  },
  {
    title: 'Matchblanklines',
    router: 'Matchblanklines',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /\n\r|\r\n|\n|\r/g
  },
  {
    title: 'MatchEmailAddress',
    router: 'MatchEmailAddress',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  },
  {
    title: 'MatchwebsiteURL',
    router: 'MatchwebsiteURL',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /[a-zA-z]+:\/\/[^\s]/
  },
  {
    title: 'Matchdomesticphonenumbers',
    router: 'Matchdomesticphonenumbers',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /\d{3}-\d{8}|\d{4}-\d{7}/
  },
  {
    title: 'MatchTencentQQnumber',
    router: 'MatchTencentQQnumber',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /[1-9][0-9]{4,}/
  },
  {
    title: 'MatchChinaPostalCode',
    router: 'MatchChinaPostalCode',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /[1-9]\d{5}(?!\d)/
  },
  {
    title: 'Match18digitIDnumber',
    router: 'Match18digitIDnumber',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
  },
  {
    title: 'Matchyearmonthdayformatdate',
    router: 'Matchyearmonthdayformatdate',
    id: 2,
    icon: 'repeat',
    active: false,
    regex:
      /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/
  },
  {
    title: 'Matchpositiveintegers',
    router: 'Matchpositiveintegers',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /^[1-9]\d*$/
  },
  {
    title: 'Matchnegativeintegers',
    router: 'Matchnegativeintegers',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /^-[1-9]\d*$/
  },
  {
    title: 'Matchintegers',
    router: 'Matchintegers',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /^-?[1-9]\d*$/
  },
  {
    title: 'Matchnonnegativeintegerspositive',
    router: 'Matchnonnegativeintegerspositive',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /^[1-9]\d*|0$/
  },
  {
    title: 'Matchnonpositiveintegers',
    router: 'Matchnonpositiveintegers',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /^-[1-9]\d*|0$/
  },
  {
    title: 'Matchpositivefloatingpointnumbers',
    router: 'Matchpositivefloatingpointnumbers',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /^(0|[1-9]+[0-9]*)(.[0-9]{1,4})?$/
  },
  {
    title: 'Matchingnegativefloatingpointnumbers',
    router: 'Matchingnegativefloatingpointnumbers',
    id: 2,
    icon: 'repeat',
    active: false,
    regex: /^-(0|[1-9]+[0-9]*)(.[0-9]{1,4})?$/
  }
]);
const dropdownHide = ref(data[0].title);
const trigger = ref(false);

const dropdownShow = () => {
  trigger.value = !trigger.value;
};

//点击测试
const handleData = () => {
  if (regex_data.value === '') {
    return;
  }
  try {
    let chineseMatches = userData.value.match(regex_data.value);
    let chineseCount = chineseMatches.length;

    let str = `Found in total ${chineseCount} Match at：\n`;
    for (let i = 0; i < chineseMatches.length; i++) {
      str += `\n${chineseMatches[i]}`;
    }

    JSONcode.value = str;
  } catch (e) {
    JSONcode.value = '(No matching results)';
  }
};

const dropdownItem = i => {
  dropdownHide.value = i.title;
  regex_data.value = i.regex;
};

const handleDete = () => {
  (userData.value = ''), (JSONcode.value = '');
};

const copy = () => {
  downloadJson(JSONcode.value, 'data.json');
};
</script>

<style scoped lang="scss">
.col2json {
  width: 100%;
  height: auto;
  margin-top: 0.8rem;
  .regex_box {
    width: 100%;
    height: 2.5rem;
    margin-top: 0.8rem;
    background-color: var(--img-bg);
    border-radius: 0.4rem;
    line-height: 2.5rem;
    text-indent: 0.8rem;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: blue orange;
  }
  .selet_box {
    width: 100%;
    height: 2.5rem;
    margin-top: 0.8rem;
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
