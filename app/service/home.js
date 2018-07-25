'use strict';

const xml2js = require('../util/xml2js');
const Service = require('egg').Service;

class HomeService extends Service {
  async handleEvent(message) {
    const { Event, EventKey, Ticket, Latitude, Longitude, Precision } = message;
    let reply;
    switch (Event) {
      case 'subscribe':
        console.log(EventKey);
        console.log(Ticket);
        reply = '欢迎关注我的测试公众号';
        break;
      case 'unsubscribe':
        reply = '';
        break;
      case 'SCAN':
        reply = 'EventKey:' + EventKey + ', Ticket:' + Ticket;
        break;
      case 'LOCATION':
        reply = 'Latitude:' + Latitude + ', Longitude:' + Longitude + ', Precision:' + Precision;
        break;
      case 'CLICK':
        reply = 'EventKey:' + EventKey;
        break;
      case 'VIEW':
        reply = 'EventKey:' + EventKey;
        break;
      default:
        reply = '';
        break;
    }
    return reply;
  }

  async handleMsg(message) {
    const { MsgType, Content, PicUrl, MediaId, Recognition, Label, Url } = message;
    let reply;
    switch (MsgType) {
      case 'text':
        reply = Content;
        break;
      case 'image':
        reply = PicUrl;
        break;
      case 'voice':
        console.log(Recognition);
        reply = MediaId;
        break;
      case 'video':
        reply = MediaId;
        break;
      case 'shortvideo':
        reply = MediaId;
        break;
      case 'location':
        reply = Label;
        break;
      case 'link':
        reply = Url;
        break;
      default:
        reply = '';
        break;
    }
    return reply;
  }

  async replyMsg(message, Content) {
    const obj = {
      ToUserName: message.FromUserName,
      FromUserName: message.ToUserName,
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      Content,
    };
    return xml2js.createXml(obj);
  }

  async getUserInfo(openid) {
    const config = this.ctx.app.config.wechat_config;
    const access_token = this.ctx.app.access_token;
    const url = config.getUserInfoUrl.replace('ACCESS_TOKEN', access_token).replace('OPENID', openid);
    const res = await this.ctx.curl(url, {
      dataType: 'json',
    });
    return res.data;
  }
}

module.exports = HomeService;
