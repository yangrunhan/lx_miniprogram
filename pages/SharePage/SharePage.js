// pages/SharePage/SharePage.js
const CONFIG = require('../../config');
const setfxid = require('../../utils/setFxid');
const tools = require('../../utils/tools');
const zg99 = require('../../utils/zg99');
// 获取应用实例
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 基本数据


    userPhone:null, //用户手机号
    forma_actid:null, //需要提交的fromid
    telLogin_isshow:false, //手机输入是否显示
    userInfo: {}, //用户信息

    isAuthSavePhone:true, //保存手机权限是否打开

    // 文章id
    contentid:'18600000001',
    // 页面数据
    page_data:{
      title:"文章标题",
      show_img:"",
      link:"",
      kefu:{
        logo:"https://www.zgxds.cn/zt/xiaochengxu/images/logo.png",
        name:"在线客服",
        jieshao:"中公教育咨询师",
        weixin:{
          ewm:"https://www.zgxds.cn/zt/xiaochengxu/images/logo.png",
          wxh:"wwwoffcn"
        },
        phone:{
          num:""
        }
      },
    },
    // 底部弹窗是否显示
    mbdhidden:true,
    // 底部显示内容
    mdb_data:[],
    // 微信弹窗是否显示
    wxhdhidden:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: this.data.page_data.title,
    })
    //获取图片权限
    this.getSetting().then(res=>{
      if(res.authSetting['scope.writePhotosAlbum']){
        this.setData({
          isAuthSavePhone:false
        })
      }
    })

    this.initData(options)

    this.loadPageData()
    

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
    console.log("分享给好友")
    wx.showShareMenu({
      withShareTicket: true,
      // path:"",//转发的页面路径
      success:res=>{
        console.log('--转发回调--',res)
        this.setData({
          mbdhidden:true
        })
      },
      fail:res=>{
        console.log('--接口调取失败--',res)
      },
      complete:res=>{
        console.log('--接口调取完成--',res)
      }
    })

    return {
      title:"快来看："+this.data.page_data.title,
      path:"/pages/SharePage/SharePage?actid"+this_.data.forma_actid+"&contentid="+this.data.contentid
    }
  },
  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline:function(){
    console.log("分享到朋友圈")
    let this_ = this

    return {
      title:"快来看："+this.data.page_data.title,
      path:"/pages/SharePage/SharePage?actid"+this_.data.forma_actid+"&contentid="+this.data.contentid
    }

  },
  /**
   * 初始化数据
   * @param {参数}} options 
   */
  initData:function(options){
    let _this = this

    if (options.debug == 1) {
      this.setData({
        debug_: true
      })
    }
    _this.setData({
      ks_name:this.data.page_data.title,
      xt_name:'内容查看'
    })


    if (app.globalData.userPhone || wx.getStorageSync('userPhone')) {
      this.setData({
        userPhone : app.globalData.userPhone || wx.getStorageSync('userPhone')
      })
    }

    // 通过data方法传递的参数
    let op_data = {}
    if (options.data) {
      if (JSON.parse(options.data)) {
        op_data = JSON.parse(options.data)
      }
    }
    if(this.data.debug_){ console.log(op_data) }

    // 自己设置scene参数二维码
    let scene_data = {}
    if (options.scene) {
      let scene_data_str = decodeURIComponent(options.scene)
      console.log(scene_data_str)
      if (tools.parseURL(scene_data_str)) {
        scene_data = tools.parseURL(scene_data_str)
      }
    }
    if(this.data.debug_){ console.log(scene_data) }

    
    // 1、设置actid
    if(options.actid){
      this.setData({
        forma_actid:options.actid
      })
    }else if (op_data.actid) {
      this.setData({
        forma_actid:op_data.actid
      })
    } else if (scene_data.actid) {
      this.setData({
        forma_actid:scene_data.actid
      })
    }

    // 2、设置contentid
    if(options.contentid){
      this.setData({
        contentid:options.contentid
      })
    }else if (op_data.contentid) {
      this.setData({
        contentid:op_data.contentid
      })
    } else if (scene_data.actid) {
      this.setData({
        contentid:scene_data.contentid
      })
    }


    // 利用总部工具推广的fxid获取推广的学习中心
    if (options.fxid) {
      setfxid.setFxid(options.fxid);
    } else if (op_data.fxid) {
      setfxid.setFxid(op_data.fxid);
    } else if (scene_data.fxid) {
      setfxid.setFxid(scene_data.fxid);
    } else if (!options.fxid && !wx.getStorageSync('company')) {
      wx.setStorageSync('company', '');
    }

    // 参数直接推广分校名称
    if (options.fxname) {
      wx.setStorageSync('company_name', options.fxname)
    } else if (op_data.fxname) {
      wx.setStorageSync('company_name', op_data.fxname)
    } else if (scene_data.fxname) {
      wx.setStorageSync('company_name', scene_data.fxname)
    } else if (!wx.getStorageSync('company_name')) {
      wx.setStorageSync('company_name', '');
    }

    // 参数 - 省份缩写参数 用户配置当前页面显示那个省份的内容
    if(this.data.debug_){ console.log(options.prosx) }
    if (options.prosx) {
      this.setData({
        proinfo:tools.getUserProByProSx(options.prosx)
      })
    } else if (op_data.prosx) {
      this.setData({
        proinfo:tools.getUserProByProSx(op_data.prosx)
      })
    } else if (scene_data.prosx) {
      this.setData({
        proinfo:tools.getUserProByProSx(scene_data.prosx)
      })
    } else if (wx.getStorageSync('prosx')) {
      this.setData({
        proinfo:tools.getUserProByProSx(wx.getStorageSync('prosx'))
      })
    }
    if(this.data.proinfo){
      wx.setStorageSync('prosx', this.data.proinfo.ywsx)
    }
  },
  /**
   * 初始化页面数据
   */
  loadPageData:function(){
    let this_ = this
    // 需要传入的数据 
    let cdata = {
      contentid:this.data.contentid,
      timestamp:new Date().getTime()
    }

    wx.request({
      url: CONFIG.getSharePageSetDataAPI, //请求 获取getsesionkey的请求 需要传入登陆凭证
      data: cdata,
      dataType:"json",
      success: res => {
        // console.log(res)
        // console.log(res.data)
        let resd = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''))
        // console.log(resd)
        if(resd.status == 1){
          let content_data = resd.lists[0]

          let kefu_str = content_data.kefu
          let kefu_json = JSON.parse(content_data.kefu.replace(/^(\s|\()+|(\s|\))+$/g, ''))
          content_data.kefu = kefu_json
          console.log(content_data)
          
          this_.setData({
            page_data:content_data
          })
          wx.setNavigationBarTitle({
            title: this.data.page_data.title,
          })

        }
        
      }
    })

  },

  /**
   * 取消底部弹窗
   */
  hideModal:function(){
    this.setData({
      mbdhidden:true
    })
  },
  /**
   * 转发按钮点击 设置显示内容 并展示
   */
  ShareBtnClick:function(){
    let mdb_data = [
      {
        "name":"分享给朋友",
        "type":"button",
        "open_type":"share"
      },
      // {
      //   "name":"分享到朋友圈",
      //   "bindtap":"sharetimeline"
      // }
    ]

    this.setData({
      mbdhidden:false,
      mdb_data:mdb_data
    })
    
    // 记录
    this.WriteLog("",this.data.userPhone,this.data.page_data.title,"查看内容页SharePage-转发")
  },
  /**
   * 微信点击 展示
   */
  WxBtnClick:function(){
    this.setData({
      wxhdhidden:false,
    })
    
    // 记录
    this.WriteLog("",this.data.userPhone,this.data.page_data.title,"查看内容页SharePage-点击微信按钮")
  },
  /**
   * 微信弹窗关闭点击
   */
  WxhTcCloseBtnClick:function(){
    this.setData({
      wxhdhidden:true,
    })
  },
  /**
   * 拨打电话
   */
  CallBtnClick:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.page_data.kefu.phone.num,
    })
  },
  /**
   * 显示页面
   */
  showPage:function(){
    let link = this.data.page_data.link
    if(link == ""){
      wx.showToast({
        icon:"none",
        title: '跳转链接设置错误',
      })
    }else{
      if(link.indexOf("lxks.offcn.com") != -1 || link.indexOf("mp.weixin.qq.com") != -1|| link.indexOf("zglinxuan.com") != -1){
        wx.navigateTo({
          url: '/pages/web_view/web_view?url='+link,
        })
      }else{
        wx.navigateTo({
          url: '/pages/web_view2/web_view?url='+link,
        })
      }
    }
    
    // 记录
    this.WriteLog("",this.data.userPhone,this.data.page_data.title,"查看内容页SharePage-查看详情页")
  },
  
  // 获取手机信息
  getphonenumber:function(e){

    wx.showLoading({
      title: '获取中',
    })

    console.log(e)
    let _this = this;
    // 拒绝
    if(e.detail.errMsg == "getPhoneNumber:fail user deny"){
      wx.showToast({
        icon:'none',
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

                        // 提示授权成功
                        wx.showToast({
                          icon: 'none',
                          title: '授权成功',
                        })

                      } else {
                        // 获取权限失败
                        wx.showModal({
                          title: '提示',
                          content: '获取手机号失败，请手动输入···',
                          showCancel: false,
                        })
                        wx.hideLoading({
                          success: (res) => {},
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

  // 注册既注册到大表中又注册到首页的表中 如果没有设置actid则注册到设置页面
  Register:function(){
    let _this = this;
    console.log(this.data)
    console.log(this.data.userPhone)
    console.log(this.data.forma_actid)

    let data = {}
    data.phone = this.data.userPhone;
    data.ks_name = this.data.ks_name+"_"+this.data.page_data.title;
    data.xt_name = this.data.xt_name;

    //获取推广信息
    if (wx.getStorageSync('company') && wx.getStorageSync('company') !== undefined) {
      data.company = wx.getStorageSync('company');
    }
    //获取推广信息-分校名称
    if (wx.getStorageSync('company_name') && wx.getStorageSync('company_name') !== undefined) {
      data.company_name = wx.getStorageSync('company_name');
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

    let actid = this.data.forma_actid
    // 如果actid不存在 则不保存
    console.log(actid)
    if(actid){
      // 注册
      wx.request({
        url: CONFIG.RegisterAPI2+actid,
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
            _this.setData({
              is_phone:true,
              userPhone: _this.data.userPhone
            })

          } else {
            wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
    
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
   * 关闭输入手机号
   */
  closetelregister:function(){
    this.setData({
      telregister_isshow:false
    })
  },
  /**
   * 复制公众号
   */
  PasteWxh:function(){
    wx.setClipboardData({
      data: this.data.page_data.kefu.weixin.wxh,
      success:res=>{
        wx.showToast({
          title: '复制成功',
        })
        
        // 记录
        this.WriteLog("",this.data.phone,this.data.page_data.title,"查看内容页-复制微信号")
        console.log(res)
      }
    })
  },

  /**
   * 保存图片到手机
   */
  onSaveToPhone:function(){
    let this_ = this
    this.getSetting().then((res) => {
      
      // 判断用户是否授权了保存到本地的权限
      if (!res.authSetting['scope.writePhotosAlbum']) {
        this.authorize().then(() => {
          this_.savedownloadFile(this_.data.page_data.show_img)
          this_.setData({
            isAuthSavePhoto: false
          })
          
          // 记录
          this.WriteLog("",this_.data.userPhone,this_.data.page_data.title,"查看内容页SharePage-保存微信号")
        }).catch(() => {
          wx.showToast({
            title: '您拒绝了授权',
            icon: 'none',
            duration: 1500
          })
          this_.setData({
            isAuthSavePhoto: true
          })
        })
      } else {
        this_.savedownloadFile(this.data.page_data.kefu.weixin.ewm)
      }
    })
  },


  /**
   * 获取图片权限
   */
  onOpenSetting:function(){

    wx.openSetting({
      success:res=>{
        console.log(res.authSetting)

        if(!res.authSetting['scope.writePhotosAlbum']){

          wx.showToast({
            title: '您未授权',
            icon:'none',
            duration:1500
          })

          this.setData({
            isAuthSavePhone:true
          })

        }else{
          //授权
          console.log("授权")
          this.setData({
            isAuthSavePhone:false
          })
          this.onSaveToPhone() //授权后保存图片

        }

      }
    })
  },

  /**
   * 获取设置
   */
  getSetting:function(){
    return new Promise((resolve,reject)=>{
      wx.getSetting({
        success:res=>{
          resolve(res)
        }
      })
    })
  },

  // 发起首次授权请求
  authorize() {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success: () => {
          resolve()
        },
        fail: res => { //这里是用户拒绝授权后的回调
          console.log('拒绝授权')
          reject()
        }
      })
    })
  },
  savedownloadFile(img) {
    console.log(img)
    this.downLoadFile(img).then((res) => {
      return this.saveImageToPhotosAlbum(res.tempFilePath)
    }).then(() => {      
    })
  },
  //单文件下载(下载文件资源到本地)，客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径。
  downLoadFile(img) {
    let this_ = this
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: img,
        success: (res) => {
          console.log('downloadfile', res)
          resolve(res)
          wx.showToast({
            title: '保存成功',
          })
          this_.setData({
            wxhdhidden:true
          })
        }
      })
    })
  },
  // 保存图片到系统相册
  saveImageToPhotosAlbum(saveUrl) {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: saveUrl,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            duration: 1000,
          })
          resolve()
        }
      })
    })
  },

  /**
   * 获取用户保存文件的权限
   */
  showSaveAuthModel:function(e){

    this.getSetting().then((res)=>{
      console.log(res)
    }) 
    let fileName = new Date().valueOf();
    let filePath = wx.env.USER_DATA_PATH + '/' + fileName + '.jpg'
    console.log(filePath)
    wx.saveImageToPhotosAlbum({
      // 不知道为什么会出错总是权限改了
      success:res=>{
        console.log(res)
      },
      fail:res=>{
        console.log(res)

      },
      complete:res=>{
        this.setData({
          isAuthSavePhone:false
        })
        console.log(res)

      }
    })

  }
})