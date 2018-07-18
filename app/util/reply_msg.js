'use strict';
const xml2js = require('./xml2js');

module.exports = (message, Content) => {
  const obj = {
    ToUserName: message.FromUserName,
    FromUserName: message.ToUserName,
    CreateTime: new Date().getTime(),
    MsgType: 'text',
    Content,
  };
  return xml2js.createXml(obj);
};
