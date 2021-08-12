
const setfxid = require('./setFxid');
const tools = require('./tools');


// 获取推广参数
const setTgParams = options => {
  
  let fxid = ''
  let fxname = ''
  let company = ''

  // 自己部门的推广fxid参数
  if(options){
    if(options.fxid){
      fxid =  options.fxid
    }
    if(options.fxname){
      fxname =  options.fxname
    }

    if(options.data){
      let op_data = JSON.parse(options.data)
      if(op_data.fxid){
        fxid = op_data.fxid
      }
      if(op_data.fxname){
        fxname = op_data.fxname
      }
    }

    let scene_data = {}
    if(options.scene){
      let scene_data_str = decodeURIComponent(options.scene)
      if(tools.parseURL(scene_data_str)){
        scene_data = tools.parseURL(scene_data_str)
      }

      if(scene_data.fxid){
        fxid =  scene_data.fxid
      }
      if(scene_data.fxname){
        fxname =  scene_data.fxname
      }
    }

    
    company = setfxid.setFxid(fxid);

    wx.setStorageSync('fxid', fxid);
    wx.setStorageSync('fxname', fxname);

    return 1
  }else{
    return -1
  }

}

// 获取基础参数
// actid
const setBaseParams = options => {

  let actid
  let item_data

  if(options){
    
  // 活动actid
    if(options.actid){
      actid =  options.actid
    }
    if(options.data){
      let op_data = JSON.parse(options.data)
      if(op_data.actid){
        actid = op_data.actid
      }
    }
    let scene_data = {}
    if(options.scene){
      let scene_data_str = decodeURIComponent(options.scene)
      if(tools.parseURL(scene_data_str)){
        scene_data = tools.parseURL(scene_data_str)
      }

      if(scene_data.actid){
        actid =  scene_data.actid
      }
    }
    wx.setStorageSync('actid', actid);

    return {
      'actid':actid
    }


  }else{
    return -1
  }

}

module.exports = {
  setTgParams:setTgParams,
  setBaseParams:setBaseParams
}