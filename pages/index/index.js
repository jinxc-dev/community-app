//index.js
//获取应用实例
import {getInfoDataList} from '../../utils/apis'
import {fetch} from '../../utils/util'
const app = getApp();
import {host} from '../../config'

Page({
    data: {
        userInfo: {},
        uploadHost: "https://" + host + "/upload/",
        banner:[],
        weixinGroup: [],
        ownerList: [],
        saleAppList: [],
        servicesAppList: [],
        communityItems : []
    },
    onReady: function () {
    },

    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo
            })
        } else {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo
                    })
                }
            })
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
            url:'getHomeMenus',
            data:{},
            method:'GET',
            success(res) {
                var n = 4;
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
    },

    onPullDownRefresh:function()
    {
        console.log('loadData');
        wx.showNavigationBarLoading() //在标题栏中显示加载
    
        this.loadData();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      //模拟加载
    },
})
