// pages/home/sc/scdzxbld/scdzxbld.js
const CONFIG = require('../../../../config');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    entrance: wx.getStorageSync('entrance'),
    backgroundImage: {},
    getIndexPageDataAPI: '',
    userPhone: null,
    isHiddenLoginAuthModal: true,
    isHiddenPhoneAuthModal: true,
    isShowLoginModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    this.getInitData();
  },

  /**
   * 初始化页面数据
   */
  getInitData() {
    console.log(CONFIG.getIndexPageDataAPI);
    console.log(wx.getStorageSync('entrance'));
    wx.request({
      url: CONFIG.getIndexPageDataAPI,
      data: {
        sort: wx.getStorageSync('entrance'),
      },
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        str = str.replace(/\ +/g, "");//去掉空格
        str = str.replace(/[\r\n]/g, "");//去掉回车换行
        console.log(str);
        // console.log(typeof(str));
        var data = JSON.parse(str);
        if (data.status == 1) {
          // var ads = JSON.parse(data.lists[0].ad_1);  //广告先去掉
          // console.log(data.lists[0]);
          // console.log(ads);
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

  /**
   * 点击预约
   */
  toYuyue(e){
    // 传递对应的参数给home调用
    var entrancegn = e.currentTarget.dataset.entrancegn;
    wx.setStorageSync('entrance_gn', entrancegn);
    if (!wx.getStorageSync('userPhone')) { //判断是否包含userPhone字段
      this.setData({
        isHiddenPhoneAuthModal: false,
      })
    } else {
      console.log("提交预约")
      this.setData({
        userPhone: wx.getStorageSync('userPhone'),
      })
      this.Yueyu();
    }

  },

  // 立即绑定手机号
  processBindPhone(e) {
    let _this = this;
    // console.log(e.detail)
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      // 登录
      wx.login({
        success: (res) => {
          if (res.code) {
            wx.request({
              url: CONFIG.getSesionkeyAPI,
              data: {
                code: res.code
              },
              success: res => {
                if (res.data.status == 1) {
                  // 手机号解密
                  wx.request({
                    url: CONFIG.getUserPhoneAPI,
                    data: {
                      encryptedData: e.detail.encryptedData,
                      iv: e.detail.iv,
                      sessionKey: res.data.session_key,
                    },
                    success: res => {
                      if (res.data.status == 1) {
                        let userPhone = res.data.phone;
                        this.setData({
                          userPhone: userPhone,
                          isHiddenPhoneAuthModal: true,
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
    let entrance = wx.getStorageSync('entrance');
    let data = {};
    data.phone = this.data.userPhone;

    data.entrance_1 = '2020年四川达州市选拔领导干部';
    data.entrance_2 = '预约';

    if (wx.getStorageSync('urlParams').area && wx.getStorageSync('urlParams').area !== undefined) {
      data.city_or_school = wx.getStorageSync('urlParams').area;
    }
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
          _this.Yueyu();
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
  // 将手机号提交到后台
  Yueyu() {
    let _this = this;

    let data = {};
    data.phone = this.data.userPhone;

    if (wx.getStorageSync('urlParams').area && wx.getStorageSync('urlParams').area !== undefined) {
      data.city_or_school = wx.getStorageSync('urlParams').area;
    }
    if (wx.getStorageSync('urlParams').scode && wx.getStorageSync('urlParams').scode !== undefined) {
      data.scode = wx.getStorageSync('urlParams').scode;
    }
    // 注册
    wx.request({
      url: 'https://zg99.offcn.com/index/biaodan/register?actid=20400&callback=?',
      data: data,
      success: res => {
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data);
        if (data.status == 1) {
          wx.showToast({
            title: "预约成功",
            icon: 'none',
            duration: 1000
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