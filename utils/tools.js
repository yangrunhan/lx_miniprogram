function parseURL(url){
  let ds = url.split("&")
  let res = {}
  ds.forEach(function(item){
    res[item.split("=")[0]] = item.split("=")[1]
  })
  return res
}

function getUserProByProid(proid){
  let pros_res = [
    {id:0,name:'全国',sx_name:'全国',ywsx:'all'},
    {id:1,name:'北京市',sx_name:'北京',ywsx:'bj'},
    {id:2,name:'上海市',sx_name:'上海',ywsx:'sh'},
    {id:3,name:'山东省',sx_name:'山东',ywsx:'sd'},
    {id:4,name:'江苏省',sx_name:'江苏',ywsx:'js'},
    {id:5,name:'浙江省',sx_name:'浙江',ywsx:'zj'},
    {id:6,name:'安徽省',sx_name:'安徽',ywsx:'ah'},
    {id:7,name:'吉林省',sx_name:'吉林',ywsx:'jl'},
    {id:8,name:'福建省',sx_name:'福建',ywsx:'fj'},
    {id:9,name:'广东省',sx_name:'广东',ywsx:'gd'},
    {id:10,name:'海南省',sx_name:'海南',ywsx:'hi'},
    {id:11,name:'天津市',sx_name:'天津',ywsx:'tj'},
    {id:12,name:'河北省',sx_name:'河北',ywsx:'hb'},
    {id:13,name:'山西省',sx_name:'山西',ywsx:'sx'},
    {id:14,name:'黑龙江省',sx_name:'黑龙江',ywsx:'hlj'},
    {id:15,name:'甘肃省',sx_name:'甘肃',ywsx:'gs'},
    {id:16,name:'湖北省',sx_name:'湖北',ywsx:'hu'},
    {id:17,name:'湖南省',sx_name:'湖南',ywsx:'hn'},
    {id:18,name:'河南省',sx_name:'河南',ywsx:'he'},
    {id:19,name:'四川省',sx_name:'四川',ywsx:'sc'},
    {id:20,name:'重庆市',sx_name:'重庆',ywsx:'cq'},
    {id:21,name:'云南省',sx_name:'云南',ywsx:'yn'},
    {id:22,name:'贵州省',sx_name:'贵州',ywsx:'gz'},
    {id:23,name:'青海省',sx_name:'青海',ywsx:'qh'},
    {id:24,name:'陕西省',sx_name:'陕西',ywsx:'sa'},
    {id:25,name:'辽宁省',sx_name:'辽宁',ywsx:'ln'},
    {id:26,name:'新疆维吾尔自治区',sx_name:'新疆',ywsx:'xj'},
    {id:27,name:'西藏自治区',sx_name:'西藏',ywsx:'xz'},
    {id:28,name:'江西省',sx_name:'江西',ywsx:'jx'},
    {id:30,name:'广西壮族自治区',sx_name:'广西',ywsx:'gx'},
    {id:31,name:'宁夏回族自治区',sx_name:'宁夏',ywsx:'nx'},
    {id:29,name:'内蒙古自治区',sx_name:'内蒙古',ywsx:'nm'},
  ]

  let sx_name = ''
  let name = ''
  let ywsx = ''
  let dataid = ''
  let region_id = ''
  let id = proid
  pros_res.forEach(item=>{
    if(item.id==id){
      // console.log(item.name+"-"+item.sx_name)
      sx_name = item.sx_name
      ywsx = item.ywsx
      name = item.name
      dataid = item.dataid
      region_id = item.region_id
    }
  })

  return {sx_name:sx_name,id:id,ywsx:ywsx,name:name,dataid:dataid,region_id:region_id}
  
}


