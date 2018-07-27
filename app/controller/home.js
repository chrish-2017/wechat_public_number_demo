'use strict';

const crypto = require('crypto');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const appId = this.ctx.app.config.wechat_config.appId;
    const ticket = this.ctx.app.ticket;
    const nonceStr = Math.random().toString(36).substr(2, 15);
    const timestamp = parseInt(new Date().getTime() / 1000);
    const url = 'http://chrish.ngrok.xiaomiqiu.cn/';
    const string = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + url;
    const hash = crypto.createHash('sha1');
    hash.update(string);
    const signature = hash.digest('hex');
    const data = {
      appId,
      timestamp,
      nonceStr,
      signature,
    };
    await this.ctx.render('home', data);
  }

  async fromWechat() {
    const token = this.ctx.app.config.wechat_config.token;
    const query = this.ctx.query;
    const timestamp = query.timestamp;
    const nonce = query.nonce;
    const signature = query.signature;
    const echostr = query.echostr;
    const str = [ token, timestamp, nonce ].sort().join('');
    const hash = crypto.createHash('sha1');
    hash.update(str);
    const sha = hash.digest('hex');
    if (sha === signature) {
      this.ctx.body = echostr;
    }
  }

  async toWechat() {
    const message = this.ctx.req.body;
    if (message) {
      const MsgType = message.MsgType;
      let reply;
      if (MsgType === 'event') {
        reply = await this.service.home.handleEvent(message);
      } else {
        reply = await this.service.home.handleMsg(message);
      }
      if (reply) {
        const result = await this.service.home.replyMsg(message, reply);
        console.log(result);
        this.ctx.body = result;
        return true;
      }
    }
    this.ctx.body = 'success';
  }

  async oauth() {
    const query = this.ctx.query;
    const code = query.code;
    const config = this.ctx.app.config.wechat_config;
    const url = config.getOauthAccessTokenUrl.replace('APPID', config.appId)
      .replace('SECRET', config.appSecret).replace('CODE', code);
    const res = await this.ctx.curl(url, {
      dataType: 'json',
    });
    const access_token = res.data.access_token;
    const openid = res.data.openid;
    const userInfoUrl = config.getOauthUserInfoUrl.replace('ACCESS_TOKEN', access_token).replace('OPENID', openid);
    const userInfoRes = await this.ctx.curl(userInfoUrl, {
      dataType: 'json',
    });
    console.log(userInfoRes.data);
    this.ctx.body = 'hi, ' + userInfoRes.data.nickname;
  }
}

module.exports = HomeController;
