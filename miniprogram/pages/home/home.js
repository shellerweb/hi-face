const util = require('../../utils/util.js')
Page({
  data: {
    imgUrl: "../../images/tcloud.png",
    labels:[]
  },
  upload: function (e) {
    console.log(e);
    wx.chooseImage({
      complete: (res) => {
        console.log(res.tempFiles[0]);
        wx.cloud.uploadFile({
          cloudPath: 'yourimage.jpg',
          filePath: res.tempFilePaths[0],
          success: ret => {
            console.log(ret)
            console.log(ret.fileID)
            wx.cloud.callFunction({
              name: 'imagecheck',
              data: {
                'imgUrl': ret.fileID
              },
              success: reg => {
                if (!reg.result.errCode) {
                  console.log(reg)
                  wx.cloud.callFunction({
                    name: 'imagedetect',
                    data: {
                      fileID: ret.fileID
                    },
                    success: reh => {
                      console.log(reh)
                      this.setData({
                        imgUrl: ret.fileID,
                        labels:reh.result.data.list
                      })
                    },
                    fail: era => {
                      console.log(era)
                    }
                  })
                }

              },
              fail: err => {
                console.log(err)
              }
            })

          }
        })
      },
    })
  },

  uploadimg: function (e) {
    console.log(e);
    wx.cloud.callFunction({
      name: 'imagecute',
      data: {
        fileID: "cloud://keeporange-4d414e.6b65-keeporange-4d414e-1258122660/yourimage.jpg"
      },
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })

  },

  onLoad: function (options) {

  },
  tabClick: function (e) {
    console.log(e)
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },
  callfunction(e) {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log('Mission success', res)
      },
      fail: err => {
        console.log(err)
      },
      complete: com => {
        console.log('Mission complete', com)
      }
    })
  },
  sum(e) {
    wx.cloud.callFunction({
      name: 'moment',
      success: res => {
        console.log("云函数返回的数据", res.result)
      },
      fail: err => {
        console.error('云函数调用失败：', err)
      }
    })
  }
})