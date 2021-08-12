// pages/zwpp/gssz/zwpp.js
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
    yearArr: ['选择公告年份',2020],
    yearIndex: 0,
    xueliArr: ['选择学历','本科','研究生'],
    xueliIndex: 0,
    zhuanye:'',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // this.getQueryConditions();
  },
  // 生命周期函数--监听页面显示
  onShow: function () { },

  // 获取查询条件
  // getQueryConditions() {
  //   console.log(CONFIG);
  //   console.log(CONFIG.getQinhuangdaoExamLevelDataAPI);
  //   wx.request({
  //     url: CONFIG.getQinhuangdaoExamLevelDataAPI,
  //     data: {
  //       sort: wx.getStorageSync('entrance'),
  //       level: '1',
  //       grfiled: '',
  //       grtext: ''
  //     },
  //     success: res => {
  //       var str = res.data.substring(1, res.data.length - 1);
  //       var data = JSON.parse(str);
  //       console.log(data);
  //       var danwei = ['--请选择单位--']
  //       for (var d in data.lists) {
  //         danwei.push(data.lists[d]['xddw'])
  //       }
  //       // console.log(data.lists[0]);
  //       // var danwei = data.lists;
  //       // var years = JSON.parse(data.lists[0].years);
  //       // var city = JSON.parse(data.lists[0].city);
  //       // var xueli = JSON.parse(data.lists[0].xueli);
  //       // var leixing = JSON.parse(data.lists[0].leixing);
  //       // console.log(years[0], city[0], xueli[0], leixing[0]);
  //       console.log(danwei)
  //       this.setData({
  //         danweiArr: danwei,
  //         // yearsArr: years,
  //         // cityArr: city,
  //         // xueliArr: xueli,
  //         // leixingArr: leixing,
  //       })
  //     },
  //     fail: res => {
  //       console.log(res)
  //     }
  //   })
  // },

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
  zhuanyeInput(e){

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
    // if (e.detail.value.years == 0) {
    //   wx.showToast({
    //     title: '请选择年份',
    //     icon: 'none',
    //   })
    //   return false;
    // }
    // if (e.detail.value.city == 0) {
    //   wx.showToast({
    //     title: '请选择城市',
    //     icon: 'none',
    //   })
    //   return false;
    // }
    // if (e.detail.value.xueli == 0) {
    //   wx.showToast({
    //     title: '请选择学历',
    //     icon: 'none',
    //   })
    //   return false;
    // }
    // if (e.detail.value.leixing == 0) {
    //   wx.showToast({
    //     title: '请选择岗位类型',
    //     icon: 'none',
    //   })
    //   return false;
    // }
    // if (!this.data.isUnlimited) {
    //   if (!e.detail.value.zhuanye) {
    //     wx.showToast({
    //       title: '请输入专业',
    //       icon: 'none',
    //     })
    //     return false;
    //   }
    // }
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
      'year': year,
      'xueli': xueli,
      'zhuanye':zhuanye_str
    });
    wx.navigateTo({
      url: "../../zwppDetail/fjsz/zwppDetail?searchData=" + searchData,
    })
  },
})