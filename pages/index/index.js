//index.js
//获取应用实例
import {getInfoDataList, getInfoDataByID} from '../../utils/apis'
import {fetch} from '../../utils/util'
const app = getApp();
import {host} from '../../config'
import dateFormat from '../../utils/dateformat.js'

Page({
    data: {
        uploadHost: "https://" + host + "/upload/",
        banner:[],
        weixinGroup: [],
        ownerList: [],
        saleAppList: [],
        servicesAppList: [],
        communityItems : [],
        communityName: "",
    },
    onReady: function () {
    },

    onLoad: function () {
        console.log("onLoad");
        var _this = this;
        var openid = wx.getStorageSync('openid');
        // return;
        getInfoDataByID({
            id: openid,
            url: 'checkUser',
            success(res) {
                if (res.data != null) {
                    var data = res.data;
                    app.globalData.user_comm_id = data.comm_id;

                    _this.loadData();
                    var c_list = app.globalData.communityList;
                    for (var i = 0; i < c_list.length; i++ ) {
                        if (data.comm_id == c_list[i].community_id) {
                            _this.data.communityName = c_list[i].community_name;
                            app.globalData.nowCommunity = c_list[i];
                            console.log(app.globalData);
                            break;
                        }
                    }
                    _this.setData({
                        communityName: _this.data.communityName
                    })
                } else {
                    _this.onLoad();
                }


            }
        })

        // this.loadData();
        
    },


    loadData() {
        var _this = this;
        console.log('loadData');
        getInfoDataList({
            url: 'getAllOfAds',
            success(res) {
                // _this.data.banner = res;
                var tmp = res;
                _this.data.banner = [];
                for (var i = 0; i < tmp.length; i++) {
                  tmp[i].posted_on = dateFormat(new Date(tmp[i].posted_on), "mm-dd HH:MM");
                  _this.data.banner.push(tmp[i]);
                }
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
            url:'getHomeMenus' + "/" + getApp().globalData.user_comm_id,
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

    onPullDownRefresh:function()
    {
        console.log('loadData');
        wx.showNavigationBarLoading() //在标题栏中显示加载
    
        this.onLoad();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      //模拟加载
    },
})
