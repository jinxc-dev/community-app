// pages/search/search.js
import {getInfoDataByID} from "../../../utils/apis"
import dateFormat from '../../../utils/dateformat.js'
const uploadPath = getApp().globalData.uploadPath

Page({
    data: {
        info: {}
    },
    onLoad: function (options) {
        this.loadData(options.id);
    },
    loadData(id){
        var _this = this;
        console.log(getApp().globalData.nowCommunity);
        this.setData({
            communityName: getApp().globalData.nowCommunity.community_name
        })
        getInfoDataByID({
            id: id,
            url: 'getAdByID',
            success(res) {
                console.log(res);
                _this.data.info = {
                    image: uploadPath + res.poser_image,
                    date: dateFormat(new Date(res.posted_on), "mm-dd HH:MM"),
                    title: res.tag_line,
                    link: res.tag_line
                };
                _this.setData({
                    info:_this.data.info
                })
            }
        })
    },
    chooseImage() {
        var img = this.data.info.image;
        wx.previewImage({
            current: img,
            urls: [img]
        })
    }
});