//app.js
import {getCurrentAddress, coordFormat} from './utils/util'
import {getCommunityList, getInfoDataByID} from './utils/apis'
import {gcj02tobd09} from './utils/coordtransform'
import distance from './utils/distance'
import {
    userLogin, insertUserInfo
} from './utils/apis'
App({
    onLaunch: function () {
        var _this = this;
        
        //. get community list
        
        getCommunityList({
            success(res) {
                _this.globalData.communityList = res;
                console.log('communityList');
                console.log(res);
                wx.getSetting({
                    success: res => {
                        if (res.authSetting['scope.userInfo']) {
                            _this.getUserInfo();
                            // wx.reLaunch({
                            //     url: '../index/index'
                            // })
                        } else {
                            wx.reLaunch({
                                url: "../login/login"
                            })
                        }
                    }
                });
            }
        })

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
        console.log('xxxxx');
        if (openid == "" || openid == null) {
            userLogin({
                success(res) {
                    that.setLoginInfo(res);
                    that.insertUser(res.openid, wxInfo);
                }
            })
        } else {
            getInfoDataByID({
                id: openid,
                url: 'checkUser',
                success(res) {
                    if (res.data != null) {
                        that.setGlobalUserInfo(res.data);
                    } else {
                        wx.removeStorageSync('openid');
                        wx.reLaunch({
                            url: '../login/login'
                        })
                    }
                }
            })
        }
    },
    setLoginInfo(loginInfo) {
        if (loginInfo.session_key) {
            wx.setStorageSync('session_key', loginInfo.session_key)
            wx.setStorageSync('openid', loginInfo.openid)
        }
        this.globalData.loginInfo = loginInfo
    },

    insertUser(openid, wxInfo) {
        var _this = this;
        var tmp_commid = this.globalData.communityList[0].community_id;
        console.log(this.globalData.communityList[0]);
        console.log(tmp_commid);
        insertUserInfo({
            data: {
                openid: openid,
                avatarUrl: wxInfo.avatarUrl,
                nickName: wxInfo.nickName,
                community_id: tmp_commid
            },
            success(res) {
                var data = {};
                data.opend_id = openid;
                data.wechat_alias = wxInfo.nickName;
                data.image = wxInfo.avatarUrl;
                data.comm_id = tmp_commid;
                _this.setGlobalUserInfo(data);
            }
        })
    },

    setGlobalUserInfo(userInfo) {
        this.globalData.user_comm_id = userInfo.comm_id;
        this.globalData.userInfo = userInfo;
    },

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
    
    globalData: {
        userInfo: null,
        currentAddress: null,
        uploadPath: "https://community.bootmatestem.cn/upload/",
        location: {},
        communityList: null,
        user_comm_id: 0,
        nowCommunity: null
    }
})