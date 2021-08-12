// pages/wnrmfsx/wnrmfsx.js
const CONFIG = require('../../config');
Page({
  data: {
    ads: [],
    selectType: 0,
    animationData: {},
    isHiddenDrawer: true,
    years: '',
    yearsArr: [],
    city: '',
    cityArr: [],
    unit: '',
    unitArr: [],
    position: '',
    positionArr: [],
    searchResult: [],
  },
  // 选择 考试年份
  selectedYear(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      city: '',
      unit: '',
      position: '',
      selectType: type,
    })
    wx.request({
      url: CONFIG.getRmfsxYearsLevelAPI,
      data: {
        level: '1',
      },
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        // console.log(data);
        if (data.status == 1) {
          this.setData({
            yearsArr: data.lists,
          });
          this.showDrawer();
        } else if (data.status == 2) {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        }
      }
    });
  },
  setYears(e) {
    this.setData({
      years: e.currentTarget.dataset.value,
      searchResult: [],
    });
    this.hideDrawer();
  },

  // 选择 工作地区
  selectedCity(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      unit: '',
      position: '',
      selectType: type,
    })
    if (this.data.years == '') {
      wx.showToast({
        title: '请先选择年份！',
        icon: 'none',
        duration: 1000,
      })
      return false;
    }
    wx.request({
      url: CONFIG.getRmfsxYearsLevelAPI,
      data: {
        level: '2',
        grfiled: 'years',
        grtext: this.data.years,
      },
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        // console.log(data);
        if (data.status == 1) {
          this.setData({
            cityArr: data.lists,
          });
          this.showDrawer();
        } else if (data.status == 2) {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        }
      }
    });
  },
  setCity(e) {
    this.setData({
      city: e.currentTarget.dataset.value,
      searchResult: [],
    });
    this.hideDrawer();
  },

  // 选择 单位名称
  selectedUnit(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      position: '',
      selectType: type,
    })
    if (this.data.city == '') {
      wx.showToast({
        title: '请先选择工作地区！',
        icon: 'none',
        duration: 1000,
      })
      return false;
    }
    wx.request({
      url: CONFIG.getRmfsxYearsLevelAPI,
      data: {
        level: '3',
        onefiled: 'years',
        onetext: this.data.years,
        grfiled: 'city',
        grtext: this.data.city,
      },
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        // console.log(data);
        if (data.status == 1) {
          this.setData({
            unitArr: data.lists,
          });
          this.showDrawer();
        } else if (data.status == 2) {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        }
      }
    });
  },
  setUnit(e) {
    this.setData({
      unit: e.currentTarget.dataset.value,
      searchResult: [],
    });
    this.hideDrawer();
  },

  // 选择 职位名称
  selectedPosition(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      selectType: type,
    })
    if (this.data.unit == '') {
      wx.showToast({
        title: '请先选择单位名称！',
        icon: 'none',
        duration: 1000,
      })
      return false;
    }
    wx.request({
      url: CONFIG.getRmfsxYearsLevelAPI,
      data: {
        level: '4',
        onefiled: 'years',
        onetext: this.data.years,
        twofiled: 'city',
        twotext: this.data.city,
        grfiled: 'bumen_name',
        grtext: this.data.unit,
      },
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        // console.log(data);
        if (data.status == 1) {
          this.setData({
            positionArr: data.lists,
          });
          this.showDrawer();
        } else if (data.status == 2) {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        }
      }
    });
  },
  setPosition(e) {
    this.setData({
      position: e.currentTarget.dataset.value,
      searchResult: [],
    });
    this.hideDrawer();
  },

  // 立即查询
  inquireBtn() {
    let years = this.data.years;
    let city = this.data.city;
    let bumen_name = this.data.unit;
    let zhiwei_name = this.data.position;
    if (!years) {
      wx.showToast({
        title: '请选择考试年份',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    if (!city) {
      wx.showToast({
        title: '请选择工作地区',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    if (!bumen_name) {
      wx.showToast({
        title: '请选择单位',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    if (!zhiwei_name) {
      wx.showToast({
        title: '请选择职位',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    let limits = 500;
    let searchData = {
      years,
      city,
      bumen_name,
      zhiwei_name,
      limits,
    }
    // console.log(searchData);
    wx.showLoading({
      title: '查询中···',
      mask: true,
    });
    wx.request({
      url: CONFIG.getRmfsxResultAPI,
      data: searchData,
      success: res => {
        var str = res.data.substring(1, res.data.length - 1);
        var data = JSON.parse(str);
        if (data.status == "1") {
          wx.hideLoading();
          wx.showToast({
            title: data.msg,
            icon: 'success',
            duration: 1000,
          });
          this.setData({
            searchResult: data.lists,
          })
          // console.log(data.lists);
        } else if (data.status == "2") {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          });
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
        // console.log(data.lists[0]);
        var ads = JSON.parse(data.lists[0].ad_2);
        this.setData({
          ads: ads,
        })
      }
    })
  },

  /* **************************************动画********************************* */
  // 下拉菜单 显示
  showDrawer() {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0,
    });
    this.animation = animation;
    animation.translateY(500).step();
    this.setData({
      animationData: animation.export(),
      isHiddenDrawer: false,
    })
    setTimeout(function () {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export(),
      })
    }.bind(this), 50);

    // var animation = wx.createAnimation({
    //   duration: 200,
    //   timingFunction: 'ease',
    // })
    // this.animation = animation;
    // animation.translateY(500).step();
    // this.setData({
    //   animationData: this.animation.export(),
    // });
    // var time1 = setTimeout(() => {
    //   this.slideIn();
    //   clearTimeout(time1);
    //   time1 = null;
    // }, 200);
    // this.setData({
    //   isHiddenDrawer: false,
    // });
  },
  // 下拉菜单 隐藏
  hideDrawer() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0,
    });
    this.animation = animation;
    animation.translateY(500).step();
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export(),
        isHiddenDrawer: true,
      })
    }.bind(this), 200);

    // var animation = wx.createAnimation({
    //   duration: 200,
    //   timingFunction: 'ease',
    // })
    // this.animation = animation
    // this.slideDown(); //调用动画--滑出
    // var time1 = setTimeout(() => {
    //   this.setData({
    //     isHiddenDrawer: true,
    //   })
    //   clearTimeout(time1);
    //   time1 = null;
    // }, 200);
  },
  // // 动画 -- 滑入
  // slideIn() {
  //   this.animation.translateY(0).step();
  //   this.setData({
  //     animationData: this.animation.export(),
  //   });
  // },
  // // 动画 -- 滑出
  // slideDown() {
  //   this.animation.translateY(500).step()
  //   this.setData({
  //     animationData: this.animation.export(),
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdsData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})