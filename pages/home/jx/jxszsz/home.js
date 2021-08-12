// pages/home/ah/ahszsz/home.js


const CONFIG = require('../../../../config');
const app = getApp();

Page({
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
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

    wx.setStorageSync('entrance', 'jxszsz');
    app.editTabbar();
    this.getIndexPageData();

  },
  // 生命周期函数--监听页面显示
  onShow: function () { },

  //跳转职位检索事件 
  toNextpage(e) {
    var topage = e.currentTarget.dataset.topage;
    // 传递对应的参数给home调用
    wx.setStorageSync('entrance_gn', topage);
    console.log(topage);
    console.log(wx.getStorageSync('userInfo'));
    console.log(wx.getStorageSync('userPhone'));
    if (!wx.getStorageSync('userInfo')) { //判断是否包含userInfo字段 如果为空设置data - isHiddenLoginAuthModal
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

      if(topage=="zwpp"){
        wx.navigateTo({
          url: '/pages/zwpp/jxszsz/zwpp',
        })
      }else if(topage=="lnfs"){

        wx.navigateTo({
          url: '/pages/lnfs/ynszsz/lnfs',
        })
      }
    }

  },

  // 获取首页功能区 背景图URL
  getIndexPageData() {
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

  // 暂未开通
  NotYetOpened() {
    wx.showToast({
      title: '暂未开通，敬请期待！',
      icon: 'none',
      duration: 1000
    })
  },

  // 允许 授权获取用户信息
  AllowAuth(e) {
    this.setData({
      isHiddenPhoneAuthModal: !e.detail.isAllowAuth,
    })
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

    data.entrance_1 = '2016、2017、2019江西省直遴选';

    if(wx.getStorageSync('entrance_gn') == 'zwpp'){
      data.entrance_2 = '职位检索';
    }else if(wx.getStorageSync('entrance_gn') == 'lnfs'){
      data.entrance_2 = '历年分数线';
    }

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
            isHiddenPhoneAuthModal: true,
          })
          wx.showToast({
            title: "手机号绑定成功！",
            icon: 'none',
            duration: 1000
          })
          wx.switchTab({
            url: '/pages/zwpp/ynszsz/zwpp',
            // url: '/pages/home/home',
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
})