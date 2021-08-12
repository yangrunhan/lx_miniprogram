// pages/zwpp/ahszsz/zwpp.js

// pages/zwpp/sdsz/zwpp.js

const CONFIG = require('../../../config');

Page({
  data: {
    isUnlimited: false,
    yearsIndex: 0,
    yearsArr: [],
    cityIndex: 0,
    cityArr: ['选择招聘部门','自治区工商联','自治区文学艺术届联合会','区党委网信办','西藏农牧学院','自治区总工会','西藏自治区人民政府驻格尔木办事处（藏青工业园区管理委员会）','自治区人力资源和社会保障厅','藏医药大学','自治区财政厅','自治区地勘局','西藏广播电视台','自治区人大常委会办公厅','自治区药品监督管理局','自治区旅游发展厅','自治区民政厅','自治区体育局','自治区文化厅','自治区水利厅','自治区粮食和物资储备局','自治区文物局','自治区政府办公厅','自治区卫健委','自治区农牧科学院','自治区教育厅'],
    xueliIndex: 0,
    xueliArr: [],
    leixingIndex: 0,
    leixingArr: [],
    isUnlimited: false, // 专业是否 不限
    danweiArr: [],
    danweiIndex: 0,
    gangweiArr: [],
    gangweiIndex: 0,
    yearArr: ['年份', '2021', '不限'],
    yearIndex: 0,
    xueliArr: ['学历', '本科', '硕士','博士'],
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
      'zpbm': city,
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
        url: "../../zwppDetail/xzsydw/zwppDetail?searchData=" + searchData,
      })
    }

  },
})