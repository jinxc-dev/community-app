//app.js
import {getCurrentAddress, coordFormat} from './utils/util'
import {gcj02tobd09} from './utils/coordtransform'
import distance from './utils/distance'
import {
    getLoginInfo, getUserAddrs
} from './utils/apis'
App({
    onLaunch: function () {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    //删
    getLoginInfo: function (cb) {
        var that = this
        if (this.globalData.loginInfo) {
            cb && cb(this.globalData.loginInfo)
        } else {
            //调用登录接口
            getLoginInfo({
                success(data) {
                    console.log(data)
                    that.setLoginInfo(data)
                    cb && cb(data)
                }
            })
        }
    },
    setLoginInfo(loginInfo) {
        if (loginInfo.session_3rd) {
            wx.setStorageSync('session_3rd', loginInfo.session_3rd)
        }
        this.globalData.loginInfo = loginInfo
    },
    //删
    setCurrentAddress(address){
        if(address.addr_id){
            address.title=`${address.addr} ${address.detail}`
            address.city=address.city_name
            address.district=address.district_name
            address.location={
                longitude:address.longitude,
                latitude:address.latitude
            }
        }else{
            //国测局坐标转百度经纬度坐标
            address.location=coordFormat(address.location)
        }
        this.globalData.currentAddress=address
        return address
    },

    findNearbyUserAddr(cb, radius = 100) {
        radius /= 100
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                var [lng1, lat1] = gcj02tobd09(res.longitude, res.latitude)
                getUserAddrs({
                    success(addressList) {
                        for (let i = 0, len = addressList.length; i < len; i++) {
                            var address = addressList[i]
                            var {
                                longitude: lng2,
                                latitude: lat2
                            } = address
                            if (distance(lat1, lng1, lat2, lng2) <= radius) {
                                return cb(address)
                            }
                        }
                        return cb()
                    }
                })
            },
            fail(res) {
                console.log(res.errMsg)
                alert('获取用户地址失败')
            }
        })
    },
    globalData: {
        userInfo: null,
        currentAddress: null,
        uploadPath: "https://community.bootmatestem.cn/upload/"
    }
})