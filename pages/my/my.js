// pages/my/my.js
const AUTH = require('../../utils/auth');

const app = getApp();

Page({
  data: {
    tabbar: {},
    // isHasUserInfo: false,
    userInfo: null,
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    app.editTabbar();
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
      })
    }
  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    // this.setData({
    //   isHasUserInfo: AUTH.checkHasStorage('userInfo'),
    // })
  },

  // 授权登录
  AuthorizedLogin(e) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
    })
  },


  // 查看晒分职位排名
  lookScoreRanking() {
    wx.showToast({
      title: '暂未开通',
      icon: 'none',
      duration: 1000
    })
  }
})