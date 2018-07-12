'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531375887184_8863';

  // add your config here
  config.middleware = [];

  config.wechat_config = {
    token: 'wechat_public_number_demo',
    appid: 'wx230f799414023398',
    secret: '27118b180d47a9b11c094a03cea63a74',
    getAccessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token',
  };

  return config;
};
