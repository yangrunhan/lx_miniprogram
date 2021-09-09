// pages/zwpp/ynszlx2/zwpp.js
// pages/zwpp/ahszsz/zwpp.js

// pages/zwpp/sdsz/zwpp.js

const CONFIG = require('../../../config');

Page({
  data: {
    cityArr: [],
    cityIndex: 0,
    danweiArr: ['请选择单位'],
    danweiIndex: 0,
    xueliArr: ['学历', '大专', '本科','研究生'],
    xueliIndex: 0,
    zhuanye: '',
    actid: '41539'
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getCityList();
  },

  // 获取地市
  getCityList(){
    const that = this;
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel',
      data:{
        "actid":that.data.actid,
        "level":"1",
        "grfiled":"",
        "grtext":"",
        "itemstamp":new Date().getTime()
      },
      success:res=>{
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        let cityArr = ["请选择地市"]
        if(data.status == 1){
          data.lists.map((item)=>{
            cityArr.push(item.city);
          })
          that.setData({
            cityArr:cityArr
          })
          
        }else{
          wx.showToast({
            title: '数据加载出问题，请关闭后重试',
            icon: "none"
          })
        }
      }
    });
  },

  // 改变地市
  cityChange(e){
    this.setData({
      cityIndex: e.detail.value,
    });
    this.getdanweilist(this.data.cityArr[this.data.cityIndex]);
  },

  // 获取单位列表
  getdanweilist:function(city){
    const that = this;
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel',
      data:{
        "actid":that.data.actid,
        "level":"2",
        "grfiled":"city",
        "grtext":city,
        "itemstamp":new Date().getTime()
      },
      success:res=>{
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        // console.log(data);
        let danweiArr = ["请选择单位"]
        if(data.status == 1){
          data.lists.map((item)=>{
            danweiArr.push(item.danwei);
          });
          that.setData({
            danweiArr:danweiArr
          })
          
        }else{
          wx.showToast({
            title: '请选择地市',
            icon: "none"
          })
        }
      }
    });
  },

  // 生命周期函数--监听页面显示
  onShow: function () {},

  // 单位
  danweiChange(e){
    this.setData({
      danweiIndex: e.detail.value,
    })
  },

  //选择学历
  xueliChange(e) {
    // console.log(e.detail.value)
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

    const city = this.data.cityArr[this.data.cityIndex];
    const danwei = this.data.danweiArr[this.data.danweiIndex];
    const xueli = this.data.xueliArr[this.data.xueliIndex];
    const zhuanye_str = this.data.zhuanye

    let searchData = JSON.stringify({
      'city': city,
      'danwei': danwei,
      'xueli': xueli,
      'zhuanye': zhuanye_str
    });
    console.log(searchData);

    if (!city && !danwei && !xueli) {
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
        url: "../../zwppDetail/hnszsz/zwppDetail?searchData=" + searchData,
      })
    }

  },
})