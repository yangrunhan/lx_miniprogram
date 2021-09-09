// pages/kaoshi/hn/hn.js
// pages/kaoshi/sd/sd.js


const CONFIG = require('../../../config');
const setArea = require('../../../utils/setArea');
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
    crm_data:{
      sid:"0454c06fb146bef1c70fb7eb259f92a1",
      owner:"13272",
      channel:"117",
      orgn:"1",
      mobile:"18600000001",
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

    // 对接crm参数
    if(options.q){
      console.log(options.q)
      let crm_uri = decodeURIComponent(options.q)
      console.log(crm_uri)
      let crm_sid = CONFIG.getQueryVariable('sid',crm_uri)  //sid
      let crm_formid = CONFIG.getQueryVariable('formid',crm_uri)  //formid
      let crm_owner = CONFIG.getQueryVariable('owner',crm_uri) // 收集人
      let channel = CONFIG.getQueryVariable('channel',crm_uri) // 渠道
      let orgn = CONFIG.getQueryVariable('orgn',crm_uri)  // 归属分校
      let c2 = CONFIG.getQueryVariable('c2',crm_uri)   // 二级渠道

      if(c2){
        this.setData({
          crm_data:{
            sid:crm_sid,
            owner:crm_owner,
            channel:channel,
            c2:c2,
            orgn:orgn,
          }
        })
      }else{
        this.setData({
          crm_data:{
            sid:crm_sid,
            owner:crm_owner,
            channel:channel,
            orgn:orgn,
          }
        })
      }
      console.log(this.data.crm_data)
    }

  },

  /**
   * 公告点击
   */
  toNextPage(e) {
    var entrance = e.currentTarget.dataset.entrance;
    // 传递对应的参数给home调用
    wx.setStorageSync('entrance', entrance);
    if (entrance == 'hncssz') {
      wx.navigateTo({
        url: `/pages/home/hn/hncssz/home?crm_data=${JSON.stringify(this.data.crm_data)}`,
      })
    } else if (entrance == 'hnsz') {
      wx.navigateTo({
        url: `/pages/home/hn/hnsz/home?crm_data=${JSON.stringify(this.data.crm_data)}`,
      })
    } else if (entrance == 'hnszsz') {
      wx.navigateTo({
        url: `/pages/home/hn/hnszsz/home?crm_data=${JSON.stringify(this.data.crm_data)}`,
      })
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