// pages/zwppDetail/hnsz/zwppDetail.js

// pages/zwppDetail/sdsz/zwppDetail.js


const CONFIG = require('../../../config');

Page({
  data: {
    isOpen: false,
    ads: [],
    searchData: null,
    search_result: [],
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    if (options.searchData) { //参数
      var searchData = JSON.parse(options.searchData);
      console.log(searchData);
      wx.setNavigationBarTitle({
        title: searchData.year + searchData.zhuanye + '检索详情',
      });
      searchData.limits = 500;
      this.setData({
        searchData: searchData,
      })
    }

    // this.getAdsData();
    this.inquire();
  },
  // 生命周期函数--监听页面显示
  onShow: function () { },

  // 查询
  inquire() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    console.log(this.data.searchData);
    let year = this.data.searchData.year;
    let xueli = this.data.searchData.xueli;
    let zhuanye = this.data.searchData.zy;

    this.getSearchData()
  },

  getSearchData() {

    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlist/?actid=24375&callback=?',
      data: this.data.searchData,
      success: res => {
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data);
        if (data.status == 1) {
          wx.hideLoading();
          wx.showToast({
            title: data.msg,
            icon: 'success',
            duration: 1000,
          })
          data.lists.forEach(el => {
            el.isOpen = false;
          });
          this.setData({
            search_result: data.lists,
          })
          // wx.stopPullDownRefresh();
          // console.log(data.lists[0]);
        } else {
          // wx.hideLoading();

          // setTimeout(function () {
          //   wx.navigateBack({
          //     delta: 1,
          //   })
          // }, 1000);


          if (data.msg == '暂无数据') {

            wx.showLoading({
              title: '加载中',
              mask: true,
            });
            wx.showToast({
              title: '无符合报考岗位,显示不限专业职位',
              icon: 'none',
              duration: 2000
            })


            // let xs = this.data.searchData.xs;
            // let xueli = this.data.searchData.xlyq;
            // let zwcc = this.data.searchData.zw;
            // let zhuanye = this.data.searchData.zy;

            this.setData({
              searchData: {
                'year': this.data.searchData.year || "",
                'xueli': "",
                'zhuanye': "",
                limits: 500
              }
            })
            this.getSearchData()

          } else {
            wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 1000,
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000);
          }

        }
      }
    })
  },

})


var time_include = function (item, target) {
  if (item == target) {
    return true
  } else {
    return false
  }
}