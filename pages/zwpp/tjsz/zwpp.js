const CONFIG = require('../../../config');

Page({
  data: {
    zzmmArr: ['政治面貌', '中共党员','不限'],
    zzmmIndex: 0,
    xueliArr: ['学历', '本科及以上', '研究生'],
    xueliIndex: 0,
    xdlxArr: ['选调/遴选', '选调', '遴选'],
    xdlxIndex: 0,
    zhuanye: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
  },

  // 生命周期函数--监听页面显示
  onShow: function () {},

  // 政治面貌
  zzmmChange(e){
    this.setData({
      zzmmIndex: e.detail.value,
    })
  },

  // 选调/遴选
  xdlxChange(e){
    this.setData({
      xdlxIndex: e.detail.value,
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

    // 选调/遴选
    let kind = this.data.xdlxArr[this.data.xdlxIndex];
    if(!this.data.xdlxIndex){
      kind='';
    };

    // 学历
    let xueli = this.data.xueliArr[this.data.xueliIndex];
    if(!this.data.xueliIndex){
      xueli='';
    };

    // 专业
    let zhuanye_str = this.data.zhuanye;

    let searchData = JSON.stringify({
      'kind': kind,
      'xueli': xueli,
      'zhuanye': zhuanye_str
    });
    console.log(searchData);

    if (!this.data.xdlxIndex&&!this.data.xueliIndex&&!this.data.zhuanye&&!this.data.zzmmIndex) {
      wx.showModal({
        title: '提示',
        content: '请选择查询条件',
        success(res) {}
      });
    } else {

      wx.showLoading({
        title: '查询中···',
        mask: true,
      });

      wx.navigateTo({
        url: "../../zwppDetail/tjsz/zwppDetail?searchData=" + searchData,
      })
    }

  },
})