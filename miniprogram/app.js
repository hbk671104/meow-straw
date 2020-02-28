//app.js
import './utils/init.js'

App({
  onLaunch: function() {
    this.init()
  },
  init: function() {
    // 云环境
    wx.cloud.init()

    // 设备数据
    this.globalData.system_info = wx.getSystemInfoSync()
  },
  globalData: {}
})