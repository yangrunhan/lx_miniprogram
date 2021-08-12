// pages/zwpp/ahszsz/zwpp.js

// pages/zwpp/sdsz/zwpp.js

const CONFIG = require('../../../config');

Page({
  data: {
    isUnlimited: false,
    yearsIndex: 0,
    yearsArr: [],
    cityIndex: 0,
    cityArr: ['地市', '纪委监委'],
    leixingIndex: 0,
    leixingArr: [],
    isUnlimited: false, // 专业是否 不限
    danweiArr: [],
    danweiIndex: 0,
    gangweiArr: [],
    gangweiIndex: 0,
    yearArr: [],
    yearIndex: 0,
    one_select:'',
    two_select:'',
    three_select:'',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {},
  // 生命周期函数--监听页面显示
  onShow: function () {

    // 一级联动
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=33274&callback=?',
      data: {
        level: "1",
        grfiled: "",
        grtext: ""
      },
      success: res => {
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        // console.log(data);
        if (data.status == 1) {
          this.setData({
            yearArr: data.lists,
            one_select: data.lists[0],
          }),
          // console.log(this.data.one_select.city);
          wx.hideLoading();

          // 二级联动
          wx.request({
            url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=33274&callback=?',
            data: {
              level: "2",
              grfiled: "city",
              grtext: this.data.one_select.city,
            },
            success: res => {
              var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
              // console.log(data);
              if (data.status == 1) {
                this.setData({
                  gangweiArr: data.lists,
                  two_select: data.lists[0],
                }),
                wx.hideLoading();
                // console.log(this.data.one_select.city);
                // console.log(this.data.gangweiArr);
                // console.log(this.data.two_select.dw_name);
              } else {
                console.log(data.msg);
              }
            }
          })

        } else {
          console.log(data.msg);
        }
      }
    })

  },

  //选择地市
  yearChange(e) {
    this.setData({
      yearIndex: e.detail.value,
      one_select: this.data.yearArr[e.detail.value],
      gangweiIndex: 0,
    });
    // console.log(this.data.yearIndex);
    console.log(this.data.one_select.city);
    // 二级联动
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=33274&callback=?',
      data: {
        level: "2",
				grfiled: "city",
				grtext: this.data.one_select.city,
      },
      success: res => {
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        // console.log(data);
        if (data.status == 1) {
          this.setData({
            gangweiArr: data.lists,
            two_select: data.lists[0],
          }),
          wx.hideLoading();
          // console.log(this.data.one_select.city);
          // console.log(this.data.gangweiArr);
          console.log(this.data.two_select.dw_name);
        } else {
          console.log(data.msg);
        }
      }
    })
    

  },
  //选择城市
  cityChange(e) {
    this.setData({
      gangweiIndex: e.detail.value,
      two_select: this.data.gangweiArr[e.detail.value],
    });
    // console.log(this.data.one_select.city);
    // console.log(this.data.two_select.dw_name);
  },

  // 立即查询
  inquireBtn(e) {

    let searchData = JSON.stringify({
      'city': this.data.one_select.city,
      'dw_name': this.data.two_select.dw_name
    });
    console.log(searchData);

      wx.showLoading({
        title: '查询中···',
        mask: true,
      });

      wx.navigateTo({
        url: "../../zwppDetail/gxszsz/zwppDetail?searchData=" + searchData,
      })
    

  },
})