'use strict';
const xml2js = require('xml2js');

const parseXml = str => {
  return new Promise((resolve, reject) => {
    const parseString = xml2js.parseString;
    parseString(str, { explicitArray: false }, (err, json) => {
      if (json) {
        resolve(json.xml);
      } else {
        reject(err);
      }
    });
  });
};

const createXml = obj => {
  const builder = new xml2js.Builder({
    rootName: 'xml',
    headless: true,
    cdata: true,
  });
  return builder.buildObject(obj);
};

module.exports = {
  parseXml,
  createXml,
};