function getUserProByProSx(prosx){
  let pros_res = [
    {"id":0,"name":"全国","sx_name":"全国","ywsx":"all","dataid":18600000000,"region_id":"0"},
    {"id":1,"name":"北京市","sx_name":"北京","ywsx":"bj","dataid":18600000001,"region_id":"2"},
    {"id":2,"name":"上海市","sx_name":"上海","ywsx":"sh","dataid":18600000002,"region_id":"10"},
    {"id":3,"name":"山东省","sx_name":"山东","ywsx":"sd","dataid":18600000003,"region_id":"16"},
    {"id":4,"name":"江苏省","sx_name":"江苏","ywsx":"js","dataid":18600000004,"region_id":"11"},
    {"id":5,"name":"浙江省","sx_name":"浙江","ywsx":"zj","dataid":18600000005,"region_id":"12"},
    {"id":6,"name":"安徽省","sx_name":"安徽","ywsx":"ah","dataid":18600000006,"region_id":"13"},
    {"id":7,"name":"吉林省","sx_name":"吉林","ywsx":"jl","dataid":18600000007,"region_id":"8"},
    {"id":8,"name":"福建省","sx_name":"福建","ywsx":"fj","dataid":18600000008,"region_id":"14"},
    {"id":9,"name":"广东省","sx_name":"广东","ywsx":"gd","dataid":18600000009,"region_id":"20"},
    {"id":10,"name":"海南省","sx_name":"海南","ywsx":"hi","dataid":18600000010,"region_id":"22"},
    {"id":11,"name":"天津市","sx_name":"天津","ywsx":"tj","dataid":18600000011,"region_id":"3"},
    {"id":12,"name":"河北省","sx_name":"河北","ywsx":"hb","dataid":18600000012,"region_id":"4"},
    {"id":13,"name":"山西省","sx_name":"山西","ywsx":"sx","dataid":18600000013,"region_id":"5"},
    {"id":14,"name":"黑龙江省","sx_name":"黑龙江","ywsx":"hlj","dataid":18600000014,"region_id":"9"},
    {"id":15,"name":"甘肃省","sx_name":"甘肃","ywsx":"gs","dataid":18600000015,"region_id":"29"},
    {"id":16,"name":"湖北省","sx_name":"湖北","ywsx":"hu","dataid":18600000016,"region_id":"18"},
    {"id":17,"name":"湖南省","sx_name":"湖南","ywsx":"hn","dataid":18600000017,"region_id":"19"},
    {"id":18,"name":"河南省","sx_name":"河南","ywsx":"he","dataid":18600000018,"region_id":"17"},
    {"id":19,"name":"四川省","sx_name":"四川","ywsx":"sc","dataid":18600000019,"region_id":"24"},
    {"id":20,"name":"重庆市","sx_name":"重庆","ywsx":"cq","dataid":18600000020,"region_id":"23"},
    {"id":21,"name":"云南省","sx_name":"云南","ywsx":"yn","dataid":18600000021,"region_id":"26"},
    {"id":22,"name":"贵州省","sx_name":"贵州","ywsx":"gz","dataid":18600000022,"region_id":"25"},
    {"id":23,"name":"青海省","sx_name":"青海","ywsx":"qh","dataid":18600000023,"region_id":"30"},
    {"id":24,"name":"陕西省","sx_name":"陕西","ywsx":"sa","dataid":18600000024,"region_id":"28"},
    {"id":25,"name":"辽宁省","sx_name":"辽宁","ywsx":"ln","dataid":18600000025,"region_id":"7"},
    {"id":26,"name":"新疆维吾尔自治区","sx_name":"新疆","ywsx":"xj","dataid":18600000026,"region_id":"32"},
    {"id":27,"name":"西藏自治区","sx_name":"西藏","ywsx":"xz","dataid":18600000027,"region_id":"27"},
    {"id":28,"name":"江西省","sx_name":"江西","ywsx":"jx","dataid":18600000028,"region_id":"15"},
    {"id":30,"name":"广西壮族自治区","sx_name":"广西","ywsx":"gx","dataid":18600000030,"region_id":"21"},
    {"id":31,"name":"宁夏回族自治区","sx_name":"宁夏","ywsx":"nx","dataid":18600000031,"region_id":"31"},
    {"id":29,"name":"内蒙古自治区","sx_name":"内蒙古","ywsx":"nm","dataid":18600000029,"region_id":"6"}
  ]

  let pro_info = null
  pros_res.forEach(item=>{
    if(item.ywsx==prosx){
      pro_info = item
    }
  })

  return pro_info
  
}


