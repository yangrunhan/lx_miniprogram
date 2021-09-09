const BASE_URL = 'https://zg99.offcn.com/index';

// 名单id
const User_ID = ''


// 获取 sesionkey
const getSesionkeyAPI = `${BASE_URL}/wechat/getsesionkey?actid=19513&callback=?`;
// 手机号解密
const getUserPhoneAPI = `${BASE_URL}/wechat/getphone?actid=19513&callback=?`;
// 获取 验证码
const getYzmAPI = `${BASE_URL}/chaxun/sendmsg?actid=19513&callback=?`;
// 注册
const RegisterAPI = `${BASE_URL}/chaxun/register?actid=19513&callback=?`;
const RegisterAPI2 = `${BASE_URL}/chaxun/register?actid=`;

const RegisterAllAPI = `${BASE_URL}/chaxun/register?actid=34576&callback=?`;
const RegisterDIYAPI = `${BASE_URL}/chaxun/register?&actid=`;

// 记录api
const writelogsAPI = `${BASE_URL}/chaxun/writelogs?actid=34576`;

// 获取 首页数据
const getIndexPageDataAPI = `${BASE_URL}/chaxun/getfzinfo?actid=19513&callback=?`;

// 省份、考试、功能获取api
const getPageDataAPI = `${BASE_URL}/chaxun/getfzinfo?actid=21928&callback=?`;

// 速看接口
const getSukanSetDataAPI = `${BASE_URL}/chaxun/getjlinfo?actid=`;

// 获取 内容查看配置-记录表信息
const getSharePageSetDataAPI = `${BASE_URL}/chaxun/getjlinfo?actid=34573`;

// 查询记录表接口
const getCxjlDataAPI = `${BASE_URL}/chaxun/getjlinfo?actid=`;

// 查询list接口
const ChaxunGetListApi = `${BASE_URL}/chaxun/getfzinfo?actid=`;

// 获取 秦皇岛市直遴选
const getQinhuangdaoExamLevelDataAPI = `${BASE_URL}/chaxun/getlevel?actid=19642&callback=?`
const getQinhuangdaoExamSearchResultAPI = `${BASE_URL}/chaxun/getlist/?actid=19642&callback=?`;




// 获取 省考查询结果
const getProvinceExamSearchResultAPI = `${BASE_URL}/chaxun/getlist/?actid=2218&callback=?`;

// 获取 入面分数线 选择条件
const getRmfsxYearsLevelAPI = `${BASE_URL}/chaxun/getlevel?actid=2218&callback=?`;
// 获取 入面分数线 查询结果
const getRmfsxResultAPI = `${BASE_URL}/chaxun/getlist?actid=2218&callback=?`;

// 获取 专业目录 查询结果
const getProfessionalDirectoryEnquiryResultAPI = `${BASE_URL}/chaxun/getjlinfo/?actid=5441&callback=?`;

// 提交crm
function tijiao_crm(data,callback){
  wx.request({
    url: 'https://dc.offcn.com:8443/a.gif',
    data: data,
    success: res=>{
      // let data = JSON.parse(res.data.replace(/^(\s|\()+|(\s|\))+$/g, ''));
      // console.log(res.data.status)
      callback(res)
    }
  })
};

function getQueryVariable(variable,uri){
  let query = uri.split("?")[1];
  let vars = query.split("&");
  for (let i=0;i<vars.length;i++) {
    let pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

module.exports = {
  getSesionkeyAPI,
  getUserPhoneAPI,
  getYzmAPI,
  RegisterAPI,
  RegisterAPI2,
  getIndexPageDataAPI,
  getProvinceExamSearchResultAPI,
  getRmfsxYearsLevelAPI,
  getRmfsxResultAPI,
  getProfessionalDirectoryEnquiryResultAPI,
  getQinhuangdaoExamSearchResultAPI,
  getQinhuangdaoExamLevelDataAPI,
  getSukanSetDataAPI,
  RegisterAllAPI,
  RegisterDIYAPI,
  getCxjlDataAPI,
  ChaxunGetListApi,
  getSharePageSetDataAPI,
  writelogsAPI,
  tijiao_crm,
  getQueryVariable
}