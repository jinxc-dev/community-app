//index.js
//获取应用实例
import {getInfoDataList,
    getBannerList, 
    getWechatGroup, 
    getOwnerList,
    getSaleAppList,
    getServicesAppList} from '../../utils/apis'
import {fetch} from '../../utils/util'
const app = getApp();
import {host} from '../../config'

Page({
    data: {
        userInfo: {},
        uploadHost: "https://" + host + "/upload/",
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        banner:[],
        weixinGroup: [],
        ownerList: [],
        saleAppList: [],
        servicesAppList: [],
        communityItems : [
        ]
    },
    onReady: function () {
        console.log('ready');


    },

    onLoad: function () {
        console.log('load');
        console.log(this.data.canIUse);
        if (this.data.canIUse) {
            wx.getUserInfo({
                success: function (res) {
                    // console.log(res);
                    // console.log(JSON.parse(res.rawData));
                },
                fail: function (res) {
                    console.log(res);
                }
            });

            wx.login({
                success(res) {
                    // console.log(res);
                }
            });

            console.log(wx.getStorageSync('session_3rd'));
        }

        this.loadData();
    },


    loadData() {
        var _this = this;

        getInfoDataList({
            url: 'getAllOfAds',
            success(res) {
                _this.data.banner = res;
                _this.setData({
                    banner: _this.data.banner
                });
                
            }
        });
        getInfoDataList({
            url: 'getWechatGroups',
            success(res) {
                _this.weixinGroup = res;
                _this.setData({
                    weixinGroup: _this.weixinGroup
                })
            }
        })

        getInfoDataList({
            url: 'getOwners',
            success(res) {
                _this.ownerList = res;
                _this.setData({
                    ownerList: _this.ownerList
                })
            }
        })

        getInfoDataList({
            url: 'getSaleApps',
            success(res) {
                _this.saleAppList = res;
                _this.setData({
                    saleAppList: _this.saleAppList
                })
            }
        })
        getInfoDataList({
            url: 'getApps',
            success(res) {
                _this.servicesAppList = res;
                _this.setData({
                    servicesAppList: _this.servicesAppList
                })
            }
        })

        fetch({
            url:'getMainMenus',
            data:{},
            method:'GET',
            success(res) {
                var n = res.length;
                if (res.length < 4) {
                    n = res.length;
                }
                var w_list = [];
                for (var i = 0; i < n; i++) {
                    w_list.push(res[i]);
                }
                _this.setData({
                    communityItems: w_list
                })
            }
        })
    },

    onGotUserInfo(e) {
    }


})
