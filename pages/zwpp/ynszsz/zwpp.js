// pages/zwpp/ahszsz/zwpp.js

// pages/zwpp/sdsz/zwpp.js

const CONFIG = require('../../../config');

Page({
  data: {
    isUnlimited: false,
    yearsIndex: 0,
    yearsArr: [],
    cityIndex: 0,
    cityArr: ['地市', '纪委监委'],
    xueliIndex: 0,
    xueliArr: [],
    leixingIndex: 0,
    leixingArr: [],
    isUnlimited: false, // 专业是否 不限
    danweiArr: [],
    danweiIndex: 0,
    gangweiArr: [],
    gangweiIndex: 0,
    yearArr: ['年份', '2021', '2020', '2019', '不限'],
    yearIndex: 0,
    xueliArr: ['学历', '研究生', '本科', '专科'],
    xueliIndex: 0,
    zhuanye: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

  },
  // 生命周期函数--监听页面显示
  onShow: function () {},

  //选调形式
  yearChange(e) {
    this.setData({
      yearIndex: e.detail.value,
    })
  },
  //选择城市
  cityChange(e) {
    // console.log(e.detail.value)
    this.setData({
      cityIndex: e.detail.value,
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

    let year;
    if (e.detail.value.year == 0) {
      year = "";
    } else {
      year = this.data.yearArr[e.detail.value.year];
    }

    let city;
    if (e.detail.value.city == 0) {
      city = "";
    } else {
      city = this.data.cityArr[e.detail.value.city];
    }

    let xueli;
    if (e.detail.value.xueli == 0) {
      xueli = "";
    } else {
      xueli = this.data.xueliArr[e.detail.value.xueli];
    }

    let zhuanye_str = this.data.zhuanye

    let searchData = JSON.stringify({
      'year': year,
      'city': city,
      'xueli': xueli,
      'zhuanye': zhuanye_str
    });
    console.log(searchData);

    if (!year && !city && !xueli) {
      wx.showModal({
        title: '提示',
        content: '请选择查询条件',
        success(res) {}
      })
    } else {

      wx.showLoading({
        title: '查询中···',
        mask: true,
      });

      wx.navigateTo({
        url: "../../zwppDetail/ynszsz/zwppDetail?searchData=" + searchData,
      })
    }

  },
})