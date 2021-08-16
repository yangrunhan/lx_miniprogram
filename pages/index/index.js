// pages/index/index.js
// import setArea from '../../utils/setArea.js';
const CONFIG = require('../../config');
const setArea = require('../../utils/setArea');
const app = getApp();

Page({
  data: {
    userPhone: null,
    isHiddenLoginAuthModal: true,
    isHiddenPhoneAuthModal: true,
    isShowLoginModal: false,
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

    console.log(options);
    if (Object.keys(options).length !== 0) {
      if (options.area) {
        // setArea(options.area);
        // let setarea_check = setInterval(function(){

        //   // if (wx.getStorageSync('tg_area')){
        //   //   // options.area = wx.getStorageSync('tg_area');
        //   //   // wx.setStorageSync('urlParams', options); // 保存推广信息
        //   //   wx.setStorageSync('tg_area', options);
        //   //   clearInterval(setarea_check);
        //   // }

        // },500)
        console.log(options.area);
        wx.setStorageSync('tg_area', options.area);

        console.log(options)
      }

      console.log(options.fxid);
      if (options.fxid) {
        wx.setStorageSync('fxid', options.fxid);
        app.getTuiguangInfo();
      }

    }
  },
  // 生命周期函数--监听页面初次渲染完成
  onShow: function () {},


  // 入口
  toNextPage(e) {
    var entrance = e.currentTarget.dataset.entrance;
    if (entrance == 1) { // 国考
      wx.showToast({
        title: '暂未开通',
        icon: 'none',
        duration: 1000
      })

      return false;
    } else { // 省考
      wx.setStorageSync('entrance', entrance);
      if (!wx.getStorageSync('userInfo')) {
        this.setData({
          isHiddenLoginAuthModal: false,
        })
        return false;
      }
      if (!wx.getStorageSync('userPhone')) {
        this.setData({
          isHiddenPhoneAuthModal: false,
        })
      } else {
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    }
  },
  //选择 省直或者地市
  ChooseKaoshi(e) {
    var entrance = e.currentTarget.dataset.entrance;
    console.log(entrance);
    wx.setStorageSync('shenfen_entrance', entrance);

    if (entrance == 'hb') { //河北
      wx.navigateTo({
        url: '/pages/kaoshi/hb/hb',
      })
    } else if (entrance == 'gs') { //甘肃
      wx.navigateTo({
        url: '/pages/kaoshi/gs/gs',
      })
    } else if (entrance == 'fj') { //福建
      wx.navigateTo({
        url: '/pages/kaoshi/fj/fj', //福建
      })
  } else if (entrance == 'sx') { //山西
      wx.navigateTo({
        url: '/pages/kaoshi/sx/sx',
      })
    } else if (entrance == 'sd') { //山东
      wx.navigateTo({
        url: '/pages/kaoshi/sd/sd',
      })
    } else if (entrance == 'sc') { //四川
      wx.navigateTo({
        url: '/pages/kaoshi/sc/sc',
      })
    } else if (entrance == 'sa') { //陕西
      wx.navigateTo({
        url: '/pages/kaoshi/sa/sa',
      })
    } else if (entrance == 'zylx') { //中央遴选
      wx.navigateTo({
        url: '/pages/home/zylx/home',
      })
    } else if (entrance == 'bj') { //北京
      wx.navigateTo({
        url: '/pages/kaoshi/bj/bj',
      })
    } else if (entrance == 'hu') { //湖北
      wx.navigateTo({
        url: '/pages/kaoshi/hu/hu',
      })
    } else if (entrance == 'gz') { //贵州
      wx.navigateTo({
        url: '/pages/kaoshi/gz/gz',
      })
    } else if (entrance == 'hn') { //湖南
      wx.navigateTo({
        url: '/pages/kaoshi/hn/hn', //湖南
      })
    } else if (entrance == 'ah') { //安徽
      wx.navigateTo({
        url: '/pages/kaoshi/ah/ah', //安徽
      })
    } else if (entrance == 'sh') { //上海
      wx.navigateTo({
        url: '/pages/kaoshi/sh/sh', //上海
      })
    } else if (entrance == 'hi') { //海南
      wx.navigateTo({
        url: '/pages/kaoshi/hi/hi', //海南
      })
    } else if (entrance == 'jl') { //吉林
      wx.navigateTo({
        url: '/pages/kaoshi/jl/jl', //吉林
      })
    } else if (entrance == 'he') { //河南
      wx.navigateTo({
        url: '/pages/kaoshi/he/he', //河南
      })
    } else if (entrance == 'yn') { //云南
      wx.navigateTo({
        url: '/pages/kaoshi/yn/yn', //云南
      })
    } else if (entrance == 'jx') { //江西
      wx.navigateTo({
        url: '/pages/kaoshi/jx/jx', //江西
      })
    } else if (entrance == 'js') { //江苏
        wx.navigateTo({
          url: '/pages/kaoshi/jiangsu/js', //江苏
        })
    } else if (entrance == 'xz') { //西藏
      wx.navigateTo({
        url: '/pages/kaoshi/xizang/xizang', //西藏
      })
    } else if (entrance == 'gx') { //云南
      wx.navigateTo({
        url: '/pages/kaoshi/gx/gx', //广西
      }) 
    } else if (entrance == 'gd') { //广东
      wx.navigateTo({
        url: '/pages/kaoshi/gd/gd', //广东
      })
    } else if (entrance == 'nm') { //内蒙古
      wx.navigateTo({
        url: '/pages/kaoshi/nm/nm', //内蒙古
      })
    } else {
      wx.navigateTo({
        url: '/pages/kaoshi/' + entrance + '/' + entrance,
      })
    }

  },



})