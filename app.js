//app.js
import {getCurrentAddress, coordFormat} from './utils/util'
import {gcj02tobd09} from './utils/coordtransform'
import distance from './utils/distance'
import {
    userLogin, getUserInfo
} from './utils/apis'
App({
    onLaunch: function () {
        var _this = this;
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    _this.getUserInfo();
                } else {
                    wx.reLaunch({
                        url: '../login/login'
                    })
                }
            }
        });

        
        wx.getLocation({
            type: 'gcj02', //Return can be used as the latitude and longitude of wx.openLocation
            success: function(res) {
                _this.globalData.location = {
                    lat: res.latitude,
                    lng: res.longitude
                };
                // console.log(_this.globalData.location);
            }
        })
    },

    getUserInfo() {
        var _this = this;
        wx.getUserInfo({
            success: res => {
                _this.getLoginInfo(res.userInfo);         
            }
        });
    },
    //删
    getLoginInfo: function (wxInfo) {
        var that = this;
        var openid = wx.getStorageSync('openid');
        console.log(wxInfo);
        if (openid == "" || openid == null) {
            userLogin({
                success(res) {
                    that.setLoginInfo(res);
                    that.getLoginUserInfo(res.openid, wxInfo);
                }
            })
        } else {
            that.getLoginUserInfo(openid, wxInfo);
        }
    },
    setLoginInfo(loginInfo) {
        if (loginInfo.session_key) {
            wx.setStorageSync('session_key', loginInfo.session_key)
            wx.setStorageSync('openid', loginInfo.openid)
        }
        this.globalData.loginInfo = loginInfo
    },
    getLoginUserInfo(openid, wxInfo) {
        var _this = this;
        getUserInfo({
            data: {
                openid: openid,
                avatarUrl: wxInfo.avatarUrl,
                nickName: wxInfo.nickName
            },
            success(res) {
                var data = {};
                if (res.data == undefined) {
                    console.log('xxxx');
                    data.opend_id = openid;
                    data.wechat_alias = wxInfo.nickName;
                    data.image = wxInfo.avatarUrl;
                    data.community_id = 1;
                } else {
                    data = res.data;
                }
                _this.globalData.userInfo = data;
            }
        })
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

    // findNearbyUserAddr(cb, radius = 100) {
    //     radius /= 100
    //     wx.getLocation({
    //         type: 'gcj02',
    //         success: function (res) {
    //             var [lng1, lat1] = gcj02tobd09(res.longitude, res.latitude)
    //             getUserAddrs({
    //                 success(addressList) {
    //                     for (let i = 0, len = addressList.length; i < len; i++) {
    //                         var address = addressList[i]
    //                         var {
    //                             longitude: lng2,
    //                             latitude: lat2
    //                         } = address
    //                         if (distance(lat1, lng1, lat2, lng2) <= radius) {
    //                             return cb(address)
    //                         }
    //                     }
    //                     return cb()
    //                 }
    //             })
    //         },
    //         fail(res) {
    //             console.log(res.errMsg)
    //             alert('获取用户地址失败')
    //         }
    //     })
    // },
    
    globalData: {
        userInfo: null,
        currentAddress: null,
        uploadPath: "https://community.bootmatestem.cn/upload/",
        location: {}
    }
})