'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    await app.runSchedule('access_token');

    const menu = {
      button: [
        {
          name: '组一',
          sub_button: [
            {
              type: 'click',
              name: 'click',
              key: 'click',
            },
            {
              type: 'view',
              name: 'view',
              url: 'http://chrish.ngrok.xiaomiqiu.cn',
            },
          ],
        },
        {
          name: '组二',
          sub_button: [
            {
              type: 'scancode_waitmsg',
              name: '扫码带提示',
              key: 'scancode_waitmsg',
            },
            {
              type: 'scancode_push',
              name: '扫码推事件',
              key: 'scancode_push',
            },
            {
              type: 'pic_sysphoto',
              name: '系统拍照发图',
              key: 'pic_sysphoto',
            },
            {
              type: 'pic_photo_or_album',
              name: '拍照或者相册发图',
              key: 'pic_photo_or_album',
            },
            {
              type: 'pic_weixin',
              name: '微信相册发图',
              key: 'pic_weixin',
            },
          ],
        },
        {
          type: 'location_select',
          name: '发送位置',
          key: 'location_select',
        },
      ],
    };
    const config = app.config.wechat_config;
    const url = config.postCreateMenuUrl.replace('ACCESS_TOKEN', app.access_token);
    const res = await app.curl(url, {
      method: 'POST',
      contentType: 'json',
      data: menu,
      dataType: 'json',
    });
    console.log(res.data.errcode);
  });
};
