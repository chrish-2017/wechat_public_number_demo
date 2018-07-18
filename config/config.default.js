'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531375887184_8863';

  // add your config here
  config.middleware = [ 'xml2js' ];

  config.wechat_config = {
    token: 'wechat_public_number_demo',
    appid: 'wx230f799414023398',
    secret: '27118b180d47a9b11c094a03cea63a74',
    getAccessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET',
    postCreateMenuUrl: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN',
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
