// components/loginAuth_modal/loginAuth_modal.js
const app = getApp();

Component({
  // 组件的属性列表
  properties: {
    isHiddenLoginAuthModal: {
      type: Boolean,
      value: false,
    },
  },
  // 组件的初始数据
  data: {
    // isHiddenLoginAuthModal: false,
  },
  // 组件的方法列表
  methods: {
    // 允许登录
    _processLogin(e) {
      var _this = this;
      // // console.log(e);
      if (e.detail.errMsg == 'getUserInfo:ok') {
        wx.getUserInfo({
          lang: 'zh_CN',
          success: res => {
            app.globalData.userInfo = res.userInfo; 
            wx.setStorageSync('userInfo', res.userInfo); //获取userInfo 信息
            _this.setData({
              isHiddenLoginAuthModal: true, //设置登陆为显示
            })
            this.triggerEvent("AllowAuth", { isAllowAuth: true }); //触发AllowAuth 事件 并设置detail对象为：isAllowAuth 为true
          }
        })
      } else {
        app.globalData.userInfo = null;
        wx.removeStorageSync('userInfo');
        wx.showToast({
          title: '已取消',
          icon: 'none',
        });
        _this.setData({
          isHiddenLoginAuthModal: true,
        })
      }
    },
    // 暂不登录
    _cancelLogin() {
      app.globalData.userInfo = null;
      wx.removeStorageSync('userInfo');
      this.setData({
        isHiddenLoginAuthModal: true,
      });
      wx.showToast({
        title: '已取消',
        icon: 'none',
        duration: 1000
      });
    },
  }
})