//index.js
import queryString from 'query-string'
import { fetch } from '../../utils/util.js'

Page({
  data: {
    cats: [],
    query_params: {
      limit: 10,
      page: 0
    }
  },
  onLoad: function() {
    wx.showLoading({ title: "吮吸中..."})
    this.loadCat(() => wx.hideLoading())
  },
  onPullDownRefresh: function() {
    this.loadCat(() => wx.stopPullDownRefresh())
  },
  onReachBottom: function() {
    this.loadMoreCat()
  },
  onFilterTap: function() {
    wx.navigateTo({
      url: '../filter/filter',
    })
  },
  previewImage: function(event) {
    const target = event.target
    const { dataset: { item } } = target
    
    // preview image
    const { cats } = this.data
    wx.previewImage({
      current: item.url,
      urls: cats.map(c => c.url),
    })
  },
  loadCat: function(callback) {
    const { query_params } = this.data
    this.setData({
      query_params: {
        ...query_params,
        page: 0
      }
    }, () => {
      this.fetchCat(callback)
    })
  },
  loadMoreCat: function(callback) {
    const { query_params } = this.data
    this.setData({
      query_params: {
        ...query_params,
        page: query_params.page + 1
      }
    }, () => {
      this.fetchCat(callback)
    })
  },
  fetchCat: function(callback) {
    const { query_params, cats } = this.data
    const stringnified_params = queryString.stringify(query_params)
    fetch({
      url: `https://api.thecatapi.com/v1/images/search?${stringnified_params}`
    }).then(data => {
      this.setData({
        cats: query_params.page === 0 ? data : [...cats, ...data]
      })
    }).finally(callback)
  },
})
