// pages/zwppDetail/ynszlx2/zwppDetail.js
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
        title: searchData.danwei + searchData.xueli + searchData.zhuanye + '检索详情',
      });
      searchData.timestemp = new Date().getTime()
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

    let danwei = this.data.searchData.danwei;
    let xueli = this.data.searchData.xueli;
    let zhuanye = this.data.searchData.zhuanye;

    this.getSearchData()
  },

  getSearchData() {
    let that = this;
    let searchdata = this.data.searchData;
    console.log(searchdata);
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlist/?actid=41531&callback=?',
      data: searchdata,
      success: res => {
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data);
        if (data.status == 1) {
          // data.lists.forEach(el => {
          //   el.isOpen = false;
          // });
          let res_data1 = data.lists
          console.log(res_data1)
          if(searchdata.zhuanye != "不限" && searchdata.zhuanye != ""){
            searchdata.zhuanye = "不限"
            wx.request({
              url: 'https://zg99.offcn.com/index/chaxun/getlist/?actid=41531&callback=?',
              data: searchdata,
              success: res2 => {
                var data2 = JSON.parse(res2.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
                if (data2.status == 1){

                  wx.hideLoading();
                  wx.showToast({
                    title: data2.msg,
                    icon: 'success',
                    duration: 1000,
                  })
                  console.log(data2.lists)
                  this.setData({
                    search_result: res_data1.concat(data2.lists),
                  })

                }else{
                  wx.hideLoading();
                  wx.showToast({
                    title: data.msg,
                    icon: 'success',
                    duration: 1000,
                  })
                  
                  this.setData({
                    search_result: data.lists,
                  })
                }
              }
            })
          }else{
            
            wx.hideLoading();
            wx.showToast({
              title: data.msg,
              icon: 'success',
              duration: 1000,
            })
            
            this.setData({
              search_result: data.lists,
            })
          }
          // wx.stopPullDownRefresh();
          // console.log(data.lists[0]);
        } else {

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

            let danwei = that.data.searchData.danwei;
            let xueli = that.data.searchData.xueli;

            that.setData({
              searchData: {
                'danwei': danwei,
                'xueli': "",
                'zhuanye': "",
                limits: 500
              }
            })
            that.getSearchData()

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