// pages/zwppDetail/bjsz/zwppDetail.js

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
        title: searchData.xueli + searchData.zyyq + '详情',
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

  // 获取广告
  getAdsData() {
    wx.request({
      url: CONFIG.getIndexPageDataAPI,
      data: {
        sort: wx.getStorageSync('entrance'),
      },
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        // console.log(data.lists[0]);
        var ads = JSON.parse(data.lists[0].ad_2);
        this.setData({
          ads: ads,
        })
      }
    })
  },
  // 展开/收起
  openSwitch(e) {
    let currentId = e.currentTarget.dataset.id;
    let list = this.data.search_result;
    list.forEach(el => {
      if (el.id == currentId) {
        el.isOpen = !el.isOpen;
      } else {
        el.isOpen = false;
      }
    });
    this.setData({
      search_result: list,
    })
  },

  // 查询
  inquire() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    console.log(this.data.searchData);
    let year = this.data.searchData.year;
    let xueli = this.data.searchData.xueli;
    let zhuanye = this.data.searchData.zhuanye;

    this.getSearchData()
  },
  zwcx_request_count: 0,
  getSearchData() {

    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlist/?actid=23400&callback=?',
      data: this.data.searchData,
      success: res => {

        this.zwcx_request_count++;
        console.log(this.zwcx_request_count)
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
          
          wx.hideLoading();
          if (data.msg == '暂无数据') {
            wx.showLoading({
              title: '加载中',
              mask: true,
            });

            if (this.zwcx_request_count > 1) {
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
            } else {

              let year = this.data.searchData.year;
              let xueli = this.data.searchData.xueli;
              let zhuanye = this.data.searchData.zhuanye;
              this.setData({
                searchData: {
                  xueli: xueli,
                  zhuanye: "",
                  limits: 500
                }
              })

              this.getSearchData()


            }


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
// 学历筛选
var xuel_include = function (item, target) {
  if (item == '专科') {
    if (target.indexOf('专科') != -1 || target.indexOf('大专') != -1 || target.indexOf('中专') != -1) {
      return true
    } else {
      return false
    }
  } else if (item == '本科') {
    if (target.indexOf('专科') != -1 || target.indexOf('大专') != -1 || target.indexOf('本科') != -1 || target.indexOf('中专') != -1 || target.indexOf('二本') != -1 || target.indexOf('一本') != -1) {
      return true
    } else {
      return false
    }
  } else if (item == '研究生') {
    return true
  }
}
// 专业筛选
var professional_include = function (item, target) {
  if (target.indexOf(item) != -1 || target.indexOf("不限") != -1) {
    return true
  } else {
    return false
  }
}