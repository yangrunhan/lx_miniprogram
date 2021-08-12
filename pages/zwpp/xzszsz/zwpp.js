// pages/zwpp/ahszsz/zwpp.js

// pages/zwpp/sdsz/zwpp.js

const CONFIG = require('../../../config');

Page({
  data: {
    isUnlimited: false,
    yearsIndex: 0,
    yearsArr: [],
    cityIndex: 0,
    cityArr: ['选择单位', '区纪委监委','区党委办公厅','区人大办公厅','区党委统战部','区党委网信办','区政府办公厅','区财政厅','区人民检察院','区司法厅','区商务厅','区人力资源和社会保障厅','区经济和信息化厅','区生态环境厅','区交通运输厅','区水利厅','区林业和草原局','区粮食和物资储备局','区医疗保障局','区住房和城乡建设厅','区发展和改革委','区市场监督管理局','区地质矿产勘查开发局','区总工会','团区委','区残联','区扶贫办','中国佛教协会西藏分会','区文联','区人民政府驻成都办事处','区人民政府驻西安办事处'],
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
    xueliArr: ['学历', '本科', '硕士'],
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
      'dw_name': city,
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
        url: "../../zwppDetail/xzszsz/zwppDetail?searchData=" + searchData,
      })
    }

  },
})