// pages/zwpp/ahszsz/zwpp.js
// pages/zwpp/sdsz/zwpp.js
const CONFIG = require('../../../../config');

Page({
  data: {
    userPhone: '', //学员手机号
    cityIndex: 0,
    input_name: '', //姓名
    cityArr: ['遴选地区', '西藏事业单位遴选', '西藏区直遴选'], //省直、地市
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {},
  // 生命周期函数--监听页面显示
  onShow: function () {},

  //选择省直或地市
  cityChange(e) {
    this.setData({
      cityIndex: e.detail.value,
    })
  },

  // 输入姓名
  nameInput(e) {
    this.setData({
      input_name: e.detail.value,
    })
  },

  // 提交数据
  processBindPhone(e) {

    if(!this.data.input_name){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      });
      return;
    };

    if(this.data.cityIndex == 0){
      wx.showToast({
        title: '请选择省直或地市',
        icon: 'none',
      });
      return;
    }

    let _this = this;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login().then(res => {
        _this.getphone(res.code, e.detail.encryptedData, e.detail.iv);
      }).catch(res => {
        console.log(res);
      });
    }
  },

  // 获取手机号
  getphone(code, encryptedData, iv) {
    if (code) {
      wx.request({
        url: CONFIG.getSesionkeyAPI,
        data: {
          code: code
        },
        success: res => {
          if (res.data.status == 1) {
            this.unlockphone(encryptedData, iv, res.data.session_key);
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    }
  },

  // 解密手机号
  unlockphone(encryptedData, iv, session_key) {
    // 手机号解密
    wx.request({
      url: CONFIG.getUserPhoneAPI,
      data: {
        encryptedData: encryptedData,
        iv: iv,
        sessionKey: session_key,
      },
      success: res => {
        if (res.data.status == 1) {
          console.log(res);
          this.setData({
            userPhone: res.data.phone,
          })
          this.Register();
        } else {
          wx.showModal({
            title: '提示',
            content: '获取手机号失败请重新提交',
            showCancel: false,
          });
        }
      }
    })
  },

    // 将手机号提交到后台
    Register() {

      let data = {};
      data.phone = this.data.userPhone;
      data.entrance_1 = '西藏遴选公告预约';
      data.entrance_2 = `预约${this.data.cityArr[this.data.cityIndex]}`;

      wx.request({
        url: CONFIG.RegisterAPI,
        data: data,
        success: res => {
          let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
          console.log(data);
          if (data.status == 1) {
            wx.showToast({
              title: "公告预约成功！",
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
      });

    },

    //跳转小能
    showXn:function(e){
      wx.navigateToMiniProgram({
        appId: 'wx3dec2f3a28471026',
        path: 'pages/index/index?source=sharelock&minicodeid=762991',
        extraData: {
          // foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          // 打开成功
        }
      })
    },

    // 跳转19课堂
    toclass:function(e){
      wx.navigateToMiniProgram({
        appId: 'wx3dec2f3a28471026',
        path: 'pages/index/index?source=sharelock&minicodeid=765535',
        extraData: {
          // foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          // 打开成功
        }
      })
    }

})