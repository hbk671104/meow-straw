// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { url, options } = event
  try {
    const { body } = await got(url, options)
    return Promise.resolve(body)
  } catch ({ response }){
    const { body } = response
    return Promise.reject(body)
  }
}