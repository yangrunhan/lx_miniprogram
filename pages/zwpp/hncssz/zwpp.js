// pages/zwpp/hncssz/zwpp.js
// pages/zwpp/hnsz/zwpp.js
// pages/zwpp/sdsz/zwpp.js

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
    xsArr: ['年份', '2020', '2019', '2018', '2017'],
    xsIndex: 0,
    xueliArr: ['学历要求', '本科', '研究生'],
    xueliIndex: 0,
    zhuanye: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

  },
  // 生命周期函数--监听页面显示
  onShow: function () { },

  //选调形式
  xsChange(e) {
    this.setData({
      xsIndex: e.detail.value,
    })
  },
  //选择学历
  xueliChange(e) {
    // console.log(e.detail.value)
    this.setData({
      xueliIndex: e.detail.value,
    })
  },
  // 输入专业
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


    let xs;
    if (e.detail.value.xs == 0) {
      xs = "";
    } else {
      xs = this.data.xsArr[e.detail.value.xs];
    }


    let xueli;
    if (e.detail.value.xueli == 0) {
      xueli = "";
    } else {
      xueli = this.data.xueliArr[e.detail.value.xueli];
    }



    let zhuanye_str = this.data.zhuanye

    let searchData = JSON.stringify({
      'year': xs,
      'xueli': xueli,
      'zhuanye': zhuanye_str
    });
    console.log(searchData)
    wx.navigateTo({
      url: "../../zwppDetail/hncssz/zwppDetail?searchData=" + searchData,
    })
  },
})