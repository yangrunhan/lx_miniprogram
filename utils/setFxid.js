// export default function setArea(area) {
  module.exports = {
    setFxid(fxid){
      let company = ''
      if (!fxid) {
        fxid = "没有参数";
      } else {
        wx.request({
          url: 'https://zg99.offcn.com/index/chaxun/getfzinfo?actid=14882&callback=?',
          data: {
            fxparameter: fxid,
            limit: '200'
          },
          success: res => {
            var data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
            console.log(data);
            if (data.status == 1) {
              company = data.lists[0].province + '-' + data.lists[0].cities + '-' + data.lists[0].learningCenter + '-' + data.lists[0].channel;
            }else{
              company = '参数设置有问题'
            }
    
            wx.setStorageSync('company', company);
          }
        })
    
      }
      return company;
    }
  } 