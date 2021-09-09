// pages/zwpp/ynszlx2/zwpp.js
// pages/zwpp/ahszsz/zwpp.js

// pages/zwpp/sdsz/zwpp.js

const CONFIG = require('../../../config');

Page({
  data: {
    danweiArr: [],
    danweiIndex: 0,
    xueliArr: ['学历', '研究生', '本科'],
    xueliIndex: 0,
    zhuanye: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getdanweilist()
  },
  // 获取单位列表
  getdanweilist:function(){
    let that = this
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel',
      data:{
        "actid":40821,
        "level":"1",
        "grfiled":"",
        "grtext":"",
        "itemstamp":new Date().getTime()
      },
      success:res=>{
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        // console.log(data);
        let danweiArr = ["请选择单位"]
        if(data.status == 1){
          data.lists.map((item)=>{
            console.log(item)
            danweiArr.push(item.danwei)
          })
          that.setData({
            danweiArr:danweiArr
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

    let danwei;
    if (e.detail.value.danwei == 0) {
      danwei = "";
    } else {
      danwei = this.data.danweiArr[e.detail.value.danwei];
    }

    let xueli;
    if (e.detail.value.xueli == 0) {
      xueli = "";
    } else {
      xueli = this.data.xueliArr[e.detail.value.xueli];
    }

    let zhuanye_str = this.data.zhuanye

    let searchData = JSON.stringify({
      'danwei': danwei,
      'xueli': xueli,
      'zhuanye': zhuanye_str
    });
    console.log(searchData);

    if (!danwei && !xueli) {
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
        url: "../../zwppDetail/husz2/zwppDetail?searchData=" + searchData,
      })
    }

  },
})