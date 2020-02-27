// export const fetch = (url, options = {}) => {
//   return new Promise((resolve, reject) => {
//       wx.request({
//         ...options,
//         url,
//         header : {
//           "x-api-key": 'e0bb4bbb-657a-4e95-a85c-d7ea988879ed'
//         },
//         success: function(result) {
//           resolve(result)
//         },
//         fail: function() {
//           reject()
//         }
//       })
//   })
// }

export const fetch = (url, options = {}) => {
  return wx.cloud.callFunction({ 
    name: "request", 
    data: {
      url,
      options: {
        ...options,
        headers : {
          'x-api-key': 'e0bb4bbb-657a-4e95-a85c-d7ea988879ed'
        }
      }
    }
  }).then(({ result }) => JSON.parse(result))
}
