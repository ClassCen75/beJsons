/**
 * mutations 业务层
 */

export default {
  SET_LABEL_ACTIVE(state, payload) {
    const route = payload.replace('/', '');
    for (const item of state.label) {
      item.active = false;
      if (item.router === route) {
        state.labelTitle = item.title;
        item.active = true;
      }
    }
  },
  SET_THEME_TYPE(state, payload) {
    state.theme = payload;
  },
  //面包屑赋值
  SET_V_data(state, payload) {
    state.BreadcrumbData = payload.slice(2);
  },
  //
  SET_LOADING_SHOW(state, payload) {
    state.widthValue = payload.widthValue;
    state.loaderShow = payload.loaderShow;
  }
};
