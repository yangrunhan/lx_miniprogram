// pages/kaoshi/kaoshi.js
const CONFIG = require('../../config');
const setArea = require('../../utils/setArea');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: null,
    isHiddenLoginAuthModal: true,
    isHiddenPhoneAuthModal: true,
    isShowLoginModal: false,
  },

  /**
   * 公告点击
   */
  toNextPage(e) {
    var entrance = e.currentTarget.dataset.entrance;
    // 传递对应的参数给home调用
    wx.setStorageSync('entrance', entrance);
    if (!wx.getStorageSync('userInfo')) { //判断是否包含userInfo字段
      this.setData({
        isHiddenLoginAuthModal: false,
      })
      return false;
    }
    if (!wx.getStorageSync('userPhone')) { //判断是否包含userPhone字段
      this.setData({
        isHiddenPhoneAuthModal: false,
      })
    } else {
      wx.switchTab({
        url: '/pages/home/hb_home/home',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (Object.keys(options).length !== 0) {
      if (options.area) {
        options.area = setArea(options.area);
      }
      wx.setStorageSync('urlParams', options); // 保存推广信息
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})