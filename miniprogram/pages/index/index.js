//index.js
import { search } from '../../service/api.js'
import { breeds } from '../../data/breeds.js'
import { categories } from '../../data/categories.js'

Page({
  data: {
    cats: [],
    breeds: {
      data: [{ name: "全部" }, ...breeds],
      selection: 0
    },
    categories: {
      data: [{ name: "全部" }, ...categories],
      selection: 0
    },
    query_params: {
      limit: 10,
      page: 0,
      breed_ids: null,
      category_ids: null
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
  onPickerChange: function({ detail : { value }}) {
    wx.showLoading({ title: "筛选中..." })
    this.filterCat(value, () => wx.hideLoading())
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
  filterCat: function([breed_index, category_index], callback) {
    const { breeds, categories, query_params } = this.data
    const breed_id = breed_index === 0 ? null : breeds.data[breed_index].id
    const category_id = category_index === 0 ? null : categories.data[category_index].id
    this.setData({
      breeds: {
        ...breeds,
        selection: breed_index
      },
      categories: {
        ...categories,
        selection: category_index
      },
      query_params: {
        ...query_params,
        page: 0,
        breed_ids: breed_id,
        category_ids: category_id
      }
    }, () => {
      this.fetchCat(callback)
    })
  },
  fetchCat: function(callback) {
    const { query_params, cats } = this.data
    search(query_params).then(data => {
      this.setData({
        cats: query_params.page === 0 ? data : [...cats, ...data]
      })
    }).finally(callback)
  },
})
