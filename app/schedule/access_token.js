'use strict';

const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  static get schedule() {
    return {
      interval: '2h',
      type: 'all',
    };
  }

  async subscribe() {
    const config = this.ctx.app.config.wechat_config;
    const url = config.getAccessTokenUrl.replace('APPID', config.appid).replace('APPSECRET', config.secret);
    const res = await this.ctx.curl(url, {
      dataType: 'json',
    });
    console.log(res.data.access_token);
    this.ctx.app.access_token = res.data.access_token;
  }
}

module.exports = UpdateCache;
