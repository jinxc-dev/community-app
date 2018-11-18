
// const app = getApp()
import {getMenuList, getOwnerList, getInfoDataList} from '../../utils/apis'
const app = getApp()
Page({
    data: {
        menuData:[], 
        menuInfo: [],
        uploadPath: app.globalData.uploadPath,
        ownerInfo:{}
    },
    onReady: function () {

    },

    onLoad: function () {
        console.log(this.data.uploadPath);
        this.loadData();
        
    },

    loadData() {
        var _this = this;
        getInfoDataList({
            url: 'getMenuList',
            success(res) {
                console.log(res);
                // var w_data = res;
                _this.data.menuInfo = _this.rebuildMenuList(res);
                console.log(_this.data.menuInfo);
                _this.setData({
                    menuInfo: _this.data.menuInfo
                })
            }
        })

        getInfoDataList({
            url:'getOwners',
            success(res) {
                _this.ownerList = res;
                console.log(res);
                if (res.length > 0) {
                    _this.ownerInfo = res[0];
                    _this.setData({
                        ownerInfo: _this.ownerInfo
                    })
                }
            }
        })
    },

    rebuildMenuList(data) {
        var ret_data = [];
        for (var i = 0; i < data.length; i++) {
            var w_list = [];
            var n = 0;
            for (var j = 0; j < data[i].items.length; j++) {
                if (j % 2 == 0) {
                    w_list[n] = {};
                    w_list[n].first = data[i].items[j];
                } else {
                    w_list[n].second = data[i].items[j];
                    n++;
                }
            }
            ret_data.push({
                main: data[i].main,
                items: w_list
            });
        }
        return ret_data;
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
