// pages/zwpp/ahszsz/zwpp.js

// pages/zwpp/sdsz/zwpp.js

const CONFIG = require('../../../config');

Page({
  data: {

    // 年份
    yearIndex: 0,
    yearArr: [],
    cityIndex: 0,
    cityArr: ['请选择单位'],
    xueliIndex: 0,
    xueliArr: [],
    leixingIndex: 0,
    leixingArr: [],
    isUnlimited: false, // 专业是否 不限
    danweiArr: [],
    danweiIndex: 0,
    gangweiArr: [],
    gangweiIndex: 0,
    xueliArr: ['学历', '研究生', '本科'],
    xueliIndex: 0,
    zhuanye: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getyearlist();
  },

  // 获取年份列表
  getyearlist:function(){
    let that = this
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel',
      data:{
        "actid":39078,
        "level":"1",
        "grfiled":"",
        "grtext":"",
        "itemstamp":new Date().getTime()
      },
      success:res=>{
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        // console.log(data);
        let yearArr = ["请选择年份"];
        if(data.status == 1){
          data.lists.map((item)=>{
            yearArr.push(item.year);
          })
          that.setData({
            yearArr:yearArr
          })
          
        }else{
          wx.showToast({
            title: '数据加载出问题，请关闭后重试',
            icon: "none"
          })
        }
      }
    })

  },

    // 获取单位列表
    getdanweilist:function(year){
      let that = this
      wx.request({
        url: 'https://zg99.offcn.com/index/chaxun/getlevel',
        data:{
          "actid":39078,
          "level":"2",
          "grfiled":"year",
          "grtext":year,
          "itemstamp":new Date().getTime()
        },
        success:res=>{
          var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
          let danweiArr = ["请选择单位"]
          if(data.status == 1){
            data.lists.map((item)=>{
              danweiArr.push(item.dw_name)
            })
            that.setData({
              cityArr:danweiArr
            })
            
          }else{
            wx.showToast({
              title: '数据加载出问题，请关闭后重试',
              icon: "none"
            })
          }
        }
      })
  
    },

  // 生命周期函数--监听页面显示
  onShow: function () {},

  //选择年份
  yearChange(e) {
    this.setData({
      yearIndex: e.detail.value,
    });
    this.getdanweilist(this.data.yearArr[this.data.yearIndex]);
  },
  //选择单位
  cityChange(e) {
    this.setData({
      cityIndex: e.detail.value,
    })
  },
  //选择学历
  xueliChange(e) {
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
      'city': city,
      'xueli': xueli,
      'zhuanye': zhuanye_str
    });
    console.log(searchData);

    if (!this.data.yearIndex && !this.data.cityIndex && !this.data.xueliIndex) {
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
        url: "../../zwppDetail/jxszsz/zwppDetail?searchData=" + searchData,
      })
    }

  },
})