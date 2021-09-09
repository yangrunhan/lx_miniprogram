// app.js
const ald = require('./utils/ald-stat.js')
App({
  globalData: {
    userInfo: null,
    userPhone: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#131336",
      "selectedColor": "#000000",
      "list": [{
          "pagePath": "/pages/index/index",
          "iconPath": "/assets/images/tabBar/home.png",
          "selectedIconPath": "/assets/images/tabBar/home_selected.png",
          "text": "首页"
        },
        {
          "isSpecial": true,
        },
        {
          "pagePath": "/pages/my/my",
          "iconPath": "/assets/images/tabBar/my.png",
          "selectedIconPath": "/assets/images/tabBar/my_selected.png",
          "text": "我的"
        }
      ]
    }
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (options) {
    // console.log(options)
    wx.hideTabBar(); // 隐藏系统tabbar

    // 获取用户信息 验证是否已授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            lang: 'zh_CN',
            success: res => {
              this.globalData.userInfo = res.userInfo; // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('userInfo', res.userInfo);
              if (this.userInfoReadyCallback) {
                // 由于 getUserInfo 是网络请求,可能会在 Page.onLoad 之后才返回,所以此处加入 callback 以防止这种情况
                this.userInfoReadyCallback(res);
              }
            }
          })
        }
      }
    });
    // // 获取参数
    // console.log(options);
    // if (Object.keys(options.query).length !== 0) {

    //   console.log(options.query.area);
    //   if (options.query.area) {
    //     wx.setStorageSync('fxid', options.query.area);
    //     this.getTuiguangInfo();
    //     // setArea(options.area);
    //     // let setarea_check = setInterval(function () {
    //     //   if (wx.getStorageSync('tg_area')) {
    //     //     options.area = wx.getStorageSync('tg_area');
    //     //     wx.setStorageSync('urlParams', options); // 保存推广信息
    //     //     clearInterval(setarea_check);
    //     //   }
    //     // }, 500)
    //   }

    // }

    this.checkUpdateVersion(); // 检查更新
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function () {
    wx.hideTabBar(); // 隐藏系统tabbar
  },

  //获取参数地址
  getTuiguangInfo(){
    let fxid = wx.getStorageSync('fxid');
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getfzinfo?actid=14882&callback=?',
      data:{
        fxparameter: fxid,
        limit: '200'
      },
      success:res=>{
        let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data);
        if (data.status == "1") {

          let tgfxinfo = data.lists[0].province + '-' + data.lists[0].cities + '-' + data.lists[0].learningCenter + '-' + data.lists[0].channel;
          console.log(tgfxinfo)
          wx.setStorageSync('tgfxinfo', tgfxinfo)

        } else {
          console.log(data.msg);
        }
      }
    })

  },

  // 自定义tabbar
  editTabbar() {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  // 检查更新
  checkUpdateVersion() {
    // 判断微信版本是否 兼容小程序更新机制API的使用
    if (wx.canIUse('getUpdateManager')) {
      // 创建 UpdateManager 实例
      const updateManager = wx.getUpdateManager();
      // 检测版本更新
      updateManager.onCheckForUpdate(res => {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          // 监听小程序有版本更新事件
          updateManager.onUpdateReady(res => {
            // 提示: 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
            updateManager.applyUpdate();
          })
          updateManager.onUpdateFailed(fail => {
            // 提示: 新版本下载失败
            wx.showModal({
              title: '已经有新版本喽~',
              content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
            })
          })
        }
      })
    } else {
      // 提示: 此时微信版本太低 
      wx.showModal({
        title: '溫馨提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
})