// pages/zwpp/sxsz/zwpp.js
const CONFIG = require('../../../config');

Page({
  data: {
    isUnlimited: false,
    yearsIndex: 0,
    yearsArr: [],
    cityIndex: 0,
    cityArr: [],
    xueliIndex: 0,
    xueliArr: [],
    leixingIndex: 0,
    leixingArr: [],
    isUnlimited: false, // 专业是否 不限
    danweiArr: [],
    danweiIndex: 0,
    gangweiArr: [],
    gangweiIndex: 0,
    yearArr: ['选择年份', 2020],
    yearIndex: 0,
    xueliArr: ['选择学历', '研究生', '本科'],
    xueliIndex: 0,
    zhuanye: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
  },
  // 生命周期函数--监听页面显示
  onShow: function () { },

  // 选择年份
  yearChange(e) {
    this.setData({
      yearIndex: e.detail.value,
    })
    // console.log(this.data.danweiIndex);
  },
  //选择学历
  xueliChange(e) {
    this.setData({
      xueliIndex: e.detail.value,
    })
  },
  // 输入学历
  zhuanyeInput(e) {

    this.setData({
      zhuanye: e.detail.value,
    })
  },

  // 立即查询
  inquireBtn(e) {
    wx.showLoading({
      title: '查询中···',
      mask: true,
    });
    
    if (e.detail.value.year == 0) {
      wx.showToast({
        title: '请选择年份',
        icon: 'none',
      })
      return false;
    }
    if (e.detail.value.xueli == 0) {
      wx.showToast({
        title: '请选择学历',
        icon: 'none',
      })
      return false;
    }
    // if (e.detail.value.zhuanye == '') {
    //   wx.showToast({
    //     title: '请输入专业',
    //     icon: 'none',
    //   })
    //   return false;
    // }

    let year = this.data.yearArr[e.detail.value.year];
    let xueli = this.data.xueliArr[e.detail.value.xueli];
    let zhuanye_str = this.data.zhuanye
    // let years = this.data.yearsArr[e.detail.value.years];
    // let city = this.data.cityArr[e.detail.value.city];
    // let education = this.data.xueliArr[e.detail.value.xueli];
    // let identity = this.data.leixingArr[e.detail.value.leixing];
    // let discipline = e.detail.value.zhuanye;
    let searchData = JSON.stringify({
      'xueli': xueli,
      'zyyq': zhuanye_str
    });
    wx.navigateTo({
      url: "../../zwppDetail/sxsz/zwppDetail?searchData=" + searchData,
    })
  },
})