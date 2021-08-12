// export default function setArea(area) {
module.exports = function setArea(area) {
  if (!area) {
    area = "没有参数";
  } else {
    wx.request({
      url: 'https://zg99.offcn.com/index/chaxun/getfzinfo?actid=14882&callback=?',
      data: {
        fxparameter: area,
        limit: '200'
      },
      success: res => {
        var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
        console.log(data);
        if (data.status == 1) {
          area = data.lists[0].province + '-' + data.lists[0].cities + '-' + data.lists[0].learningCenter + '-' + data.lists[0].channel;
        }else{
          area = '参数设置有问题'
        }

        wx.setStorageSync('tg_area', area);
      }
    })

  }
  return area;
}