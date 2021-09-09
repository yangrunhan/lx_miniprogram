// pages/zwppDetail/scdishi/zwppDetail.js

const CONFIG = require('../../../config');

Page({
  data: {
    isOpen: false,
    ads: [],
    searchData: null,
    search_result: [],
    zhuanye:"",
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    if (options.searchData) { //参数
      var searchData = JSON.parse(options.searchData);
      console.log(searchData);
      wx.setNavigationBarTitle({
        title: searchData.year + searchData.dishi + searchData.leixing + searchData.zhuanye + '检索详情',
      });
      searchData.limits = 500;

      let zhuanye = searchData.zhuanye
      searchData.zhuanye = ""
      this.setData({
        zhuanye:zhuanye,
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
    let dishi = this.data.searchData.dishi;
    let leixing = this.data.searchData.leixing;
    let year = this.data.searchData.year;
    let xueli = this.data.searchData.xueli;
    let zhuanye = this.data.searchData.zhuanye;

    this.getSearchData()
  },

  getSearchData() {
    let this_ = this
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlist/?actid=42151&callback=?',
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
          let search_result = []
          data.lists.forEach(el => {
            el.isOpen = false;
            if(el.zhuanye=="" || el.zhuanye.includes(this_.data.zhuanye) || el.zhuanye.includes("不限")){
              search_result.push(el)
            }
          });
          this.setData({
            search_result: search_result,
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
              icon: 'none'
            })
            setTimeout(()=>{
              // wx.hideToast();
              this.setData({
                searchData: {
                  'year': "",
                  'leixing': "",
                  'xueli': "",
                  'dishi': "",
                  'zhuanye': "",
                  limits: 500
                }
              })
              this.getSearchData()
            },1200)


            // let xs = this.data.searchData.xs;
            // let xueli = this.data.searchData.xlyq;
            // let zwcc = this.data.searchData.zw;
            // let zhuanye = this.data.searchData.zy;

            

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