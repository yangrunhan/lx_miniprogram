const config = require('../config')
const md5 = require('../assets/js/md5/md5.js');
const { b64Md5, hexMD5 } = require('../assets/js/md5/md5.js');

function choujiang_getcjusers(data,callback){

  if(!data.limits){
    data.limits = 100
  }

  wx.request({
    url: 'https://zg99.offcn.com/index/choujiang/getcjusers/?callback=?',
    data: data,
    success: res=>{
      let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
      // console.log(res.data.status)
      callback(data)
    }
  })
}
// 获取近期19讲座列表
function cctvloadsoon(data,callback){
  console.log(data)
  if(!data.area_id || !data.type_job_pid){
    wx.showToast({
      icon: 'none',
      title: '地区或考试类型未设置',
    })
    return false
  }
  
  // 获取数据
  wx.request({
    url: config.cctvGetListApiSoon,
    method:"GET",
    data: data,
    success: res => {
      // console.log(res)
      callback(res.data) 
    }
  })

}

// 获取19讲座列表
function cctvload(data,callback){
  let nday = new Date();
  let month = (nday.getMonth()+1)>=10?(nday.getMonth()+1):"0"+(nday.getMonth()+1)
  let day = nday.getDate()>=10?nday.getDate():"0"+nday.getDate()
  let key = 'zg_ofFcn@Occ'+ nday.getFullYear()+ month +day;
  let sign = hexMD5(key)
  // console.log(key)
  // console.log(nday.getFullYear())
  // console.log(month)
  // console.log(nday.getDate())
  // console.log(sign)

  data.sign = sign


  if(!data.numpage){
    data.numpage = 5
  }

  if(!data.area || !data.typejob_pid){
    wx.showToast({
      icon: 'none',
      title: '地区或考试类型未设置',
    })
    return false
  }
  // console.log(data)
  // 获取数据
  wx.request({
    url: config.cctvGetLIstApi,
    data: data,
    success: res => {
      // console.log(res)
      callback(res.data) 
    }
  })

}



module.exports.choujiang_getcjusers = choujiang_getcjusers
module.exports.cctvload = cctvload
module.exports.cctvloadsoon = cctvloadsoon
