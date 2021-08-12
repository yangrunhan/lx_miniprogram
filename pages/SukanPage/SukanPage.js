// pages/SukanPage/SukanPage.js
// pages/sukanPage/sukanPage.js
const CONFIG = require('../../config');
const setfxid = require('../../utils/setFxid');
const getparams = require('../../utils/getparams');
// const tools = require('../../utils/tools')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src:'',
    btn_text:'',
    is_phone:false,
    ks_name:'',
    xt_name:'',
    telregister_isshow:false,
    width:0,
    height:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 初始化参数
    getparams.setTgParams(options)
    getparams.setBaseParams(options)

    this.inquirePage()

  },
  // 配置省份信息 和 页面信息
  inquirePage(){
    wx.showLoading({
      title: '数据加载中...',
    })

    let _this = this
    // 加载actud
    let actid = wx.getStorageSync('actid')

    if(!actid){
      wx.hideLoading({
        success: (res) => {
          wx.showToast({
            title: '数据加载失败请刷新',
          })
        },
      })
    }

    // 配置页面信息
    wx.request({
      url: CONFIG.getSukanSetDataAPI+actid,
      data:{
        limits:10,
      },
      success:(res)=>{
        let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data)
        let ks_name = data.lists[0]['ks_name']
        let xt_name = data.lists[0]['xt_name']
        
        console.log(ks_name)
        console.log(xt_name)
        wx.setNavigationBarTitle({
          title: ks_name+xt_name,
        })

        _this.setData({
          actid:actid,
          ks_name:ks_name,
          xt_name:xt_name,
          img_src:data.lists[0]['img_src'],
          btn_text:data.lists[0]['btn_text'],
          link:data.lists[0]['link'],
          width:data.lists[0]['width'],
          height:data.lists[0]['height'],
        })
        console.log(_this.data)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '数据加载完成',
            })
          },
        })
      }
    })
    
  },

  // 获取手机号
  showView(){
    let userPhone = wx.getStorageSync('userPhone');
    let name = wx.getStorageSync('nickName') || '';
    let ks_name = this.data.ks_name;
    let xt_name = this.data.xt_name;

    let link = this.data.link
    this.WriteLog(name,userPhone,ks_name,xt_name);
    console.log('/pages/web_view/web_view?link='+link)
    wx.navigateTo({
      url: '/pages/web_view/web_view?url='+link,
    })
  },

  shouquanLogin:function(){
    let _this = this
    wx.getSetting({
      success:(res)=>{
        console.log(res)
        if(res.authSetting['scope.userInfo']){ //如果有信息
            //获取用户信息，改接口必须在用户授权后才能使用
            wx.getUserInfo({
              success:(res)=>{
                console.log(res)
                this.setData({
                  userinfo:res.userInfo
                })
                // 获取授权信息后 判断是否获取了手机号
                if(!wx.getStorageSync('userPhone')){
                  // 获取手机号登录
                  _this.setData({
                    telLogin_isshow:true
                  })
                }else{
                  _this.gozwppDetail()
                }

              }
            })
            

            
        }else{
          this.setData({
            wxLogin_isshow:true
          })
          
        }
      }
    })
    return false
  },
  closewxlogin:function(){
    this.setData({
      wxLogin_isshow:false
    })
  },
  closetelregister:function(){
    this.setData({
      telregister_isshow:false
    })
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
          _this.showView()
          
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

  // 记录信息
  WriteLog:function(name,phone,ks_name,xt_name){
    wx.request({
      url: CONFIG.writelogsAPI,
      data:{
        phone:phone,
        name:name,
        ks_name:ks_name,
        xt_name:xt_name
      },
      success:(res)=>{
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data);
        if(data.status == 1){
          console.log('记录成功')
        }else{
          console.log(data.msg)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})