function getUserProInfos(){
  let pros_res = [
    {"id":0,"name":"全国","sx_name":"全国","ywsx":"all","dataid":18600000000,"region_id":"0"},
    {"id":1,"name":"北京市","sx_name":"北京","ywsx":"bj","dataid":18600000001,"region_id":"2"},
    {"id":2,"name":"上海市","sx_name":"上海","ywsx":"sh","dataid":18600000002,"region_id":"10"},
    {"id":3,"name":"山东省","sx_name":"山东","ywsx":"sd","dataid":18600000003,"region_id":"16"},
    {"id":4,"name":"江苏省","sx_name":"江苏","ywsx":"js","dataid":18600000004,"region_id":"11"},
    {"id":5,"name":"浙江省","sx_name":"浙江","ywsx":"zj","dataid":18600000005,"region_id":"12"},
    {"id":6,"name":"安徽省","sx_name":"安徽","ywsx":"ah","dataid":18600000006,"region_id":"13"},
    {"id":7,"name":"吉林省","sx_name":"吉林","ywsx":"jl","dataid":18600000007,"region_id":"8"},
    {"id":8,"name":"福建省","sx_name":"福建","ywsx":"fj","dataid":18600000008,"region_id":"14"},
    {"id":9,"name":"广东省","sx_name":"广东","ywsx":"gd","dataid":18600000009,"region_id":"20"},
    {"id":10,"name":"海南省","sx_name":"海南","ywsx":"hi","dataid":18600000010,"region_id":"22"},
    {"id":11,"name":"天津市","sx_name":"天津","ywsx":"tj","dataid":18600000011,"region_id":"3"},
    {"id":12,"name":"河北省","sx_name":"河北","ywsx":"hb","dataid":18600000012,"region_id":"4"},
    {"id":13,"name":"山西省","sx_name":"山西","ywsx":"sx","dataid":18600000013,"region_id":"5"},
    {"id":14,"name":"黑龙江省","sx_name":"黑龙江","ywsx":"hlj","dataid":18600000014,"region_id":"9"},
    {"id":15,"name":"甘肃省","sx_name":"甘肃","ywsx":"gs","dataid":18600000015,"region_id":"29"},
    {"id":16,"name":"湖北省","sx_name":"湖北","ywsx":"hu","dataid":18600000016,"region_id":"18"},
    {"id":17,"name":"湖南省","sx_name":"湖南","ywsx":"hn","dataid":18600000017,"region_id":"19"},
    {"id":18,"name":"河南省","sx_name":"河南","ywsx":"he","dataid":18600000018,"region_id":"17"},
    {"id":19,"name":"四川省","sx_name":"四川","ywsx":"sc","dataid":18600000019,"region_id":"24"},
    {"id":20,"name":"重庆市","sx_name":"重庆","ywsx":"cq","dataid":18600000020,"region_id":"23"},
    {"id":21,"name":"云南省","sx_name":"云南","ywsx":"yn","dataid":18600000021,"region_id":"26"},
    {"id":22,"name":"贵州省","sx_name":"贵州","ywsx":"gz","dataid":18600000022,"region_id":"25"},
    {"id":23,"name":"青海省","sx_name":"青海","ywsx":"qh","dataid":18600000023,"region_id":"30"},
    {"id":24,"name":"陕西省","sx_name":"陕西","ywsx":"sa","dataid":18600000024,"region_id":"28"},
    {"id":25,"name":"辽宁省","sx_name":"辽宁","ywsx":"ln","dataid":18600000025,"region_id":"7"},
    {"id":26,"name":"新疆维吾尔自治区","sx_name":"新疆","ywsx":"xj","dataid":18600000026,"region_id":"32"},
    {"id":27,"name":"西藏自治区","sx_name":"西藏","ywsx":"xz","dataid":18600000027,"region_id":"27"},
    {"id":28,"name":"江西省","sx_name":"江西","ywsx":"jx","dataid":18600000028,"region_id":"15"},
    {"id":30,"name":"广西壮族自治区","sx_name":"广西","ywsx":"gx","dataid":18600000030,"region_id":"21"},
    {"id":31,"name":"宁夏回族自治区","sx_name":"宁夏","ywsx":"nx","dataid":18600000031,"region_id":"31"},
    {"id":29,"name":"内蒙古自治区","sx_name":"内蒙古","ywsx":"nm","dataid":18600000029,"region_id":"6"}
  ]
  return pros_res
}


function setLiandong(actid,ld_set){
  let ld_data = []
  console.log(actid)
  console.log(ld_set)

  if(ld_set["1"]){
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
}


module.exports.parseURL = parseURL
module.exports.getUserProByProid = getUserProByProid
module.exports.setLiandong = setLiandong
module.exports.getUserProByProSx = getUserProByProSx
module.exports.getUserProInfos = getUserProInfos