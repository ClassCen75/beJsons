const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  dev: {
    baseApi: 'http://api.ccp3js.com:3000/api',
    mockApi: 'https://www.fastmock.site/mock/1c2b519ac70943b142863d91eacb1799/api'
  },
  test: {
    baseApi: '',
    mockApi: 'https://www.fastmock.site/mock/1c2b519ac70943b142863d91eacb1799/api'
  },
  prod: {
    baseApi: '',
    mockApi: ''
  }
};

export default {
  env,
  mock: true,
  namespace: 'manger',
  ...EnvConfig[env]
};
