import {fetch} from "../../utils/util";

Page({
    data: {
    },
    onLoad: function (options) {
        var commid = getApp().globalData.user_comm_id;
        var key = options.key;
        var _this = this;
        wx.showLoading({
            title: "搜索中"
        })
        this.setData({
            keyword: key
        })
        
        fetch({
            url: "findItems",
            data:{
                commid: commid,
                keyword: key
            },
            success(res) {
                _this.dataList = res;
                _this.setData({
                    itemList: res
                })
                wx.hideLoading();
            }
        })
    },
    goDetail(e) {
        console.log(e);
        // e.currentTarget.dataset.item;
        wx.navigateTo({
            url: "../detail/detail?itemID=" + e.currentTarget.dataset.id
        })
    },
    goBack() {
        wx.navigateBack();
    }
});