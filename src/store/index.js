/**
 *
 * vuex 状态管理
 */
import { createStore } from 'vuex';
import mutations from './mutations';
import storage from './../utils/storage';
const state = {
  label: [
    {
      title: 'JSONTool',
      id: 1,
      icon: 'repeat',
      active: true,
      router: 'JSONTool'
    },
    {
      title: 'Encoding / Encryption',
      id: 2,
      icon: 'underline',
      active: false,
      router: 'EncodingEncryption'
    },
    {
      title: 'format',
      id: 3,
      icon: 'list',
      active: false,
      router: 'format'
    },
    {
      title: 'frontEnd',
      id: 4,
      icon: 'folder-open',
      active: false,
      router: 'frontEnd'
    },
    {
      title: 'convert',
      id: 5,
      icon: 'hashtag',
      active: false,
      router: 'convert'
    },
    {
      title: 'other',
      id: 6,
      icon: 'link',
      active: false,
      router: 'other'
    }
  ],
  labelTitle: 'JSONTool',
  theme: 'light',
  BreadcrumbData: [
    {
      title: '首页',
      path: '/'
    },
    {
      title: '',
      path: '/'
    }
  ],
  loaderShow: false,
  widthValue: 0
};
export default createStore({
  state,
  mutations
});
