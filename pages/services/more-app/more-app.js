// pages/search/search.js
import {getInfoDataByID} from "../../../utils/apis"
import dateFormat from '../../../utils/dateformat.js'
const uploadPath = getApp().globalData.uploadPath
Page({
    data: {
        info:null
    },
    onLoad: function (options) {
        this.loadData(options.id);
        // this.inputTyping = debounce(this.inputTyping, 300)
    },
    loadData(id){
        var _this = this;
        getInfoDataByID({
            id: id,
            url: 'getAppByID',
            success(res) {
                console.log(res);
                _this.info = res;
                _this.data.info = {
                    image: uploadPath + res.image,
                    title: res.wechat_miniapp_name,
                    date: dateFormat(new Date(res.created_on), "mm-dd HH:MM"),
                    description: res.description,
                    barcode: uploadPath + res.wechat_miniapp_barcode
                }
                _this.setData({
                    info: _this.data.info
                })
            }
        })
    },
    showBarcode() {
        var img = this.data.info.barcode;
        wx.previewImage({
            current: img,
            urls: [img]
        })
    }
});