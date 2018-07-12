'use strict';

const crypto = require('crypto');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async fromWechat() {
    const token = this.ctx.app.config.wechat_config.token;
    const query = this.ctx.query;
    const timestamp = query.timestamp;
    const nonce = query.nonce;
    const signature = query.signature;
    const echostr = query.echostr;
    const str = [token, timestamp, nonce].sort().join('');
    const hash = crypto.createHash('sha1');
    hash.update(str);
    const sha = hash.digest('hex');
    if (sha === signature) {
      this.ctx.body = echostr + '';
    }
  }
}

module.exports = HomeController;
