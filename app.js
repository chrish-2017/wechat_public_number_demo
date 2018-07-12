module.exports = app => {
  app.beforeStart(async () => {
    await app.runSchedule('wechat');
  });
};
