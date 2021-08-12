// pages/bmrsDetail/bmrsDetail.js
// pages/zwppDetail/ahszsz/zwppDetail.js

const CONFIG = require('../../config');

Page({
  data: {
    isOpen: false,
    searchData: null,
    search_result: [],
    actid:0,
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

    if(options.actid){
      this.setData({
        actid:options.actid
      })
    }else{
      wx.showToast({
        title: '参数错误',
        icon:'none'
      })
      setTimeout(function(){
        wx.switchTab({
          url: '/pages/index/index',
        })
      },2000)
    }

    if (options.searchData) { //参数
      console.log(options.searchData)
      var searchData = JSON.parse(options.searchData);
      console.log(searchData);
      wx.setNavigationBarTitle({
        title: searchData.year + searchData.city + searchData.zhuanye + '检索详情',
      });
      searchData.limits = 500;
      this.setData({
        searchData: searchData,
      })
    }

    // this.getAdsData();
    this.inquire(options);
  },
  // 生命周期函数--监听页面显示
  onShow: function () { },

  // 查询
  inquire(options) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });

    // 如果包含显示数据
    console.log(options.item_data)
    if (options.item_data) { //参数

      let item_data = JSON.parse(options.item_data.replace(/^(\s|\()+|(\s|\))+$/g, '').replace(/\'/g,'"').replace(/\’/g,'"').replace(/\‘/g,'"'))
      console.log(item_data);

      this.setData({
        item_data:item_data
      })
    }else if (op_data.item_data) { //参数
      let item_data = JSON.parse(op_data.item_data)
      console.log(item_data);

      this.setData({
        item_data:item_data
      })
    }

    // 如果包含other_info
    let other_info = ''
    console.log(options.other_info)
    if (options.other_info) { //参数
      other_info = options.other_info
      console.log(other_info);
      this.setData({
        other_info:other_info
      })
    }else if (op_data.other_info) { //参数
      other_info = op_data.other_info
      this.setData({
        other_info:other_info
      })
    }

    if (options.searchData) { //参数
      var searchData = JSON.parse(options.searchData);
      console.log(searchData);
      wx.setNavigationBarTitle({
        title: '详情页',
      });
      searchData.limits = 500;
      this.setData({
        ks_name:options.ks_name,
        xt_name:options.xt_name,
        actid:options.actid,
        searchData: searchData,
        other_info:options.other_info,
      })
    }

    this.getSearchData()
  },

  getSearchData() {

    
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    console.log(this.data.searchData);
    console.log(CONFIG.ChaxunGetListApi+this.data.actid);

    wx.request({
      url: CONFIG.ChaxunGetListApi+this.data.actid,
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
          console.log(this.data.search_result)
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

            this.setData({
              searchData: {
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