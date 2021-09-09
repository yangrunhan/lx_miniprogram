// pages/zyml/zyml.js

const CONFIG = require('../../config');
Page({
  data: {
    animationData: {},
    isHiddenDrawer: true,
    xueli: '',
    xueliArr: ['专科', '本科', '研究生'],
    searchResult: [],
  },
  // 下拉菜单切换
  hiddenDrawerToggle(e) {
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0,
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画：Y轴偏移盒子高度后，停
    animation.translateY(500).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export(),
    });
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation,
      })
      // 关闭抽屉
      if (e.currentTarget.dataset.status == "close") {
        this.setData({
          isHiddenDrawer: true,
        });
      };
    }.bind(this), 200);

    // 显示抽屉
    if (e.currentTarget.dataset.status == "open") {
      this.setData({
        isHiddenDrawer: false,
      });
    };
  },

  // 更新下拉菜单选中值
  getOption(e) {
    this.setData({
      xueli: e.currentTarget.dataset.value,
      isHiddenDrawer: true,
    });
  },

  // 立即查询
  inquireBtn(e) {
    if (this.data.xueli == "") {
      wx.showToast({
        title: '请选择学历',
        icon: 'none',
      })
      return false;
    }
    if (!e.detail.value.zhuanye) {
      wx.showToast({
        title: '请输入专业',
        icon: 'none',
      })
      return false;
    }
    this.setData({
      searchResult: [],
    });

    let xueli = this.data.xueli;
    let zhuanye = e.detail.value.zhuanye;
    let searchData = {
      xueli: xueli,
      zy: zhuanye,
      limits: 500
    }
    // console.log(xueli, zhuanye);
    wx.showLoading({
      title: '查询中···',
      mask: true,
    });
    wx.request({
      url: CONFIG.getProfessionalDirectoryEnquiryResultAPI,
      data: searchData,
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        if (data.status == 1) {
          wx.hideLoading();
          wx.showToast({
            title: data.msg,
            icon: 'success',
            duration: 1000,
          });
          this.setData({
            searchResult: data.lists,
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '该学历下无此专业！',
            icon: 'none',
            duration: 1000,
          })
        }
      }
    })
  },

  // 获取广告
  getAdsData() {
    wx.request({
      url: CONFIG.getIndexPageDataAPI,
      data: {
        sort: wx.getStorageSync('entrance'),
      },
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        console.log(data.lists[0]);
        var ads = JSON.parse(data.lists[0].ad_2);
        this.setData({
          ads: ads,
        })
      }
    })
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getAdsData();
  },
  // 生命周期函数--监听页面显示
  onShow: function () {},
})