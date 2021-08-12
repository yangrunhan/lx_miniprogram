// 检测 字段 是否在本地存储存在
function checkHasStorage(key) {
  const KEY = wx.getStorageSync(key);
  if (!KEY) {
    wx.removeStorageSync(key);
    return false;
  } else {
    return true;
  }
}

module.exports = {
  checkHasStorage,
}