// components/customTabbar/customTabbar.js
Component({
  // 组件的属性列表
  properties: {
    tabbar: {
      type: Object,
      value: {
        "color": "#131336",
        "selectedColor": "#567bf3",
        "backgroundColor": "#ffffff",
        "list": [{
            "pagePath": "/pages/index/index",
            "iconPath": "/assets/images/tabBar/home.png",
            "selectedIconPath": "/assets/images/tabBar/home_selected.png",
            "text": "首页"
          },
          {
            "isSpecial": true,
          },
          {
            "pagePath": "/pages/my/my",
            "iconPath": "/assets/images/tabBar/my.png",
            "selectedIconPath": "/assets/images/tabBar/my_selected.png",
            "text": "我的"
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false,
    zixun_isshow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 打开弹窗
    onMyButtonTap: function () {
      this.setData({
        zixun_isshow: true
      });
    },

    // 关闭弹窗
    close_zixun: function () {
      this.setData({
        zixun_isshow: false
      });
    },

    // 小能聊天
    showXn: function (e) {
      let xnid = e.target.dataset.xnid;
      let url = 'https://bj-10353.ntalker.com/downt/t2d/chat.php'
      wx.navigateTo({
        url: '/pages/xiaoneng/xiaoneng?url=' + url + '&xnid=' + xnid,
      })
    },

  }
})