const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  static get schedule() {
    return {
      interval: '30s',
      type: 'all',
    };
  }

  async subscribe() {
    const url = this.ctx.app.config.wechat_config.getAccessTokenUrl;
    const appid = this.ctx.app.config.wechat_config.appid;
    const secret = this.ctx.app.config.wechat_config.secret;
    const res = await this.ctx.curl(url, {
      data: {
        grant_type: 'client_credential',
        appid: appid,
        secret: secret,
      },
      dataType: 'json',
    });
    this.ctx.app.accessToken = res.data.access_token;
  }
}

module.exports = UpdateCache;
