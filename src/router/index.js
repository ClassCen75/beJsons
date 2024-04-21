import { createRouter, createWebHistory } from 'vue-router';
// import Home from './../views/home/index.vue';
import store from './../store/index.js'; // 引入 Vuex store

const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/layout',
    component: () => import('./../views/home/index.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        name: 'layout',
        path: '/layout',
        redirect: '/JSONTool',
        component: () => import('./../components/layout/index.vue'),
        meta: {
          title: 'layout'
        },
        children: [
          {
            name: 'JSONTool',
            path: '/JSONTool',
            component: () => import('./../views/JSONTool/index.vue'),
            meta: {
              title: 'JSONTool'
            }
          },
          {
            name: 'EncodingEncryption',
            path: '/EncodingEncryption',
            component: () => import('./../views/EncodingEncryption/index.vue'),
            meta: {
              title: 'EncodingEncryption'
            }
          },
          {
            name: 'format',
            path: '/format',
            component: () => import('./../views/format/index.vue'),
            meta: {
              title: 'format'
            }
          },
          {
            name: 'frontEnd',
            path: '/frontEnd',
            component: () => import('./../views/frontEnd/index.vue'),
            meta: {
              title: 'frontEnd'
            }
          },
          {
            name: 'convert',
            path: '/convert',
            component: () => import('./../views/convert/index.vue'),
            meta: {
              title: 'convert'
            }
          },
          {
            name: 'other',
            path: '/other',
            component: () => import('./../views/other/index.vue'),
            meta: {
              title: 'other'
            }
          }
        ]
      },
      {
        name: 'FormatVerification',
        path: 'jsonFormat',
        meta: {
          title: '格式化校验'
        },
        component: () => import('./../views/JSONTool/FormatVerification/index.vue')
      },
      {
        name: 'xml2json',
        path: 'xml2json',
        meta: {
          title: 'XML-JSON互转'
        },
        component: () => import('./../views/JSONTool/xml2json/index.vue')
      },
      {
        name: 'col2json',
        path: 'col2json',
        meta: {
          title: 'Excel转Json'
        },
        component: () => import('./../views/JSONTool/col2json/index.vue')
      },
      {
        name: 'json2excel',
        path: 'json2excel',
        meta: {
          title: 'JSON转cvs,excel'
        },
        component: () => import('./../views/JSONTool/json2excel/index.vue')
      },
      {
        name: 'bese64',
        path: 'bese64',
        meta: {
          title: 'Base64加密、解密'
        },
        component: () => import('./../views/EncodingEncryption/bese64/index.vue')
      },
      {
        name: 'urlCode',
        path: 'urlCode',
        meta: {
          title: 'URL编码'
        },
        component: () => import('./../views/EncodingEncryption/urlCode/index.vue')
      },
      {
        name: 'unicode_chinese',
        path: 'unicode_chinese',
        meta: {
          title: 'unicode中文互转'
        },
        component: () => import('./../views/EncodingEncryption/unicode_chinese/index.vue')
      },
      {
        name: 'jshtml_format',
        path: 'jshtml_format',
        meta: {
          title: 'Javascript/HTML压缩、格式化'
        },
        component: () => import('./../views/format/jshtml_format/index.vue')
      },
      {
        name: 'xmlsort',
        path: 'xmlsort',
        meta: {
          title: 'XML压缩、格式化'
        },
        component: () => import('./../views/format/xmlsort/index.vue')
      },
      {
        name: 'java_formater',
        path: 'java_formater',
        meta: {
          title: 'Java代码在线格式化工具'
        },
        component: () => import('./../views/format/java_formater/index.vue')
      },
      {
        name: 'compress_img',
        path: 'compress_img',
        meta: {
          title: '图片压缩工具'
        },
        component: () => import('./../views/frontEnd/compress_img/index.vue')
      },
      {
        name: 'json_gen',
        path: 'json_gen',
        meta: {
          title: 'json随机生成工具'
        },
        component: () => import('./../views/frontEnd/json_gen/index.vue')
      },
      {
        name: 'xml_gen',
        path: 'xml_gen',
        meta: {
          title: 'xml随机生成工具'
        },
        component: () => import('./../views/frontEnd/xml_gen/index.vue')
      },
      {
        name: 'uplowercase',
        path: 'uplowercase',
        meta: {
          title: '字母大小写转换'
        },
        component: () => import('./../views/convert/uplowercase/index.vue')
      },
      {
        name: 'regex',
        path: 'regex',
        meta: {
          title: '正则表达式测试'
        },
        component: () => import('./../views/other/regex/index.vue')
      },
      {
        name: 'SVGConversion',
        path: 'SVGConversion',
        meta: {
          title: '图片格式转SVG格式'
        },
        component: () => import('./../views/frontEnd/SVGConversion/index.vue')
      },
      {
        name: 'websocket',
        path: 'websocket',
        meta: {
          title: 'websocket测试'
        },
        component: () => import('./../views/JSONTool/websocket/index.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

let time;
let time2;

router.beforeEach((to, from, next) => {
  let width = 0;
  clearTimeout(time);
  time2 = setInterval(() => {
    if (width >= 85) {
      return;
    }
    width += 12;
    store.commit('SET_LOADING_SHOW', { widthValue: width, loaderShow: true }); // 显示加载动画
  }, 500);

  next(); // 正常继续导航
});

router.afterEach(() => {
  // 隐藏加载动画
  clearInterval(time2);
  store.commit('SET_LOADING_SHOW', { widthValue: 100, loaderShow: true }); // 显示加载动画
  time = setTimeout(() => {
    store.commit('SET_LOADING_SHOW', { widthValue: 0, loaderShow: false }); // 隐藏加载动画
  }, 500);
});

export default router;
