const CONFIG = require('../../../config');

Page({
  data: {
    zzmmArr: ['政治面貌', '中共党员', '九三学社社员或群众','不限'],
    zzmmIndex: 0,
    xueliArr: ['学历', '本科及以上', '研究生'],
    xueliIndex: 0,
    zhuanye: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
  },

  // 生命周期函数--监听页面显示
  onShow: function () {},

  // 单位
  zzmmChange(e){
    this.setData({
      zzmmIndex: e.detail.value,
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

    // 学历
    let xueli = this.data.xueliArr[this.data.xueliIndex];
    if(!this.data.xueliIndex){
      xueli='';
    };

    // 专业
    let zhuanye_str = this.data.zhuanye;

    // 政治面貌
    let zzmm = this.data.zzmmArr[this.data.zzmmIndex];
    if(!this.data.zzmmIndex){
      zzmm='';
    };

    let searchData = JSON.stringify({
      'xueli': xueli,
      'zhuanye': zhuanye_str,
      'zzmm': zzmm
    });
    console.log(searchData);

    if (!this.data.zzmmIndex&&!this.data.xueliIndex&&!this.data.zhuanye) {
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
        url: "../../zwppDetail/nxsz/zwppDetail?searchData=" + searchData,
      })
    }

  },
})