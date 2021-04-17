import cloud from '@tbmp/mp-cloud-sdk';
cloud.init({
  env: 'test'
});
App({
  cloud,
  userInfo: null,
  // 声明全局方法  
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);
      // 调用用户授权 API  
      my.authorize({
        scopes: '*',
        success: authcode => {
          console.info(authcode);
          // 调用获取用户信息 API  
          my.getAuthUserInfo({
            success: res => {
              this.userInfo = res;
              resolve(this.userInfo);
            },
            fail: (res) => {
              console.log(res);
              reject({});
            },
          });
        },
        fail: (res) => {
          console.log(res);
          reject(res);
        },
      });
    });
  },
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    my.setNavigationBar({ backgroundColor: "#ffffff" })

  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
