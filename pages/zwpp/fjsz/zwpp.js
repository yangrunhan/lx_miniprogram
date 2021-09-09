// pages/zwpp/ahszsz/zwpp.js

// pages/zwpp/sdsz/zwpp.js

const CONFIG = require('../../../config');

Page({
  data: {
    // 年份
    yearIndex: 0,
    yearArr: [],
    // 单位性质
    dwxzArr: ["请选择单位性质"],
    dwxzIndex: 0,
    // 政治面貌
    zzmmArr: ['政治面貌','不限','中共党员'],
    zzmmIndex: 0,
    // 学历
    xueliArr: ['学历', '不限' ,'本科', '研究生'],
    xueliIndex: 0,
    zhuanye: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getyearlist();
  },

  // 获取年份列表
  getyearlist:function(){
    let that = this;

    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel',
      data:{
        "actid":42236,
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

    // 获取单位性质
    getdwxzlist:function(){
      let that = this
      wx.request({
        url: 'https://zg99.offcn.com/index/chaxun/getlevel',
        data:{
          "actid":42236,
          "level":"2",
          "grfiled":"year",
          "grtext":this.data.yearArr[this.data.yearIndex],
          "itemstamp":new Date().getTime()
        },
        success:res=>{
          var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
          // console.log(data);
          let dwxzArr = ["请选择单位性质"];
          if(data.status == 1){
            data.lists.map((item)=>{
              dwxzArr.push(item.dw_type);
            })
            that.setData({
              dwxzArr:dwxzArr
            });
            
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
    this.getdwxzlist();
  },

  // 选择单位性质
  dwxzChange(e){
    this.setData({
      dwxzIndex: e.detail.value,
    });
  },

  //选择政治面貌
  zzmmChange(e) {
    this.setData({
      zzmmIndex: e.detail.value,
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

    // 年份
    let year;
    if (e.detail.value.year == 0) {
      year = "";
    } else {
      year = this.data.yearArr[e.detail.value.year];
    }

    // 单位性质
    let dwxz;
    if (e.detail.value.dwxz == 0) {
      dwxz = "";
    } else {
      dwxz = this.data.dwxzArr[e.detail.value.year];
    }

    // 政治面貌
    let zzmm;
    if (e.detail.value.zzmm == 0) {
      zzmm = "";
    } else {
      zzmm = this.data.zzmmArr[e.detail.value.zzmm];
    }

    // 学历
    let xueli;
    if (e.detail.value.xueli == 0) {
      xueli = "";
    } else {
      xueli = this.data.xueliArr[e.detail.value.xueli];
    }

    // 专业
    let zhuanye_str = this.data.zhuanye

    let searchData = JSON.stringify({
      'year': year,
      'dwxz': dwxz,
      'zzmm': zzmm,
      'xueli': xueli,
      'zhuanye': zhuanye_str
    });
    console.log(searchData);

    if (!this.data.yearIndex && !this.data.dwxzIndex && !this.data.zzmmIndex && !this.data.xueliIndex) {
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
        url: "../../zwppDetail/fjsz/zwppDetail?searchData=" + searchData,
      })
    }

  },
})