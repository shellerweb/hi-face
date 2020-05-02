// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    const result= cloud.openapi.security.imgSecCheck({
      media: {
        contentType: 'image/jpg',
        value: Buffer.from(event.imgUrl)
      }
    })  
    return result
  }catch(err){
    return err
  }
}