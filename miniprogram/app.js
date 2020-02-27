//app.js
import './utils/init.js'

App({
  onLaunch: function() {
    wx.cloud.init()
  },
  globalData: {}
})