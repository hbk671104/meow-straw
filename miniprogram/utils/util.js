export const fetch = options => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      header : {
        "x-api-key": 'e0bb4bbb-657a-4e95-a85c-d7ea988879ed'
      },
      success: function(result) {
        resolve(result)
      },
      fail: function() {
        reject()
      }
    })
  })
}
