const app = getApp()
const { windowWidth } = app.globalData.system_info

export const fetch = (url, options = {}) => {
  return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        url,
        header: {
          'x-api-key': 'e0bb4bbb-657a-4e95-a85c-d7ea988879ed'
        },
        success: function({ data }) {
          resolve(data)
        },
        fail: function() {
          reject()
        }
      })
  })
}

// export const fetch = (url, options = {}) => {
//   return wx.cloud.callFunction({ 
//     name: "request", 
//     data: {
//       url,
//       options: {
//         ...options,
//         headers : {
//           'x-api-key': 'e0bb4bbb-657a-4e95-a85c-d7ea988879ed'
//         }
//       }
//     }
//   }).then(({ result }) => JSON.parse(result))
// }

export const removeDuplicates = (array, key = 'id') => {
  return array.reduce((acc, item) => {
    if (acc.find(i => i[key] === item[key])) {
      return acc
    }
    return [...acc, item]
  }, [])
}

export const splitColumnData = (array, column = 2) => {
  if (column > array.length) {
    return array
  }

  // init data
  let data = [];
  let height = [];
  for (let i = 0; i < column; i++) {
    data.push([])
    height.push(0)
  }

  const base_width = windowWidth / column
  for (const item of array) {
    const min_index = height.indexOf(Math.min(...height))
    const h = item.height
    const w = item.width

    // update data
    data[min_index].push(item)
    height[min_index] += base_width * (h / w)
  }

  return data
}
