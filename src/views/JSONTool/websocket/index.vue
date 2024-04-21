<template>
  <div class="FormatVerification_box">
    <div class="title">{{ $t('message.websocket_io') }}</div>
    <div>
      <Breadcrumb />
    </div>
    <div class="input_box">
      <el-input v-model="websocket_address" :placeholder="$t('message.PleaseentertheWebsocketaddressobedetected')">
        <template #prepend>ws://</template>
      </el-input>
    </div>
    <div class="btn_box">
      <div class="btn_item">
        <Buttons :name="$t('message.Websocketconnection')" type="Primary" @click="connect" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t('message.Disconnect')" type="Warning" @click="Disconnect" />
      </div>
      <div class="btn_item">
        <Buttons :name="$t('message.empty')" type="Danger" @click="empty" />
      </div>
    </div>
    <div class="input_box">
      <el-input v-model="send_msg" :placeholder="$t('message.Pleaseenteratestmessage')" class="input-with-select">
        <template #append>
          <el-button type="primary" @click="handleSendMsg">{{ $t('message.send') }}</el-button>
        </template>
      </el-input>
    </div>

    <div class="code_box">
      <CodeEditor v-model="code" disabled />
    </div>
  </div>
</template>

<script setup>
import Buttons from '../../../components/button/index.vue';
import Breadcrumb from '../../../components/Breadcrumb/index.vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import CodeEditor from '../../../components/CodeEditor/index.vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const code = ref(``);

const websocket_address = ref('');

const send_msg = ref('');

let ws;
const connect = () => {
  if (websocket_address.value == '') {
    ElMessage.error(t('message.Pleaseenterthewebsocketaddress'));
    return;
  }

  let now = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  ws = new WebSocket(websocket_address.value);
  ws.onopen = () => {
    code.value += `\n${now}  ${t('message.Successfullyconnected')}`;
  };
  ws.onmessage = e => {
    let nows = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const data = e.data;
    code.value += `\n${nows}  ${t('message.Receivednewmessage')}${data}`;
  };
  ws.onclose = () => {
    code.value += `\n${now}  ${t('message.connectionclosed')}`;
  };
  ws.onerror = () => {
    code.value += `\n${now}  ${t('message.connectfailed')}`;
  };
};

//点击发送消息
const handleSendMsg = () => {
  if (!ws) {
    code.value += `\n${t('message.Connectionnotestablishedpleaseconnectfirst')}`;
    return;
  }
  if (send_msg.value == '') {
    ElMessage.error(t('message.Pleaseenteratestmessage'));
    return;
  }
  let now = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  //发送消息

  ws.send(send_msg.value);
  if (ws.readyState === 1) {
    code.value += `\n${now}  ${t('message.Messagesentsuccessfully')} ${send_msg.value}`;
    send_msg.value = '';
  } else {
    code.value += `\n${now}  ${t('message.Messagesendingfailed')} ${send_msg.value}`;
    send_msg.value = '';
  }
};
//点击断开连接
const Disconnect = () => {
  let now = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  ws.close();
  code.value += `\n${now}  ${t('message.Disconnect')}`;
};

const empty = () => {
  ws.close();
  code.value = '';
  send_msg.value = '';
  websocket_address.value = '';
};
</script>

<style scoped lang="scss">
.FormatVerification_box {
  width: 100%;
  height: auto;
  margin-top: 0.8rem;
  .input_box {
    width: 100%;
    height: auto;
    min-height: 2.5rem;
    margin-top: 1.8rem;
  }
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
