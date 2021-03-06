'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/wechat', controller.home.fromWechat);
  router.post('/wechat', controller.home.toWechat);
  router.get('/oauth', controller.home.oauth);
};
