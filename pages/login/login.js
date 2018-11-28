const app = getApp()
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    onLoad: function () {
        wx.getSetting({
            success: res => {
                // if (res.authSetting['scope.userInfo'] && !wx.getStorageSync('openid')) {
                if (res.authSetting['scope.userInfo'] && wx.getStorageSync('openid')) {
                    wx.reLaunch({
                        url: '../index/index'
                    })
                }
            }
        });
    },
    getUserInfo: function (e) {
        if (e.detail.userInfo != undefined) {
            // app.globalData.userInfo = e.detail.userInfo;
            app.getUserInfo();
            wx.reLaunch( {
                url: '../index/index'
            });
        }
    },
})
