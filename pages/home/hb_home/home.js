// pages/home/home.js
const CONFIG = require('../../../config');
const app = getApp();

Page({
  data: {
    tabbar: {},
    entrance: wx.getStorageSync('entrance'),
    backgroundImage: {},
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    app.editTabbar();
    this.getIndexPageData();
  },
  // 生命周期函数--监听页面显示
  onShow: function () {},

  // 获取首页功能区 背景图URL
  getIndexPageData() {
    // console.log(CONFIG.getIndexPageDataAPI);
    // console.log(wx.getStorageSync('entrance'));
    wx.request({
      url: CONFIG.getIndexPageDataAPI,
      data: {
        sort: wx.getStorageSync('entrance'),
      },
      success: res => {
        console.log(res)
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        if (data.status == 1) {
          // var ads = JSON.parse(data.lists[0].ad_1); //先去调广告
          // console.log(data.lists[0]);
          // console.log(ads);
          console.log(data.lists[0].features_1);
          this.setData({
            backgroundImage: {
              features_1: data.lists[0].features_1,
              features_2: data.lists[0].features_2,
              features_3: data.lists[0].features_3,
              features_4: data.lists[0].features_4,
              features_5: data.lists[0].features_5,
              // ads: ads,
            }
          })
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  // 暂未开通
  NotYetOpened() {
    wx.showToast({
      title: '暂未开通，敬请期待！',
      icon: 'none',
      duration: 1000
    })
  },
})