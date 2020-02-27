// miniprogram/pages/filter/filter.js
import { fetchBreed } from '../../service/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    breeds: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.loadBreed(() => wx.hideLoading())
  },
  loadBreed: function(callback) {
    fetchBreed().then(data => {
      this.setData({
        breeds: data
      })
    }).finally(callback)
  }
})