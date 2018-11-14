// pages/search/search.js
import {getInfoDataByID} from "../../../utils/apis"
import dateFormat from '../../../utils/dateformat.js'
const uploadPath = getApp().globalData.uploadPath
Page({
    data: {
    },
    onLoad: function (options) {
        this.loadData(options.id);
    },
    loadData(id){
        var _this = this;
        getInfoDataByID({
            id: id,
            url: 'getOwnerByID',
            success(res) {
                console.log(res);
                _this.setData({
                    avatar: uploadPath + res.owner_avatar,
                    date: dateFormat(new Date(res.created_date), "mm-dd HH:MM"),
                    name: res.username,
                    owner_name: res.community_owner_name,
                    wechat_id: res.community_owner_wechatid              
                });
            }
        })
    },
    clickImage() {
        wx.previewImage({
            current:'/images/tgold-weixin-app.jpg',
            urls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg']
        })
    }
});