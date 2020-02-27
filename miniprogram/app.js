//app.js
require('./utils/init.js')

App({
  onLaunch: function () {
    wx.cloud.init()
  },
  globalData: {}
})