// pages/lnfs/ahszsz/lnfs.js

const CONFIG = require('../../../config');

Page({
  data: {
    isUnlimited: false,
    yearsIndex: 0,
    yearsArr: [],
    cityIndex: 0,
    cityArr: ['地市'],

    zhiweiIndex: 0,
    zhiweiArr: ['职位'],
    isUnlimited: false, // 专业是否 不限
    danweiArr: ['单位'],
    danweiIndex: 0,

    yearArr: ['年份'],
    yearIndex: 0,
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

    
    this.loadData()
  },

  // 数据初始化
  loadData() {
    let _this = this
    // 获取一级
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=35383',
      data:{level: '1', grfiled:'',grtext:''},
      success:(res)=>{
        let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data)
        if(data.status == 1){
          let year_list = ['年份']
          data.lists.forEach(function(t,i){
            year_list.push(t['year'])
          })
          _this.setData({
            yearArr:year_list
          })
        }else{
          wx.showToast({
            title: '数据加载失败',
            icon:'none'
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  
  },

  // 生命周期函数--监听页面显示
  onShow: function () { },

  //选择年份
  yearChange(e) {

    let _this = this
    this.setData({
      yearIndex: e.detail.value,
    })

    if(this.data.yearIndex > 0){

      let seltext = this.data.yearArr[this.data.yearIndex]
  
      wx.request({
        url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=35383',
        data:{level: '2', grfiled:'year',grtext:seltext},
        success:(res)=>{
          let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
          console.log(data)
          if(data.status == 1){
            
            let danwei_List = ['单位']
            data.lists.forEach(function(t,i){
              danwei_List.push(t['danwei'])
            })
            _this.setData({
              danweiArr:danwei_List
            })
  
          }else{
            wx.showToast({
              title: '数据加载失败',
              icon:'none'
            })
            wx.navigateBack({
              delta: 1,
            })
          }
        }
      })
    }
  },

  // 城市点击
  cityClick(e){
    // 如果没有选择1级 则提示 1级的第一个内容
    if(this.data.yearIndex == 0){
      wx.showToast({
        title: '请先选择年份',
        icon:"none"
      })
      return false
    }
  },

  // //选择城市
  // cityChange(e) {
  //   let _this = this;
  //   // console.log(e.detail.value)
  //   this.setData({
  //     cityIndex: e.detail.value,
  //   })

  //   let onefiled = 'year'
  //   let onetext = this.data.yearArr[this.data.yearIndex]

  //   let grfiled = 'city'
  //   let seltext = this.data.cityArr[this.data.cityIndex]


  
  //   if(this.data.cityIndex > 0){
  //     wx.request({
  //       url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=30789',
  //       data: {level: '3', grfiled:grfiled,grtext:seltext,onefiled:onefiled,onetext:onetext},
  //       success:(res)=>{
  //         let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
  //         console.log(data)
  //         if(data.status == 1){
            
                        
  //           let danwei_List = ['单位']
  //           data.lists.forEach(function(t,i){
  //             danwei_List.push(t['danwei'])
  //           })
  //           _this.setData({
  //             danweiArr:danwei_List
  //           })

  //         }else{
  //           wx.showToast({
  //             title: '数据加载失败',
  //             icon:'none'
  //           })
  //           wx.navigateBack({
  //             delta: 1,
  //           })
  //         }
  //       }
  //     })
  //   }
  // },

  // 单位点击
  danweiClick(e){
    // 如果没有选择1级 则提示 1级的第一个内容
    // if(this.data.cityIndex == 0){
    //   wx.showToast({
    //     title: '请先选择地市',
    //     icon:"none"
    //   })
    //   return false
    // }
  },

  //选择单位
  danweiChange(e) {
    let _this =this
    // console.log(e.detail.value)
    this.setData({
      danweiIndex: e.detail.value,
    })

  
    let onefiled = 'year'
    let onetext = this.data.yearArr[this.data.yearIndex]

    // let twofiled = 'city'
    // let twotext = this.data.cityArr[this.data.cityIndex]

    let grfiled = 'danwei'
    let seltext = this.data.danweiArr[this.data.danweiIndex]


  
    if(this.data.danweiIndex > 0){
      wx.request({
        url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid=35383',
        data: {level: '3', grfiled:grfiled,grtext:seltext,onefiled:onefiled,onetext:onetext},
        success:(res)=>{
          let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
          console.log(data)
          if(data.status == 1){
            
                        
            let zhiwei_List = ['职位']
            data.lists.forEach(function(t,i){
              zhiwei_List.push(t['zhiwei'])
            })
            _this.setData({
              zhiweiArr:zhiwei_List
            })

          }else{
            wx.showToast({
              title: '数据加载失败',
              icon:'none'
            })
            wx.navigateBack({
              delta: 1,
            })
          }
        }
      })
    }


  },


  // 职位点击
  zhiweiClick(e){
    // 如果没有选择1级 则提示 1级的第一个内容
    if(this.data.danweiIndex == 0){
      wx.showToast({
        title: '请先选择职位',
        icon:"none"
      })
      return false
    }
  },
  
  //选择职位
  zhiweiChange(e) {
    let _this =this
    // console.log(e.detail.value)
    this.setData({
      zhiweiIndex: e.detail.value,
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
    } else {
      year = this.data.yearArr[e.detail.value.year];
    }

    // let city;
    // if (e.detail.value.city == 0) {
    //   city = "";
    // } else {
    //   city = this.data.cityArr[e.detail.value.city];
    // }

    let danwei;
    if (e.detail.value.danwei == 0) {
      danwei = "";
    } else {
      danwei = this.data.danweiArr[e.detail.value.danwei];
    }

    
    let zhiwei;
    if (e.detail.value.zhiwei == 0) {
      zhiwei = "";
    } else {
      zhiwei = this.data.zhiweiArr[e.detail.value.zhiwei];
    }

    let searchData = JSON.stringify({
      'year': year,
      'danwei': danwei,
      'zhiwei': zhiwei
    });
    console.log(searchData)
    wx.navigateTo({
      url: "../../lnfsDetail/ynkmgdxz/lnfsDetail?searchData=" + searchData,
    })
  },
})