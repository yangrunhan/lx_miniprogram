// pages/zwpp/zwpp.js
const CONFIG = require('../../config');

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
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getQueryConditions();
  },
  // 生命周期函数--监听页面显示
  onShow: function () { },

  // 获取查询条件
  getQueryConditions() {
    console.log(CONFIG);
    console.log(CONFIG.getQinhuangdaoExamLevelDataAPI);
    wx.request({
      url: CONFIG.getQinhuangdaoExamLevelDataAPI,
      data: {
        sort: wx.getStorageSync('entrance'),
        level: '1',
        grfiled: '',
        grtext: ''
      },
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        console.log(data);
        var danwei = ['--请选择单位--']
        for (var d in data.lists){
          danwei.push(data.lists[d]['xddw'])
        }
        // console.log(data.lists[0]);
        // var danwei = data.lists;
        // var years = JSON.parse(data.lists[0].years);
        // var city = JSON.parse(data.lists[0].city);
        // var xueli = JSON.parse(data.lists[0].xueli);
        // var leixing = JSON.parse(data.lists[0].leixing);
        // console.log(years[0], city[0], xueli[0], leixing[0]);
        console.log(danwei)
        this.setData({
          danweiArr: danwei,
          // yearsArr: years,
          // cityArr: city,
          // xueliArr: xueli,
          // leixingArr: leixing,
        })
      },
      fail:res=>{
        console.log(res)
      }
    })
  },

  // 选择单位
  danweiChange(e) {
    this.setData({
      danweiIndex: e.detail.value,
    })
    // console.log(this.data.danweiIndex);
    wx.request({
      url: CONFIG.getQinhuangdaoExamLevelDataAPI,
      data: {
        sort: wx.getStorageSync('entrance'),
        level: '2', 
        grfiled: 'xddw', 
        grtext: this.data.danweiArr[this.data.danweiIndex],
      },
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        console.log(data);
        var gangwei = ['--请选择岗位--']
        for (var d in data.lists) {
          gangwei.push(data.lists[d]['xdzw'])
        }
        console.log(gangwei)
        this.setData({
          gangweiArr: gangwei,
        })
      },
      fail: res => {
        console.log(res)
      }
    })

  },

  gangweiChange(e){
    this.setData({
      gangweiIndex:e.detail.value,
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
    if (e.detail.value.danwei == 0) {
      wx.showToast({
        title: '请选择单位',
        icon: 'none',
      })
      return false;
    }
    if (e.detail.value.gangwei == 0) {
      wx.showToast({
        title: '请选择岗位',
        icon: 'none',
      })
      return false;
    }
    let danwei = this.data.danweiArr[e.detail.value.danwei];
    let gangwei = this.data.gangweiArr[e.detail.value.gangwei];
    // let years = this.data.yearsArr[e.detail.value.years];
    // let city = this.data.cityArr[e.detail.value.city];
    // let education = this.data.xueliArr[e.detail.value.xueli];
    // let identity = this.data.leixingArr[e.detail.value.leixing];
    // let discipline = e.detail.value.zhuanye;
    let searchData = JSON.stringify({
      'xddw':danwei,
      'xdzw':gangwei,
    });
    wx.navigateTo({
      url: "../zwppDetail/zwppDetail?searchData=" + searchData,
    })
  },
})