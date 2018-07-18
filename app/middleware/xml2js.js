'use strict';
const xml2js = require('../util/xml2js');

module.exports = () => {
  return async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.is('text/xml')) {
      const promise = new Promise((resolve, reject) => {
        let data = '';
        ctx.req.on('data', chunk => {
          data += chunk;
        });
        ctx.req.on('end', () => {
          console.log(data);
          xml2js.parseXml(data).then(result => {
            resolve(result);
          }).catch(err => {
            reject(err);
          });
        });
      });
      await promise.then(result => {
        ctx.req.body = result;
      }).catch(() => {
        ctx.req.body = '';
      });
    }
    await next();
  };
};
