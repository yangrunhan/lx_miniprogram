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
      const searchData = JSON.parse(options.searchData);
      console.log(searchData);
      wx.setNavigationBarTitle({
        title: searchData.xueli + searchData.zhuanye + '检索详情',
      });
      this.setData({
        searchData: searchData,
      });
    }
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
    this.getSearchData();
  },

  getSearchData() {
    const that = this;
    const searchdata = that.data.searchData;
    console.log(searchdata);
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlist/?actid=39078&callback=?',
      data: {
        year: searchdata.year,
        dw_name:searchdata.city,
        zhuanye:'',
        timestemp: new Date().getTime(),
        limits:'200'
      },
      success: res => {
        const data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        wx.showToast({
          title: data.msg,
          icon: 'success',
          duration: 2000,
        });
        if (data.status == 1) {
          // console.log(data.lists);
          const new_array = data.lists.filter( item => {
            return (item.zhuanye =="不限"||item.zhuanye.includes(searchdata.zhuanye));
        });
        console.log(new_array);
          that.setData({
            search_result: new_array,
          });

          if(new_array.length == 0){
              wx.showToast({
                title: '无符合报考岗位,显示不限专业职位',
                icon: 'none',
                duration: 5000
              });
              that.setData({
                searchData: {
                  'year': '',
                  'xueli': '',
                  'zhuanye': ''
                }
              });
              that.getSearchData();
          };

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
    })
  },
});


var time_include = function (item, target) {
  if (item == target) {
    return true
  } else {
    return false
  }
}