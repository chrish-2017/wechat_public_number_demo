'use strict';

const crypto = require('crypto');
const replyMsg = require('../util/reply_msg');
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
        reply = this.handleEvent(message);
      } else {
        reply = this.handleMsg(message);
      }
      if (reply) {
        const result = replyMsg(message, reply);
        console.log(result);
        this.ctx.body = result;
        return true;
      }
    }
    this.ctx.body = 'success';
  }

  handleEvent(message) {
    const { Event, EventKey, Ticket, Latitude, Longitude, Precision } = message;
    let reply;
    switch (Event) {
      case 'subscribe':
        console.log(EventKey);
        console.log(Ticket);
        reply = '欢迎关注XXX的测试公众号';
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

  handleMsg(message) {
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
}

module.exports = HomeController;
