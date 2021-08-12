// pages/bmrs/bmrs.js

const CONFIG = require('../../config');
const setfxid = require('../../utils/setFxid');
const getparams = require('../../utils/getparams');
const tools = require('../../utils/tools');
const app = getApp();

Page({
  data: {
    isUnlimited: false,
    yearsIndex: 0,
    yearsArr: [],
    cityIndex: 0,
    cityArr: ['地市', '省直', '安庆', '蚌埠', '阜阳', '合肥', '淮北', '淮南', '马鞍山', '铜陵', '芜湖', '宣城', '不限'],
    xueliIndex: 0,
    xueliArr: [],
    leixingIndex: 0,
    leixingArr: [],
    isUnlimited: false, // 专业是否 不限
    danweiArr: [],
    danweiIndex: 0,
    gangweiArr: [],
    gangweiIndex: 0,
    yearArr: ['年份','2020', '2019','不限'],
    yearIndex: 0,
    xueliArr: ['学历', '研究生', '本科','专科'],
    xueliIndex: 0,
    zhuanye: '',
    actid:0,
    Ld1Name:"",
    Ld1Arr:[],
    Ld1Index:0,
    Ld2Name:"",
    Ld2Arr:[],
    Ld2Index:0,
    Ld3Name:"",
    Ld3Arr:[],
    Ld3Index:0,
    Ld4Name:"",
    Ld4Arr:[],
    Ld4Index:0,
    Ld5Name:"",
    Ld5Arr:[],
    Ld5Index:0,
    ld_count:0,
    searchData:{}
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
    // 初始化参数
    getparams.setTgParams(options)
    let baseParams = getparams.setBaseParams(options)

    // 设置初始化data
    // 初始化actid 默认为0
    if(baseParams.actid){
      this.setData({
        'actid':baseParams.actid
      })
    }

    // 初始化页面样式数据
    this.inquirePage();

  },

  /**
   * 初始化页面样式数据
   * 根据 actid获取 页面配置信息并初始化数据
   */
  inquirePage:function(){
    let _this = this;
    if(this.data.actid != 0 ){

    let actid = this.data.actid;
    wx.showLoading({
      title: '数据加载中...',
    })

    // 请求页面数据 并配置页面信息
    wx.request({
      url: CONFIG.getCxjlDataAPI+actid,
      data:{
        limits:10,
        timestemp: new Date().getTime()
      },
      success:(res)=>{
        let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data)
        if(data.status == 1){
          // 
          let ks_name = data.lists[0]['ks_name']
          let xt_name = data.lists[0]['xt_name']
          let item_data = data.lists[0]['item_data']

          // 设置活动数据 和 标题
          console.log(ks_name)
          console.log(xt_name)

          _this.setData({
            ks_name:ks_name,
            xt_name:xt_name,
            item_data:item_data
          })
          wx.setNavigationBarTitle({
            title: ks_name+xt_name,
          })

          // 设置联动数据
          let is_ld = data.lists[0]['is_liandong']
          let ld_set = JSON.parse(data.lists[0]['liandong_data'].replace(/^(\s|\()+|(\s|\))+$/g, '').replace(/\'/g,'"').replace(/\’/g,'"').replace(/\‘/g,'"'))

          _this.setData({
            is_ld:is_ld,
            ld_set:ld_set,
          })
          
          // console.log(typeof(is_ld))
          console.log(ld_set)

          // 判断是否联动 
          if(is_ld == "1"){
            //如果联动 这获取填充联动数据
            let ld_count = 0;
            // tools.setLiandong(actid,ld_set)
            // 设置联动1
            if(ld_set["1"]){
              ld_count = 1
              let ld_name = ld_set["1"][0]
              let ld_key = ld_set["1"][1]
              
              wx.request({
                url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid='+actid,
                data:{level: '1', grfiled:'',grtext:''},
                success:(res)=>{
                  let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
                  console.log(data)
                  if(data.status == 1){
                    let ld_arr = ['请选择'+ld_name]
                    data.lists.forEach(function(t,i){
                      ld_arr.push(t[ld_key])
                    })
                    console.log(ld_key)
                    console.log(ld_arr)
                    _this.setData({
                      Ld1Arr:ld_arr,
                      Ld1Name:ld_key
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
            // 设置联动2
            if(ld_set["2"]){
              ld_count = 2
              let ld_name = ld_set["2"][0]
              let ld_key = ld_set["2"][1]
              let ld_arr =  ['请选择'+ld_name]
              _this.setData({
                Ld2Arr:ld_arr,
                Ld2Name:ld_key
              })
            }
            // 设置联动3
            if(ld_set["3"]){
              ld_count = 3
              let ld_name = ld_set["3"][0]
              let ld_key = ld_set["3"][1]
              let ld_arr =  ['请选择'+ld_name]
              _this.setData({
                Ld3Arr:ld_arr,
                Ld3Name:ld_key
              })
            }
            // 设置联动4
            if(ld_set["4"]){
              ld_count = 4
              let ld_name = ld_set["4"][0]
              let ld_key = ld_set["4"][1]
              let ld_arr =  ['请选择'+ld_name]
              _this.setData({
                Ld4Arr:ld_arr,
                Ld4Name:ld_key
              })
            }
            // 设置联动5
            if(ld_set["5"]){
              ld_count = 5
              let ld_name = ld_set["5"][0]
              let ld_key = ld_set["5"][1]
              let ld_arr =  ['请选择'+ld_name]
              _this.setData({
                Ld5Arr:ld_arr,
                Ld5Name:ld_key
              })
            }

            this.setData({
              ld_count:ld_count
            })

          }

          
          console.log(_this.data)
          wx.hideLoading()
          wx.showToast({
            title: '数据加载完成',
          })





        }else if(data.status == 2){
          // 数据为空
          wx.hideLoading()
          wx.showToast({
            title: '数据错误',
            icon:'none'
          })
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index',
            })
          },2000)

        }else{
          // 请求异常
          wx.hideLoading()
          wx.showToast({
            title: '请求异常',
            icon:'none'
          })
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index',
            })
          },2000)

        }
      }
    })
    



    }else{
      wx.showToast({
        title: '参数错误',
        icon:'none'
      })
      setTimeout(function(){
        wx.switchTab({
          url: '/pages/index/index',
        })
      },2000)
    }

  },

  // 生命周期函数--监听页面显示
  onShow: function () { },

  // 一级联动变化
  ld1Change(e){

    let _this = this
    this.setData({
      Ld1Index: e.detail.value,
      Ld2Index:0
    })

    // 判断是否有二级联动 如果有需要调取
    if(this.data.ld_count >= 2){

      let grfiled = this.data.Ld1Name
      let seltext = this.data.Ld1Arr[this.data.Ld1Index]; //一级的数据

      wx.request({
        url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid='+this.data.actid,
        data:{level: '2', grfiled:grfiled,grtext:seltext},
        success:(res)=>{
          let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
          console.log(data)
          if(data.status == 1){
            let ld_arr = [_this.data.Ld2Arr[0]]
            console.log(ld_arr)
            data.lists.forEach(function(t,i){
              ld_arr.push(t[_this.data.Ld2Name])
            })
            console.log(ld_arr)
            _this.setData({
              Ld2Arr:ld_arr,
              Ld2DisAble:false
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

  // 二级点击
  LD2Click(e){
    // 如果没有选择1级 则提示 1级的第一个内容
    if(this.data.Ld1Index == 0){
      wx.showToast({
        title: this.data.Ld1Arr[0],
        icon:"none"
      })
      return false
    }
  },
  // 二级联动变化
  ld2Change(e){

    let _this = this
    this.setData({
      Ld2Index: e.detail.value,
      Ld3Index:0
    })

    // 判断是否有三级联动 如果有需要调取
    if(this.data.ld_count >= 3){

      //一级的数据
      let onefiled = this.data.Ld1Name
      let onetext = this.data.Ld1Arr[this.data.Ld1Index]
      
      //二级的数据
      let grfiled = this.data.Ld2Name
      let seltext = this.data.Ld2Arr[this.data.Ld2Index]; 

      wx.request({
        url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid='+this.data.actid,
        data: {level: '3', grfiled:grfiled,grtext:seltext,onefiled:onefiled,onetext:onetext},
        success:(res)=>{
          let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
          console.log(data)
          if(data.status == 1){
            let ld_arr = [_this.data.Ld3Arr[0]]
            console.log(ld_arr)
            data.lists.forEach(function(t,i){
              ld_arr.push(t[_this.data.Ld3Name])
            })
            console.log(ld_arr)
            _this.setData({
              Ld3Arr:ld_arr,
              Ld3DisAble:false
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
  // 三级点击
  LD3Click(e){
    // 如果没有选择1级 则提示 1级的第一个内容
    if(this.data.Ld2Index == 0){
      wx.showToast({
        title: this.data.Ld2Arr[0],
        icon:"none"
      })
      return false
    }
  },
  // 三级联动变化
  ld3Change(e){

    let _this = this
    this.setData({
      Ld3Index: e.detail.value,
      Ld4Index:0
    })

    // 判断是否有四级联动 如果有需要调取
    if(this.data.ld_count >= 4){

      //一级的数据
      let onefiled = this.data.Ld1Name
      let onetext = this.data.Ld1Arr[this.data.Ld1Index]
      
      //二级数据
      let twofiled = this.data.Ld2Name
      let twotext = this.data.Ld2Arr[this.data.Ld2Index]

      //三级的数据
      let grfiled = this.data.Ld3Name
      let seltext = this.data.Ld3Arr[this.data.Ld3Index]; 

      wx.request({
        url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid='+this.data.actid,
        data: {level: '4', grfiled:grfiled,grtext:seltext,onefiled:onefiled,onetext:onetext,twofiled:twofiled,twotext:twotext},
        success:(res)=>{
          let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
          console.log(data)
          if(data.status == 1){
            let ld_arr = [_this.data.Ld4Arr[0]]
            console.log(ld_arr)
            data.lists.forEach(function(t,i){
              ld_arr.push(t[_this.data.Ld4Name])
            })
            console.log(ld_arr)
            _this.setData({
              Ld4Arr:ld_arr,
              Ld4DisAble:false
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
  // 四级点击
  LD4Click(e){
    // 如果没有选择3级 则提示 3级的第一个内容
    if(this.data.Ld3Index == 0){
      wx.showToast({
        title: this.data.Ld3Arr[0],
        icon:"none"
      })
      return false
    }
  },
  // 四级联动变化
  ld4Change(e){

    let _this = this
    this.setData({
      Ld4Index: e.detail.value,
      Ld5Index:0
    })

    // 判断是否有五级联动 如果有需要调取
    if(this.data.ld_count >= 5){

      //一级的数据
      let onefiled = this.data.Ld1Name
      let onetext = this.data.Ld1Arr[this.data.Ld1Index]
      
      //二级数据
      let twofiled = this.data.Ld2Name
      let twotext = this.data.Ld2Arr[this.data.Ld2Index]

      //三级的数据
      let threefiled = this.data.Ld3Name
      let threetext = this.data.Ld3Arr[this.data.Ld3Index]; 

      //四级的数据
      let grfiled = this.data.Ld4Name
      let seltext = this.data.Ld4Arr[this.data.Ld4Index]; 

      wx.request({
        url: 'https://zg99.offcn.com/index/chaxun/getlevel?actid='+this.data.actid,
        data: {level: '5', grfiled:grfiled,grtext:seltext,onefiled:onefiled,onetext:onetext,twofiled:twofiled,twotext:twotext,threefiled:threefiled,threetext:threetext},
        success:(res)=>{
          let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
          console.log(data)
          if(data.status == 1){
            let ld_arr = [_this.data.Ld5Arr[0]]
            console.log(ld_arr)
            data.lists.forEach(function(t,i){
              ld_arr.push(t[_this.data.Ld5Name])
            })
            console.log(ld_arr)
            _this.setData({
              Ld5Arr:ld_arr,
              Ld5DisAble:false
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
  // 五级点击
  LD5Click(e){
    // 如果没有选择3级 则提示 3级的第一个内容
    if(this.data.Ld3Index == 0){
      wx.showToast({
        title: this.data.Ld4Arr[0],
        icon:"none"
      })
      return false
    }
  },
  // 联动方法 - 五级联动 - 不联动 只设置选择
  LD5Change(e){
    this.setData({
      Ld5Index:e.detail.value
    })
  },



  //选调形式
  yearChange(e) {
    this.setData({
      yearIndex: e.detail.value,
    })
  },
  //选择城市
  cityChange(e) {
    // console.log(e.detail.value)
    this.setData({
      cityIndex: e.detail.value,
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

    wx.showLoading({
      title: '查询中···',
      mask: true,
    });

    // 如果有联动
    let searchData = {}
    if(this.data.is_ld == "1"){

      if(this.data.Ld1Name){
        if(this.data.Ld1Index == 0){
          searchData[this.data.Ld1Name] = ""

        }else{
          searchData[this.data.Ld1Name] = this.data.Ld1Arr[this.data.Ld1Index]

        }
      }
      
      if(this.data.Ld2Name){
        if(this.data.Ld1Index == 0){
          searchData[this.data.Ld2Name] = ""
        }else{
          searchData[this.data.Ld2Name] = this.data.Ld2Arr[this.data.Ld2Index]
        }
      }
      
      if(this.data.Ld3Name){
        if(this.data.Ld1Index == 0){
          searchData[this.data.Ld3Name] = ""

        }else{
          searchData[this.data.Ld3Name] = this.data.Ld3Arr[this.data.Ld3Index]
          
        }
      }
      
      if(this.data.Ld4Name){
        if(this.data.Ld1Index == 0){
          searchData[this.data.Ld4Name] = ""

        }else{
          searchData[this.data.Ld4Name] = this.data.Ld4Arr[this.data.Ld4Index]
          
        }
      }
      
      if(this.data.Ld5Name){
        if(this.data.Ld1Index == 0){
          searchData[this.data.Ld5Name] = ""

        }else{
          searchData[this.data.Ld5Name] = this.data.Ld5Arr[this.data.Ld5Index]
          
        }
      }

      this.setData({
        searchData:searchData
      })
   
      // console.log(this.data.searchData)
    }else{

      // 非联动 暂时用原始的 

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
    }
    
    // console.log(this.data.searchData)
    let searchData_str = JSON.stringify(this.data.searchData);
    // console.log(searchData_str)

    this.setData({
      searchData_str:searchData_str
    })
    
    // console.log(this.data.searchData_str)
    wx.hideLoading()
    this.shouquanLogin()


  },

  
  shouquanLogin:function(){
    let _this = this

    // 获取授权信息后 判断是否获取了手机号
    if(!wx.getStorageSync('userPhone')){
      // 获取手机号登录
      _this.setData({
        telLogin_isshow:true
      })
    }else{
      _this.gobmsrDetail()
    }
    return false
  },
  
  getuserinfo:function(e){
    console.log(e)
    if(e.detail.errMsg == 'getUserInfo:fail auth deny'){
      wx.showToast({
        title: '登录后才能查询信息'
      })
    }else if(e.detail.errMsg == 'getUserInfo:ok'){
      app.globalData.userInfo = e.detail.userInfo;
      console.log(e.detail.userInfo)
      console.log(this.data)
      let userinfo = e.detail.userInfo;
      this.setData({
        wxLogin_isshow:false,
        userinfo:userinfo
      })
      console.log(this.data)
      wx.setStorageSync('userinfo',userinfo)
      wx.setStorageSync('nickName',userinfo.nickName);
      
      if(!wx.getStorageSync('userPhone')){
        this.setData({
          telLogin_isshow:true
        })
      }else{
        this.gozwppDetail()
      }

    }
  },
  // 获取手机 关闭
  closetellogin:function(){
    this.setData({
      telLogin_isshow:false
    })
  },
  // 获取手机信息
  getphonenumber:function(e){
    console.log(e)
    let _this = this;
    // 拒绝
    if(e.detail.errMsg == "getPhoneNumber:fail user deny"){
      wx.showToast({
        title: '为了更好的为您服务，请绑定手机号码'
      })
    // 立即绑定手机号 open-type="getPhoneNumber" 通过这个设置弹窗获取手机号窗口，并绑定执行bindgetphonenumber这个里面的方法
    }else if(e.detail.errMsg == "getPhoneNumber:ok"){
      wx.login({
        success: (res) => {
          console.log(res); //登陆
          if (res.code) { //如果登陆成功 返回code值 用户登录凭证（有效期五分钟）。
            wx.request({
              url: CONFIG.getSesionkeyAPI, //请求 获取getsesionkey的请求 需要传入登陆凭证
              data: {
                code: res.code
              },
              success: res => {
                if (res.data.status == 1) {  //请求成功
                  // 手机号解密
                  wx.request({
                    url: CONFIG.getUserPhoneAPI, //
                    data: {
                      encryptedData: e.detail.encryptedData, //包括敏感数据在内的完整用户信息的加密数据
                      iv: e.detail.iv,  //加密算法的初始向量
                      sessionKey: res.data.session_key, //返回的sessionKey
                    },
                    success: res => {
                      console.log(res)
                      if (res.data.status == 1) {  //请求成功
                        let userPhone = res.data.phone; //手机号
                        this.setData({
                          userPhone: userPhone,  //数据：手机号
                          telLogin_isshow: false,  //数据：是否显示收集登陆模块
                        })
                        wx.setStorageSync('userPhone', userPhone)
                        _this.Register(); //注册到职位检索数据中
                      } else {
                        // 获取权限失败
                        wx.showModal({
                          title: '提示',
                          content: '获取手机号失败，请手动输入···',
                          showCancel: false,
                        })
                        // console.log(res.data.msg);
                        this.setData({
                          telregister_isshow: true,
                        })
                      }
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })
          }
        },
      })
    }
  },
  // 获取信息失败
  registerPhone:function(e){

    let userPhone = e.detail.value.userphone ; //手机号
    let reg = /^1[0-9]{10}$/;
    if(userPhone){
      if(!reg.test(userPhone.trim())){
        wx.showToast({
          icon:'none',
          title: '手机号码输入有误',
        })
        return false
      }else{

        this.setData({
          userPhone: userPhone,  //数据：手机号
          telLogin_isshow: false,  //数据：是否显示收集登陆模块
          telregister_isshow:false,
        })
        wx.setStorageSync('userPhone', userPhone)

        this.Register(); //注册到职位检索数据中

      }
    }

  },

  // 注册既注册到大表中又注册到职位检索的表中
  Register:function(){
    let _this = this;
    console.log(this.data)
    console.log(this.data.userPhone)
    console.log(this.data.actid)

    let actid = this.data.actid;

    let data = {}
    data.phone = this.data.userPhone;
    data.ks_name = this.data.ks_name;
    data.entrance_1 = this.data.ks_name; //大后台

    data.xt_name = this.data.xt_name;
    data.entrance_2 = this.data.xt_name; //大后台

    //获取推广信息
    if (wx.getStorageSync('company') && wx.getStorageSync('company') !== undefined) {
      data.company = wx.getStorageSync('company');
      data.city_or_school = wx.getStorageSync('company');
    }
    //获取推广信息-分校名称
    if (wx.getStorageSync('fxname') && wx.getStorageSync('fxname') !== undefined) {
      data.city_or_school = wx.getStorageSync('fxname');
      // 单独后台
      data.company_name = wx.getStorageSync('fxname');
    }
    // 在大后台注册
    wx.request({
      url: CONFIG.RegisterAllAPI,
      data: data,
      success: res => {
        console.log(res.data);
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data);
        if (data.status == 1) {
        } else {
          console.log(data.msg)
        }
      }
    })
    
    // 注册
    wx.request({
      url: CONFIG.RegisterDIYAPI+actid,
      data: data,
      success: res => {
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data);
        if (data.status == 1) {

          app.globalData.userPhone = _this.data.userPhone;
          wx.setStorageSync('userPhone', _this.data.userPhone);

          _this.setData({
            telLogin_isshow: false,
          })

          wx.showToast({
            title: "手机号绑定成功！",
            icon: 'none',
            duration: 1000
          })

          // 设置手机
          this.setData({
            is_phone:true
          })
          // 去往展示页面
          _this.gobmsrDetail()
          
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },

  
  // 前往结果页
  gobmsrDetail:function(){
    let actid = this.data.actid;
    let searchData_str = this.data.searchData_str
    console.log(searchData_str)
    
    console.log(actid)
    console.log(wx.getStorageSync('userPhone'))
    console.log(wx.getStorageSync('nickName'))
    
    let ks_name = this.data.ks_name;
    let xt_name = this.data.xt_name;
    let item_data = this.data.item_data;

    let other_info = this.data.other_info;
    // // other_info = '["","此数据仅统计到2020年官方公布报名人数截止前两天"]'
    // let other_info = JSON.parse(this.data.other_info)[this.data.Ld1Index];

    console.log(this.data.item_data)
    console.log(this.data.userinfo)
    console.log("../bmrsDetail/bmrsDetail?searchData=" + searchData_str +"&actid="+actid +"&ks_name="+ks_name +"&xt_name="+xt_name+"&item_data="+item_data+"&other_info="+other_info)
    wx.navigateTo({
      url: "../bmrsDetail/bmrsDetail?searchData=" + searchData_str +"&actid="+actid +"&ks_name="+ks_name +"&xt_name="+xt_name+"&item_data="+item_data+"&other_info="+other_info,
    })
  },
  
  closetelregister:function(){
    this.setData({
      telregister_isshow:false
    })
  },
})