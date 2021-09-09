// pages/zwpp/zylx/zwpp.js
const CONFIG = require('../../../config');

Page({
  data: {
    isUnlimited: false,
    yearsIndex: 0,
    yearsArr: [],
    cityIndex: 0,
    cityArr: [],
    xueliIndex: 0,
    xueliArr: [],
    leixingIndex: 0,
    leixingArr: [],
    isUnlimited: false, // 专业是否 不限
    danweiArr: [],
    danweiIndex: 0,
    gangweiArr: [],
    gangweiIndex: 0,
    yearArr: ['遴选年份', '2020', '2019', '2017', '2016'],
    yearIndex: 0,
    workareaArr: ['工作地区', '不要求', '北京', '重庆', '江西', '广东'],
    workareaIndex: 0,
    zwccArr: ['职务层次', '主任科员', '副主任科员', '主任科员及以下', '副主任科员及以下', '科员', '调研员', '副调研员', '副处长', '县处级正职', '县处级副职'],
    zwccIndex: 0,
    xueliArr: ['学历要求', '不要求', '大专', '本科', '研究生（硕士）', '研究生（博士）'],
    xueliIndex: 0,
    zhuanye: '',
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.inityear()
  },
  // 生命周期函数--监听页面显示
  onShow: function () { },

  inityear(){
    let _this = this;
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=879&callback=?',
      data:{level: '1', grfiled:'',grtext:''},
      success:(res)=>{
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        if (data.status == 1) {
          console.log(data);
          let yeararr = ['遴选年份']
          data.lists.forEach(function(item,index){
            yeararr.push(item.year)
          })
          _this.setData({
            yearArr:yeararr
          })
          console.log(yeararr)
        }else {
          wx.showToast({
            title: '请求失败，请返回重试',
            icon:'none',
            duration:2000
          })
        }
      }
    })
  },


  // 选择年份
  yearChange(e) {
    let seltext = this.data.yearArr[e.detail.value];
    this.setData({
      yearIndex: e.detail.value,
    })

    let _this = this;
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=879&callback=?',
      data:{level: '2', grfiled:'year',grtext:seltext},
      success:(res)=>{
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        if (data.status == 1) {
          console.log(data);
          let workarr = ['工作地区']
          data.lists.forEach(function(item,index){
            workarr.push(item.area)
          })
          _this.setData({
            workareaArr:workarr
          })
          // console.log(yeararr)
        }else {
          console.log(data)
          wx.showToast({
            title: '请求失败，请返回重试',
            icon:'none',
            duration:2000
          })
        }
      }
    })


    // console.log(this.data.danweiIndex);
  },
  //选择工作地区
  workareaChange(e) {

    let onetext = this.data.yearArr[this.data.yearIndex];
    let seltext = this.data.workareaArr[e.detail.value]
    
    this.setData({
      workareaIndex: e.detail.value,
    })

    let _this = this;
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=879&callback=?',
      data:{level: '3', grfiled:'area',grtext:seltext, onefiled:'year',onetext:onetext},
      success:(res)=>{
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        if (data.status == 1) {
          console.log(data);
          let xueliarr = ['学历要求']
          data.lists.forEach(function(item,index){
            xueliarr.push(item.xlyq)
          })
          _this.setData({
            xueliArr:xueliarr
          })
          // console.log(yeararr)
        }else {
          console.log(data)
          wx.showToast({
            title: '请求失败，请返回重试',
            icon:'none',
            duration:2000
          })
        }
      }
    })
  },
  //选择学历
  xueliChange(e) {
    // console.log(e.detail.value)
    
    let onetext = this.data.yearArr[this.data.yearIndex];
    let twotext = this.data.workareaArr[this.data.workareaIndex];
    let seltext = this.data.xueliArr[e.detail.value]
    
    this.setData({
      xueliIndex: e.detail.value,
    })

    let _this = this;
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=879&callback=?',
      data:{level: '4', grfiled:'xlyq',grtext:seltext,onefiled:'year',onetext:onetext,twofiled:'area',twotext:twotext},
      success:(res)=>{
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        if (data.status == 1) {
          console.log(data);
          let cengciarr = ['职务层次']
          data.lists.forEach(function(item,index){
            cengciarr.push(item.zw)
          })
          _this.setData({
            zwccArr:cengciarr
          })
          // console.log(yeararr)
        }else {
          console.log(data)
          wx.showToast({
            title: '请求失败，请返回重试',
            icon:'none',
            duration:2000
          })
        }
      }
    })

  },
  //选择职位层次
  zwccChange(e) {
    this.setData({
      zwccIndex: e.detail.value,
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
    wx.showLoading({
      title: '查询中···',
      mask: true,
    });

    let year;
    if (e.detail.value.year == 0) {
      year = "";
    }else{
      year = this.data.yearArr[e.detail.value.year];
    }

    let workarea;
    if (e.detail.value.workarea == 0 || e.detail.value.workarea == 1) {
       workarea = "";
    }else{

       workarea = this.data.workareaArr[e.detail.value.workarea];
    }


    let xueli;
    if (e.detail.value.xueli == 0 || e.detail.value.xueli == 1) {
       xueli = "";
    }else{
      xueli = this.data.xueliArr[e.detail.value.xueli];
    }

    let zwcc;
    if (e.detail.value.zwcc == 0) {
      let zwcc = "";
    }else{
      let zwcc = this.data.zwccArr[e.detail.value.zwcc];
    }

    // if (e.detail.value.zhuanye == '') {
    //   wx.showToast({
    //     title: '请输入专业',
    //     icon: 'none',
    //   })
    //   return false;
    // }

    let zhuanye_str = this.data.zhuanye
    // let years = this.data.yearsArr[e.detail.value.years];
    // let city = this.data.cityArr[e.detail.value.city];
    // let education = this.data.xueliArr[e.detail.value.xueli];
    // let identity = this.data.leixingArr[e.detail.value.leixing];
    // let discipline = e.detail.value.zhuanye;
    let searchData = JSON.stringify({
      'year': year,
      'area': workarea,
      'xlyq': xueli,
      'zw': zwcc,
      'zy': zhuanye_str
    });
    wx.navigateTo({
      url: "../../zwppDetail/zylx/zwppDetail?searchData=" + searchData,
    })
  },
})