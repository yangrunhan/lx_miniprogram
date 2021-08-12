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
   * 公告点击
   */
  toNextPage(e) {
    var entrance = e.currentTarget.dataset.entrance;
    // 传递对应的参数给home调用
    wx.setStorageSync('entrance', entrance);
    if (entrance == 'sdjnsz') {
      wx.navigateTo({
        url: '/pages/home/sd/sdjnsz/home',
      })
    } else if (entrance == 'sdsz') {
      wx.navigateTo({
        url: '/pages/home/sd/sdsz/home',
      })
    }
    // console.log(wx.getStorageSync('entrance'));
    // if (!wx.getStorageSync('userInfo')) { //判断是否包含userInfo字段 如果为空设置data - isHiddenLoginAuthModal
    //   this.setData({
    //     isHiddenLoginAuthModal: false,
    //   })
    //   return false;
    // }
    // if (!wx.getStorageSync('userPhone')) { //判断是否包含userPhone字段
    //   this.setData({
    //     isHiddenPhoneAuthModal: false,
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/home/hb_home/home',
    //   })
    // }
  },

  // 允许 授权获取用户信息
  AllowAuth(e) {
    this.setData({
      isHiddenPhoneAuthModal: !e.detail.isAllowAuth,  //如果在组件中 允许通过了，会出发，并设置detail为true 显示手机号
    })
  },
  // 立即绑定手机号 open-type="getPhoneNumber" 通过这个设置弹窗获取手机号窗口，并绑定执行bindgetphonenumber这个里面的方法
  processBindPhone(e) {
    let _this = this;
    console.log(e)
    //获取手机号成功 如果手机号获取成功 errMsg 为:getPhoneNumber:ok
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      // 登录
      wx.login({
        success: (res) => {
          console.log(res); //登陆
          if (res.code) { //如果登陆成功 返回code值 用户登录凭证（有效期五分钟）。
            wx.request({
              url: CONFIG.getSesionkeyAPI, //请求 获取getsesionkey的请求 需要传入登陆凭证
              data: {
                code: res.code
              },
              success: res => {
                if (res.data.status == 1) {  //请求成功
                  // 手机号解密
                  wx.request({
                    url: CONFIG.getUserPhoneAPI, //
                    data: {
                      encryptedData: e.detail.encryptedData, //包括敏感数据在内的完整用户信息的加密数据
                      iv: e.detail.iv,  //加密算法的初始向量
                      sessionKey: res.data.session_key, //返回的sessionKey
                    },
                    success: res => {
                      if (res.data.status == 1) {  //请求成功
                        let userPhone = res.data.phone; //手机号
                        this.setData({
                          userPhone: userPhone,  //数据：手机号
                          isHiddenPhoneAuthModal: true,  //数据：是否显示收集登陆模块
                        })

                        _this.Register();
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取手机号失败，请手动输入···',
                          showCancel: false,
                        })
                        // console.log(res.data.msg);
                        this.setData({
                          isShowLoginModal: true,
                        })
                      }
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })
          }
        },
      })
    }
  },
  // 暂不绑定手机号
  cancelBindPhone() {
    this.setData({
      isHiddenPhoneAuthModal: true,
    })
  },

  // 监听 手机号发生改变
  changePhone(e) {
    this.setData({
      userPhone: e.detail.value,
    })
  },
  // 登录 提交
  loginSubmit(e) {
    var phone = e.detail.value.phone;
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
      })
      return false;
    }
    var phone_reg = /^0?1[3456789]\d{9}$/;
    if (!phone_reg.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      })
      return false;
    }
    this.setData({
      userPhone: phone,
    })
    this.Register();
  },
  // 将手机号提交到后台
  Register() {
    let _this = this;
    let entrance = wx.getStorageSync('entrance'); //获取字段
    let data = {};
    data.phone = this.data.userPhone; //获取手机号
    if (entrance) {  //原本是用来判断 国考和省考的 这里统一 地市公告
      if (entrance == 'ynkmsz') {
        data.entrance_1 = '云南省昆明市2020年市级机关公开遴选公务员';
      } else if (entrance == 'gssz') {
        data.entrance_1 = '甘肃省直机关遴选';
      } else if (entrance == 'sxsz') {
        data.entrance_1 = '山西省直机关遴选';
      } else if (entrance == 'sdjnsz') {
        data.entrance_1 = '山东济南市直遴选';
      }
    }
    //获取推广信息
    if (wx.getStorageSync('urlParams').area && wx.getStorageSync('urlParams').area !== undefined) {
      data.city_or_school = wx.getStorageSync('urlParams').area;
    }
    //获取推广信息
    if (wx.getStorageSync('urlParams').scode && wx.getStorageSync('urlParams').scode !== undefined) {
      data.scode = wx.getStorageSync('urlParams').scode;
    }
    // 注册
    wx.request({
      url: CONFIG.RegisterAPI,
      data: data,
      success: res => {
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data);
        if (data.status == 1) {
          app.globalData.userPhone = _this.data.userPhone;
          wx.setStorageSync('userPhone', _this.data.userPhone);
          _this.setData({
            isShowLoginModal: false,
          })
          wx.showToast({
            title: "手机号绑定成功！",
            icon: 'none',
            duration: 1000
          })
          wx.switchTab({
            url: '/pages/home/sd/sdjnsz/home',
          })
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
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